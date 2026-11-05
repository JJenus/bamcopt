'use strict';

// Frozen migration: do not import live application models here.
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async transaction => {
			const columns = await queryInterface.describeTable('notifications', { transaction });
			for (const column of ['entity_type', 'entity_id']) {
				if (!columns[column]) await queryInterface.addColumn('notifications', column, { type: Sequelize.STRING(255), allowNull: true }, { transaction });
			}
			const indexes = await queryInterface.showIndex('notifications', { transaction });
			const fields = ['user_id', 'status', 'created_at'];
			if (!indexes.some(index => index.fields.map(field => field.attribute).join(',') === fields.join(','))) {
				await queryInterface.addIndex('notifications', fields, { name: 'notifications_user_status_created_idx', transaction });
			}
		});
	},
	async down() {
		throw new Error('Forward-only migration: notification links may predate this migration or contain live data. Use a reviewed forward migration instead.');
	},
};
