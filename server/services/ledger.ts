/**
 * Everything that moves money lives here.
 * Rules: integer minor units, one DB transaction per operation, account rows locked
 * FOR UPDATE in a stable order (no deadlocks, no double spend), ledger row written
 * in the same transaction as the balance change.
 */
import crypto from "node:crypto";
import { Op, Transaction as DbTx } from "sequelize";
import {
	Account, AccountLevel, AccountStatus, Beneficiary, Currency, DepositRequest, FundingAccount, NotificationType, Transaction, TransactionStatus, TransactionType, User,
} from "../models";
import { sequelize } from "../utils/db";
import { badRequest, conflict, forbidden, notFound, unprocessable } from "../utils/errors";
import { fromMinor, positiveMinor, toMinor } from "../utils/money";
import { checkAllCodes, codeRequirement, type Codes } from "./codes";
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

/** A deposit association tracks the same denomination, never an implicit FX conversion. */
const creditFundingAccount = async (id: string, account: Account, minor: number, t: DbTx) => {
	const funding = await FundingAccount.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
	if (!funding) throw notFound('Funding account not found');
	const currency = /^[a-z]{3,10}$/i.test(account.currencyId || '') ? account.currencyId : (await Currency.findByPk(account.currencyId, { transaction: t }))?.get('code');
	if (!currency || !funding.currency || String(currency).toUpperCase() !== funding.currency.toUpperCase()) throw unprocessable('Funding and customer currencies must match; no conversion is performed');
	const next = toMinor(funding.balance) + minor;
	if (!Number.isSafeInteger(next)) throw unprocessable('Funding balance exceeds safe precision');
	await funding.update({ balance: fromMinor(next) }, { transaction: t });
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
	/** required unless the sender's policy says otherwise (off, or remembered) */
	codes?: Codes;
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
	// before any money moves: the codes, unless this sender is not asked for them (off, or remembered)
	const requirement = await codeRequirement(sender);
	if (requirement.required) {
		if (!input.codes) throw unprocessable("Transfer verification codes are required");
		checkAllCodes(sender, input.codes);
		// passing once is what "remember" remembers, even if the transfer itself is refused for another reason
		if (requirement.policy === "remember") await sender.update({ codesVerifiedAt: new Date() });
	}

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
		await notifySafe({ userId: input.senderId, title: "Transfer Processing", message: `${fromMinor(minor)} processing`, type: NotificationType.DEBIT, entityType: "transaction", entityId: tx.id });
		if (receiverId) {
			await notifySafe({ userId: receiverId, title: "Credit alert", message: `Received ${fromMinor(minor)} from ${sender.name}`, type: NotificationType.CREDIT, entityType: "transaction", entityId: tx.id });
		}
		return { ...tx.toJSON(), beneficiary: beneficiary.toJSON() };
	} catch (error: any) {
		// A refused transfer is recorded (no money moved) and the sender is told why.
		if ([403, 404, 422].includes(error?.statusCode)) {
			try {
				const failed = await Transaction.create({
					senderId: input.senderId, receiverId: receiverId ?? null, transactionId: newTransactionId(),
					amount: fromMinor(minor), type: input.type, notes: input.notes, status: TransactionStatus.FAILED,
				});
				await notifySafe({ userId: input.senderId, title: "Transaction error", message: error.message, type: NotificationType.FAILED, entityType: "transaction", entityId: failed.id });
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
		const next = toMinor(account.amount) + minor;
		if (!Number.isSafeInteger(next)) throw unprocessable('Balance exceeds safe precision');
		const { max } = await limitsFor(account, t);
		if (max > 0 && next > max) {
			throw unprocessable(`Exceeds the account's maximum balance of ${fromMinor(max)}`);
		}

		await account.update({ amount: fromMinor(next) }, { transaction: t });
		if (fundingAccountId) {
			await creditFundingAccount(fundingAccountId, account, minor, t);
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

/** A request decision and all credited balances/ledger links commit as a single operation. */
export const decideDepositRequest = async (id: string, reviewerId: string, input: { action: 'approve' | 'reject'; note: string }) => {
	const result = await sequelize.transaction(async t => {
		const request = await DepositRequest.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
		if (!request) throw notFound('Deposit request not found');
		const status = input.action === 'approve' ? 'approved' : 'rejected';
		if (request.status === status) return { request, changed: false };
		if (request.status !== 'pending') throw conflict('This deposit request has already been decided');
		const [claimed] = await DepositRequest.update({ status, decisionNote: input.note, reviewedBy: reviewerId, reviewedAt: new Date() }, { where: { id, status: 'pending' }, transaction: t });
		if (claimed !== 1) throw conflict('This request was decided by another administrator. Refresh its status.');
		if (input.action === 'approve') {
			const minor = positiveMinor(request.amount);
			const account = (await lockAccounts([request.userId], t)).get(request.userId);
			if (!account || account.status === AccountStatus.CLOSED) throw unprocessable('Customer account is unavailable');
			const funding = await FundingAccount.findByPk(request.fundingAccountId, { transaction: t, lock: t.LOCK.UPDATE });
			if (!funding || funding.currency?.toUpperCase() !== request.currency) throw unprocessable('Funding currency changed. Do not approve this request.');
			const next = toMinor(account.amount) + minor;
			if (!Number.isSafeInteger(next)) throw unprocessable('Balance exceeds safe precision');
			const { max } = await limitsFor(account, t);
			if (max > 0 && next > max) throw unprocessable(`Exceeds the account's maximum balance of ${fromMinor(max)}`);
			await creditFundingAccount(request.fundingAccountId, account, minor, t);
			await account.update({ amount: fromMinor(next) }, { transaction: t });
			const tx = await Transaction.create({ senderId: request.userId, receiverId: request.userId, transactionId: newTransactionId(), amount: fromMinor(minor), type: TransactionType.CREDIT, status: TransactionStatus.COMPLETED, notes: `Deposit request ${request.id}${request.reference ? ` (${request.reference})` : ''}: ${input.note}` }, { transaction: t });
			await request.update({ transactionId: tx.id }, { transaction: t });
		}
		await request.reload({ transaction: t });
		return { request, changed: true };
	});
	if (result.changed) await notifySafe({ userId: result.request.userId, title: input.action === 'approve' ? 'Deposit approved' : 'Deposit request rejected', message: input.action === 'approve' ? `${result.request.amount} ${result.request.currency} credited after verification. ${input.note}` : input.note, type: input.action === 'approve' ? NotificationType.CREDIT : NotificationType.INFO, ...(result.request.transactionId ? { entityType: 'transaction', entityId: result.request.transactionId } : { entityType: 'deposit', entityId: result.request.id }) });
	return result.request;
};

/** Explicit administrative correction. Positive amount + direction; every change gets a ledger row. */
export const adjustAccountBalance = async (input: { email: string; direction: 'credit' | 'debit'; amount: number; reason: string; fundingAccountId?: string }) => {
	if (!['credit', 'debit'].includes(input.direction)) throw unprocessable('Choose credit or debit');
	if (!input.reason?.trim() || input.reason.trim().length < 3) throw unprocessable('A reason is required');
	if (input.direction === 'debit' && input.fundingAccountId) throw unprocessable('Funding association is only available for credits');
	const minor = positiveMinor(input.amount);
	const user = await getUserByEmail(input.email);
	const { account, tx } = await sequelize.transaction(async t => {
		const account = (await lockAccounts([user.id], t)).get(user.id);
		if (!account) throw notFound('Account not found');
		if (account.status === AccountStatus.CLOSED) throw unprocessable('Account is closed');
		const current = toMinor(account.amount);
		const next = current + (input.direction === 'credit' ? minor : -minor);
		if (next < 0) throw unprocessable('Insufficient customer balance');
		if (!Number.isSafeInteger(next)) throw unprocessable('Balance exceeds safe precision');
		if (input.direction === 'credit') {
			const { max } = await limitsFor(account, t);
			if (max > 0 && next > max) throw unprocessable(`Exceeds the account's maximum balance of ${fromMinor(max)}`);
		}
		if (input.fundingAccountId) {
			await creditFundingAccount(input.fundingAccountId, account, minor, t);
		}
		await account.update({ amount: fromMinor(next) }, { transaction: t });
		const tx = await Transaction.create({
			senderId: user.id, receiverId: input.direction === 'credit' ? user.id : null,
			transactionId: newTransactionId(), amount: fromMinor(minor), status: TransactionStatus.COMPLETED,
			type: input.direction === 'credit' ? TransactionType.CREDIT : TransactionType.WITHDRAWAL,
			notes: `Administrative ${input.direction}: ${input.reason.trim()}`,
		}, { transaction: t });
		return { account, tx };
	});
	await notifySafe({ userId: user.id, title: input.direction === 'credit' ? 'Account credited' : 'Account debited', message: `${fromMinor(minor)} ${input.direction} recorded. ${input.reason.trim()}`, type: input.direction === 'credit' ? NotificationType.CREDIT : NotificationType.DEBIT, entityType: 'transaction', entityId: tx.id });
	return account;
};

/**
 * Admin changes the status / notes of a transaction (e.g. "sent to bank").
 * Marking a transfer to another bank as FAILED refunds the sender (once, atomically).
 * Internal transfers and deposits cannot be failed, and a failed transaction cannot be reopened.
 */
export const updateTransaction = async (id: string, data: { status?: TransactionStatus; notes?: string; reversalReason?: string }) => {
	const { tx, refunded } = await sequelize.transaction(async (t) => {
		const tx = await Transaction.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE }); // serialises double-clicks
		if (!tx) throw notFound("Transaction not found");
		if (data.reversalReason && [TransactionType.SEND, TransactionType.CREDIT].includes(tx.type)) throw unprocessable('Only outgoing debits can be reversed');

		let refunded = false;
		if (data.status && data.status !== tx.status) {
			if (tx.status === TransactionStatus.FAILED) throw unprocessable("A failed transaction cannot be reopened");
			if (data.status === TransactionStatus.FAILED) {
				if (tx.type === TransactionType.SEND || tx.type === TransactionType.CREDIT) {
					throw unprocessable("Only transfers to other banks can be marked as failed");
				}
				const account = (await lockAccounts([tx.senderId], t)).get(tx.senderId);
				if (!account) throw notFound("Account not found");
				const next = toMinor(account.amount) + toMinor(tx.amount);
				if (!Number.isSafeInteger(next)) throw unprocessable('Refund exceeds safe balance precision');
				await account.update({ amount: fromMinor(next) }, { transaction: t });
				await Transaction.create(
					{
						senderId: tx.senderId, receiverId: tx.senderId, transactionId: newTransactionId(), amount: tx.amount,
						type: TransactionType.CREDIT, notes: `Refund of ${tx.transactionId}${data.reversalReason ? `: ${data.reversalReason}` : ''}`, status: TransactionStatus.COMPLETED,
					},
					{ transaction: t }
				);
				refunded = true;
			}
		}
		const notes = refunded && data.reversalReason ? `${tx.notes || ''}\nReversal reason: ${data.reversalReason}`.trim() : data.notes;
		await tx.update({ ...(data.status && { status: data.status }), ...(notes !== undefined && { notes }) }, { transaction: t });
		return { tx, refunded };
	});
	// A retried explicit reversal is a no-op, including its notifications.
	if (data.reversalReason && !refunded) return tx;

	await notifySafe(
		refunded
			? { userId: tx.senderId, title: "Transfer failed", message: `${tx.amount} was refunded to your account`, type: NotificationType.FAILED, entityType: "transaction", entityId: tx.id }
			: {
					userId: tx.senderId,
					title: tx.status === TransactionStatus.COMPLETED ? "Transaction Successful" : "Transfer Processing",
					message: `${tx.amount} ${tx.status === TransactionStatus.AWAITING ? "Sent to bank" : tx.status}`,
					type: NotificationType.DEBIT,
					entityType: "transaction",
					entityId: tx.id,
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

/** One transaction for its sender / receiver (or an admin). Others get "not found". */
export const getTransactionDetail = async (id: string, userId: string, admin: boolean) => {
	const tx = await Transaction.findByPk(id);
	if (!tx || (!admin && tx.senderId !== userId && tx.receiverId !== userId)) throw notFound("Transaction not found");
	const [full] = await withBeneficiaries([tx]);
	const people = await User.findAll({ where: { id: [tx.senderId, tx.receiverId].filter(Boolean) as string[] } });
	const name = (uid: string | null) => people.find((u) => u.id === uid)?.name ?? null;
	return { ...full, senderName: name(tx.senderId), receiverName: name(tx.receiverId) };
};
