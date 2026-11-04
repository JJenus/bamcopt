import { parseQuery, uuidParam } from "../../utils/validate";
import { requireSelfOrAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { listNotifications } from "../../services/notifications";

/** `:id` is the user id. Query: status, group, limit (<=50), offset. */
export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	requireSelfOrAdmin(event, id);
	return listNotifications(id, parseQuery(event, S.NotificationQuery));
});
