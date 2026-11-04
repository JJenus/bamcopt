import test from 'node:test';
import assert from 'node:assert/strict';
import { avatarInitials, isPlaceholderPhoto, filterAdminUsers, fundingTotals, transactionStatuses, adminMoney } from '../utils/admin-ui.ts';

test('avatars use names, email-only accounts, Unicode and safe empty fallback', () => {
	assert.equal(avatarInitials(' Ada   Lovelace ', 'x@example.com'), 'AL');
	assert.equal(avatarInitials('', 'jane.doe@example.com'), 'JD');
	assert.equal(avatarInitials('Élodie', ''), 'É');
	assert.equal(avatarInitials('', ''), '?');
	assert.equal(isPlaceholderPhoto('/assets/media/svg/avatars/blank.svg'), true);
	assert.equal(isPlaceholderPhoto('https://site.test/default.png', 'https://site.test/default.png'), true);
	assert.equal(isPlaceholderPhoto('https://site.test/my-photo.png'), false);
});
test('directory searches meaningful fields and safely handles account-less admins', () => {
	const users = [{ id: 'a', name: 'Admin', email: 'a@test.dev', userType: 'admin', account: null }, { id: 'b', name: 'Customer', email: 'b@test.dev', userType: 'user', status: 'HOLD', imgUrl: 'secret-search', account: { accountNumber: 123 } }];
	assert.equal(filterAdminUsers(users, '123', '', '').length, 1);
	assert.equal(filterAdminUsers(users, 'secret-search', '', '').length, 0);
	assert.equal(filterAdminUsers(users, '', 'HOLD', 'user')[0].id, 'b');
	assert.equal(filterAdminUsers(users, 'ADMIN', '', '')[0].id, 'a');
});
test('funding totals never combine currencies or include hidden accounts', () => {
	assert.deepEqual(fundingTotals([{ active: true, currency: 'usd', balance: 10 }, { active: true, currency: 'EUR', balance: '20.50' }, { active: false, currency: 'USD', balance: 40 }, { active: true, balance: 2 }]), [['USD', 10], ['EUR', 20.5], ['Unspecified', 2]]);
});
test('transaction options reflect irreversible refund rules and completed mapping', () => {
	assert.deepEqual(transactionStatuses({ status: 'failed', type: 'debit' }), ['failed']);
	assert.deepEqual(transactionStatuses({ status: 'completed', type: 'send' }), ['awaiting', 'processing', 'completed']);
	assert.deepEqual(transactionStatuses({ status: 'completed', type: 'credit' }), ['awaiting', 'processing', 'completed']);
	assert.deepEqual(transactionStatuses({ status: 'awaiting', type: 'debit' }), ['awaiting', 'processing', 'completed', 'failed']);
});
test('money labels do not present database currency IDs as currency codes', () => {
	assert.equal(adminMoney('10.50', 'usd'), '10.50 USD');
	assert.equal(adminMoney(10, '00000000-0000-4000-8000-000000000001'), '10.00 account units');
	assert.equal(adminMoney(0), '0.00');
});
