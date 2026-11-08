'use strict';

// Frozen schema, independent of server/models. Adopts a table created by sync safely.
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async transaction => {
			if (!await queryInterface.tableExists('audit_logs', { transaction })) {
				await queryInterface.createTable('audit_logs', {
					id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
					actor_id: { type: Sequelize.STRING(255), allowNull: false },
					action: { type: Sequelize.STRING(255), allowNull: false },
					target_type: { type: Sequelize.STRING(255), allowNull: true },
					target_id: { type: Sequelize.STRING(255), allowNull: true },
					summary: { type: Sequelize.STRING(500), allowNull: false, defaultValue: '' },
					meta: { type: Sequelize.JSON, allowNull: true },
					ip: { type: Sequelize.STRING(255), allowNull: true },
					device_info: { type: Sequelize.STRING(255), allowNull: true },
					created_at: { type: Sequelize.DATE, allowNull: false },
					updated_at: { type: Sequelize.DATE, allowNull: false },
				}, { transaction });
			}
			const indexes = await queryInterface.showIndex('audit_logs', { transaction });
			const fields = ['actor_id', 'created_at'];
			if (!indexes.some(index => index.fields.map(field => field.attribute).join(',') === fields.join(','))) {
				await queryInterface.addIndex('audit_logs', fields, { name: 'audit_logs_actor_created_idx', transaction });
			}
		});
	},
	async down() {
		throw new Error('Forward-only migration: the audit trail is a record and must not be dropped by a rollback.');
	},
};
