import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createAppSettings } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	return createAppSettings(await parseBody(event, S.AppSettingsBody));
});
