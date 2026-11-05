import { isAdmin, requireAuth } from '../../utils/auth';
import { DepositRequestQuery } from '../../utils/schemas';
import { listDepositRequests } from '../../services/deposits';
import { unprocessable } from '../../utils/errors';
export default defineEventHandler(async event => {
	const auth = requireAuth(event);
	const parsed = DepositRequestQuery.safeParse(getQuery(event));
	if (!parsed.success) throw unprocessable('Invalid deposit request filters');
	return listDepositRequests(auth.userId, isAdmin(auth), parsed.data);
});
