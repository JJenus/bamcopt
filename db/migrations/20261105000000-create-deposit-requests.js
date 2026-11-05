'use strict';

// Frozen schema, independent of server/models. Adopts tables created by sync/manual SQL safely.
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async transaction => {
			if (!await queryInterface.tableExists('deposit_requests', { transaction })) {
				const reference = table => ({ type: Sequelize.UUID, references: { model: table, key: 'id' }, onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
				await queryInterface.createTable('deposit_requests', {
					id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
					user_id: { ...reference('users'), allowNull: false },
					funding_account_id: { ...reference('funding_accounts'), allowNull: false },
					request_key: { type: Sequelize.UUID, allowNull: false },
					amount: { type: Sequelize.DECIMAL(20, 2), allowNull: false },
					currency: { type: Sequelize.STRING(10), allowNull: false },
					funding_snapshot: { type: Sequelize.JSON, allowNull: false },
					reference: { type: Sequelize.STRING(200), allowNull: false, defaultValue: '' },
					status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'pending' },
					decision_note: { type: Sequelize.TEXT, allowNull: true },
					reviewed_by: { ...reference('users'), allowNull: true },
					reviewed_at: { type: Sequelize.DATE, allowNull: true },
					transaction_id: { ...reference('transactions'), allowNull: true },
					created_at: { type: Sequelize.DATE, allowNull: false },
					updated_at: { type: Sequelize.DATE, allowNull: false },
				}, { transaction });
			}

			const constraints = await queryInterface.showConstraint('deposit_requests', undefined, { transaction });
			if (!constraints.some(item => item.constraintName === 'deposit_requests_amount_check')) {
				await queryInterface.addConstraint('deposit_requests', { fields: ['amount'], type: 'check', name: 'deposit_requests_amount_check', where: { amount: { [Sequelize.Op.gt]: 0 } }, transaction });
			}
			if (!constraints.some(item => item.constraintName === 'deposit_requests_status_check')) {
				await queryInterface.addConstraint('deposit_requests', { fields: ['status'], type: 'check', name: 'deposit_requests_status_check', where: { status: { [Sequelize.Op.in]: ['pending', 'approved', 'rejected'] } }, transaction });
			}

			// SQLite rebuilds tables when adding checks; ensure indexes after those operations.
			const indexes = await queryInterface.showIndex('deposit_requests', { transaction });
			for (const [name, fields, unique] of [
				['deposit_requests_user_key_idx', ['user_id', 'request_key'], true],
				['deposit_requests_transaction_idx', ['transaction_id'], true],
				['deposit_requests_user_created_idx', ['user_id', 'created_at'], false],
				['deposit_requests_status_created_idx', ['status', 'created_at'], false],
			]) {
				if (!indexes.some(index => Boolean(index.unique) === unique && index.fields.map(field => field.attribute).join(',') === fields.join(','))) {
					await queryInterface.addIndex('deposit_requests', fields, { name, unique, transaction });
				}
			}
		});
	},
	async down() {
		throw new Error('Forward-only financial migration: do not drop deposit requests or their ledger links. Disable the feature and use a reviewed forward migration.');
	},
};
