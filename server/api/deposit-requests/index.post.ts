import { requireAuth } from '../../utils/auth';
import { parseBody } from '../../utils/validate';
import { DepositRequestBody } from '../../utils/schemas';
import { submitDepositRequest } from '../../services/deposits';
export default defineEventHandler(async event => {
	const auth = requireAuth(event);
	return submitDepositRequest(auth.userId, await parseBody(event, DepositRequestBody));
});
