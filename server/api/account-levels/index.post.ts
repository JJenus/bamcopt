import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { accountLevels } from "../../services/catalog";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const body = await parseBody(event, S.AccountLevelBody);
	const created: any = await accountLevels.create(body);
	await recordAdminAction(event, auth, { action: "settings.level.create", targetType: "account-level", targetId: created?.id, summary: `Created account level "${body.title}" (daily limit ${body.dailyLimit}, max balance ${body.maxBalanceLimit})`, meta: pick(body, ["title", "dailyLimit", "maxBalanceLimit", "accountLevel"]) });
	return created;
});
