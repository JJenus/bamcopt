import { FundingAccount } from "../models";
import { sequelize } from "../utils/db";
import { notFound, unprocessable } from "../utils/errors";
import { fromMinor, toMinor } from "../utils/money";

/** Admins see everything (with balances). Users only see active accounts, never balances. */
export const listFundingAccounts = async (admin: boolean) => {
	if (admin) return FundingAccount.findAll({ order: [["createdAt", "ASC"]] });
	const rows = await FundingAccount.findAll({ where: { active: true }, order: [["createdAt", "ASC"]] });
	return rows.map((r) => {
		const { balance, active, ...rest } = r.toJSON() as any;
		return rest;
	});
};

export const createFundingAccount = (data: Record<string, unknown>) => FundingAccount.create(data as any);

export const updateFundingAccount = async (id: string, input: Record<string, any>) => {
	const { adjustment, ...fields } = input;
	return sequelize.transaction(async (t) => {
		const row = await FundingAccount.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
		if (!row) throw notFound("Funding account not found");
		const patch: Record<string, unknown> = { ...fields };
		if (adjustment) {
			const next = toMinor(row.balance) + toMinor(adjustment);
			if (next < 0) throw unprocessable("Balance cannot go below zero");
			patch.balance = fromMinor(next);
		}
		await row.update(patch, { transaction: t });
		return row;
	});
};
