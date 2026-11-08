import { requireAdmin } from '../../../utils/auth';
import { parseBody, uuidParam } from '../../../utils/validate';
import { TransactionReversalBody } from '../../../utils/schemas';
import { updateTransaction } from '../../../services/ledger';
import { TransactionStatus } from '../../../models';
import { pick, recordAdminAction } from '../../../services/audit';

export default defineEventHandler(async event => {
	const auth = requireAdmin(event);
	const id = await uuidParam(event);
	const { reason } = await parseBody(event, TransactionReversalBody);
	const result = await updateTransaction(id, { status: TransactionStatus.FAILED, reversalReason: reason });
	await recordAdminAction(event, auth, { action: 'transaction.reverse', targetType: 'transaction', targetId: id, summary: `Reversed transaction ${id}: ${reason}`, meta: { reason } });
	return result;
});
