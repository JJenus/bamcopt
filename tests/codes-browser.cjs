// Real-browser check of the transfer-code policy and the system defaults. Boots its own SQLite dev server.
// Run: pnpm test:codes (needs a global Playwright + installed Chromium; installs nothing). Screenshots: /tmp/opencode/shots.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { spawn } = require('node:child_process');
const { mkdirSync, rmSync } = require('node:fs');
const assert = require('node:assert/strict');

const PORT = 3119, BASE = `http://127.0.0.1:${PORT}`, DB = '.data/codes-browser.db', SHOTS = '/tmp/opencode/shots';
mkdirSync('.data', { recursive: true }); mkdirSync(SHOTS, { recursive: true });
rmSync(DB, { force: true });
const server = spawn('pnpm', ['exec', 'nuxt', 'dev', '--dotenv', '/dev/null', '--port', String(PORT)], {
	detached: true, stdio: 'ignore',
	env: { ...process.env, DB_DIALECT: 'sqlite', DB_STORAGE: DB, DB_SYNC: 'true', JWT_SECRET: 'codes-browser', TEST_DATABASE_URL: '', OTP_ON: 'false', GEOIP: 'off', SMTP_PASS: '', ADMIN_EMAIL: 'admin@bancopt.com', ADMIN_PASSWORD: 'AdminPass123!', SUPERADMIN_EMAIL: '', SUPERADMIN_PASSWORD: '' },
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stop = () => { try { process.kill(-server.pid); } catch {} };
const ok = (msg) => console.log('  ok ', msg);
const json = async (res) => ({ status: res.status, data: await res.json().catch(() => ({})) });
const req = (method, path, body, token) => fetch(BASE + '/api' + path, { method, headers: { 'content-type': 'application/json', ...(token && { authorization: `Bearer ${token}` }) }, body: body && JSON.stringify(body) }).then(json);

async function checkEyeButton(page, inputId, label) {
	const button = page.getByRole('button', { name: label, exact: true });
	assert.equal((await button.innerText()).trim(), '', 'visibility controls have no visible text');
	assert.equal(await button.locator('.ki-eye').count(), 1);
	const input = await page.locator(`#${inputId}`).boundingBox(), icon = await button.boundingBox();
	assert.ok(input && icon && icon.x >= input.x && icon.x + icon.width <= input.x + input.width && icon.y >= input.y && icon.y + icon.height <= input.y + input.height, 'eye button sits inside the input');
}

async function signIn(page, email, password) {
	await page.goto(BASE + '/sign-in', { waitUntil: 'networkidle' });
	await page.fill('#signin-email', email);
	await page.fill('#signin-password', password);
	assert.equal(await page.getAttribute('#signin-password', 'type'), 'password');
	await checkEyeButton(page, 'signin-password', 'Show password');
	await page.getByRole('button', { name: 'Show password', exact: true }).click({ timeout: 5000 });
	assert.equal(await page.getAttribute('#signin-password', 'type'), 'text');
	assert.equal(await page.inputValue('#signin-password'), password, 'revealing does not change the password');
	await page.getByRole('button', { name: 'Hide password', exact: true }).click();
	assert.equal(await page.getAttribute('#signin-password', 'type'), 'password');
	await page.click('button[type=submit]');
}

// walk the transfer wizard up to the point where the codes (or the final confirmation) appear
async function startTransfer(page, recipientEmail) {
	await page.goto(BASE + '/app/transfer', { waitUntil: 'networkidle' });
	await page.fill('#recipient-search', recipientEmail);
	await page.click('button:has-text("Find")');
	await page.getByRole('button', { name: /Select Receiver QA/ }).click();
	await page.waitForSelector('text=Continue to amount', { timeout: 20000 });
	await page.click('button:has-text("Continue to amount")');
	await page.fill('#transfer-amount', '5');
	await page.click('button:has-text("Review transfer")');
	await page.click('button:has-text("Continue to verification")');
}

let senderPage, adminPage;
(async () => {
	let browser;
	try {
		for (let i = 0; i < 180; i++) { try { if ((await fetch(BASE + '/api')).ok) break; } catch {} await sleep(1000); }
		let adminLogin;
		for (let i = 0; i < 60; i++) {
			adminLogin = (await req('POST', '/auth/login', { email: 'admin@bancopt.com', password: 'AdminPass123!' })).data;
			if (adminLogin.token) break;
			await sleep(500);
		}
		assert.ok(adminLogin.token, 'test administrator is seeded and can sign in');
		const stamp = Date.now(), sender = `from-${stamp}@example.test`, receiver = `to-${stamp}@example.test`;
		const reg = (email, name) => req('POST', '/auth/register', { name, email, password: 'Secret-123!', phone: '1', address: 'a', city: 'c', country: 'x' });
		const s = (await reg(sender, 'Sender QA')).data; await reg(receiver, 'Receiver QA');
		await reg(`other-${stamp}@example.test`, 'Receiver QA');
		assert.equal((await req('POST', '/account/adjustments', { email: sender, direction: 'credit', amount: 500, reason: 'browser test' }, adminLogin.token)).status, 200);
		const users = (await req('GET', '/users', null, adminLogin.token)).data;
		const me = users.find((u) => u.email === sender);
		const recipientAccount = users.find((u) => u.email === receiver).account.accountNumber;
		const codes = { cot: me.cot, imf: me.imf, tax: me.tax };

		browser = await chromium.launch();
		adminPage = await (await browser.newContext({ viewport: { width: 1360, height: 1000 } })).newPage();
		adminPage.setDefaultNavigationTimeout(90000);
		await adminPage.route('https://**/*', route => route.abort()); // No external fonts/services in local QA.
		const problems = []; adminPage.on('pageerror', (e) => problems.push(e.message));
		await signIn(adminPage, 'admin@bancopt.com', 'AdminPass123!');
		await adminPage.waitForURL((u) => u.pathname.startsWith('/admin'), { timeout: 30000 });

		// ---- the system defaults are dropdowns
		await adminPage.goto(BASE + '/admin/settings/defaults', { waitUntil: 'networkidle' });
		await adminPage.waitForSelector('#default-currency', { timeout: 20000 });
		assert.equal(await adminPage.locator('#default-currency').evaluate((el) => el.tagName), 'SELECT');
		assert.deepEqual(await adminPage.locator('#default-currency option').evaluateAll((o) => o.map((x) => x.value)), ['USD', 'EUR', 'JPY', 'GBP', 'CNY']);
		assert.equal(await adminPage.locator('#default-language').evaluate((el) => el.tagName), 'SELECT');
		assert.ok((await adminPage.locator('#default-language option').count()) >= 5);
		assert.equal(await adminPage.inputValue('#default-codes'), 'always');
		await adminPage.screenshot({ path: `${SHOTS}/defaults-admin.png`, fullPage: true });
		ok('currency (top 5) and language are dropdowns; transfer codes default to "always"');

		// ---- always (the original behaviour): the sender is asked
		senderPage = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
		senderPage.setDefaultNavigationTimeout(90000);
		await senderPage.route('https://**/*', route => route.abort());
		senderPage.on('pageerror', (e) => problems.push(e.message));
		await signIn(senderPage, sender, 'Secret-123!');
		await senderPage.waitForURL((u) => u.pathname.startsWith('/app'), { timeout: 30000 });
		await senderPage.goto(BASE + '/app/transfer', { waitUntil: 'networkidle' });
		await senderPage.fill('#recipient-search', 'receiver qa');
		await senderPage.getByRole('button', { name: 'Find', exact: true }).click();
		await senderPage.getByRole('button', { name: `Select Receiver QA, account ${recipientAccount}`, exact: true }).waitFor();
		assert.equal(await senderPage.getByRole('button', { name: /Select Receiver QA/ }).count(), 2);
		assert.equal(await senderPage.getByRole('button', { name: /Select Receiver QA/, pressed: true }).count(), 0, 'ambiguous names are never selected automatically');
		await senderPage.getByRole('button', { name: `Select Receiver QA, account ${recipientAccount}`, exact: true }).click();
		await senderPage.getByRole('status').filter({ hasText: 'Recipient selected' }).waitFor();
		await senderPage.fill('#recipient-search', String(recipientAccount));
		assert.equal(await senderPage.getByRole('status').filter({ hasText: 'Recipient selected' }).count(), 0, 'editing clears the old selection');
		await senderPage.getByRole('button', { name: 'Find', exact: true }).click();
		await senderPage.getByRole('button', { name: `Select Receiver QA, account ${recipientAccount}`, exact: true }).click();
		await senderPage.getByRole('button', { name: 'Continue to amount', exact: true }).click();
		await senderPage.fill('#transfer-amount', '5');
		await senderPage.getByRole('button', { name: 'Review transfer', exact: true }).click();
		assert.ok((await senderPage.locator('dl').innerText()).includes(String(recipientAccount)), 'review shows the selected generated account number');
		await senderPage.goto(BASE + '/app/transfer', { waitUntil: 'networkidle' });
		await senderPage.fill('#recipient-search', 'no-such-recipient');
		await senderPage.getByRole('button', { name: 'Find', exact: true }).click();
		await senderPage.getByText('No matching recipients.', { exact: false }).waitFor();
		let releaseSearch, markSearchStarted;
		const searchStarted = new Promise(resolve => { markSearchStarted = resolve; });
		const searchReleased = new Promise(resolve => { releaseSearch = resolve; });
		await senderPage.route('**/api/users/search', async route => {
			const response = await route.fetch();
			markSearchStarted();
			await searchReleased;
			await route.fulfill({ response });
		}, { times: 1 });
		await senderPage.fill('#recipient-search', 'Receiver QA');
		await senderPage.getByRole('button', { name: 'Find', exact: true }).click();
		await searchStarted;
		await senderPage.fill('#recipient-search', 'a-different-query');
		const oldSearchReturned = senderPage.waitForResponse(response => response.url().endsWith('/api/users/search'));
		releaseSearch();
		await oldSearchReturned;
		await senderPage.getByRole('button', { name: 'Find', exact: true }).click();
		await senderPage.getByText('No matching recipients.', { exact: false }).waitFor();
		assert.equal(await senderPage.getByRole('button', { name: /Select Receiver QA/ }).count(), 0, 'stale search responses cannot restore old recipients');
		ok('name search disambiguates accounts, number search works, edits clear selection and unknown searches show feedback');
		await startTransfer(senderPage, receiver);
		await senderPage.waitForSelector('text=Required transfer verification', { timeout: 15000 });
		ok('policy "always": the codes are asked');

		// ---- the admin switches the system to "remember" and picks GBP
		await adminPage.selectOption('#default-codes', 'remember');
		await adminPage.selectOption('#default-currency', 'GBP');
		await adminPage.selectOption('#default-language', 'fr');
		await adminPage.click('button:has-text("Save defaults")');
		await adminPage.waitForSelector('text=Workspace defaults saved', { timeout: 15000 });
		await adminPage.reload({ waitUntil: 'networkidle' });
		await adminPage.waitForSelector('#default-currency');
		assert.equal(await adminPage.inputValue('#default-currency'), 'GBP');
		assert.equal(await adminPage.inputValue('#default-language'), 'fr');
		assert.equal(await adminPage.inputValue('#default-codes'), 'remember');
		assert.ok(/£/.test(await adminPage.locator('.form-text:has-text("Symbol")').innerText()), 'the symbol follows the currency');
		ok('defaults saved and reloaded from the server (GBP £, French, remember)');

		// ---- remember: asked once, never again
		await startTransfer(senderPage, receiver);
		await senderPage.waitForSelector('text=Required transfer verification', { timeout: 15000 });
		for (const key of ['cot', 'imf', 'tax']) {
			await senderPage.fill('#transfer-code', codes[key]);
			await senderPage.click('button:has-text("Verify code")');
			await senderPage.waitForFunction((k) => !document.querySelector('#transfer-code') || document.querySelector('#transfer-code').value === '', key, { timeout: 15000 });
		}
		await senderPage.waitForSelector('text=Ready for your final confirmation', { timeout: 15000 });
		await senderPage.getByRole('button', { name: /^Send [£$€¥]/ }).click();
		await senderPage.waitForSelector('text=Start a new transfer', { timeout: 20000 });
		ok('policy "remember": the first transfer asks for the three codes');
		await senderPage.screenshot({ path: `${SHOTS}/transfer-after-first.png` });

		await startTransfer(senderPage, receiver);
		await senderPage.waitForSelector('text=Ready for your final confirmation', { timeout: 15000 });
		assert.equal(await senderPage.locator('#transfer-code').count(), 0, 'no code input');
		await senderPage.waitForSelector('text=No transfer codes are needed', { timeout: 5000 });
		await senderPage.getByRole('button', { name: /^Send [£$€¥]/ }).click();
		await senderPage.waitForSelector('text=Start a new transfer', { timeout: 20000 });
		ok('the second transfer goes straight to the final confirmation, no codes');

		// ---- the admin sees it remembered on the user page, and resets just this user
		await adminPage.goto(BASE + `/admin/users/${me.id}`, { waitUntil: 'networkidle' });
		assert.equal(await adminPage.locator('#control-policy').count(), 0, 'code controls are not in the profile tab');
		await adminPage.getByRole('button', { name: 'Transfer codes', exact: true }).click();
		await adminPage.waitForSelector('[data-testid=codes-remembered]', { timeout: 20000 });
		assert.equal(await adminPage.locator('#control-cot').count(), 1, 'verification codes share the dedicated tab');
		assert.equal(await adminPage.locator('#control-status').count(), 0, 'profile controls stay in their own tab');
		for (const key of ['cot', 'imf', 'tax']) {
			assert.equal(await adminPage.getAttribute(`#control-${key}`, 'type'), 'password');
			await checkEyeButton(adminPage, `control-${key}`, `Show ${key.toUpperCase()} code`);
			await adminPage.getByRole('button', { name: `Show ${key.toUpperCase()} code`, exact: true }).click();
			assert.equal(await adminPage.getAttribute(`#control-${key}`, 'type'), 'text');
			assert.equal(await adminPage.inputValue(`#control-${key}`), codes[key]);
			await adminPage.getByRole('button', { name: `Hide ${key.toUpperCase()} code`, exact: true }).click();
			assert.equal(await adminPage.getAttribute(`#control-${key}`, 'type'), 'password');
		}
		await adminPage.getByRole('button', { name: 'Show COT code', exact: true }).click();
		await adminPage.fill('#control-cot', 'discarded-draft');
		await adminPage.getByRole('button', { name: 'Review code changes', exact: true }).click();
		assert.equal(await adminPage.getAttribute('#control-cot', 'type'), 'password', 'review re-masks revealed codes');
		await adminPage.getByRole('button', { name: 'Profile & controls', exact: true }).click();
		await adminPage.waitForSelector('#control-status');
		assert.equal(await adminPage.getByRole('button', { name: 'Confirm change', exact: true }).count(), 0, 'pending code confirmations do not leak between tabs');
		await adminPage.getByRole('button', { name: 'Transfer codes', exact: true }).click();
		assert.equal(await adminPage.inputValue('#control-cot'), codes.cot, 'switching tabs discards unsaved code edits');
		assert.ok(/remembered since/i.test(await adminPage.locator('[data-testid=codes-remembered]').innerText()));
		assert.equal(await adminPage.inputValue('#control-policy'), 'default');
		await adminPage.screenshot({ path: `${SHOTS}/user-codes-admin.png`, fullPage: true });
		await adminPage.click('button:has-text("Reset remembered codes")');
		await adminPage.click('button:has-text("Confirm change")');
		await adminPage.waitForFunction(() => /not remembered/i.test(document.querySelector('[data-testid=codes-remembered]')?.textContent || ''), null, { timeout: 15000 });
		ok('admin resets one user: the page shows the codes are no longer remembered');
		await startTransfer(senderPage, receiver);
		await senderPage.waitForSelector('text=Required transfer verification', { timeout: 15000 });
		ok('and that user is asked again');

		// ---- per-user override: never ask
		await adminPage.selectOption('#control-policy', 'off');
		await adminPage.click('button:has-text("Review policy change")');
		await adminPage.click('button:has-text("Confirm change")');
		await adminPage.waitForSelector('button:has-text("Confirm change")', { state: 'detached', timeout: 15000 });
		await startTransfer(senderPage, receiver);
		await senderPage.waitForSelector('text=Ready for your final confirmation', { timeout: 15000 });
		ok('a user set to "never ask" skips the codes whatever the system says');

		// ---- reset for everyone
		await adminPage.goto(BASE + '/admin/settings/defaults', { waitUntil: 'networkidle' });
		adminPage.once('dialog', (d) => d.accept());
		await adminPage.click('button:has-text("Reset for everyone")');
		await adminPage.waitForSelector('text=/Reset for \\d+ user|No user had their codes remembered/', { timeout: 15000 });
		ok('"Reset for everyone" works');
		assert.deepEqual(problems, [], 'no page errors: ' + problems.join(' | '));
		console.log('codes browser test passed');
	} catch (error) {
		console.error('FAIL', error.message);
		for (const [name, p] of [['sender', senderPage], ['admin', adminPage]]) { try { await p.screenshot({ path: `${SHOTS}/codes-fail-${name}.png`, fullPage: true }); console.error(`${name} page text:`, (await p.locator('main, body').first().innerText()).replace(/\s+/g, ' ').slice(0, 500)); } catch {} }
		process.exitCode = 1;
	} finally {
		await browser?.close();
		stop();
	}
})();
