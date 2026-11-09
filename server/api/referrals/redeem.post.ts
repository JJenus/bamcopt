import { requireAuth } from '../../utils/auth';
import { parseBody } from '../../utils/validate';
import { ReferralRedemptionBody } from '../../utils/schemas';
import { redeemReferralPoints } from '../../services/ledger';

export default defineEventHandler(async event => {
	const auth = requireAuth(event);
	const row = await redeemReferralPoints(auth.userId, await parseBody(event, ReferralRedemptionBody));
	const { requestKey, ...receipt } = row.toJSON();
	return receipt;
});
