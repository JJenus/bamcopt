import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { getAppSettings } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAuth(event);
	return getAppSettings();
});
