// Optional real-backend browser test. Uses GLOBAL Playwright, never installs browsers/packages.
// Start an isolated SQLite server first; see docs/funding-operations.md.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const { resolve } = require('node:path');
const BASE = process.env.QA_BASE || 'http://127.0.0.1:3116';
const DB = process.env.QA_DB;
const SECRET = process.env.QA_JWT_SECRET;
if (!['127.0.0.1', 'localhost'].includes(new URL(BASE).hostname) || !DB || !resolve(DB).startsWith('/tmp/opencode/') || !SECRET) throw new Error('Requires a loopback QA_BASE, /tmp/opencode QA_DB, and QA_JWT_SECRET for the isolated server');

(async () => {
	const api = async (path, { method = 'GET', token, body } = {}) => {
		const response = await fetch(BASE + '/api' + path, { method, headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
		const data = await response.json();
		assert.equal(response.status, 200, `${method} ${path}: ${JSON.stringify(data)}`);
		return data;
	};
	const stamp = Date.now();
	const customer = await api('/auth/register', { method: 'POST', body: { name: 'Funding QA Customer', email: `funding-${stamp}@example.test`, password: `Qa-${stamp}-only`, phone: '1', address: 'QA Street', city: 'QA City', country: 'QA' } });
	const seed = await new Promise((done, fail) => {
		const db = new sqlite3.Database(DB, sqlite3.OPEN_READONLY);
		db.get("SELECT id FROM users WHERE user_type='admin' LIMIT 1", (error, row) => { db.close(); error ? fail(error) : done(row); });
	});
	assert.ok(seed?.id, 'Seeded QA administrator exists');
	const adminToken = jwt.sign({ userId: seed.id, userType: 'admin' }, SECRET, { expiresIn: '15m' });
	const adminUser = await api(`/users/${seed.id}`, { token: adminToken });
	const adminSession = { userId: seed.id, token: adminToken, user: adminUser };
	const browser = await chromium.launch({ headless: true }); // Linux CI/agent host has no display.
	const admin = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
	const user = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'] });
	for (const [context, session] of [[admin, adminSession], [user, customer]]) {
		await context.addCookies([{ name: 'auth', value: encodeURIComponent(JSON.stringify(session)), url: BASE }]);
		await context.route('**/*', route => new URL(route.request().url()).origin === BASE ? route.continue() : route.abort());
	}
	const adminPage = await admin.newPage(), userPage = await user.newPage();
	const failures = [];
	for (const page of [adminPage, userPage]) { page.setDefaultTimeout(15000); page.setDefaultNavigationTimeout(30000); page.on('pageerror', error => failures.push(error.message)); page.on('console', message => { if (/hydration|Failed to resolve component/i.test(message.text())) failures.push(message.text()); }); }
	const go = async (page, path) => { const response = await page.goto(BASE + path, { waitUntil: 'networkidle' }); assert.equal(response.status(), 200, path); };
	const fundingList = () => api('/funding-accounts', { token: adminToken });
	const balance = async () => Number((await api(`/account/${customer.userId}`, { token: customer.token })).amount);
	const label = `QA Bank ${stamp}`;
	let fundingId;
	try {
		await go(adminPage, '/admin/funding');
		await adminPage.getByRole('button', { name: 'Add account', exact: true }).click();
		await adminPage.getByLabel('Label', { exact: true }).fill(label);
		await adminPage.getByLabel('Bank / network', { exact: true }).fill('QA Bank');
		await adminPage.getByLabel('Account name', { exact: true }).fill('QA Funding');
		await adminPage.getByLabel('Account number / destination', { exact: true }).fill('0123456789');
		await adminPage.getByLabel('Currency code', { exact: true }).fill('USD');
		await adminPage.getByLabel('Customer instructions', { exact: true }).fill('Include your customer account number as reference.');
		await adminPage.getByRole('button', { name: 'Review changes', exact: true }).click();
		await adminPage.getByRole('heading', { name: 'Instruction preview — no balance is shown to customers' }).waitFor();
		assert.equal((await fundingList()).some(item => item.label === label), false, 'Review must not save');
		await adminPage.getByRole('button', { name: 'Confirm and save', exact: true }).click();
		await adminPage.getByRole('heading', { name: 'New funding account', exact: true }).waitFor({ state: 'hidden' });
		const created = (await fundingList()).find(item => item.label === label); fundingId = created.id;
		assert.equal(created.active, false);
		assert.equal((await api('/funding-accounts', { token: customer.token })).some(item => item.id === fundingId), false);
		await go(userPage, '/app/add-funds'); assert.equal(await userPage.getByRole('heading', { name: label, exact: true }).count(), 0);
		let card = adminPage.locator('section').filter({ has: adminPage.getByRole('heading', { name: label, exact: true }) });
		await card.getByRole('button', { name: 'Publish to customers' }).click();
		await adminPage.getByRole('button', { name: 'Confirm and save', exact: true }).click();
		await adminPage.getByRole('heading', { name: 'Change customer visibility' }).waitFor({ state: 'hidden' });
		await go(userPage, '/app/add-funds'); await userPage.getByRole('heading', { name: label, exact: true }).waitFor();
		const publicAccount = (await api('/funding-accounts', { token: customer.token })).find(item => item.id === fundingId);
		assert.equal('balance' in publicAccount, false); assert.equal('active' in publicAccount, false);
		await userPage.getByRole('button', { name: 'Copy Account / destination', exact: true }).click();
		assert.equal(await userPage.evaluate(() => navigator.clipboard.readText()), '0123456789');
		await adminPage.getByRole('button', { name: 'Customer view', exact: true }).click();
		await adminPage.getByRole('heading', { name: label, exact: true }).waitFor();
		assert.equal(await adminPage.getByText(/Tracked balance:/).count(), 0);
		console.log('PASS real create → hidden → reviewed publish → customer instructions/copy; preview contains no tracked balances');
		await adminPage.getByRole('button', { name: 'Manage accounts', exact: true }).click();
		card = adminPage.locator('section').filter({ has: adminPage.getByRole('heading', { name: label, exact: true }) });
		await card.getByRole('button', { name: 'Edit', exact: true }).click();
		await adminPage.getByLabel('Customer instructions', { exact: true }).fill('Updated: include your account number and contact support after sending.');
		await adminPage.getByRole('button', { name: 'Review changes', exact: true }).click(); await adminPage.getByRole('button', { name: 'Confirm and save', exact: true }).click();
		await adminPage.getByRole('heading', { name: 'Edit funding instructions' }).waitFor({ state: 'hidden' });
		await userPage.getByRole('button', { name: 'Refresh instructions', exact: true }).click(); await userPage.getByText('Updated: include your account number and contact support after sending.', { exact: true }).waitFor();
		await userPage.screenshot({ path: '/tmp/opencode/bancopt-funding-customer.png', fullPage: true });
		for (const [direction, amount, expected] of [['credit', '100.29', 100.29], ['debit', '10.29', 90]]) {
			await card.getByRole('button', { name: 'Adjust balance', exact: true }).click();
			await adminPage.getByRole('button', { name: 'Review changes', exact: true }).click(); assert.equal(await adminPage.locator('.is-invalid').count(), 2);
			await adminPage.getByLabel('Operation', { exact: true }).selectOption(direction);
			await adminPage.getByLabel('Amount (positive)', { exact: true }).fill('-1');
			await adminPage.getByRole('button', { name: 'Review changes', exact: true }).click(); assert.equal(await adminPage.getByLabel('Amount (positive)', { exact: true }).getAttribute('aria-invalid'), 'true');
			await adminPage.getByLabel('Amount (positive)', { exact: true }).fill(amount);
			await adminPage.getByRole('button', { name: 'Review changes', exact: true }).click(); await adminPage.getByRole('button', { name: 'Confirm and save', exact: true }).click();
			await adminPage.getByRole('heading', { name: 'Adjust tracked balance' }).waitFor({ state: 'hidden' }); assert.equal((await fundingList()).find(item => item.id === fundingId).balance, expected);
		}
		console.log('PASS real instruction edit propagation and required Credit/Debit funding adjustments with exact cents');
		for (const [direction, amount, expected] of [['credit', '25.29', 25.29], ['debit', '5.29', 20]]) {
			await go(adminPage, '/admin/top-up');
			await adminPage.getByLabel('Customer email', { exact: true }).fill(customer.user.email);
			await adminPage.getByLabel('Operation', { exact: true }).selectOption(direction);
			await adminPage.getByLabel('Amount (positive, account units)', { exact: true }).fill(amount);
			await adminPage.getByLabel('Reason (visible in customer activity)', { exact: true }).fill(`QA ${direction} reconciliation`);
			if (direction === 'credit') await adminPage.getByLabel('Funding association (optional, credit only)', { exact: true }).selectOption(fundingId);
			else assert.equal(await adminPage.getByLabel('Funding association (optional, credit only)', { exact: true }).count(), 0);
			await adminPage.getByRole('button', { name: 'Review adjustment', exact: true }).click(); await adminPage.getByRole('heading', { name: 'Review balance adjustment' }).waitFor();
			assert.equal(await balance(), direction === 'credit' ? 0 : 25.29, 'Review must not move money');
			await adminPage.getByRole('button', { name: 'Confirm adjustment', exact: true }).click(); await adminPage.getByRole('heading', { name: 'Balance adjustment recorded' }).waitFor();
			assert.equal(await balance(), expected);
		}
		assert.equal((await fundingList()).find(item => item.id === fundingId).balance, 115.29);
		await go(userPage, '/app/transactions'); await userPage.getByText('Account debit', { exact: true }).waitFor();
		await userPage.getByRole('button', { name: /^Account debit,/ }).click();
		await userPage.getByText('Administrative debit: QA debit reconciliation', { exact: true }).waitFor();
		await userPage.getByRole('button', { name: 'Close transaction details', exact: true }).click();
		const history = await api(`/transactions/${customer.userId}`, { token: customer.token });
		const debit = history.find(item => item.type === 'withdrawal' && item.notes === 'Administrative debit: QA debit reconciliation'); assert.ok(debit);
		await go(adminPage, `/admin/transaction/${debit.id}`);
		await adminPage.getByLabel('Operation', { exact: true }).selectOption('reverse');
		await adminPage.getByLabel('Reversal reason (visible in activity)', { exact: true }).fill('QA correction was recorded in error');
		await adminPage.getByRole('button', { name: 'Review action', exact: true }).click(); assert.equal(await balance(), 20);
		await adminPage.getByRole('button', { name: 'Confirm reversal', exact: true }).click();
		await adminPage.waitForFunction(() => !document.body.textContent.includes('Reversal confirmation'));
		assert.equal(await balance(), 25.29);
		await api(`/transactions/${debit.id}/reverse`, { method: 'POST', token: adminToken, body: { action: 'reverse', reason: 'Retry after checking recorded outcome' } }); assert.equal(await balance(), 25.29);
		assert.equal((await fundingList()).find(item => item.id === fundingId).balance, 115.29);
		const refunded = (await api(`/transactions/${customer.userId}`, { token: customer.token })).filter(item => item.notes?.startsWith(`Refund of ${debit.transactionId}`));
		assert.equal(refunded.length, 1); assert.ok(refunded[0].notes.includes('QA correction was recorded in error'));
		await go(userPage, '/app/transactions'); await userPage.getByRole('button', { name: /^Transfer refund,/ }).click();
		await userPage.getByText(refunded[0].notes, { exact: true }).waitFor(); await userPage.getByRole('button', { name: 'Close transaction details', exact: true }).click();
		console.log('PASS real customer credit/debit → ledger/activity → explicit reversal → once-only refund; funding association remains correct');
		await go(adminPage, '/admin/funding');
		card = adminPage.locator('section').filter({ has: adminPage.getByRole('heading', { name: label, exact: true }) });
		await card.getByRole('button', { name: 'Hide from customers', exact: true }).click(); await adminPage.getByRole('button', { name: 'Confirm and save', exact: true }).click();
		await adminPage.getByRole('heading', { name: 'Change customer visibility' }).waitFor({ state: 'hidden' });
		await go(userPage, '/app/add-funds'); assert.equal(await userPage.getByRole('heading', { name: label, exact: true }).count(), 0);
		await adminPage.setViewportSize({ width: 390, height: 844 });
		for (const path of ['/admin/funding', '/admin/top-up', `/admin/transaction/${debit.id}`]) { await go(adminPage, path); assert.equal(await adminPage.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, path); }
		await go(adminPage, '/admin/funding'); await adminPage.screenshot({ path: '/tmp/opencode/bancopt-funding-admin-mobile.png', fullPage: true });
		assert.deepEqual(failures, []);
		console.log('PASS real unpublish → customer hidden, responsive admin forms, no runtime/hydration errors');
	} finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
