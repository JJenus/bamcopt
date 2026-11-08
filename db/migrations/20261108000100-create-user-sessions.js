'use strict';

// Frozen schema, independent of server/models. Adopts a table created by sync safely.
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async transaction => {
			if (!await queryInterface.tableExists('user_sessions', { transaction })) {
				await queryInterface.createTable('user_sessions', {
					id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
					user_id: { type: Sequelize.STRING(255), allowNull: false },
					user_agent: { type: Sequelize.STRING(255), allowNull: true },
					ip: { type: Sequelize.STRING(255), allowNull: true },
					last_seen_at: { type: Sequelize.DATE, allowNull: false },
					expires_at: { type: Sequelize.DATE, allowNull: false },
					revoked_at: { type: Sequelize.DATE, allowNull: true },
					revoked_by: { type: Sequelize.STRING(255), allowNull: true },
					revoke_reason: { type: Sequelize.STRING(255), allowNull: true },
					created_at: { type: Sequelize.DATE, allowNull: false },
					updated_at: { type: Sequelize.DATE, allowNull: false },
				}, { transaction });
			}
			const indexes = await queryInterface.showIndex('user_sessions', { transaction });
			const fields = ['user_id', 'created_at'];
			if (!indexes.some(index => index.fields.map(field => field.attribute).join(',') === fields.join(','))) {
				await queryInterface.addIndex('user_sessions', fields, { name: 'user_sessions_user_created_idx', transaction });
			}
		});
	},
	async down() {
		throw new Error('Forward-only migration: session rows are the record of who was signed in.');
	},
};
