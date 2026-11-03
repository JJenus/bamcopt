import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createNotification } from "../../services/notifications";
import { getUser } from "../../services/users";
import { forbidden } from "../../utils/errors";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const body = await parseBody(event, S.NotificationBody);
	// admins can notify anyone; users can only notify admins (e.g. "I uploaded my ID")
	if (!isAdmin(auth) && (await getUser(body.userId)).userType !== "admin") throw forbidden();
	return createNotification(body);
});
