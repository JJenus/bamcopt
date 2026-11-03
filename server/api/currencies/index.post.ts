import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { currencies } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	return currencies.create(await parseBody(event, S.CurrencyBody));
});
