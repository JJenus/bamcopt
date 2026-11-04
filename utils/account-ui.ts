import type { Transaction } from './interfaces/Transaction';

/** No grouping separators or exponents: never guess the intended transfer amount. */
export function parseTransferAmount(value: string, decimal = '.') {
	const normalized = value.trim();
	const pattern = decimal === ',' ? /^\d+(,\d{1,2})?$/ : /^\d+(\.\d{1,2})?$/;
	if (!pattern.test(normalized)) return null;
	const amount = Number(normalized.replace(',', '.'));
	const minor = Math.round(amount * 100);
	return minor > 0 && Number.isSafeInteger(minor) ? minor / 100 : null;
}

export function transactionPresentation(tx: Partial<Transaction>, userId: string) {
	const incoming = tx.receiverId === userId || tx.type === 'credit';
	const status = tx.status || 'unknown';
	const tone = status === 'completed' ? 'success' : status === 'failed' ? 'danger' : ['pending', 'awaiting', 'processing'].includes(status) ? 'warning' : 'secondary';
	const label = tx.notes?.startsWith('Administrative debit:') ? 'Account debit' : tx.notes?.startsWith('Administrative credit:') ? 'Account credit' : tx.type === 'credit' && !tx.beneficiary ? (tx.notes?.startsWith('Refund') ? 'Transfer refund' : 'Account funding') : incoming ? 'Money received' : tx.beneficiary?.name || 'Money sent';
	return { incoming, status, tone, label };
}

export function filterActivity<T extends Partial<Transaction>>(list: T[], userId: string, query: string, direction = 'all', status = 'all') {
	const search = query.trim().toLowerCase();
	return list.filter(tx => {
		const view = transactionPresentation(tx, userId);
		const haystack = [tx.transactionId, tx.beneficiary?.name, tx.beneficiary?.bank, tx.beneficiary?.destinationAccount].join(' ').toLowerCase();
		return (!search || haystack.includes(search)) && (direction === 'all' || (direction === 'incoming') === view.incoming) && (status === 'all' || view.status === status);
	});
}
