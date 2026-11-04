import { uuidParam } from "../../../utils/validate";
import { isAdmin, requireAuth } from "../../../utils/auth";
import { getNotification } from "../../../services/notifications";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	return getNotification(await uuidParam(event), auth.userId, isAdmin(auth));
});
