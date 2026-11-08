import { requireSuperAdmin } from "../../../utils/superadmin";
import { retentionReport } from "../../../services/retention";

/** Retention settings and how many rows each history table holds. */
export default defineEventHandler(async (event) => {
	await requireSuperAdmin(event);
	return retentionReport();
});
