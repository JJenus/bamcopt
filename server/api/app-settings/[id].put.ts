import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateAppSettings } from "../../services/catalog";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const id = await uuidParam(event);
	const body = await parseBody(event, S.AppSettingsBody);
	const updated = await updateAppSettings(id, body);
	await recordAdminAction(event, auth, { action: "settings.app.update", targetType: "app-settings", targetId: id, summary: `Changed app defaults (language ${updated.defaultLanguage}, base currency ${updated.defaultBaseCurrency}${body.transferCodesPolicy ? `, transfer codes: ${updated.transferCodesPolicy}` : ""})`, meta: { defaultLanguage: updated.defaultLanguage, defaultBaseCurrency: updated.defaultBaseCurrency, ...pick(body, ["transferCodesPolicy"]) } });
	return updated;
});
