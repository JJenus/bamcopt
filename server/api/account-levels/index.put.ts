import { badRequest } from "../../utils/errors";
import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { accountLevels } from "../../services/catalog";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const { id, ...data } = await parseBody(event, S.AccountLevelBody);
	if (!id) throw badRequest("id is required");
	const updated = await accountLevels.update(id, data);
	await recordAdminAction(event, auth, { action: "settings.level.update", targetType: "account-level", targetId: id, summary: `Updated account level "${data.title}" (daily limit ${data.dailyLimit}, max balance ${data.maxBalanceLimit})`, meta: pick(data, ["title", "dailyLimit", "maxBalanceLimit", "accountLevel"]) });
	return updated;
});
