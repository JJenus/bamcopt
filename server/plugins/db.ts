import { dbReady } from "../utils/db";
import { seedAdmin } from "../utils/seed";
import "../models";

/** Start connecting at boot so a wrong DB config shows up in the logs immediately. */
export default defineNitroPlugin(() => {
	dbReady()
		.then(() => seedAdmin())
		.catch((error) => console.error("[db] connection/seed failed:", error.message));
});
