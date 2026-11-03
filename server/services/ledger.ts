/**
 * Everything that moves money lives here.
 * Rules: integer minor units, one DB transaction per operation, account rows locked
 * FOR UPDATE in a stable order (no deadlocks, no double spend), ledger row written
 * in the same transaction as the balance change.
 */
import crypto from "node:crypto";
import { Op, Transaction as DbTx } from "sequelize";
import {
	Account, AccountStatus, Beneficiary, NotificationType, Transaction, TransactionStatus, TransactionType, User,
} from "../models";
import { sequelize } from "../utils/db";
import { badRequest, forbidden, notFound, unprocessable } from "../utils/errors";
import { fromMinor, positiveMinor, toMinor } from "../utils/money";
import { getUser, getUserByEmail } from "./users";
import { notifySafe } from "./notifications";

const newTransactionId = () => {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return Array.from({ length: 15 }, () => charset[crypto.randomInt(charset.length)]).join("");
};

const lockAccounts = async (userIds: string[], t: DbTx) => {
	const ids = [...new Set(userIds)].sort(); // fixed order => no deadlocks
	const rows = await Account.findAll({ where: { userId: ids }, order: [["userId", "ASC"]], transaction: t, lock: t.LOCK.UPDATE });
	return new Map(rows.map((a) => [a.userId, a]));
};

export type TransferInput = {
	senderId: string;
	type: TransactionType;
	amount: number;
	notes?: string;
	beneficiary: { userId?: string; name: string; destinationAccount: string; bank: string };
};

export const transfer = async (input: TransferInput) => {
	const minor = positiveMinor(input.amount);
	if (input.type === TransactionType.CREDIT) throw badRequest("Invalid transaction type");
	const isSend = input.type === TransactionType.SEND;
	const receiverId = isSend ? input.beneficiary.userId : undefined;
	if (isSend) {
		if (!receiverId) throw badRequest("Beneficiary is required");
		if (receiverId === input.senderId) throw unprocessable("You cannot send money to yourself");
	}

	const sender = await getUser(input.senderId);
	if (sender.status.toUpperCase() === "HOLD") throw forbidden("Account on hold. Contact support.");

	try {
		const { tx, beneficiary } = await sequelize.transaction(async (t) => {
			const accounts = await lockAccounts([input.senderId, ...(receiverId ? [receiverId] : [])], t);

			const from = accounts.get(input.senderId);
			if (!from) throw notFound("Account not found");
			if (from.status !== AccountStatus.ACTIVE) throw forbidden("Your account is not active");
			const fromBalance = toMinor(from.amount);
			if (fromBalance < minor) throw unprocessable("Insufficient balance");

			const to = receiverId ? accounts.get(receiverId) : undefined;
			if (isSend && (!to || to.status !== AccountStatus.ACTIVE)) throw unprocessable("Beneficiary account is unavailable");

			await from.update({ amount: fromMinor(fromBalance - minor) }, { transaction: t });
			if (to) await to.update({ amount: fromMinor(toMinor(to.amount) + minor) }, { transaction: t });

			const beneficiary = await Beneficiary.create({ ...input.beneficiary, userId: receiverId ?? null }, { transaction: t });
			const tx = await Transaction.create(
				{
					senderId: input.senderId, receiverId: receiverId ?? null, beneficiaryId: beneficiary.id,
					transactionId: newTransactionId(), amount: fromMinor(minor), type: input.type,
					notes: input.notes, status: TransactionStatus.COMPLETED,
				},
				{ transaction: t }
			);
			return { tx, beneficiary };
		});

		// after commit, best effort
		await notifySafe({ userId: input.senderId, title: "Transfer Processing", message: `${fromMinor(minor)} processing`, type: NotificationType.DEBIT });
		if (receiverId) {
			await notifySafe({ userId: receiverId, title: "Credit alert", message: `Received ${fromMinor(minor)} from ${sender.name}`, type: NotificationType.CREDIT });
		}
		return { ...tx.toJSON(), beneficiary: beneficiary.toJSON() };
	} catch (error: any) {
		// A refused transfer is recorded (no money moved) and the sender is told why.
		if ([403, 404, 422].includes(error?.statusCode)) {
			try {
				await Transaction.create({
					senderId: input.senderId, receiverId: receiverId ?? null, transactionId: newTransactionId(),
					amount: fromMinor(minor), type: input.type, notes: input.notes, status: TransactionStatus.FAILED,
				});
				await notifySafe({ userId: input.senderId, title: "Transaction error", message: error.message, type: NotificationType.FAILED });
			} catch {}
		}
		throw error;
	}
};

/** Admin credits a user's account by e-mail. */
export const topUp = async (email: string, amount: number) => {
	const minor = positiveMinor(amount);
	const user = await getUserByEmail(email);

	return sequelize.transaction(async (t) => {
		const account = (await lockAccounts([user.id], t)).get(user.id);
		if (!account) throw notFound("Account not found");
		if (account.status === AccountStatus.CLOSED) throw unprocessable("Account is closed");

		await account.update({ amount: fromMinor(toMinor(account.amount) + minor) }, { transaction: t });
		await Transaction.create(
			{
				senderId: user.id, receiverId: user.id, transactionId: newTransactionId(), amount: fromMinor(minor),
				type: TransactionType.CREDIT, notes: "Deposit transaction", status: TransactionStatus.COMPLETED,
			},
			{ transaction: t }
		);
		return account;
	});
};

/** Admin changes the status / notes of a transaction (e.g. "sent to bank"). Does not move money. */
export const updateTransaction = async (id: string, data: { status?: TransactionStatus; notes?: string }) => {
	const tx = await Transaction.findByPk(id);
	if (!tx) throw notFound("Transaction not found");
	await tx.update({ ...(data.status && { status: data.status }), ...(data.notes !== undefined && { notes: data.notes }) });

	await notifySafe({
		userId: tx.senderId,
		title: tx.status === TransactionStatus.COMPLETED ? "Transaction Successful" : "Transfer Processing",
		message: `${tx.amount} ${tx.status === TransactionStatus.AWAITING ? "Sent to bank" : tx.status}`,
		type: NotificationType.DEBIT,
	});
	return tx;
};

const withBeneficiaries = async (txs: Transaction[]) => {
	const ids = txs.map((t) => t.beneficiaryId).filter(Boolean) as string[];
	const rows = ids.length ? await Beneficiary.findAll({ where: { id: ids } }) : [];
	const byId = new Map(rows.map((b) => [b.id, b.toJSON()]));
	return txs.map((t) => ({ ...t.toJSON(), ...(t.beneficiaryId && byId.has(t.beneficiaryId) && { beneficiary: byId.get(t.beneficiaryId) }) }));
};

export const listUserTransactions = async (userId: string) => {
	const txs = await Transaction.findAll({
		where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
		order: [["createdAt", "DESC"]],
	});
	const user = await User.findByPk(userId);
	const list = await withBeneficiaries(txs);
	// a deposit to yourself shows your own name as the beneficiary (as before)
	return list.map((t: any) => (t.beneficiary && t.beneficiaryId === t.senderId && user ? { ...t, beneficiary: { ...t.beneficiary, name: user.name } } : t));
};

/** Public receipt lookup (tracking page): no internal ids. */
export const findReceipt = async (transactionId: string) => {
	const tx = await Transaction.findOne({ where: { transactionId } });
	if (!tx) throw notFound("Transaction not found");
	const [full] = await withBeneficiaries([tx]);
	const { senderId, receiverId, beneficiaryId, id, ...receipt } = full as any;
	if (receipt.beneficiary) {
		const { id: _id, userId, ...b } = receipt.beneficiary;
		receipt.beneficiary = b;
	}
	return receipt;
};
