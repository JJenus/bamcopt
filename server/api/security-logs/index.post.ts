import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createSecurityLog } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	const body = await parseBody(event, S.SecurityLogBody);
	requireSelfOrAdmin(event, body.userId);
	return createSecurityLog(body);
});
