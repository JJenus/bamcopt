import { badRequest } from "../../utils/errors";
import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { currencies } from "../../services/catalog";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const { id, ...data } = await parseBody(event, S.CurrencyBody);
	if (!id) throw badRequest("id is required");
	const updated = await currencies.update(id, data);
	await recordAdminAction(event, auth, { action: "settings.currency.update", targetType: "currency", targetId: id, summary: `Updated currency ${data.code} (${data.country}, ${data.symbol})`, meta: pick(data, ["code", "country", "symbol"]) });
	return updated;
});
