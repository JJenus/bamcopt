import { requireSuperAdmin } from "../../../utils/superadmin";
import { pruneOldRecords } from "../../../services/retention";

/** Runs the same clean-up the daily job does, now. */
export default defineEventHandler(async (event) => {
	await requireSuperAdmin(event);
	return { removed: await pruneOldRecords() };
});
