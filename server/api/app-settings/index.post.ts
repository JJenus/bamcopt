import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createAppSettings } from "../../services/catalog";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const body = await parseBody(event, S.AppSettingsBody);
	const created: any = await createAppSettings(body);
	await recordAdminAction(event, auth, { action: "settings.app.create", targetType: "app-settings", targetId: created?.id, summary: `Created app defaults (language ${created.defaultLanguage}, base currency ${created.defaultBaseCurrency})`, meta: pick(body, ["defaultLanguage", "defaultBaseCurrency", "transferCodesPolicy"]) });
	return created;
});
