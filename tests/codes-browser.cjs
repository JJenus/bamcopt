// Real-browser check of the transfer-code policy and the system defaults. Boots its own SQLite dev server.
// Run: pnpm test:codes (needs a global Playwright + installed Chromium; installs nothing). Screenshots: /tmp/opencode/shots.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { spawn } = require('node:child_process');
const { mkdirSync, rmSync } = require('node:fs');
const assert = require('node:assert/strict');

const PORT = 3119, BASE = `http://127.0.0.1:${PORT}`, DB = '.data/codes-browser.db', SHOTS = '/tmp/opencode/shots';
mkdirSync('.data', { recursive: true }); mkdirSync(SHOTS, { recursive: true });
rmSync(DB, { force: true });
const server = spawn('pnpm', ['exec', 'nuxt', 'dev', '--port', String(PORT)], {
	detached: true, stdio: 'ignore',
	env: { ...process.env, DB_DIALECT: 'sqlite', DB_STORAGE: DB, DB_SYNC: 'true', JWT_SECRET: 'codes-browser', TEST_DATABASE_URL: '', OTP_ON: 'false', GEOIP: 'off' },
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stop = () => { try { process.kill(-server.pid); } catch {} };
const ok = (msg) => console.log('  ok ', msg);
const json = async (res) => ({ status: res.status, data: await res.json().catch(() => ({})) });
const req = (method, path, body, token) => fetch(BASE + '/api' + path, { method, headers: { 'content-type': 'application/json', ...(token && { authorization: `Bearer ${token}` }) }, body: body && JSON.stringify(body) }).then(json);

async function signIn(page, email, password) {
	await page.goto(BASE + '/sign-in', { waitUntil: 'networkidle' });
	await page.fill('#signin-email', email);
	await page.fill('#signin-password', password);
	await page.click('button[type=submit]');
}

// walk the transfer wizard up to the point where the codes (or the final confirmation) appear
async function startTransfer(page, recipientEmail) {
	await page.goto(BASE + '/app/transfer', { waitUntil: 'networkidle' });
	await page.fill('#recipient-email', recipientEmail);
	await page.click('button:has-text("Find")');
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
		await sleep(4000);

		const adminLogin = (await req('POST', '/auth/login', { email: 'admin@bancopt.com', password: 'AdminPass123!' })).data;
		const stamp = Date.now(), sender = `from-${stamp}@example.test`, receiver = `to-${stamp}@example.test`;
		const reg = (email, name) => req('POST', '/auth/register', { name, email, password: 'Secret-123!', phone: '1', address: 'a', city: 'c', country: 'x' });
		const s = (await reg(sender, 'Sender QA')).data; await reg(receiver, 'Receiver QA');
		assert.equal((await req('POST', '/account/adjustments', { email: sender, direction: 'credit', amount: 500, reason: 'browser test' }, adminLogin.token)).status, 200);
		const users = (await req('GET', '/users', null, adminLogin.token)).data;
		const me = users.find((u) => u.email === sender);
		const codes = { cot: me.cot, imf: me.imf, tax: me.tax };

		browser = await chromium.launch();
		adminPage = await (await browser.newContext({ viewport: { width: 1360, height: 1000 } })).newPage();
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
		await signIn(senderPage, sender, 'Secret-123!');
		await senderPage.waitForURL((u) => u.pathname.startsWith('/app'), { timeout: 30000 });
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
		await adminPage.waitForSelector('[data-testid=codes-remembered]', { timeout: 20000 });
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
