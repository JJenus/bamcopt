'use strict';

module.exports = {
	async up(q, S) {
		await q.sequelize.transaction(async transaction => {
			const columns = await q.describeTable('referral_programs', { transaction });
			if (!columns.min_withdrawal_points) await q.addColumn('referral_programs', 'min_withdrawal_points', { type: S.INTEGER, allowNull: false, defaultValue: 1 }, { transaction });
			if (!columns.min_withdrawal_amount) await q.addColumn('referral_programs', 'min_withdrawal_amount', { type: S.DECIMAL(20, 2), allowNull: false, defaultValue: 0.01 }, { transaction });
			const constraints = await q.showConstraint('referral_programs', undefined, { transaction });
			if (!constraints.some(row => row.constraintName === 'referral_withdrawal_minimums_check')) await q.addConstraint('referral_programs', {
				fields: ['min_withdrawal_points', 'min_withdrawal_amount'], type: 'check', name: 'referral_withdrawal_minimums_check',
				where: { min_withdrawal_points: { [S.Op.between]: [1, 1000000000] }, min_withdrawal_amount: { [S.Op.between]: [0.01, 1000000000] } }, transaction,
			});
		});
	},
	async down() { throw new Error('Forward-only reward policy: retain withdrawal minimums and use a reviewed forward migration.'); },
};
