import { requireAdmin, requestInfo } from '../../../../utils/auth';
import { parseBody, uuidParam } from '../../../../utils/validate';
import { ReferralRejectBody } from '../../../../utils/schemas';
import { rejectReferral } from '../../../../services/referrals';

export default defineEventHandler(async event => {
	const auth = requireAdmin(event);
	return rejectReferral(await uuidParam(event), (await parseBody(event, ReferralRejectBody)).reason, { userId: auth.userId, ...requestInfo(event) });
});
