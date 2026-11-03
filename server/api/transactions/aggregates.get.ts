import { requireAuth } from "../../utils/auth";
import { getUserTransactionAggregates } from "../../services/ledger";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	return getUserTransactionAggregates(auth.userId);
});
