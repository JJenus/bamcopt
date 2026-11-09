'use strict';

// Frozen migration: do not import live application models here.
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async transaction => {
			const add = async (table, column, definition) => {
				const columns = await queryInterface.describeTable(table, { transaction }).catch(() => null);
				// a database that never had the table gets it, with these columns, from the app's first DB_SYNC start
				if (columns && !columns[column]) await queryInterface.addColumn(table, column, definition, { transaction });
			};
			await add('users', 'transfer_codes_policy', { type: Sequelize.STRING(255), allowNull: false, defaultValue: 'default' });
			await add('users', 'codes_verified_at', { type: Sequelize.DATE, allowNull: true });
			await add('app_settings', 'transfer_codes_policy', { type: Sequelize.STRING(255), allowNull: false, defaultValue: 'always' });
		});
	},
	async down() {
		throw new Error('Forward-only migration: the policy columns hold live settings. Use a reviewed forward migration instead.');
	},
};
