import crypto from "node:crypto";
import { Transaction as DbTx } from "sequelize";
import { Account, AccountStatus } from "../models";
import { notFound } from "../utils/errors";

/** 10-digit account number, retried until unused. */
export const createAccount = async (userId: string, currencyId: string, t?: DbTx) => {
	for (let attempt = 0; attempt < 10; attempt++) {
		const accountNumber = crypto.randomInt(1_000_000_000, 10_000_000_000);
		if (await Account.findOne({ where: { accountNumber }, transaction: t })) continue;
		return Account.create(
			{ userId, currencyId, amount: 0, accountNumber, accountLevel: 1, status: AccountStatus.ACTIVE },
			{ transaction: t }
		);
	}
	throw new Error("Unable to generate an account number");
};

export const getAccountByUser = async (userId: string) => {
	const account = await Account.findOne({ where: { userId } });
	if (!account) throw notFound("Account not found");
	return account;
};

/** Admin changes to account metadata. The balance can only change through the ledger service. */
export const updateAccountSettings = async (input: {
	id?: string;
	userId: string;
	currencyId?: string;
	accountLevel?: number;
	status?: AccountStatus;
}) => {
	const account = input.id ? await Account.findByPk(input.id) : await Account.findOne({ where: { userId: input.userId } });
	if (!account || account.userId !== input.userId) throw notFound("Account not found");
	const { currencyId, accountLevel, status } = input;
	await account.update(
		Object.fromEntries(Object.entries({ currencyId, accountLevel, status }).filter(([, v]) => v !== undefined))
	);
	return account;
};
