import { Sequelize } from "sequelize";

const common = { logging: false, define: { underscored: true } } as const;

/** MySQL in real deployments; SQLite only for the local smoke test (DB_DIALECT=sqlite). */
export const sequelize =
	process.env.DB_DIALECT === "sqlite"
		? new Sequelize({ dialect: "sqlite", storage: process.env.DB_STORAGE || ":memory:", ...common })
		: new Sequelize(
				process.env.DB_NAME || "bancopt_db",
				process.env.DB_USER || "root",
				process.env.DB_PASSWORD || "",
				{ host: process.env.DB_HOST || "localhost", dialect: "mysql", ...common }
		  );
