import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateTransaction } from "../../services/ledger";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	const { id, ...data } = await parseBody(event, S.TransactionUpdateBody);
	return updateTransaction(id, data);
});
