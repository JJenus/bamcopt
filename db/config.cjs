const fs = require('node:fs');
const path = require('node:path');

// Exported deployment variables win. Do not implicitly load .env.local/.env.production.
const envFile = process.env.MIGRATION_ENV_FILE;
if (envFile !== '-') {
	const file = path.resolve(process.cwd(), envFile || '.env');
	if (envFile || fs.existsSync(file)) {
		if (!process.loadEnvFile) throw new Error('Environment-file loading requires Node 20.12+. Alternatively export the database variables and set MIGRATION_ENV_FILE=-.');
		process.loadEnvFile(file);
	}
}

const common = { logging: false, migrationStorage: 'sequelize', migrationStorageTableName: 'SequelizeMeta' };
let config;
if (process.env.DB_DIALECT === 'sqlite') {
	if (process.env.NODE_ENV !== 'test' || !process.env.DB_STORAGE || process.env.DB_STORAGE === ':memory:') throw new Error('SQLite migrations are test-only and require NODE_ENV=test and a persistent DB_STORAGE file.');
	config = { ...common, dialect: 'sqlite', storage: process.env.DB_STORAGE };
} else {
	if (process.env.DB_DIALECT && process.env.DB_DIALECT !== 'postgres') throw new Error('Production migrations support PostgreSQL only.');
	if (!process.env.DATABASE_URL && (!process.env.DB_NAME || !process.env.DB_USER)) throw new Error('Configure DATABASE_URL or explicit DB_NAME and DB_USER before running migrations.');
	if (process.env.DATABASE_URL) {
		let protocol; try { protocol = new URL(process.env.DATABASE_URL).protocol; } catch { throw new Error('DATABASE_URL must be a valid PostgreSQL URL.'); }
		if (!['postgres:', 'postgresql:'].includes(protocol)) throw new Error('DATABASE_URL must use PostgreSQL.');
	}
	const port = Number(process.env.DB_PORT || 5432);
	if (!process.env.DATABASE_URL && (!Number.isInteger(port) || port < 1 || port > 65535)) throw new Error('DB_PORT must be a valid port number.');
	const ssl = process.env.DB_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : {};
	config = { ...common, dialect: 'postgres', dialectOptions: ssl, pool: { max: 1, min: 0 }, retry: { max: 0 } };
	if (process.env.DATABASE_URL) config.use_env_variable = 'DATABASE_URL';
	else Object.assign(config, { host: process.env.DB_HOST || 'localhost', port, database: process.env.DB_NAME, username: process.env.DB_USER, password: process.env.DB_PASSWORD });
}

module.exports = { development: { ...config }, test: { ...config }, production: { ...config } };
