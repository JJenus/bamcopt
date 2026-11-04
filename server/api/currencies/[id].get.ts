import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { currencies } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAuth(event);
	return currencies.get(await uuidParam(event));
});
