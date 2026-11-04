import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateAppSettings } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	const id = await uuidParam(event);
	return updateAppSettings(id, await parseBody(event, S.AppSettingsBody));
});
