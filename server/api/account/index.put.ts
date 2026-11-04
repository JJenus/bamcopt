import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateAccountSettings } from "../../services/accounts";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	return updateAccountSettings(await parseBody(event, S.AccountUpdateBody));
});
