import { FundingAccount } from "../models";
import { sequelize } from "../utils/db";
import { notFound, unprocessable } from "../utils/errors";
import { fromMinor, positiveMinor, toMinor } from "../utils/money";
import { customerFundingAccount, type BalanceChange } from '../../utils/funding-ui';

/** Admins see everything (with balances). Users only see active accounts, never balances. */
export const listFundingAccounts = async (admin: boolean) => {
	if (admin) return FundingAccount.findAll({ order: [["createdAt", "ASC"]] });
	const rows = await FundingAccount.findAll({ where: { active: true }, order: [["createdAt", "ASC"]] });
	return rows.map(r => customerFundingAccount(r.toJSON()));
};

export const createFundingAccount = (data: Record<string, unknown>) => FundingAccount.create(data as any);

export const updateFundingAccount = async (id: string, input: Record<string, any>) => {
	const { balanceChange, adjustment, balance, ...fields } = input;
	if (adjustment !== undefined) throw unprocessable('Choose credit or debit and a positive amount');
	return sequelize.transaction(async (t) => {
		const row = await FundingAccount.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
		if (!row) throw notFound("Funding account not found");
		if (fields.currency !== undefined && fields.currency.toUpperCase() !== (row.currency || '').toUpperCase() && toMinor(row.balance) !== 0) throw unprocessable('Cannot change currency while the tracked balance is non-zero. Create a separate funding account.');
		const patch: Record<string, unknown> = { ...fields };
		if (balanceChange) {
			const change = balanceChange as BalanceChange;
			if (!['credit', 'debit'].includes(change.direction)) throw unprocessable('Choose credit or debit');
			const minor = positiveMinor(change.amount);
			const next = toMinor(row.balance) + (change.direction === 'credit' ? minor : -minor);
			if (next < 0) throw unprocessable("Balance cannot go below zero");
			if (!Number.isSafeInteger(next)) throw unprocessable('Balance exceeds safe precision');
			patch.balance = fromMinor(next);
		}
		await row.update(patch, { transaction: t });
		return row;
	});
};
