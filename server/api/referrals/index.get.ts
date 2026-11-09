import { requireAuth } from '../../utils/auth';
import { ReferralListQuery } from '../../utils/schemas';
import { referralDashboard } from '../../services/referrals';
import { parseQuery } from '../../utils/validate';

export default defineEventHandler(async event => {
	const auth = requireAuth(event);
	return referralDashboard(auth.userId, await parseQuery(event, ReferralListQuery));
});
