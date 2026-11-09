// Real backend + browser journey. Only a disposable local SQLite database is used.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { spawn } = require('node:child_process');
const { mkdtempSync } = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const PORT = 3120, BASE = `http://127.0.0.1:${PORT}`;
const dir = mkdtempSync('/tmp/opencode/bancopt-referral-browser-');
const server = spawn('pnpm', ['exec', 'nuxt', 'dev', '--dotenv', '/dev/null', '--port', String(PORT)], {
	detached: true, stdio: 'ignore', env: { ...process.env, DB_DIALECT: 'sqlite', DB_STORAGE: `${dir}/test.db`, DB_SYNC: 'true', JWT_SECRET: 'referral-browser-test-only', OTP_ON: 'false', GEOIP: 'off', SMTP_PASS: '', ADMIN_EMAIL: 'admin@referral.test', ADMIN_PASSWORD: 'Referral-admin-test!', SUPERADMIN_EMAIL: '', SUPERADMIN_PASSWORD: '' },
});
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const api = async (method, path, body, token) => {
	const result = await fetch(`${BASE}/api${path}`, { method, headers: { 'content-type': 'application/json', ...(token && { authorization: `Bearer ${token}` }) }, body: body ? JSON.stringify(body) : undefined });
	const data = await result.json();
	assert.equal(result.status, 200, `${method} ${path}: ${JSON.stringify(data)}`);
	return data;
};

(async () => {
	let browser;
	try {
		for (let i = 0; i < 180; i++) { try { if ((await fetch(`${BASE}/api`)).ok) break; } catch {} await pause(1000); }
		let admin;
		for (let i = 0; i < 60; i++) {
			const response = await fetch(`${BASE}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'admin@referral.test', password: 'Referral-admin-test!' }) });
			admin = await response.json(); if (admin.token) break; await pause(500);
		}
		assert.ok(admin.token);
		const profile = (name, email) => ({ name, email, password: 'Referral-test-password!', phone: '123', address: 'QA street', city: 'QA city', country: 'QA' });
		const owner = await api('POST', '/auth/register', profile('Referrer QA', 'owner@referral.test'));
		browser = await chromium.launch();
		const problems = [];
		const pageFor = async session => {
			const context = await browser.newContext({ viewport: { width: 1360, height: 1000 } });
			await context.route('https://**/*', route => route.abort());
			if (session) await context.addCookies([{ name: 'auth', value: encodeURIComponent(JSON.stringify(session)), url: BASE }]);
			const page = await context.newPage(); page.setDefaultNavigationTimeout(90000); page.setDefaultTimeout(20000);
			page.on('pageerror', error => problems.push(error.message));
			return page;
		};
		const adminPage = await pageFor(admin), customerPage = await pageFor(owner), guest = await pageFor();
		await adminPage.goto(`${BASE}/admin/settings`, { waitUntil: 'networkidle' });
		assert.equal(await adminPage.locator('.account-sidebar nav a[href="/admin/referrals"]').count(), 0, 'referrals are not a top-level nav item');
		await adminPage.getByRole('link', { name: /Referral program/ }).click();
		await adminPage.waitForURL(url => url.pathname === '/admin/settings/referrals');
		assert.equal((await adminPage.locator('.account-sidebar nav a[aria-current="page"]').innerText()).trim(), 'Settings');
		await adminPage.locator('#referrals-enabled').waitFor();
		assert.equal(await adminPage.isChecked('#referrals-enabled'), false);
		await adminPage.check('#referrals-enabled'); await adminPage.fill('#referrals-award', '150'); await adminPage.fill('#referrals-rate', '100');
		await adminPage.fill('#referrals-min-points', '100'); await adminPage.fill('#referrals-min-amount', '1.00');
		await adminPage.getByRole('button', { name: 'Review reward rules', exact: true }).click();
		await adminPage.getByRole('button', { name: 'Confirm reward rules', exact: true }).click();
		await adminPage.getByRole('status').filter({ hasText: 'Referral program settings saved.' }).waitFor();
		console.log('ok: administrator reviews and configures referral points and conversion rate');
		await customerPage.goto(`${BASE}/app/referrals`, { waitUntil: 'networkidle' });
		await customerPage.locator('#referral-link').waitFor();
		const invitation = await customerPage.inputValue('#referral-link');
		assert.equal(new URL(invitation).origin, BASE, 'invitation uses the actual environment origin, not production');
		const code = new URL(invitation).searchParams.get('ref'); assert.match(code, /^[A-F0-9]{16}$/);
		await guest.goto(`${BASE}/sign-up?ref=${code}`, { waitUntil: 'networkidle' });
		assert.equal(await guest.locator('link[rel=canonical]').getAttribute('href'), `${BASE}/sign-up`, 'canonical URLs use this environment');
		assert.equal(new URL(await guest.locator('meta[property="og:image"]').getAttribute('content')).origin, BASE, 'local metadata images use this environment');
		assert.equal(await guest.inputValue('#signup-referral'), code);
		const friendProfile = profile('Referred QA', 'friend@referral.test');
		for (const field of ['name', 'email', 'phone', 'address', 'city', 'country', 'password']) await guest.fill(`#signup-${field}`, friendProfile[field]);
		await guest.fill('#signup-confirm', friendProfile.password); await guest.check('#signup-terms');
		await guest.getByRole('button', { name: 'Create account', exact: true }).click();
		await guest.waitForURL(url => url.pathname === '/app');
		const friend = await api('POST', '/auth/login', { email: friendProfile.email, password: friendProfile.password });
		await customerPage.reload({ waitUntil: 'networkidle' });
		await customerPage.getByText('Referred QA', { exact: true }).waitFor();
		assert.equal((await customerPage.locator('[data-testid=referral-points]').innerText()).trim(), '0');
		console.log('ok: invitation pre-fills signup and tracks a pending referral without awarding points');
		const funding = await api('POST', '/funding-accounts', { label: 'Referral browser', type: 'bank', accountNumber: 'QA', currency: 'USD', active: true }, admin.token);
		const deposit = await api('POST', '/deposit-requests', { fundingAccountId: funding.id, amount: 10, requestKey: crypto.randomUUID(), reference: 'Local QA receipt' }, friend.token);
		await api('POST', `/deposit-requests/${deposit.id}/decision`, { action: 'approve', note: 'Actual test receipt verified' }, admin.token);
		await customerPage.reload({ waitUntil: 'networkidle' });
		await customerPage.waitForFunction(() => document.querySelector('[data-testid=referral-points]')?.textContent.trim() === '150');
		const initial = await api('GET', `/account/${owner.userId}`, null, owner.token);
		await customerPage.fill('#withdraw-points', '99');
		await customerPage.getByRole('button', { name: 'Review withdrawal', exact: true }).click();
		await customerPage.getByRole('alert').filter({ hasText: /minimum/i }).waitFor();
		assert.equal(await customerPage.getByRole('button', { name: 'Confirm withdrawal', exact: true }).count(), 0);
		await customerPage.fill('#withdraw-points', '100');
		await customerPage.getByRole('button', { name: 'Review withdrawal', exact: true }).click();
		assert.equal((await api('GET', `/account/${owner.userId}`, null, owner.token)).amount, initial.amount, 'review moves no money');
		await customerPage.route('**/api/referrals/redeem', async route => { await route.fetch(); await route.abort('failed'); }, { times: 1 });
		await customerPage.getByRole('button', { name: 'Confirm withdrawal', exact: true }).click();
		await customerPage.getByRole('button', { name: 'Check withdrawal', exact: true }).waitFor();
		await customerPage.reload({ waitUntil: 'networkidle' });
		await customerPage.getByRole('button', { name: 'Check withdrawal', exact: true }).click();
		await customerPage.getByRole('status').filter({ hasText: '100 points withdrawn' }).waitFor();
		assert.equal((await api('GET', `/account/${owner.userId}`, null, owner.token)).amount, initial.amount + 1);
		assert.equal((await api('GET', '/referrals', null, owner.token)).redemptions.total, 1);
		assert.equal((await customerPage.locator('[data-testid=referral-points]').innerText()).trim(), '50');
		console.log('ok: first approved deposit awards points; lost withdrawal response recovers after reload without double credit');
		await adminPage.reload({ waitUntil: 'networkidle' });
		await adminPage.getByRole('heading', { name: 'Withdrawal audit (1)', exact: true }).waitFor();
		assert.equal(await adminPage.inputValue('#referrals-min-points'), '100');
		assert.equal(Number(await adminPage.inputValue('#referrals-min-amount')), 1);
		for (const [name, page] of [['customer', customerPage], ['admin', adminPage]]) {
			await page.setViewportSize({ width: 390, height: 844 });
			assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}: no mobile horizontal page overflow`);
			await page.screenshot({ path: `${dir}/${name}-mobile.png`, fullPage: true });
		}
		assert.deepEqual(problems, []);
		console.log(`referral browser journey passed; screenshots: ${dir}`);
	} catch (error) { console.error(error.stack || error); process.exitCode = 1; }
	finally { await browser?.close(); try { process.kill(-server.pid, 'SIGTERM'); } catch {} }
})();
