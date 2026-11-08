import { dbReady } from "../utils/db";
import { pruneOldRecords } from "../services/retention";
import "../models";

/** Once a day (and a minute after boot) drop records that are past their retention. Never takes the server down. */
export default defineNitroPlugin(() => {
	const run = () =>
		dbReady()
			.then(() => pruneOldRecords())
			.then((removed) => { if (removed.securityLogs || removed.auditLogs || removed.sessions) console.log("[retention] removed", JSON.stringify(removed)); })
			.catch((error) => console.error("[retention] failed:", error.message));
	setTimeout(run, 60_000).unref?.();
	setInterval(run, 24 * 60 * 60 * 1000).unref?.();
});
