'use strict';

// Additive, frozen schema. Existing balances and accounts are not rewritten.
module.exports = {
	async up(q, S) {
		await q.sequelize.transaction(async transaction => {
			const timestamps = { created_at: { type: S.DATE, allowNull: false }, updated_at: { type: S.DATE, allowNull: false } };
			const user = () => ({ type: S.UUID, allowNull: false, references: { model: 'users', key: 'id' } });
			const id = () => ({ type: S.UUID, primaryKey: true, allowNull: false });
			const tables = {
				referral_programs: { id: { type: S.STRING(20), primaryKey: true }, enabled: { type: S.BOOLEAN, allowNull: false, defaultValue: false }, reward_points: { type: S.INTEGER, allowNull: false, defaultValue: 0 }, points_per_unit: { type: S.INTEGER, allowNull: false, defaultValue: 100 }, currency: { type: S.STRING(3), allowNull: false, defaultValue: 'USD' }, version: { type: S.INTEGER, allowNull: false, defaultValue: 1 }, ...timestamps },
				referral_members: { user_id: { ...user(), primaryKey: true }, code: { type: S.STRING(16), allowNull: false }, points: { type: S.BIGINT, allowNull: false, defaultValue: 0 }, ...timestamps },
				referrals: { id: id(), referred_id: user(), referrer_id: user(), status: { type: S.STRING(20), allowNull: false, defaultValue: 'pending' }, points: { type: S.INTEGER, allowNull: false, defaultValue: 0 }, currency: S.STRING(3), deposit_id: { type: S.UUID, references: { model: 'deposit_requests', key: 'id' } }, reason: { type: S.STRING(500), allowNull: false, defaultValue: '' }, qualified_at: S.DATE, ...timestamps },
				referral_redemptions: { id: id(), user_id: user(), request_key: { type: S.UUID, allowNull: false }, points: { type: S.INTEGER, allowNull: false }, amount: { type: S.DECIMAL(20, 2), allowNull: false }, currency: { type: S.STRING(3), allowNull: false }, points_per_unit: { type: S.INTEGER, allowNull: false }, program_version: { type: S.INTEGER, allowNull: false }, transaction_id: { type: S.UUID, allowNull: false, references: { model: 'transactions', key: 'id' } }, ...timestamps },
			};
			for (const [table, fields] of Object.entries(tables)) if (!await q.tableExists(table, { transaction })) await q.createTable(table, fields, { transaction });
			// Add checks before indexes: SQLite rebuilds the table when adding a constraint.
			for (const [table, fields, name, where] of [
				['referral_programs', ['reward_points', 'points_per_unit', 'version'], 'referral_program_values_check', { reward_points: { [S.Op.between]: [0, 1000000] }, points_per_unit: { [S.Op.between]: [1, 1000000] }, version: { [S.Op.gt]: 0 }, [S.Op.or]: [{ enabled: false }, { reward_points: { [S.Op.gt]: 0 } }] }],
				['referral_members', ['points'], 'referral_member_points_check', { points: { [S.Op.between]: [0, 1000000000000] } }],
				['referrals', ['status', 'points'], 'referral_status_points_check', { status: { [S.Op.in]: ['pending', 'awarded', 'ineligible'] }, points: { [S.Op.between]: [0, 1000000] } }],
				['referrals', ['referrer_id', 'referred_id'], 'referral_not_self_check', S.where(S.col('referrer_id'), S.Op.ne, S.col('referred_id'))],
				['referral_redemptions', ['points', 'amount', 'points_per_unit', 'program_version'], 'referral_redemption_values_check', { points: { [S.Op.between]: [1, 1000000000] }, amount: { [S.Op.gt]: 0 }, points_per_unit: { [S.Op.between]: [1, 1000000] }, program_version: { [S.Op.gt]: 0 } }],
			]) {
				const checks = await q.showConstraint(table, undefined, { transaction });
				if (!checks.some(check => check.constraintName === name)) await q.addConstraint(table, { fields, type: 'check', name, where, transaction });
			}
			for (const [table, fields, unique, name] of [
				['referral_members', ['code'], true, 'referral_members_code_unique'],
				['referrals', ['referred_id'], true, 'referrals_referred_unique'],
				['referrals', ['deposit_id'], true, 'referrals_deposit_unique'],
				['referrals', ['referrer_id', 'created_at'], false, 'referrals_referrer_created'],
				['referrals', ['status', 'created_at'], false, 'referrals_status_created'],
				['referral_redemptions', ['user_id', 'request_key'], true, 'referral_redemptions_key_unique'],
				['referral_redemptions', ['transaction_id'], true, 'referral_redemptions_transaction_unique'],
				['referral_redemptions', ['user_id', 'created_at'], false, 'referral_redemptions_user_created'],
			]) {
				const indexes = await q.showIndex(table, { transaction });
				if (!indexes.some(index => Boolean(index.unique) === unique && index.fields.map(field => field.attribute).join(',') === fields.join(','))) await q.addIndex(table, fields, { name, unique, transaction });
			}
			const [rows] = await q.sequelize.query("SELECT id FROM referral_programs WHERE id = 'default'", { transaction });
			if (!rows.length) await q.bulkInsert('referral_programs', [{ id: 'default', enabled: false, reward_points: 0, points_per_unit: 100, currency: 'USD', version: 1, created_at: new Date(), updated_at: new Date() }], { transaction });
		});
	},
	async down() { throw new Error('Forward-only financial records: disable referrals and use a reviewed forward migration.'); },
};
