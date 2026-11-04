import { requireAdmin } from '../../utils/auth';
import { parseBody } from '../../utils/validate';
import { AccountAdjustmentBody } from '../../utils/schemas';
import { adjustAccountBalance } from '../../services/ledger';

export default defineEventHandler(async event => {
	requireAdmin(event);
	return adjustAccountBalance(await parseBody(event, AccountAdjustmentBody));
});
