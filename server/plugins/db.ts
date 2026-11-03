import { dbReady } from "../utils/db";
import "../models";

/** Start connecting at boot so a wrong DB config shows up in the logs immediately. */
export default defineNitroPlugin(() => {
	dbReady().catch((error) => console.error("[db] connection failed:", error.message));
});
