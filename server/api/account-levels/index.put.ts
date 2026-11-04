import { badRequest } from "../../utils/errors";
import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { accountLevels } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	const { id, ...data } = await parseBody(event, S.AccountLevelBody);
	if (!id) throw badRequest("id is required");
	return accountLevels.update(id, data);
});
