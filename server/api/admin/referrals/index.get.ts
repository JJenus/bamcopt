import { requireAdmin } from '../../../utils/auth';
import { parseQuery } from '../../../utils/validate';
import { ReferralListQuery } from '../../../utils/schemas';
import { referralDashboard } from '../../../services/referrals';

export default defineEventHandler(async event => {
	const auth = requireAdmin(event);
	return referralDashboard(auth.userId, await parseQuery(event, ReferralListQuery), true);
});
