import { Op, UniqueConstraintError } from 'sequelize';
import { Account, AccountStatus, Currency, DepositRequest, FundingAccount, NotificationType, User } from '../models';
import { sequelize } from '../utils/db';
import { conflict, notFound, unprocessable } from '../utils/errors';
import { fromMinor, positiveMinor } from '../utils/money';
import { customerFundingAccount } from '../../utils/funding-ui';
import { notifySafe } from './notifications';

const customerRow = (row: DepositRequest, admin: boolean) => {
	const { reviewedBy, requestKey, ...rest } = row.toJSON();
	return admin ? { ...rest, reviewedBy } : rest;
};
export const getDepositRequest = async (id: string, userId: string, admin: boolean) => {
	const row = await DepositRequest.findByPk(id);
	if (!row || (!admin && row.userId !== userId)) throw notFound('Deposit request not found');
	return customerRow(row, admin);
};
export const listDepositRequests = async (userId: string, admin: boolean, query: { status?: string; limit: number; offset: number }) => {
	const where = { ...(!admin ? { userId } : {}), ...(query.status ? { status: query.status } : {}) };
	const { rows, count } = await DepositRequest.findAndCountAll({ where, order: [['createdAt', 'DESC'], ['id', 'DESC']], limit: query.limit, offset: query.offset });
	const people = admin && rows.length ? await User.findAll({ where: { id: { [Op.in]: rows.map(row => row.userId) } }, attributes: ['id', 'name', 'email'] }) : [];
	return { items: rows.map(row => { const person = people.find(user => user.id === row.userId); return { ...customerRow(row, admin), ...(person ? { customerName: person.name, customerEmail: person.email } : {}) }; }), total: count };
};
export const submitDepositRequest = async (userId: string, input: { fundingAccountId: string; requestKey: string; amount: number; reference: string }) => {
	const amount = fromMinor(positiveMinor(input.amount));
	const existing = async () => {
		const row = await DepositRequest.findOne({ where: { userId, requestKey: input.requestKey } });
		if (row && (row.fundingAccountId !== input.fundingAccountId || row.amount !== amount || row.reference !== input.reference)) throw conflict('This submission key already belongs to a different request. Check your request history.');
		return row;
	};
	const saved = await existing();
	if (saved) return customerRow(saved, false);
	try {
		const row = await sequelize.transaction(async t => {
			const account = await Account.findOne({ where: { userId }, transaction: t, lock: t.LOCK.UPDATE });
			if (!account || account.status === AccountStatus.CLOSED) throw unprocessable('A customer account is required');
			const funding = await FundingAccount.findByPk(input.fundingAccountId, { transaction: t, lock: t.LOCK.UPDATE });
			if (!funding?.active) throw unprocessable('Choose a published funding account');
			const currency = /^[a-z]{3,10}$/i.test(account.currencyId || '') ? account.currencyId : (await Currency.findByPk(account.currencyId, { transaction: t }))?.get('code');
			if (!currency || !funding.currency || String(currency).toUpperCase() !== funding.currency.toUpperCase()) throw unprocessable('Funding and customer currencies must match');
			return DepositRequest.create({ userId, fundingAccountId: funding.id, requestKey: input.requestKey, amount, currency: funding.currency.toUpperCase(), fundingSnapshot: customerFundingAccount(funding.toJSON()), reference: input.reference, status: 'pending' }, { transaction: t });
		});
		try {
			const admins = await User.findAll({ where: { userType: 'admin' }, attributes: ['id'] });
			await Promise.all(admins.map(admin => notifySafe({ userId: admin.id, title: 'Deposit verification requested', message: `${row.amount} ${row.currency} submitted for verification. Request ${row.id}. No balance has been credited.`, type: NotificationType.INFO, entityType: 'deposit', entityId: row.id })));
		} catch { /* The request is durable even if a best-effort notification cannot be delivered. */ }
		return customerRow(row, false);
	} catch (error) {
		if (error instanceof UniqueConstraintError) { const row = await existing(); if (row) return customerRow(row, false); }
		throw error;
	}
};
