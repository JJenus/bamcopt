import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTransferAmount, transactionPresentation, filterActivity } from '../utils/account-ui.ts';

test('amount entry is explicit about decimal separator and rejects unsafe values', () => {
	assert.equal(parseTransferAmount('12.30', '.'), 12.3);
	assert.equal(parseTransferAmount('12,30', ','), 12.3);
	for (const value of ['', '0', '-1', '1e3', '1.234', '1,000', 'Infinity', '999999999999999999']) {
		assert.equal(parseTransferAmount(value, '.'), null, value);
	}
});

test('only completed activity has success styling; directions reflect the current user', () => {
	for (const status of ['pending', 'awaiting', 'processing', 'failed', 'unknown']) {
		assert.notEqual(transactionPresentation({ status, type: 'send', receiverId: 'other' }, 'me').tone, 'success');
	}
	assert.equal(transactionPresentation({ status: 'completed', type: 'send', receiverId: 'me' }, 'me').incoming, true);
	assert.equal(transactionPresentation({ status: 'completed', type: 'credit' }, 'me').label, 'Account funding');
	assert.equal(transactionPresentation({ status: 'completed', type: 'credit', notes: 'Refund for failed transfer' }, 'me').label, 'Transfer refund');
	assert.equal(transactionPresentation({ status: 'completed', type: 'credit', notes: 'Administrative credit: Correction' }, 'me').label, 'Account credit');
	assert.equal(transactionPresentation({ status: 'completed', type: 'withdrawal', notes: 'Administrative debit: Correction' }, 'me').label, 'Account debit');
	assert.equal(transactionPresentation({ status: 'completed', type: 'send', receiverId: 'other' }, 'me').incoming, false);
});

test('activity search and filters combine without changing the original list', () => {
	const transactions = [
		{ transactionId: 'REF1', status: 'completed', type: 'send', receiverId: 'me', beneficiary: { name: 'Alex' } },
		{ transactionId: 'REF2', status: 'processing', type: 'debit', beneficiary: { name: 'Morgan', bank: 'Local bank' } },
	];
	assert.equal(filterActivity(transactions, 'me', 'local', 'outgoing', 'processing').length, 1);
	assert.equal(filterActivity(transactions, 'me', '', 'incoming', 'all').length, 1);
	assert.equal(filterActivity(transactions, 'me', 'missing', 'all', 'all').length, 0);
	assert.equal(transactions.length, 2);
});
