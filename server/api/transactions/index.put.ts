import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateTransaction } from "../../services/ledger";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const { id, ...data } = await parseBody(event, S.TransactionUpdateBody);
	const updated = await updateTransaction(id, data);
	await recordAdminAction(event, auth, { action: "transaction.update", targetType: "transaction", targetId: id, summary: `Updated transaction ${id}${data.status ? ` to ${data.status}` : ""}`, meta: pick(data, ["status", "notes"]) });
	return updated;
});
