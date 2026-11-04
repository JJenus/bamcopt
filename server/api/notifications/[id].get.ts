import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { listNotifications } from "../../services/notifications";

export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	requireSelfOrAdmin(event, id);
	return listNotifications(id);
});
