// Real-browser check of the /sign-in page. Boots its own SQLite dev server.
// Run: pnpm test:signin (OTP on) / pnpm test:signin-otp-off. Uses a global Playwright + installed Chromium, never installs anything.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { spawn } = require('node:child_process');
const { mkdirSync, rmSync } = require('node:fs');
const assert = require('node:assert/strict');

const PORT = 3117, BASE = `http://127.0.0.1:${PORT}`, DB = '.data/signin-browser.db';
const OTP_ON = !/^(false|0|off|no)$/i.test((process.env.OTP_ON || '').trim());
mkdirSync('.data', { recursive: true });
rmSync(DB, { force: true });
const server = spawn('pnpm', ['exec', 'nuxt', 'dev', '--port', String(PORT)], {
	detached: true, stdio: 'ignore',
	env: { ...process.env, DB_DIALECT: 'sqlite', DB_STORAGE: DB, DB_SYNC: 'true', JWT_SECRET: 'signin-browser', TEST_DATABASE_URL: '' },
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stop = () => { try { process.kill(-server.pid); } catch {} };

(async () => {
	let browser;
	try {
		for (let i = 0; i < 180; i++) { try { if ((await fetch(BASE + '/api')).ok) break; } catch {} await sleep(1000); }
		await sleep(3000);
		const email = `signin-${Date.now()}@example.test`, password = 'Secret-123!';
		const reg = await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Sign In QA', email, password, phone: '1', address: 'a', city: 'c', country: 'x' }) });
		assert.equal(reg.status, 200);

		browser = await chromium.launch();
		const page = await browser.newPage();
		await page.goto(BASE + '/sign-in', { waitUntil: 'networkidle' });
		await page.fill('#signin-email', email);
		await page.fill('#signin-password', password);
		await page.click('button[type=submit]');
		if (OTP_ON) {
			await page.waitForSelector('#signin-code', { timeout: 20000 });
			console.log('  ok  OTP on: the code form appears');
			await page.click('button[type=submit]'); // the dev code is pre-filled when no mail server is set
		} else {
			assert.equal(await page.locator('#signin-code').count(), 0, 'no code form expected');
		}
		await page.waitForURL((url) => url.pathname.startsWith('/app'), { timeout: 30000 });
		console.log(`  ok  signed in and redirected to ${new URL(page.url()).pathname} (OTP ${OTP_ON ? 'on' : 'off'})`);
		const cookie = (await page.context().cookies()).find((c) => c.name === 'auth');
		assert.ok(cookie, 'auth cookie set');
		console.log('  ok  auth cookie is set');
		console.log('signin browser test passed');
	} catch (error) {
		console.error('FAIL', error.message);
		process.exitCode = 1;
	} finally {
		await browser?.close();
		stop();
	}
})();
