import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { transfer } from "../../services/ledger";

export default defineEventHandler(async (event) => {
	// the sender is ALWAYS the logged-in user, never something the client claims
	const auth = requireAuth(event);
	return transfer({ ...(await parseBody(event, S.TransferBody)), senderId: auth.userId });
});
