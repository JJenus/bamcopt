import { isAdmin, requireAuth } from '../../utils/auth';
import { uuidParam } from '../../utils/validate';
import { getDepositRequest } from '../../services/deposits';
export default defineEventHandler(async event => {
	const auth = requireAuth(event);
	return getDepositRequest(await uuidParam(event), auth.userId, isAdmin(auth));
});
