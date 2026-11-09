import { requireAdmin, requestInfo } from '../../../utils/auth';
import { parseBody } from '../../../utils/validate';
import { ReferralProgramBody } from '../../../utils/schemas';
import { updateReferralProgram } from '../../../services/referrals';

export default defineEventHandler(async event => {
	const auth = requireAdmin(event);
	return updateReferralProgram(await parseBody(event, ReferralProgramBody), { userId: auth.userId, ...requestInfo(event) });
});
