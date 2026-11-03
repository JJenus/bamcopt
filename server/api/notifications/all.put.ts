import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { markAllRead } from "../../services/notifications";

export default defineEventHandler(async (event) => {
	return markAllRead(requireAuth(event).userId);
});
