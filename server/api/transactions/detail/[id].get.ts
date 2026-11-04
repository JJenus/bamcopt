import { uuidParam } from "../../../utils/validate";
import { isAdmin, requireAuth } from "../../../utils/auth";
import { getTransactionDetail } from "../../../services/ledger";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	return getTransactionDetail(await uuidParam(event), auth.userId, isAdmin(auth));
});
