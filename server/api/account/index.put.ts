import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateAccountSettings } from "../../services/accounts";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const body = await parseBody(event, S.AccountUpdateBody);
	const result = await updateAccountSettings(body);
	const changes = (["accountLevel", "status", "currencyId"] as const).filter((key) => body[key] !== undefined).map((key) => `${key}=${body[key]}`);
	await recordAdminAction(event, auth, { action: "account.settings", targetType: "user", targetId: body.userId, summary: `Changed account settings for user ${body.userId}${changes.length ? `: ${changes.join(", ")}` : ""}`, meta: pick(body, ["accountLevel", "status", "currencyId"]) });
	return result;
});
