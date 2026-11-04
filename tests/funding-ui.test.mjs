import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBalanceChange, balanceChangeLabel, customerFundingAccount } from '../utils/funding-ui.ts';

test('balance changes require credit/debit and an unsigned positive decimal', () => {
	assert.deepEqual(parseBalanceChange('credit', '25.29'), { direction: 'credit', amount: 25.29 });
	assert.deepEqual(parseBalanceChange('debit', '25.29'), { direction: 'debit', amount: 25.29 });
	for (const direction of ['', 'add', 'subtract', 'reverse']) assert.equal(parseBalanceChange(direction, '25'), null);
	for (const amount of ['-25', '+25', '0', '1.001', '1e3', 'NaN', '9007199254740992']) assert.equal(parseBalanceChange('debit', amount), null);
	assert.equal(balanceChangeLabel('credit'), 'Credit (add funds)');
	assert.equal(balanceChangeLabel('debit'), 'Debit (remove funds)');
});
test('customer funding preview exposes only published instruction fields, never balances', () => {
	const source = { id: 'f1', label: 'Bank', type: 'bank', accountNumber: '123', currency: 'USD', instructions: 'Use reference', balance: 500, active: true, secret: 'private' };
	const visible = customerFundingAccount(source);
	assert.equal(visible.accountNumber, '123');
	assert.equal(visible.currency, 'USD');
	assert.equal(visible.instructions, 'Use reference');
	assert.equal('balance' in visible, false);
	assert.equal('active' in visible, false);
	assert.equal('secret' in visible, false);
});
