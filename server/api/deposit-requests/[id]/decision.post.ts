import { requireAdmin } from '../../../utils/auth';
import { parseBody, uuidParam } from '../../../utils/validate';
import { DepositDecisionBody } from '../../../utils/schemas';
import { decideDepositRequest } from '../../../services/ledger';
import { recordAdminAction } from '../../../services/audit';
export default defineEventHandler(async event => {
	const auth = requireAdmin(event);
	const id = await uuidParam(event);
	const body = await parseBody(event, DepositDecisionBody);
	const result = await decideDepositRequest(id, auth.userId, body);
	await recordAdminAction(event, auth, { action: `deposit.${body.action}`, targetType: 'deposit-request', targetId: id, summary: `${body.action === 'approve' ? 'Approved' : 'Rejected'} deposit request ${id}: ${body.note}`, meta: { decision: body.action, note: body.note } });
	return result;
});
