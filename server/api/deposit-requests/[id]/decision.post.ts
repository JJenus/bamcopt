import { requireAdmin } from '../../../utils/auth';
import { parseBody, uuidParam } from '../../../utils/validate';
import { DepositDecisionBody } from '../../../utils/schemas';
import { decideDepositRequest } from '../../../services/ledger';
export default defineEventHandler(async event => {
	const auth = requireAdmin(event);
	return decideDepositRequest(await uuidParam(event), auth.userId, await parseBody(event, DepositDecisionBody));
});
