import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { accountLevels } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAuth(event);
	return accountLevels.get(await uuidParam(event));
});
