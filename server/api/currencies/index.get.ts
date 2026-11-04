import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { currencies } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAuth(event);
	return currencies.list();
});
