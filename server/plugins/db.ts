import { sequelize } from "../utils/db";
import "../models";

/** Connect once at boot. Schema changes are explicit SQL (db/migrations), never `alter`. */
export default defineNitroPlugin(async () => {
	await sequelize.authenticate();
	// Only creates MISSING tables (fresh dev DB / tests). It never alters existing ones.
	if (process.env.DB_SYNC === "true") await sequelize.sync();
});
