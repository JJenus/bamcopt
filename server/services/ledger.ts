/**
 * Everything that moves money lives here.
 * Rules: integer minor units, one DB transaction per operation, account rows locked
 * FOR UPDATE in a stable order (no deadlocks, no double spend), ledger row written
 * in the same transaction as the balance change.
 */
import crypto from "node:crypto";
import { Op, Transaction as DbTx } from "sequelize";
import {
	Account, AccountLevel, AccountStatus, Beneficiary, FundingAccount, NotificationType, Transaction, TransactionStatus, TransactionType, User,
} from "../models";
import { sequelize } from "../utils/db";
import { badRequest, forbidden, notFound, unprocessable } from "../utils/errors";
import { fromMinor, positiveMinor, toMinor } from "../utils/money";
import { checkAllCodes, type Codes } from "./codes";
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

const OUTGOING = [TransactionType.DEBIT, TransactionType.WITHDRAWAL, TransactionType.SEND];
const minorOf = (n: number | string) => Math.round(Number(n) * 100);

/** Limits of the account's level, in minor units. A limit that is 0 / unset means "no limit". */
const limitsFor = async (account: Account, t: DbTx) => {
	const level = (await AccountLevel.findOne({ where: { accountLevel: account.accountLevel }, transaction: t })) as any;
	return { daily: level ? minorOf(level.dailyLimit) : 0, max: level ? minorOf(level.maxBalanceLimit) : 0 };
};

/** Money that left the account in the last 24h (failed attempts and refunds are not counted). Computed at DB level. */
const sentLast24h = async (userId: string, t: DbTx) => {
	const result = await Transaction.sum("amount", {
		where: {
			senderId: userId,
			type: { [Op.in]: OUTGOING },
			status: { [Op.ne]: TransactionStatus.FAILED },
			createdAt: { [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) },
		},
		transaction: t,
	});
	return toMinor(result || 0);
};

export type TransferInput = {
	senderId: string;
	type: TransactionType;
	amount: number;
	codes: Codes;
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
	checkAllCodes(sender, input.codes); // before any money moves

	try {
		const { tx, beneficiary } = await sequelize.transaction(async (t) => {
			const accounts = await lockAccounts([input.senderId, ...(receiverId ? [receiverId] : [])], t);

			const from = accounts.get(input.senderId);
			if (!from) throw notFound("Account not found");
			if (from.status !== AccountStatus.ACTIVE) throw forbidden("Your account is not active");
			const fromBalance = toMinor(from.amount);
			if (fromBalance < minor) throw unprocessable("Insufficient balance");
			// sender is locked, so this running total cannot race with another transfer
			const { daily } = await limitsFor(from, t);
			if (daily > 0 && (await sentLast24h(input.senderId, t)) + minor > daily) {
				throw unprocessable(`Daily transfer limit of ${fromMinor(daily)} exceeded`);
			}

			const to = receiverId ? accounts.get(receiverId) : undefined;
			if (isSend && (!to || to.status !== AccountStatus.ACTIVE)) throw unprocessable("Beneficiary account is unavailable");
			if (to) {
				const { max } = await limitsFor(to, t);
				// deliberately vague: do not reveal the beneficiary's balance
				if (max > 0 && toMinor(to.amount) + minor > max) throw unprocessable("Beneficiary account cannot receive this amount");
			}

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
/** `fundingAccountId`: the admin funding account that received the money; its balance goes up in the same DB transaction. */
export const topUp = async (email: string, amount: number, fundingAccountId?: string) => {
	const minor = positiveMinor(amount);
	const user = await getUserByEmail(email);

	return sequelize.transaction(async (t) => {
		const account = (await lockAccounts([user.id], t)).get(user.id);
		if (!account) throw notFound("Account not found");
		if (account.status === AccountStatus.CLOSED) throw unprocessable("Account is closed");
		const { max } = await limitsFor(account, t);
		if (max > 0 && toMinor(account.amount) + minor > max) {
			throw unprocessable(`Exceeds the account's maximum balance of ${fromMinor(max)}`);
		}

		await account.update({ amount: fromMinor(toMinor(account.amount) + minor) }, { transaction: t });
		if (fundingAccountId) {
			const funding = await FundingAccount.findByPk(fundingAccountId, { transaction: t, lock: t.LOCK.UPDATE });
			if (!funding) throw notFound("Funding account not found");
			await funding.update({ balance: fromMinor(toMinor(funding.balance) + minor) }, { transaction: t });
		}
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

/**
 * Admin changes the status / notes of a transaction (e.g. "sent to bank").
 * Marking a transfer to another bank as FAILED refunds the sender (once, atomically).
 * Internal transfers and deposits cannot be failed, and a failed transaction cannot be reopened.
 */
export const updateTransaction = async (id: string, data: { status?: TransactionStatus; notes?: string }) => {
	const { tx, refunded } = await sequelize.transaction(async (t) => {
		const tx = await Transaction.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE }); // serialises double-clicks
		if (!tx) throw notFound("Transaction not found");

		let refunded = false;
		if (data.status && data.status !== tx.status) {
			if (tx.status === TransactionStatus.FAILED) throw unprocessable("A failed transaction cannot be reopened");
			if (data.status === TransactionStatus.FAILED) {
				if (tx.type === TransactionType.SEND || tx.type === TransactionType.CREDIT) {
					throw unprocessable("Only transfers to other banks can be marked as failed");
				}
				const account = (await lockAccounts([tx.senderId], t)).get(tx.senderId);
				if (!account) throw notFound("Account not found");
				await account.update({ amount: fromMinor(toMinor(account.amount) + toMinor(tx.amount)) }, { transaction: t });
				await Transaction.create(
					{
						senderId: tx.senderId, receiverId: tx.senderId, transactionId: newTransactionId(), amount: tx.amount,
						type: TransactionType.CREDIT, notes: `Refund of ${tx.transactionId}`, status: TransactionStatus.COMPLETED,
					},
					{ transaction: t }
				);
				refunded = true;
			}
		}
		await tx.update({ ...(data.status && { status: data.status }), ...(data.notes !== undefined && { notes: data.notes }) }, { transaction: t });
		return { tx, refunded };
	});

	await notifySafe(
		refunded
			? { userId: tx.senderId, title: "Transfer failed", message: `${tx.amount} was refunded to your account`, type: NotificationType.FAILED }
			: {
					userId: tx.senderId,
					title: tx.status === TransactionStatus.COMPLETED ? "Transaction Successful" : "Transfer Processing",
					message: `${tx.amount} ${tx.status === TransactionStatus.AWAITING ? "Sent to bank" : tx.status}`,
					type: NotificationType.DEBIT,
			  }
	);
	return tx;
};

const withBeneficiaries = async (txs: Transaction[]) => {
	const ids = txs.map((t) => t.beneficiaryId).filter(Boolean) as string[];
	const rows = ids.length ? await Beneficiary.findAll({ where: { id: ids } }) : [];
	const byId = new Map(rows.map((b) => [b.id, b.toJSON()]));
	return txs.map((t) => ({ ...t.toJSON(), ...(t.beneficiaryId && byId.has(t.beneficiaryId) && { beneficiary: byId.get(t.beneficiaryId) }) }));
};

export const listUserTransactions = async (userId: string, opts?: { limit?: number; offset?: number }) => {
	const limit = opts?.limit ?? 20;
	const offset = opts?.offset ?? 0;
	const txs = await Transaction.findAll({
		where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
		order: [["createdAt", "DESC"]],
		limit,
		offset,
	});
	const user = await User.findByPk(userId);
	const list = await withBeneficiaries(txs);
	// a deposit to yourself shows your own name as the beneficiary (as before)
	return list.map((t: any) => (t.beneficiary && t.beneficiaryId === t.senderId && user ? { ...t, beneficiary: { ...t.beneficiary, name: user.name } } : t));
};

/** DB-level aggregates for the stats cards (amounts in major units, counts are plain numbers). */
export const getUserTransactionAggregates = async (userId: string) => {
	const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
	const incoming = { receiverId: userId, status: TransactionStatus.COMPLETED };
	const outgoing = { senderId: userId, type: { [Op.in]: OUTGOING }, status: { [Op.ne]: TransactionStatus.FAILED } };
	const mine = { [Op.or]: [{ senderId: userId }, { receiverId: userId }] };
	const [received, sent, monthReceived, monthSent, count, pending] = await Promise.all([
		Transaction.sum("amount", { where: incoming }),
		Transaction.sum("amount", { where: outgoing }),
		Transaction.sum("amount", { where: { ...incoming, createdAt: { [Op.gte]: monthStart } } }),
		Transaction.sum("amount", { where: { ...outgoing, createdAt: { [Op.gte]: monthStart } } }),
		Transaction.count({ where: mine }),
		Transaction.count({ where: { ...mine, status: { [Op.in]: [TransactionStatus.PENDING, TransactionStatus.AWAITING, TransactionStatus.PROCESSING] } } }),
	]);
	const m = (n: number | null) => fromMinor(n ? toMinor(n) : 0);
	return {
		received: m(received), sent: m(sent), net: fromMinor((received ? toMinor(received) : 0) - (sent ? toMinor(sent) : 0)),
		monthReceived: m(monthReceived), monthSent: m(monthSent), count, pending,
	};
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
