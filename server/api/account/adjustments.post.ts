import { requireAdmin } from '../../utils/auth';
import { parseBody } from '../../utils/validate';
import { AccountAdjustmentBody } from '../../utils/schemas';
import { adjustAccountBalance } from '../../services/ledger';
import { recordAdminAction } from '../../services/audit';

export default defineEventHandler(async event => {
	const auth = requireAdmin(event);
	const body = await parseBody(event, AccountAdjustmentBody);
	const result = await adjustAccountBalance(body);
	const credit = body.direction === 'credit';
	await recordAdminAction(event, auth, { action: credit ? 'account.credit' : 'account.debit', targetType: 'account', summary: `${credit ? 'Credited' : 'Debited'} ${Number(body.amount).toLocaleString('en-US', { maximumFractionDigits: 2 })} ${credit ? 'to' : 'from'} ${body.email}: ${body.reason}`, meta: { email: body.email, direction: body.direction, amount: body.amount, reason: body.reason } });
	return result;
});
