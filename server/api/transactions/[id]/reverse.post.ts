import { requireAdmin } from '../../../utils/auth';
import { parseBody, uuidParam } from '../../../utils/validate';
import { TransactionReversalBody } from '../../../utils/schemas';
import { updateTransaction } from '../../../services/ledger';
import { TransactionStatus } from '../../../models';

export default defineEventHandler(async event => {
	requireAdmin(event);
	const id = await uuidParam(event);
	const { reason } = await parseBody(event, TransactionReversalBody);
	return updateTransaction(id, { status: TransactionStatus.FAILED, reversalReason: reason });
});
