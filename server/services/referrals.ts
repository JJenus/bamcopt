import crypto from 'node:crypto';
import { Op, Transaction as DbTx } from 'sequelize';
import { Account, AuditLog, DepositRequest, Referral, ReferralMember, ReferralProgram, ReferralRedemption, User } from '../models';
import { sequelize } from '../utils/db';
import { conflict, forbidden, notFound, unprocessable } from '../utils/errors';

type Actor = { userId: string; ip?: string; device?: string };
export const ensureReferralProgram = async () => (await ReferralProgram.findOrCreate({ where: { id: 'default' }, defaults: { enabled: false, rewardPoints: 0, pointsPerUnit: 100, currency: 'USD', version: 1 } }))[0];

export const ensureReferralMember = async (userId: string) => {
	const user = await User.findByPk(userId);
	if (!user || user.userType !== 'user' || !await Account.findOne({ where: { userId } })) throw forbidden('A customer account is required');
	return (await ReferralMember.findOrCreate({ where: { userId }, defaults: { code: crypto.randomBytes(8).toString('hex').toUpperCase(), points: 0 } }))[0];
};

/** Signup only. Unique referred_id prevents reassignment and duplicate attribution. */
export const attachReferral = async (user: User, code: string | undefined, t: DbTx) => {
	if (!code) return;
	const member = await ReferralMember.findOne({ where: { code }, transaction: t });
	const referrer = member && await User.findByPk(member.userId, { transaction: t });
	const account = referrer && await Account.findOne({ where: { userId: referrer.id, status: 'active' }, transaction: t });
	if (!member || !referrer || !account || referrer.userType !== 'user' || referrer.status.toUpperCase() !== 'ACTIVE') throw unprocessable('This referral code is unavailable');
	if (referrer.id === user.id || referrer.email.toLowerCase() === user.email.toLowerCase()) throw unprocessable('You cannot refer yourself');
	await Referral.create({ referredId: user.id, referrerId: referrer.id }, { transaction: t });
};

/** Called INSIDE deposit approval. Points and qualification commit or roll back with the deposit. */
export const awardDepositReferral = async (deposit: DepositRequest, t: DbTx) => {
	// Account/deposit locks in the caller serialize first-deposit checks for this customer.
	const referral = await Referral.findOne({ where: { referredId: deposit.userId }, transaction: t, lock: t.LOCK.UPDATE });
	if (!referral || referral.status !== 'pending') return;
	const program = await ReferralProgram.findByPk('default', { transaction: t, lock: t.LOCK.UPDATE });
	if (!program) throw new Error('Referral program has not been initialized');
	const prior = await DepositRequest.count({ where: { userId: deposit.userId, status: 'approved', id: { [Op.ne]: deposit.id } }, transaction: t });
	const referrer = await User.findByPk(referral.referrerId, { transaction: t });
	let reason = prior ? 'A deposit was already approved' : !program.enabled ? 'Rewards were disabled at first approved deposit' : !referrer || referrer.userType !== 'user' || referrer.status.toUpperCase() !== 'ACTIVE' ? 'Referrer is not eligible' : '';
	if (referral.referrerId === referral.referredId) reason = 'Self-referral is not eligible';
	if (reason) { await referral.update({ status: 'ineligible', depositId: deposit.id, reason, qualifiedAt: new Date() }, { transaction: t }); return; }
	const wallet = await ReferralMember.findByPk(referral.referrerId, { transaction: t, lock: t.LOCK.UPDATE });
	if (!wallet) throw new Error('Referral wallet is missing');
	const next = wallet.points + program.rewardPoints;
	if (!Number.isSafeInteger(next) || next > 1_000_000_000_000) throw unprocessable('Referral points exceed safe limits');
	await wallet.update({ points: next }, { transaction: t });
	await referral.update({ status: 'awarded', points: program.rewardPoints, currency: program.currency, depositId: deposit.id, qualifiedAt: new Date(), reason: 'First approved deposit' }, { transaction: t });
};

export const updateReferralProgram = async (input: { enabled: boolean; rewardPoints: number; pointsPerUnit: number; currency: string }, actor: Actor) => {
	await ensureReferralProgram();
	return sequelize.transaction(async t => {
		const program = (await ReferralProgram.findByPk('default', { transaction: t, lock: t.LOCK.UPDATE }))!;
		if (input.currency !== program.currency && await Referral.count({ where: { status: 'awarded' }, transaction: t })) throw conflict('Reward currency cannot change after points have been awarded');
		const before = program.toJSON();
		await program.update({ ...input, version: program.version + 1 }, { transaction: t });
		await AuditLog.create({ actorId: actor.userId, action: 'referrals.program.update', targetType: 'referral-program', targetId: 'default', summary: 'Updated referral reward rules', meta: { before, after: program.toJSON() }, ip: actor.ip, deviceInfo: actor.device }, { transaction: t });
		return program;
	});
};

export const rejectReferral = async (id: string, reason: string, actor: Actor) => sequelize.transaction(async t => {
	const row = await Referral.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
	if (!row) throw notFound('Referral not found');
	if (row.status !== 'pending') throw conflict('Only pending referrals can be rejected');
	await row.update({ status: 'ineligible', reason }, { transaction: t });
	await AuditLog.create({ actorId: actor.userId, action: 'referrals.reject', targetType: 'referral', targetId: row.id, summary: reason, ip: actor.ip, deviceInfo: actor.device }, { transaction: t });
	return row;
});

export const referralDashboard = async (userId: string, query: { limit: number; offset: number }, admin = false) => {
	const program = await ensureReferralProgram();
	const member = admin ? null : await ensureReferralMember(userId);
	const [referrals, redemptions] = await Promise.all([
		Referral.findAndCountAll({ where: admin ? {} : { referrerId: userId }, order: [['createdAt', 'DESC'], ['id', 'DESC']], ...query }),
		ReferralRedemption.findAndCountAll({ where: admin ? {} : { userId }, order: [['createdAt', 'DESC'], ['id', 'DESC']], ...query }),
	]);
	const ids = [...new Set([...referrals.rows.flatMap(row => [row.referredId, row.referrerId]), ...redemptions.rows.map(row => row.userId)])];
	const users = ids.length ? await User.findAll({ where: { id: ids }, attributes: ['id', 'name', ...(admin ? ['email'] : [])] }) : [];
	const person = (id: string) => users.find(user => user.id === id);
	return {
		code: member?.code, points: member?.points, program: program.toJSON(),
		referrals: { total: referrals.count, items: referrals.rows.map(row => admin ? { ...row.toJSON(), referred: person(row.referredId)?.toJSON(), referrer: person(row.referrerId)?.toJSON() } : { id: row.id, name: person(row.referredId)?.name || 'Former customer', status: row.status, points: row.points, createdAt: row.get('createdAt'), qualifiedAt: row.get('qualifiedAt') }) },
		redemptions: { total: redemptions.count, items: redemptions.rows.map(row => { const { requestKey, ...data } = row.toJSON(); return { ...data, ...(admin ? { customer: person(row.userId)?.toJSON() } : {}) }; }) },
	};
};
