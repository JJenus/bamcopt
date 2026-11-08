import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createNotification } from "../../services/notifications";
import { getUser } from "../../services/users";
import { forbidden } from "../../utils/errors";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const body = await parseBody(event, S.NotificationBody);
	// admins can notify anyone; users can only notify admins (e.g. "I uploaded my ID")
	if (!isAdmin(auth) && (await getUser(body.userId)).userType !== "admin") throw forbidden();
	const created = await createNotification(body);
	if (isAdmin(auth)) await recordAdminAction(event, auth, { action: "notification.send", targetType: "user", targetId: body.userId, summary: `Sent notification "${body.title}" to user ${body.userId}`, meta: pick(body, ["title", "type", "entityType", "entityId"]) });
	return created;
});
