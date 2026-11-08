// Real-browser check of the device-aware Security page and the /super area. Boots its own SQLite dev server.
// Run: pnpm test:super (needs a global Playwright + installed Chromium; installs nothing). Screenshots go to /tmp/opencode/shots.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { spawn } = require('node:child_process');
const { mkdirSync, rmSync } = require('node:fs');
const assert = require('node:assert/strict');

const PORT = 3118, BASE = `http://127.0.0.1:${PORT}`, DB = '.data/super-browser.db', SHOTS = '/tmp/opencode/shots';
mkdirSync('.data', { recursive: true }); mkdirSync(SHOTS, { recursive: true });
rmSync(DB, { force: true });
const server = spawn('pnpm', ['exec', 'nuxt', 'dev', '--port', String(PORT)], {
	detached: true, stdio: 'ignore',
	env: { ...process.env, DB_DIALECT: 'sqlite', DB_STORAGE: DB, DB_SYNC: 'true', JWT_SECRET: 'super-browser', TEST_DATABASE_URL: '', OTP_ON: 'false', GEOIP: 'off', SUPERADMIN_EMAIL: 'owner@example.test', SUPERADMIN_PASSWORD: 'Owner-Pass-123!' },
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stop = () => { try { process.kill(-server.pid); } catch {} };
const ok = (msg) => console.log('  ok ', msg);
const UA = { win: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', ff: 'Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0' };
const api = (path, body, ua, xff) => fetch(BASE + '/api' + path, { method: 'POST', headers: { 'content-type': 'application/json', 'user-agent': ua, 'x-forwarded-for': xff }, body: JSON.stringify(body) });

async function signIn(page, email, password) {
	await page.goto(BASE + '/sign-in', { waitUntil: 'networkidle' });
	await page.fill('#signin-email', email);
	await page.fill('#signin-password', password);
	await page.click('button[type=submit]');
}

(async () => {
	let browser;
	try {
		for (let i = 0; i < 180; i++) { try { if ((await fetch(BASE + '/api')).ok) break; } catch {} await sleep(1000); }
		await sleep(3000);
		// administrators with history: 3 sign-ins on Windows Chrome, 1 on Linux Firefox, 1 wrong password
		for (const [ua, xff] of [[UA.win, '203.0.113.20'], [UA.win, '203.0.113.20'], [UA.win, '203.0.113.21'], [UA.ff, '198.51.100.9']]) await api('/auth/login', { email: 'admin@bancopt.com', password: 'AdminPass123!' }, ua, xff);
		await api('/auth/login', { email: 'admin@bancopt.com', password: 'nope' }, UA.ff, '198.51.100.9');
		// the administrator does something: it must show up under Actions
		const adminLogin = await (await api('/auth/login', { email: 'admin@bancopt.com', password: 'AdminPass123!' }, UA.win, '203.0.113.21')).json();
		const made = await fetch(BASE + '/api/account-levels', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${adminLogin.token}` }, body: JSON.stringify({ title: 'QA level', dailyLimit: 100, maxBalanceLimit: 1000, accountLevel: 50 }) });
		assert.equal(made.status, 200);

		browser = await chromium.launch();

		// ---- super admin, desktop
		const ctx = await browser.newContext({ viewport: { width: 1360, height: 900 } });
		const page = await ctx.newPage();
		const problems = []; page.on('pageerror', (e) => problems.push(e.message));
		await signIn(page, 'owner@example.test', 'Owner-Pass-123!');
		await page.waitForURL((u) => u.pathname === '/super', { timeout: 30000 });
		ok('super admin lands on /super');
		await page.waitForSelector('text=admin@bancopt.com', { timeout: 20000 });
		assert.equal(await page.locator('text=owner@example.test').count() > 0, true); // own e-mail only in the top bar
		assert.equal(await page.locator('tbody tr').count(), 1, 'only the administrator is listed');
		assert.ok(await page.locator('tbody tr').first().innerText().then((t) => /Chrome on Windows/.test(t) && /203\.0\.113\.21/.test(t)));
		await page.screenshot({ path: `${SHOTS}/super-admins-desktop.png` });
		ok('administrators table shows last device and IP');
		await page.waitForSelector('h2:text-is("Housekeeping")', { timeout: 15000 });
		await page.click('button:has-text("Clean up now")');
		await page.waitForSelector('[role=status]:has-text("Nothing was past its retention")', { timeout: 15000 });
		ok('Housekeeping shows retention and cleans up on demand');

		await page.click('tbody tr a:has-text("Open")');
		await page.waitForURL(/\/super\/admins\//, { timeout: 20000 });
		await page.waitForSelector('text=Chrome on Windows', { timeout: 20000 });
		assert.equal(await page.locator('section:has(h2:text-is("Devices")) article:has-text("Chrome on Windows")').count(), 1, 'one card for 3 sign-ins');
		assert.ok(/4 sign-ins/.test(await page.locator('section:has(h2:text-is("Devices")) article:has-text("Chrome on Windows")').innerText()));
		assert.ok(await page.locator('section:has(h2:text-is("Devices")) article:has-text("Firefox on Linux")').count() === 1);
		ok('4 sign-ins from one browser are one device card');
		assert.ok(await page.locator('tbody tr').count() >= 5, 'full history rows');
		await page.selectOption('#history-filter', 'attempt_failed');
		await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 1);
		assert.ok(/Failed/.test(await page.locator('tbody tr').innerText()));
		ok('history filter shows only failed attempts');
		await page.selectOption('#history-filter', '');
		await page.waitForSelector('text=Created account level "QA level"', { timeout: 15000 });
		ok('the administrator\'s action is listed under Actions');
		await page.selectOption('#actions-area', 'deposit');
		await page.waitForSelector('text=No recorded actions in this area', { timeout: 15000 });
		await page.selectOption('#actions-area', 'settings');
		await page.waitForSelector('text=Created account level "QA level"', { timeout: 15000 });
		ok('the Actions area filter works');
		await page.screenshot({ path: `${SHOTS}/super-admin-detail-desktop.png`, fullPage: true });

		const adminStats = () => fetch(BASE + '/api/admin/stats', { headers: { authorization: `Bearer ${adminLogin.token}` } }).then((r) => r.status);
		assert.equal(await adminStats(), 200, 'administrator token works before');
		page.once('dialog', (d) => d.accept());
		await page.click('button:has-text("Sign out everywhere")');
		await page.waitForSelector('[role=status]:has-text("Signed out")', { timeout: 15000 });
		assert.equal(await adminStats(), 401, 'administrator token is dead after');
		ok('super admin signs an administrator out everywhere');
		await page.selectOption('#history-filter', 'logout');
		await page.waitForFunction(() => /Signed out/.test(document.querySelector('tbody')?.innerText || ''));
		ok('the forced sign-outs appear in the history');

		await page.goto(BASE + '/admin', { waitUntil: 'networkidle' });
		await page.waitForURL((u) => u.pathname === '/super', { timeout: 15000 });
		ok('super admin opening /admin is sent back to /super');
		assert.deepEqual(problems, [], 'no page errors: ' + problems.join(' | '));

		// ---- super admin, phone
		const phone = await browser.newContext({ viewport: { width: 390, height: 844 } });
		const pp = await phone.newPage();
		await signIn(pp, 'owner@example.test', 'Owner-Pass-123!');
		await pp.waitForSelector('text=admin@bancopt.com >> visible=true', { timeout: 30000 });
		assert.ok(await pp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'no horizontal overflow on a phone');
		await pp.screenshot({ path: `${SHOTS}/super-admins-phone.png` });
		ok('phone layout fits the screen');

		// ---- an administrator cannot enter /super
		const adm = await (await browser.newContext()).newPage();
		await signIn(adm, 'admin@bancopt.com', 'AdminPass123!');
		await adm.waitForURL((u) => u.pathname.startsWith('/admin'), { timeout: 30000 });
		await adm.goto(BASE + '/super', { waitUntil: 'networkidle' });
		await adm.waitForURL((u) => !u.pathname.startsWith('/super'), { timeout: 15000 });
		ok('an administrator is turned away from /super');

		// ---- a customer's Security page: one device, "This device"
		const cctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
		const cp = await cctx.newPage();
		await cp.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
		const ua = await cp.evaluate(() => navigator.userAgent);
		const email = `cust-${Date.now()}@example.test`;
		await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Cust QA', email, password: 'Secret-123!', phone: '1', address: 'a', city: 'c', country: 'x' }) });
		for (let i = 0; i < 3; i++) await api('/auth/login', { email, password: 'Secret-123!' }, ua, '203.0.113.50'); // earlier sign-ins from this same browser
		await signIn(cp, email, 'Secret-123!');
		await cp.waitForURL((u) => u.pathname.startsWith('/app'), { timeout: 30000 });
		await cp.goto(BASE + '/app/settings/security', { waitUntil: 'networkidle' });
		await cp.waitForSelector('text=This device', { timeout: 20000 });
		assert.equal(await cp.locator('article:has-text("This device")').count(), 1, 'one device');
		assert.ok(/4 sign-ins/.test(await cp.locator('article:has-text("This device")').innerText()), '3 + 1 sign-ins on one card');
		await cp.screenshot({ path: `${SHOTS}/security-customer.png`, fullPage: true });
		ok('customer Security page: 4 sign-ins, one device, marked "This device"');

		// another device signs in, then the customer signs it out from this page
		const other = await (await api('/auth/login', { email, password: 'Secret-123!' }, UA.ff, '198.51.100.77')).json();
		const alive = () => fetch(BASE + '/api/account/' + other.userId, { headers: { authorization: `Bearer ${other.token}` } }).then((r) => r.status);
		assert.notEqual(await alive(), 401, 'other device is signed in');
		await cp.reload({ waitUntil: 'networkidle' });
		await cp.waitForSelector('article:has-text("Firefox on Linux")', { timeout: 20000 });
		assert.equal(await cp.locator('button:has-text("Sign out all other devices")').count(), 1);
		cp.once('dialog', (d) => d.accept());
		await cp.click('article:has-text("Firefox on Linux") button:has-text("Sign out")');
		await cp.waitForSelector('[role=status]:has-text("Signed out 1 session")', { timeout: 15000 });
		assert.equal(await alive(), 401, 'other device was signed out');
		assert.equal(await cp.locator('button:has-text("Sign out all other devices")').count(), 0, 'nothing left to sign out');
		assert.ok(await cp.locator('article:has-text("This device")').count() === 1, 'this device is untouched');
		await cp.screenshot({ path: `${SHOTS}/security-customer-after-signout.png`, fullPage: true });
		ok('customer signs another device out from the Security page');
		// signing out in the browser ends the session on the server too
		const raw = (await ctx.cookies()).find((c) => c.name === 'auth');
		const superToken = JSON.parse(decodeURIComponent(raw.value)).token;
		const meStatus = () => fetch(BASE + '/api/admin/stats', { headers: { authorization: `Bearer ${superToken}` } }).then((r) => r.status);
		assert.notEqual(await meStatus(), 401, 'super token is live before sign-out');
		await page.goto(BASE + '/super', { waitUntil: 'networkidle' });
		await page.click('button:has-text("Sign out")');
		await page.waitForURL((u) => u.pathname === '/', { timeout: 15000 });
		await sleep(500);
		assert.equal(await meStatus(), 401, 'token is dead on the server after clicking Sign out');
		ok('Sign out ends the session on the server');
		console.log('super browser test passed');
	} catch (error) {
		console.error('FAIL', error.message);
		process.exitCode = 1;
	} finally {
		await browser?.close();
		stop();
	}
})();
