import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { currencies } from "../../services/catalog";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const body = await parseBody(event, S.CurrencyBody);
	const created: any = await currencies.create(body);
	await recordAdminAction(event, auth, { action: "settings.currency.create", targetType: "currency", targetId: created?.id, summary: `Added currency ${body.code} (${body.country}, ${body.symbol})`, meta: pick(body, ["code", "country", "symbol"]) });
	return created;
});
