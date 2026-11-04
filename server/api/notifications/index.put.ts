import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { markRead } from "../../services/notifications";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const { id } = await parseBody(event, S.NotificationUpdateBody);
	return markRead(id, auth.userId, isAdmin(auth));
});
