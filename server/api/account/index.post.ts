import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { topUp } from "../../services/ledger";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	const { email, amount } = await parseBody(event, S.TopUpBody);
	return topUp(email, amount);
});
