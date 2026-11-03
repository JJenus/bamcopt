import { Sequelize, type Options } from "sequelize";

const common: Options = { logging: false, define: { underscored: true } };

/**
 * PostgreSQL in real deployments (DATABASE_URL, or DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD).
 * Set DB_SSL=true for hosted databases that require TLS.
 * SQLite only exists for the quick local smoke test (DB_DIALECT=sqlite).
 */
const ssl = process.env.DB_SSL === "true" ? { ssl: { require: true, rejectUnauthorized: false } } : {};

const build = (): Sequelize => {
	if (process.env.DB_DIALECT === "sqlite") {
		return new Sequelize({ dialect: "sqlite", storage: process.env.DB_STORAGE || ":memory:", ...common });
	}
	if (process.env.DATABASE_URL) {
		return new Sequelize(process.env.DATABASE_URL, { dialect: "postgres", dialectOptions: ssl, ...common });
	}
	return new Sequelize(process.env.DB_NAME || "bancopt_db", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "", {
		host: process.env.DB_HOST || "localhost",
		port: Number(process.env.DB_PORT || 5432),
		dialect: "postgres",
		dialectOptions: ssl,
		...common,
	});
};

export const sequelize = build();

let ready: Promise<void> | null = null;
/**
 * Connects once (and creates missing tables when DB_SYNC=true). Nitro does not wait for async
 * plugins, so API requests await this instead of racing the first boot.
 */
export const dbReady = () =>
	(ready ??= (async () => {
		await sequelize.authenticate();
		// only creates MISSING tables (fresh DB / tests), never alters existing ones
		if (process.env.DB_SYNC === "true") await sequelize.sync();
	})().catch((error) => {
		ready = null; // retry on the next request
		throw error;
	}));
