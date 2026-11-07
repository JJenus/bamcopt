'use strict';

// Frozen migration: do not import live application models here.
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async transaction => {
			// a database that has never had the table gets it (with this column) from the app's first DB_SYNC start
			const columns = await queryInterface.describeTable('security_logs', { transaction }).catch(() => null);
			if (!columns) return;
			if (!columns.location) await queryInterface.addColumn('security_logs', 'location', { type: Sequelize.STRING(255), allowNull: true }, { transaction });
			const indexes = await queryInterface.showIndex('security_logs', { transaction });
			const fields = ['user_id', 'action', 'created_at'];
			if (!indexes.some(index => index.fields.map(field => field.attribute).join(',') === fields.join(','))) {
				await queryInterface.addIndex('security_logs', fields, { name: 'security_logs_user_action_created_idx', transaction });
			}
		});
	},
	async down() {
		throw new Error('Forward-only migration: sign-in history may contain live data. Use a reviewed forward migration instead.');
	},
};
