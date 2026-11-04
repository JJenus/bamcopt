import { requireAdmin } from "../../utils/auth";
import { getAdminStats } from "../../services/stats";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	return getAdminStats();
});
