import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { accountLevels } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	return accountLevels.create(await parseBody(event, S.AccountLevelBody));
});
