/**
 * End-to-end smoke test: boots the Nitro dev server against a throw-away SQLite file and
 * checks auth, authorization and (above all) the money invariants. Run: `pnpm test`
 */
import { spawn } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import pg from "pg";

const PORT = 3111;
const BASE = `http://localhost:${PORT}`;
const DB = ".data/smoke.db";
const SECRET = "smoke-secret";
// OTP_ON=false runs the whole suite with password-only sign-in (`pnpm test:otp-off`)
const OTP_ON = !/^(false|0|off|no)$/i.test((process.env.OTP_ON || "").trim());
// TEST_DATABASE_URL=postgres://... runs against PostgreSQL (needs an empty database); otherwise SQLite
const PG_URL = process.env.TEST_DATABASE_URL;
if (PG_URL) {
	const c = new pg.Client({ connectionString: PG_URL });
	await c.connect();
	await c.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
	await c.end();
}

mkdirSync(".data", { recursive: true });
rmSync(DB, { force: true });

	const server = spawn("pnpm", ["exec", "nuxt", "dev", "--port", String(PORT)], {
	env: {
		...process.env, DB_SYNC: "true", JWT_SECRET: SECRET, GEOIP: "off", SUPERADMIN_EMAIL: "super@x.com", SUPERADMIN_PASSWORD: "SuperPass123!",
		...(PG_URL ? { DATABASE_URL: PG_URL } : { DB_DIALECT: "sqlite", DB_STORAGE: DB }),
	},
	stdio: "ignore",
	detached: true,
});

let passed = 0;
const failures = [];
const check = (name, ok, extra = "") => {
	if (ok) passed++;
	else failures.push(`${name} ${extra}`);
	console.log(`${ok ? "  ok " : "FAIL "} ${name}${ok ? "" : " " + extra}`);
};

// transfers need the user's COT/IMF/TAX codes: inject them (unless the test sets _noCodes / its own codes)
const CODES = new Map();
const call = async (method, path, { token, body, headers } = {}) => {
	if (method === "POST" && path === "/api/transactions" && body) {
		if (body._noCodes) body = Object.fromEntries(Object.entries(body).filter(([k]) => k !== "_noCodes"));
		else if (!body.codes && CODES.has(token)) body = { ...body, codes: CODES.get(token) };
	}
	const res = await fetch(BASE + path, {
		method,
		signal: AbortSignal.timeout(30000),
		headers: { "content-type": "application/json", ...(token && { authorization: `Bearer ${token}` }), ...headers },
		body: body && JSON.stringify(body),
	});
	const text = await res.text();
	let data;
	try { data = JSON.parse(text); } catch { data = text; }
	return { status: res.status, data };
};

const profile = (email) => ({ name: email.split("@")[0], email, password: "secret123", phone: "1", address: "a", city: "c", country: "x" });
const sendBody = (to, amount, extra = {}) => ({
	amount, type: "send",
	beneficiary: { userId: to.id, name: to.name, destinationAccount: to.email, bank: "Bancopt" }, ...extra,
});

async function main() {
	for (let i = 0; i < 180; i++) {
		try { if ((await fetch(BASE + "/api")).ok) break; } catch {}
		await new Promise((r) => setTimeout(r, 1000));
		if (i === 179) throw new Error("server did not start");
	}

	console.log("\nauth");
	const evil = await call("POST", "/api/auth/register", { body: { ...profile("alice@x.com"), userType: "admin", verified: true, status: "VIP" } });
	check("register works", evil.status === 200, JSON.stringify(evil.data));
	check("register ignores userType/verified/status", evil.data.user.userType === "user" && evil.data.user.verified === false && evil.data.user.status === "ACTIVE");
	check("register hides password hash", evil.data.user.password === undefined);
	check("duplicate e-mail -> 409", (await call("POST", "/api/auth/register", { body: profile("alice@x.com") })).status === 409);
	check("short password -> 422", (await call("POST", "/api/auth/register", { body: { ...profile("z@x.com"), password: "1" } })).status === 422);
	const bobReg = await call("POST", "/api/auth/register", { body: profile("bob@x.com") });
	const adminReg = await call("POST", "/api/auth/register", { body: profile("admin@x.com") });
	if (PG_URL) {
		const c = new pg.Client({ connectionString: PG_URL });
		await c.connect();
		await c.query(`UPDATE users SET user_type='admin' WHERE email='admin@x.com'`);
		await c.end();
	} else {
		await new Promise((resolve, reject) => {
			const db = new sqlite3.Database(DB);
			db.run("UPDATE Users SET user_type='admin' WHERE email='admin@x.com'", (e) => (e ? reject(e) : resolve()));
		});
	}


	// login = password step -> OTP challenge -> session
	const login = async (email, password = "secret123") => {
		const step1 = await call("POST", "/api/auth/login", { body: { email, password } });
		if (step1.status !== 200 || !OTP_ON) return step1;
		return call("POST", "/api/auth/verify-otp", { body: { challenge: step1.data.challenge, code: step1.data.devOtp } });
	};
	check("wrong password -> 401", (await call("POST", "/api/auth/login", { body: { email: "alice@x.com", password: "nope" } })).status === 401);
	check("unknown user -> 401", (await call("POST", "/api/auth/login", { body: { email: "ghost@x.com", password: "secret123" } })).status === 401);

	let otpOk;
	if (OTP_ON) {
		const s1 = await call("POST", "/api/auth/login", { body: { email: "alice@x.com", password: "secret123" } });
		check("password step returns a challenge, NOT a session", s1.status === 200 && !!s1.data.challenge && s1.data.token === undefined && s1.data.user === undefined);
		check("challenge is not usable as a session", (await call("GET", `/api/account/${bobReg.data.userId}`, { token: s1.data.challenge })).status === 401);
		check("wrong code -> 401", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: s1.data.devOtp === "000000" ? "111111" : "000000" } })).status === 401);
		check("malformed code -> 422", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: "12" } })).status === 422);
		otpOk = await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: s1.data.devOtp } });
		check("right code returns the session", otpOk.status === 200 && !!otpOk.data.token && otpOk.data.user.email === "alice@x.com");
		check("code is single-use", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: s1.data.devOtp } })).status === 401);
		const s2 = await call("POST", "/api/auth/login", { body: { email: "alice@x.com", password: "secret123" } });
		let locked;
		for (let i = 0; i < 6; i++) locked = await call("POST", "/api/auth/verify-otp", { body: { challenge: s2.data.challenge, code: s2.data.devOtp === "123456" ? "654321" : "123456" } });
		check("brute force is cut off after 5 tries", locked.status === 401 && /Too many/.test(locked.data.message));
		check("...even with the right code afterwards", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s2.data.challenge, code: s2.data.devOtp } })).status === 401);
		check("register tells the client an OTP step exists", evil.data.otpRequired === true);
	} else {
		const direct = await call("POST", "/api/auth/login", { body: { email: "alice@x.com", password: "secret123" } });
		check("OTP off: the password alone returns the session", direct.status === 200 && !!direct.data.token && direct.data.user.email === "alice@x.com" && direct.data.challenge === undefined, JSON.stringify(direct.data).slice(0, 120));
		check("OTP off: the session works", (await call("GET", `/api/account/${direct.data.userId}`, { token: direct.data.token })).status === 200);
		check("OTP off: verify-otp is refused", (await call("POST", "/api/auth/verify-otp", { body: { challenge: "x".repeat(20), code: "123456" } })).status === 400);
		check("OTP off: register tells the client to sign in directly", evil.data.otpRequired === false && !!evil.data.token);
		otpOk = direct;
	}
	const [a, b, adm] = await Promise.all([login("alice@x.com"), login("bob@x.com"), login("admin@x.com")]);
	check("login (2 steps) ends with a session", a.status === 200 && !!a.data.token);
	const alice = { id: a.data.userId, name: "alice", email: "alice@x.com", token: a.data.token };
	const bob = { id: b.data.userId, name: "bob", email: "bob@x.com", token: b.data.token };
	const admin = { id: adm.data.userId, token: adm.data.token };
	check("admin token carries role", jwt.decode(admin.token).userType === "admin");

	const loadCodes = async (...users) => {
		const list = (await call("GET", "/api/users", { token: admin.token })).data;
		for (const u of users) {
			const { cot, imf, tax } = list.find((x) => x.id === u.id);
			CODES.set(u.token, { cot, imf, tax });
		}
	};
	await loadCodes(alice, bob);

	console.log("\nauthorization");
	check("no token -> 401", (await call("GET", `/api/account/${alice.id}`)).status === 401);
	check("bad token -> 401", (await call("GET", `/api/account/${alice.id}`, { token: "x.y.z" })).status === 401);
	check("read own account", (await call("GET", `/api/account/${alice.id}`, { token: alice.token })).status === 200);
	check("read other's account -> 403", (await call("GET", `/api/account/${alice.id}`, { token: bob.token })).status === 403);
	check("read other's transactions -> 403", (await call("GET", `/api/transactions/${alice.id}`, { token: bob.token })).status === 403);
	const allUsers = (await call("GET", "/api/users", { token: admin.token })).data;
	check("admin lists users (a default admin may be seeded too)", [alice.id, bob.id, admin.id].every((id) => allUsers.some((u) => u.id === id)));
	const contacts = await call("GET", "/api/users", { token: alice.token });
	check("non-admin only sees admin contacts (name only)", contacts.status === 200 && contacts.data.length >= 1 && contacts.data.some((c) => c.id === admin.id) && contacts.data.every((c) => c.userType === "admin" && c.email === undefined));
	const pub = await call("GET", `/api/users/${alice.id}`, { token: bob.token });
	check("other users only get a public profile", pub.status === 200 && pub.data.email === undefined && pub.data.cot === undefined && pub.data.name === "alice");
	const upd = await call("PUT", `/api/users/${alice.id}`, { token: alice.token, body: { name: "Alice A", verified: true, status: "VIP", cot: "1" } });
	check("user can edit profile, not privileged fields", upd.data.name === "Alice A" && upd.data.verified === false && upd.data.status === "ACTIVE");
	check("admin can verify user", (await call("PUT", `/api/users/${alice.id}`, { token: admin.token, body: { verified: true } })).data.verified === true);
	check("cannot edit someone else", (await call("PUT", `/api/users/${alice.id}`, { token: bob.token, body: { name: "x" } })).status === 403);
	check("user cannot app-settings write", (await call("POST", "/api/app-settings", { token: alice.token, body: { defaultLanguage: "en", defaultBaseCurrency: "USD" } })).status === 403);
	check("user notify non-admin -> 403", (await call("POST", "/api/notifications", { token: alice.token, body: { userId: bob.id, title: "hi", message: "hello" } })).status === 403);
	check("user notify admin ok", (await call("POST", "/api/notifications", { token: alice.token, body: { userId: admin.id, title: "ID", message: "uploaded" } })).status === 200);

	console.log("\nmoney");
	const bal = async (u) => (await call("GET", `/api/account/${u.id}`, { token: u.token })).data.amount;
	check("new account starts at 0 (number)", (await bal(alice)) === 0);
	check("top-up needs admin", (await call("POST", "/api/account", { token: alice.token, body: { email: "alice@x.com", amount: 100 } })).status === 403);
	check("top-up rejects negative", (await call("POST", "/api/account", { token: admin.token, body: { email: "alice@x.com", amount: -5 } })).status === 422);
	const top = await call("POST", "/api/account", { token: admin.token, body: { email: "alice@x.com", amount: 100.5 } });
	check("top-up keeps decimals", top.status === 200 && top.data.amount === 100.5, JSON.stringify(top.data));
	check("PUT /account cannot change balance", (await call("PUT", "/api/account", { token: admin.token, body: { userId: alice.id, amount: 999999, accountLevel: 2 } })).data.amount === 100.5);

	const t1 = await call("POST", "/api/transactions", { token: alice.token, body: sendBody(bob, 30.25) });
	check("transfer ok", t1.status === 200 && t1.data.status === "completed", JSON.stringify(t1.data));
	check("sender debited exactly", (await bal(alice)) === 70.25);
	check("receiver credited exactly", (await bal(bob)) === 30.25);
	await call("POST", "/api/transactions", { token: alice.token, body: sendBody(bob, 10) });
	check("credit is numeric addition (30.25 + 10, not '30.2510')", (await bal(bob)) === 40.25);

	const spoof = await call("POST", "/api/transactions", { token: alice.token, body: { ...sendBody(bob, 1), senderId: bob.id } });
	check("senderId in body is ignored", spoof.status === 200 && spoof.data.senderId === alice.id);
	check("overdraft -> 422", (await call("POST", "/api/transactions", { token: alice.token, body: sendBody(bob, 5000) })).status === 422);
	check("zero -> 422", (await call("POST", "/api/transactions", { token: alice.token, body: sendBody(bob, 0) })).status === 422);
	check("negative -> 422", (await call("POST", "/api/transactions", { token: alice.token, body: sendBody(bob, -10) })).status === 422);
	check("3 decimals -> 422", (await call("POST", "/api/transactions", { token: alice.token, body: sendBody(bob, 1.005) })).status === 422);
	check("send to self -> 422", (await call("POST", "/api/transactions", { token: alice.token, body: sendBody(alice, 1) })).status === 422);
	check("failed attempts moved no money", (await bal(alice)) === 59.25 && (await bal(bob)) === 41.25);

	const list = await call("GET", `/api/transactions/${bob.id}`, { token: bob.token });
	check("receiver sees incoming transfers", list.data.filter((t) => t.receiverId === bob.id && t.type === "send" && t.status === "completed").length === 3);
	const failedRows = (await call("GET", `/api/transactions/${alice.id}`, { token: alice.token })).data.filter((t) => t.status === "failed");
	check("refused transfer is recorded as failed", failedRows.length >= 1);
	const receipt = await call("GET", `/api/transactions/find/${t1.data.transactionId}`);
	check("public receipt works without token, hides ids", receipt.status === 200 && receipt.data.amount === 30.25 && receipt.data.senderId === undefined && receipt.data.beneficiary?.userId === undefined);

	console.log("\nconcurrency (no overdraft, no lost money)");
	const before = (await bal(alice)) + (await bal(bob));
	const results = await Promise.all(Array.from({ length: 6 }, () => call("POST", "/api/transactions", { token: alice.token, body: sendBody(bob, 20) })));
	const okCount = results.filter((r) => r.status === 200).length;
	const after = { alice: await bal(alice), bob: await bal(bob) };
	check("never more successes than funds allow", okCount <= 2, `ok=${okCount}`);
	check("balance never negative", after.alice >= 0);
	check("money conserved across accounts", after.alice + after.bob === before, JSON.stringify(after));
	check("balances match successful transfers", after.alice === 59.25 - 20 * okCount, JSON.stringify({ after, okCount }));

	console.log("\nlimits (account level) and refunds");
	const mk = async (name) => {
		const r = await call("POST", "/api/auth/register", { body: profile(`${name}@x.com`) });
		return { id: r.data.userId, name, email: `${name}@x.com`, token: r.data.token };
	};
	const [carol, dave, erin, frank] = [await mk("carol"), await mk("dave"), await mk("erin"), await mk("frank")];
	const topUp = (email, amount) => call("POST", "/api/account", { token: admin.token, body: { email, amount } });
	await loadCodes(carol, dave, erin, frank);
	for (const [u, amt] of [[carol, 1000], [dave, 450], [erin, 1000], [frank, 100]]) await topUp(u.email, amt);
	const lvl = await call("POST", "/api/account-levels", { token: admin.token, body: { title: "Basic", dailyLimit: 100, maxBalanceLimit: 500, accountLevel: 1 } });
	check("admin creates level 1 (daily 100, max balance 500)", lvl.status === 200, JSON.stringify(lvl.data));

	const wd = (amount) => ({ amount, type: "withdrawal", beneficiary: { name: "X", destinationAccount: "0123456789", bank: "Some Bank" } });
	check("within daily limit ok", (await call("POST", "/api/transactions", { token: carol.token, body: sendBody(bob, 60) })).status === 200);
	const over = await call("POST", "/api/transactions", { token: carol.token, body: sendBody(bob, 50) });
	check("over the daily limit -> 422 with reason", over.status === 422 && /Daily transfer limit/.test(over.data.message), JSON.stringify(over.data));
	check("exactly up to the limit is ok", (await call("POST", "/api/transactions", { token: carol.token, body: sendBody(bob, 40) })).status === 200);
	check("limit reached -> 422 (also for bank transfers)", (await call("POST", "/api/transactions", { token: carol.token, body: wd(1) })).status === 422);
	check("refused attempts moved no money", (await bal(carol)) === 900);

	check("top-up above max balance -> 422", (await topUp("dave@x.com", 100)).status === 422);
	check("top-up exactly to max balance ok", (await topUp("dave@x.com", 50)).data.amount === 500);
	const cap = await call("POST", "/api/transactions", { token: erin.token, body: sendBody(dave, 1) });
	check("receiving above max balance -> 422, no balance leaked", cap.status === 422 && !/\d{3}/.test(cap.data.message), JSON.stringify(cap.data));
	check("sender not debited when beneficiary is capped", (await bal(erin)) === 1000 && (await bal(dave)) === 500);

	const w1 = await call("POST", "/api/transactions", { token: frank.token, body: wd(40) });
	check("bank transfer debits the sender", w1.status === 200 && (await bal(frank)) === 60);
	check("only admins can change status", (await call("PUT", "/api/transactions", { token: frank.token, body: { id: w1.data.id, status: "failed" } })).status === 403);
	check("failing a bank transfer refunds the sender", (await call("PUT", "/api/transactions", { token: admin.token, body: { id: w1.data.id, status: "failed" } })).status === 200 && (await bal(frank)) === 100);
	check("marking failed again does not refund twice", (await call("PUT", "/api/transactions", { token: admin.token, body: { id: w1.data.id, status: "failed" } })).status === 200 && (await bal(frank)) === 100);
	check("failed transaction cannot be reopened", (await call("PUT", "/api/transactions", { token: admin.token, body: { id: w1.data.id, status: "completed" } })).status === 422);
	const w2 = await call("POST", "/api/transactions", { token: frank.token, body: wd(90) });
	check("failed/refunded transfers do not count towards the daily limit", w2.status === 200 && (await bal(frank)) === 10, JSON.stringify(w2.data));
	await Promise.all([1, 2, 3].map(() => call("PUT", "/api/transactions", { token: admin.token, body: { id: w2.data.id, status: "failed" } })));
	check("concurrent 'failed' clicks refund exactly once", (await bal(frank)) === 100);
	const history = (await call("GET", `/api/transactions/${frank.id}`, { token: frank.token })).data;
	check("each refund has a ledger row", history.filter((x) => /^Refund of /.test(x.notes || "")).length === 2);
	const before2 = [await bal(alice), await bal(bob)];
	check("internal transfer cannot be marked failed", (await call("PUT", "/api/transactions", { token: admin.token, body: { id: t1.data.id, status: "failed" } })).status === 422);
	check("...and no money moved", (await bal(alice)) === before2[0] && (await bal(bob)) === before2[1]);

	await call("PUT", "/api/account-levels", { token: admin.token, body: { id: lvl.data.id, title: "Basic", dailyLimit: 0, maxBalanceLimit: 0, accountLevel: 1 } });
	check("limit 0 means unlimited", (await call("POST", "/api/transactions", { token: carol.token, body: sendBody(bob, 5) })).status === 200 && (await topUp("dave@x.com", 1000)).status === 200);

	console.log("\ntransfer codes (COT / IMF / TAX)");
	const noCodesIn = (o) => ["cot", "imf", "tax"].every((k) => o[k] === undefined);
	check("session user has no codes", noCodesIn(otpOk.data.user) && noCodesIn(evil.data.user));
	check("own profile has no codes", noCodesIn((await call("GET", `/api/users/${alice.id}`, { token: alice.token })).data));
	check("profile update response has no codes", noCodesIn((await call("PUT", `/api/users/${alice.id}`, { token: alice.token, body: { name: "Alice A" } })).data));
	const adminView = (await call("GET", `/api/users/${alice.id}`, { token: admin.token })).data;
	check("admin can see the codes", /^\d{4}$/.test(adminView.cot) && /^\d{4}$/.test(adminView.imf) && /^\d{4}$/.test(adminView.tax));
	check("admin list shows codes too", /^\d{4}$/.test((await call("GET", "/api/users", { token: admin.token })).data.find((u) => u.id === alice.id).tax));

	const own = CODES.get(bob.token);
	const wrongOf = (c) => (c === "0000" ? "1111" : "0000");
	check("verify-code: right code ok", (await call("POST", "/api/transactions/verify-code", { token: bob.token, body: { step: "cot", code: own.cot } })).status === 200);
	check("verify-code: wrong code -> 422", (await call("POST", "/api/transactions/verify-code", { token: bob.token, body: { step: "imf", code: wrongOf(own.imf) } })).status === 422);
	check("verify-code: unknown step -> 422", (await call("POST", "/api/transactions/verify-code", { token: bob.token, body: { step: "pin", code: "1" } })).status === 422);
	check("verify-code needs a session", (await call("POST", "/api/transactions/verify-code", { body: { step: "cot", code: "1" } })).status === 401);

	const balBefore = await bal(bob);
	check("transfer without codes -> 422", (await call("POST", "/api/transactions", { token: bob.token, body: { ...sendBody(alice, 1), _noCodes: true } })).status === 422);
	const badTax = await call("POST", "/api/transactions", { token: bob.token, body: sendBody(alice, 1, { codes: { ...own, tax: wrongOf(own.tax) } }) });
	check("transfer with a wrong code -> 422 and names it", badTax.status === 422 && /tax code/i.test(badTax.data.message), JSON.stringify(badTax.data));
	check("...and no money moved", (await bal(bob)) === balBefore);
	check("transfer with right codes works", (await call("POST", "/api/transactions", { token: bob.token, body: sendBody(alice, 1) })).status === 200);

	await call("PUT", `/api/users/${bob.id}`, { token: admin.token, body: { cot: "9999" } });
	check("old code stops working after admin changes it", (await call("POST", "/api/transactions", { token: bob.token, body: sendBody(alice, 1) })).status === 422);
	check("new code works", (await call("POST", "/api/transactions", { token: bob.token, body: sendBody(alice, 1, { codes: { ...own, cot: "9999" } }) })).status === 200);
	check("user cannot change their own codes", (await call("PUT", `/api/users/${bob.id}`, { token: bob.token, body: { cot: "1234" } })).status === 200 && (await call("GET", `/api/users/${bob.id}`, { token: admin.token })).data.cot === "9999");

	const gina = await mk("gina");
	await loadCodes(gina);
	await topUp("gina@x.com", 50);
	const gc = CODES.get(gina.token);
	let last;
	for (let i = 0; i < 5; i++) last = await call("POST", "/api/transactions/verify-code", { token: gina.token, body: { step: "cot", code: wrongOf(gc.cot) } });
	check("5 wrong codes are rejected", last.status === 422);
	const locked2 = await call("POST", "/api/transactions/verify-code", { token: gina.token, body: { step: "cot", code: gc.cot } });
	check("then guessing is locked out (429), even with the right code", locked2.status === 429, JSON.stringify(locked2.data));
	check("transfers are locked too", (await call("POST", "/api/transactions", { token: gina.token, body: sendBody(bob, 1) })).status === 429 && (await bal(gina)) === 50);

	console.log("\npassword reset / e-mail verification");
	const reset = (token, password = "newpass123") => call("POST", "/api/auth/reset-password", { body: { token, password } });
	check("raw user id is not a valid reset token", (await reset(alice.id)).status === 401);
	check("session token is not a reset token", (await reset(alice.token)).status === 401);
	const good = jwt.sign({ sub: alice.id, purpose: "reset-password" }, SECRET, { expiresIn: "30m" });
	check("signed reset token works", (await reset(good)).status === 200);
	check("login with new password", (await login("alice@x.com", "newpass123")).status === 200);
	check("old password rejected", (await login("alice@x.com")).status === 401);
	check("expired reset token rejected", (await reset(jwt.sign({ sub: alice.id, purpose: "reset-password" }, SECRET, { expiresIn: -10 }))).status === 401);
	check("reset request never reveals accounts", (await call("POST", "/api/auth/request-password-reset", { body: { email: "ghost@x.com" } })).status === 200);
	const verify = await call("POST", "/api/auth/verify-email", { body: { token: jwt.sign({ sub: bob.id, purpose: "verify-email" }, SECRET, { expiresIn: "1d" }) } });
	check("e-mail verification works", verify.status === 200 && verify.data.emailVerified === true);

	console.log("\nfunding accounts & stats");
	const fbody = { label: "Main bank", type: "bank", bankName: "First Bank", accountName: "Bancopt Ltd", accountNumber: "0123456789", currency: "USD" };
	check("user cannot create funding account", (await call("POST", "/api/funding-accounts", { token: alice.token, body: fbody })).status === 403);
	const fa = await call("POST", "/api/funding-accounts", { token: admin.token, body: fbody });
	check("admin creates funding account", fa.status === 200 && fa.data.balance === 0, JSON.stringify(fa.data));
	const adj = await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balanceChange: { direction: "credit", amount: 250.75 } } });
	check("adjustment raises the balance", adj.status === 200 && adj.data.balance === 250.75, JSON.stringify(adj.data));
	check("balance cannot go negative", (await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balanceChange: { direction: "debit", amount: 1000 } } })).status === 422);
	check("signed adjustment is no longer accepted", (await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { adjustment: -5 } })).status === 422);
	check("funding adjustment requires a direction", (await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balanceChange: { amount: 5 } } })).status === 422);
	check("funding adjustment rejects a negative amount", (await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balanceChange: { direction: "debit", amount: -5 } } })).status === 422);
	check("funding adjustment rejects an unknown direction", (await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balanceChange: { direction: "subtract", amount: 5 } } })).status === 422);
	const smallDebit = await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balanceChange: { direction: "debit", amount: 0.29 } } });
	check("explicit funding debit preserves cents", smallDebit.status === 200 && smallDebit.data.balance === 250.46);
	await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balanceChange: { direction: "credit", amount: 0.29 } } });
	check('funded account currency cannot be relabeled', (await call('PUT', `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { currency: 'EUR' } })).status === 422);
	check("balance cannot be overwritten", (await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { balance: 9999 } })).data.balance === 250.75);
	check("user cannot update funding account", (await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: alice.token, body: { adjustment: 5 } })).status === 403);
	const seen = await call("GET", "/api/funding-accounts", { token: alice.token });
	check("user sees the account without balance", seen.status === 200 && seen.data.length >= 1 && seen.data.every((a) => a.balance === undefined && a.accountNumber));
	await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { active: false } });
	check("inactive account hidden from users", (await call("GET", "/api/funding-accounts", { token: alice.token })).data.length === 0);
	await call("PUT", `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { active: true } });
	const fundBefore = (await call("GET", "/api/funding-accounts", { token: admin.token })).data.find((a) => a.id === fa.data.id).balance;
	check("top-up with a funding account", (await call("POST", "/api/account", { token: admin.token, body: { email: "bob@x.com", amount: 10, fundingAccountId: fa.data.id } })).status === 200);
	check("...credits the funding account", (await call("GET", "/api/funding-accounts", { token: admin.token })).data.find((a) => a.id === fa.data.id).balance === fundBefore + 10);
	check("top-up with unknown funding account -> 404 and no money moved", (await (async () => {
		const b = await bal(bob);
		const r = await call("POST", "/api/account", { token: admin.token, body: { email: "bob@x.com", amount: 10, fundingAccountId: "00000000-0000-4000-8000-000000000000" } });
		return r.status === 404 && (await bal(bob)) === b;
	})()));
	const ag = await call("GET", "/api/transactions/aggregates", { token: alice.token });
	check("aggregates are in major units", ag.status === 200 && ag.data.sent > 0 && ag.data.sent < 1000 && typeof ag.data.count === "number", JSON.stringify(ag.data));
	check("stats need admin", (await call("GET", "/api/admin/stats", { token: alice.token })).status === 403);
	const st = await call("GET", "/api/admin/stats", { token: admin.token });
	check("admin stats", st.status === 200 && st.data.users.total >= 2 && st.data.balances.funding === fundBefore + 10 && st.data.recentTransactions.length > 0, JSON.stringify(st.data).slice(0, 200));

	console.log("\nexplicit customer balance changes and reversals");
	const adjustCustomer = (body, token = admin.token) => call("POST", "/api/account/adjustments", { token, body: { email: "bob@x.com", reason: "Correction after reconciliation", ...body } });
	check("customer adjustment requires admin", (await adjustCustomer({ direction: "credit", amount: 5 }, bob.token)).status === 403);
	check("customer adjustment requires direction", (await adjustCustomer({ amount: 5 })).status === 422);
	check("customer adjustment requires positive amount", (await adjustCustomer({ direction: "debit", amount: -5 })).status === 422);
	check("customer adjustment requires reason", (await adjustCustomer({ direction: "debit", amount: 5, reason: "" })).status === 422);
	check("customer debit rejects a funding association", (await adjustCustomer({ direction: "debit", amount: 5, fundingAccountId: fa.data.id })).status === 422);
	const customerBefore = await bal(bob);
	check("customer credit records exact balance", (await adjustCustomer({ direction: "credit", amount: 10.29 })).data.amount === customerBefore + 10.29);
	const corrected = await adjustCustomer({ direction: "debit", amount: 0.29 });
	check("customer debit records exact balance", corrected.status === 200 && corrected.data.amount === customerBefore + 10);
	check("customer debit cannot overdraw", (await adjustCustomer({ direction: "debit", amount: customerBefore + 1000 })).status === 422 && await bal(bob) === customerBefore + 10);
	const debitHistory = (await call("GET", `/api/transactions/${bob.id}`, { token: bob.token })).data;
	check("customer adjustments create descriptive ledger rows", debitHistory.some(tx => tx.type === "withdrawal" && tx.amount === 0.29 && tx.notes?.includes("Correction after reconciliation")));
	const reverse = (id, body = { action: "reverse", reason: "Bank transfer was not delivered" }, token = admin.token) => call("POST", `/api/transactions/${id}/reverse`, { token, body });
	check("reversal requires an explicit action", (await reverse(w2.data.id, { reason: "Bank transfer was not delivered" })).status === 422);
	check("reversal requires admin", (await reverse(w2.data.id, undefined, bob.token)).status === 403);
	const debit = debitHistory.find(tx => tx.type === "withdrawal" && tx.amount === 0.29);
	const refunded = await Promise.all([reverse(debit?.id), reverse(debit?.id)]);
	check("concurrent explicit debit reversals refund once", refunded.some(result => result.status === 200) && await bal(bob) === customerBefore + 10.29, JSON.stringify(refunded.map(result => result.status)));
	check('concurrent explicit reversals create one refund ledger row', (await call('GET', `/api/transactions/${bob.id}`, { token: bob.token })).data.filter(tx => tx.notes?.startsWith(`Refund of ${debit.transactionId}`)).length === 1);
	await reverse(debit?.id);
	check("repeated explicit reversal cannot refund twice", await bal(bob) === customerBefore + 10.29);
	const internalReversal = await reverse(t1.data.id);
	check("internal transfers cannot be reversed", internalReversal.status === 422);
	const deposit = debitHistory.find(tx => tx.type === "credit");
	check("deposits cannot be reversed", (await reverse(deposit?.id)).status === 422);
	const euroFunding = await call('POST', '/api/funding-accounts', { token: admin.token, body: { ...fbody, label: 'Euro reserve', currency: 'EUR', active: false } });
	const beforeMismatch = await bal(bob);
	check('cross-currency funding association rejected atomically', (await adjustCustomer({ direction: 'credit', amount: 10, fundingAccountId: euroFunding.data.id })).status === 422 && await bal(bob) === beforeMismatch);
	check('legacy credit also rejects mismatched funding currency', (await call('POST', '/api/account', { token: admin.token, body: { email: 'bob@x.com', amount: 10, fundingAccountId: euroFunding.data.id } })).status === 422 && await bal(bob) === beforeMismatch);

	const logs = await call("GET", `/api/security-logs/${alice.id}`, { token: alice.token });
	check("login history is recorded", logs.status === 200 && logs.data.some((l) => l.action === "login"), JSON.stringify(logs.data).slice(0, 150));
	check("cannot read someone else's login history", (await call("GET", `/api/security-logs/${alice.id}`, { token: bob.token })).status === 403);

	console.log("\nnotifications (paging, filters, unread count, detail, links)");
	const nlist = (u, q = "", token = u.token) => call("GET", `/api/notifications/${u.id}${q}`, { token });
	const first = await nlist(bob);
	check("list returns items + total + unread", first.status === 200 && Array.isArray(first.data.items) && typeof first.data.total === "number" && typeof first.data.unread === "number");
	check("newest first", first.data.items.every((n, i, a) => i === 0 || new Date(a[i - 1].createdAt) >= new Date(n.createdAt)));
	const p1 = await nlist(bob, "?limit=2&offset=0");
	const p2 = await nlist(bob, "?limit=2&offset=2");
	check("paging returns different items", p1.data.items.length === 2 && p2.data.items.length > 0 && !p2.data.items.some((n) => p1.data.items.some((m) => m.id === n.id)));
	check("limit above 50 -> 422", (await nlist(bob, "?limit=500")).status === 422);
	check("unknown group -> 422", (await nlist(bob, "?group=nope")).status === 422);
	const un = await nlist(bob, "?status=unread");
	check("unread filter", un.data.items.length > 0 && un.data.items.every((n) => n.status === "unread") && un.data.total === un.data.unread);
	const tr = await nlist(bob, "?group=transfers");
	check("transfers filter", tr.data.items.length > 0 && tr.data.items.every((n) => ["debit", "credit", "failed"].includes(n.type)));
	const cnt = await call("GET", "/api/notifications/unread-count", { token: bob.token });
	check("unread-count matches the list", cnt.status === 200 && cnt.data.unread === first.data.unread);
	check("unread-count needs a session", (await call("GET", "/api/notifications/unread-count")).status === 401);
	check("cannot list someone else's notifications", (await nlist(bob, "", dave.token)).status === 403);

	const credit = tr.data.items.find((n) => n.type === "credit" && n.entityId === t1.data.id);
	check("credit notification links to its transaction", !!credit && !!credit.entityId);
	const det = await call("GET", `/api/transactions/detail/${credit.entityId}`, { token: bob.token });
	check("receiver can open the transaction", det.status === 200 && det.data.receiverId === bob.id && !!det.data.senderName && !!det.data.beneficiary);
	const senderTok = [alice, carol, frank, erin].find((u) => u.id === det.data.senderId)?.token;
	check("sender can open it too", (await call("GET", `/api/transactions/detail/${credit.entityId}`, { token: senderTok })).status === 200);
	check("admin can open it", (await call("GET", `/api/transactions/detail/${credit.entityId}`, { token: admin.token })).status === 200);
	check("a stranger gets 404", (await call("GET", `/api/transactions/detail/${credit.entityId}`, { token: dave.token })).status === 404);
	const debitN = (await nlist(alice, "?group=transfers")).data.items.find((n) => n.type === "debit");
	check("sender notification links to a transaction as well", debitN?.entityType === "transaction" && !!debitN.entityId);

	const one = un.data.items[0];
	const got = await call("GET", `/api/notifications/item/${one.id}`, { token: bob.token });
	check("open one notification", got.status === 200 && got.data.id === one.id);
	check("stranger gets 404 for it", (await call("GET", `/api/notifications/item/${one.id}`, { token: dave.token })).status === 404);
	await call("PUT", "/api/notifications", { token: bob.token, body: { id: one.id } });
	const unreadAfter = (await call("GET", "/api/notifications/unread-count", { token: bob.token })).data.unread;
	check("marking one as read lowers the count by one", unreadAfter === cnt.data.unread - 1);
	await call("PUT", "/api/notifications", { token: bob.token, body: { id: one.id } });
	check("marking it again changes nothing", (await call("GET", "/api/notifications/unread-count", { token: bob.token })).data.unread === unreadAfter);
	check("cannot mark someone else's as read", (await call("PUT", "/api/notifications", { token: dave.token, body: { id: one.id } })).status === 404);
	const all = await call("PUT", "/api/notifications/all", { token: bob.token });
	check("mark all as read", all.status === 200 && all.data.unread === 0 && (await call("GET", "/api/notifications/unread-count", { token: bob.token })).data.unread === 0);

	check("bad entity type -> 422", (await call("POST", "/api/notifications", { token: alice.token, body: { userId: admin.id, title: "x", message: "hello", entityType: "nope" } })).status === 422);
	await call("POST", "/api/notifications", { token: alice.token, body: { userId: admin.id, title: "Upgrade", message: "please upgrade me", entityType: "user", entityId: alice.id } });
	const adminList = await nlist({ id: admin.id }, "", admin.token);
	check("user -> admin notification keeps its link", adminList.data.items.some((n) => n.entityType === "user" && n.entityId === alice.id));

	console.log("\nhousekeeping");
	console.log('\ndeposit requests and verified approval');
	const depositUser = await call('POST', '/api/auth/register', { body: profile('depositor@x.com') });
	const depositor = { ...depositUser.data.user, token: depositUser.data.token };
	const depositKey = '00000000-0000-4000-8000-000000000777';
	const requestDeposit = (body, token = depositor.token) => call('POST', '/api/deposit-requests', { token, body: { fundingAccountId: fa.data.id, amount: 12.29, requestKey: depositKey, reference: 'BANK-REFERENCE-1', ...body } });
	const fundingBalance = async () => (await call('GET', '/api/funding-accounts', { token: admin.token })).data.find(item => item.id === fa.data.id).balance;
	const fundingStart = await fundingBalance();
	check('deposit request rejects negative amount', (await requestDeposit({ amount: -5 })).status === 422);
	check('deposit request rejects missing funding account', (await requestDeposit({ fundingAccountId: undefined })).status === 422);
	await call('PUT', `/api/funding-accounts/${euroFunding.data.id}`, { token: admin.token, body: { active: true } });
	check('deposit request rejects currency mismatch', (await requestDeposit({ fundingAccountId: euroFunding.data.id })).status === 422);
	await call('PUT', `/api/funding-accounts/${euroFunding.data.id}`, { token: admin.token, body: { active: false } });
	check('deposit request rejects forged owner/status', (await requestDeposit({ userId: bob.id, status: 'approved' })).status === 422);
	const submitted = await requestDeposit();
	check('user submits pending deposit request', submitted.status === 200 && submitted.data.status === 'pending' && submitted.data.amount === 12.29);
	check('admin receives deposit review notification', (await call('GET', `/api/notifications/${admin.id}?limit=50`, { token: admin.token })).data.items.some(item => item.entityType === 'deposit' && item.entityId === submitted.data.id));
	check('submission never moves money', await bal(depositor) === 0 && await fundingBalance() === fundingStart);
	const retried = await requestDeposit();
	check('submission retry returns same request', retried.status === 200 && retried.data.id === submitted.data.id);
	check('same submission key cannot change amount', (await requestDeposit({ amount: 20 })).status === 409);
	check('request ownership cannot be spoofed', submitted.data.userId === depositor.id);
	const depId = submitted.data.id;
	check('another customer cannot read deposit request', (await call('GET', `/api/deposit-requests/${depId}`, { token: bob.token })).status === 404);
	check('user list includes only own requests', (await call('GET', '/api/deposit-requests', { token: bob.token })).data.items.every(item => item.userId === bob.id));
	const decision = (id, action, token = admin.token) => call('POST', `/api/deposit-requests/${id}/decision`, { token, body: { action, note: action === 'approve' ? 'Bank receipt verified against statement' : 'Payment could not be found' } });
	check('customer cannot approve own deposit', (await decision(depId, 'approve', depositor.token)).status === 403);
	check('admin cannot override requested amount during approval', (await call('POST', `/api/deposit-requests/${depId}/decision`, { token: admin.token, body: { action: 'approve', note: 'Verified receipt', amount: 999 } })).status === 422);
	const approved = await Promise.all([decision(depId, 'approve'), decision(depId, 'approve')]);
	check('approval succeeds without double credit', approved.some(result => result.status === 200) && await bal(depositor) === 12.29 && await fundingBalance() === fundingStart + 12.29);
	const approvedAgain = await decision(depId, 'approve');
	check('approval retry is idempotent', approvedAgain.status === 200 && approvedAgain.data.status === 'approved' && !!approvedAgain.data.transactionId && await bal(depositor) === 12.29);
	check('approved request cannot be rejected', (await decision(depId, 'reject')).status === 409);
	const deposited = (await call('GET', `/api/transactions/${depositor.id}`, { token: depositor.token })).data;
	check('one approved request writes exactly one ledger credit', deposited.filter(tx => tx.type === 'credit').length === 1 && deposited[0].id === approvedAgain.data.transactionId);
	check('customer request status does not expose reviewer identity', (await call('GET', `/api/deposit-requests/${depId}`, { token: depositor.token })).data.reviewedBy === undefined);
	const pendingReject = await requestDeposit({ requestKey: '00000000-0000-4000-8000-000000000778' });
	check('admin can reject pending request', (await decision(pendingReject.data.id, 'reject')).data.status === 'rejected');
	check('rejection notification links to customer request history', (await call('GET', `/api/notifications/${depositor.id}`, { token: depositor.token })).data.items.some(item => item.entityType === 'deposit' && item.entityId === pendingReject.data.id));
	check('rejected request cannot later be approved', (await decision(pendingReject.data.id, 'approve')).status === 409 && await bal(depositor) === 12.29);
	const pendingLimit = await requestDeposit({ requestKey: '00000000-0000-4000-8000-000000000780' });
	await call('POST', '/api/account-levels', { token: admin.token, body: { title: 'Deposit test cap', dailyLimit: 0, maxBalanceLimit: 20, accountLevel: 99 } });
	await call('PUT', '/api/account', { token: admin.token, body: { userId: depositor.id, accountLevel: 99 } });
	const beforeLimitFunding = await fundingBalance();
	check('approval enforces customer balance cap atomically', (await decision(pendingLimit.data.id, 'approve')).status === 422 && await bal(depositor) === 12.29 && await fundingBalance() === beforeLimitFunding);
	check('failed approval rolls request back to pending', (await call('GET', `/api/deposit-requests/${pendingLimit.data.id}`, { token: depositor.token })).data.status === 'pending');
	await call('PUT', '/api/account', { token: admin.token, body: { userId: depositor.id, accountLevel: 1 } });
	const paidBeforeHide = await requestDeposit({ amount: 1.11, requestKey: '00000000-0000-4000-8000-000000000781' });
	await call('PUT', `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { active: false } });
	check('hidden funding account rejects new request', (await requestDeposit({ requestKey: '00000000-0000-4000-8000-000000000779' })).status === 422);
	check('already-submitted payment remains reviewable after account is hidden', (await decision(paidBeforeHide.data.id, 'approve')).status === 200 && await bal(depositor) === 13.4);
	await call('PUT', `/api/funding-accounts/${fa.data.id}`, { token: admin.token, body: { active: true } });

	// ---- device-aware sessions + the super admin
	const UA = {
		chromeWin: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
		iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
		firefoxLinux: "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
	};
	const signIn = async (email, ua, xff, password = "secret123") => {
		const headers = { "user-agent": ua, "x-forwarded-for": xff };
		const step1 = await call("POST", "/api/auth/login", { body: { email, password }, headers });
		if (step1.status !== 200 || !OTP_ON) return step1;
		return call("POST", "/api/auth/verify-otp", { body: { challenge: step1.data.challenge, code: step1.data.devOtp }, headers });
	};
	const devReg = await call("POST", "/api/auth/register", { body: profile("dev@x.com") });
	const devId = devReg.data.userId;
	await signIn("dev@x.com", UA.chromeWin, "203.0.113.5");
	await signIn("dev@x.com", UA.chromeWin, "203.0.113.5");
	await signIn("dev@x.com", UA.chromeWin, "6.6.6.6, 203.0.113.9"); // 6.6.6.6 is what a client typed; only the proxy's entry counts
	await signIn("dev@x.com", UA.iphone, "198.51.100.7");
	const devLast = await signIn("dev@x.com", UA.firefoxLinux, "198.51.100.8");
	await signIn("dev@x.com", UA.chromeWin, "203.0.113.5", "wrong-password");
	const mine = await call("GET", `/api/sessions/${devId}`, { token: devLast.data.token, headers: { "user-agent": UA.chromeWin } });
	const byLabel = (label) => mine.data.devices?.find((d) => d.label === label);
	check("5 sign-ins from 3 browsers are 3 devices, not 5 sessions", mine.status === 200 && mine.data.devices.length === 3, JSON.stringify(mine.data).slice(0, 200));
	check("same browser, 3 sign-ins -> one device with signIns = 3", byLabel("Chrome on Windows")?.signIns === 3);
	check("phone and Linux Firefox are their own devices", byLabel("Safari on iOS")?.deviceType === "mobile" && byLabel("Firefox on Linux")?.deviceType === "desktop");
	check("a failed password is counted apart and creates no device", mine.data.failedAttempts.count === 1 && mine.data.devices.reduce((n, d) => n + d.signIns, 0) === 5);
	check("only the device making the request is 'current'", mine.data.devices.filter((d) => d.current).map((d) => d.label).join() === "Chrome on Windows");
	check("a device keeps every IP it signed in from", byLabel("Chrome on Windows")?.ips.slice().sort().join() === "203.0.113.5,203.0.113.9");
	check("a forged X-Forwarded-For entry is ignored", !JSON.stringify(mine.data).includes("6.6.6.6"));

	const seededAdmin = await signIn("admin@bancopt.com", UA.chromeWin, "203.0.113.20", "AdminPass123!");
	await signIn("admin@bancopt.com", UA.firefoxLinux, "203.0.113.21", "AdminPass123!");
	const seededId = seededAdmin.data.userId;
	check("a customer cannot read someone else's sessions", (await call("GET", `/api/sessions/${devId}`, { token: bob.token })).status === 403);
	check("an admin can read a customer's sessions", (await call("GET", `/api/sessions/${devId}`, { token: admin.token })).status === 200);
	check("an admin cannot read another admin's sessions", (await call("GET", `/api/sessions/${seededId}`, { token: admin.token })).status === 403 && (await call("GET", `/api/security-logs/${seededId}`, { token: admin.token })).status === 403);
	check("an admin can read their own sessions", (await call("GET", `/api/sessions/${seededId}`, { token: seededAdmin.data.token })).status === 200);

	const sup = await signIn("super@x.com", UA.chromeWin, "203.0.113.30", "SuperPass123!");
	check("the super admin signs in and has the superadmin role", sup.status === 200 && sup.data.user.userType === "superadmin", JSON.stringify(sup.data).slice(0, 120));
	const superToken = sup.data.token, superId = sup.data.userId;
	const roster = await call("GET", "/api/super/admins", { token: superToken });
	check("super admin lists the administrators only", roster.status === 200 && roster.data.length >= 2 && roster.data.every((a) => a.email.includes("admin")) && !roster.data.some((a) => a.email === "super@x.com" || a.email === "dev@x.com"), JSON.stringify(roster.data).slice(0, 200));
	const seededRow = roster.data.find?.((a) => a.id === seededId);
	check("each admin shows last sign-in time, device and IP", seededRow?.devices === 2 && seededRow.signIns === 2 && !!seededRow.lastSignIn?.at && !!seededRow.lastSignIn?.ip && !!seededRow.lastSignIn?.device, JSON.stringify(seededRow));
	const sessionsOfAdmin = await call("GET", `/api/super/admins/${seededId}/sessions`, { token: superToken });
	check("super admin sees an admin's devices with IPs", sessionsOfAdmin.status === 200 && sessionsOfAdmin.data.devices.length === 2 && sessionsOfAdmin.data.devices.every((d) => d.ips.length && d.userAgent), JSON.stringify(sessionsOfAdmin.data).slice(0, 160));
	const page1 = await call("GET", `/api/super/admins/${seededId}/logins?limit=1`, { token: superToken });
	const page2 = await call("GET", `/api/super/admins/${seededId}/logins?limit=5&before=${encodeURIComponent(page1.data.nextBefore)}`, { token: superToken });
	check("sign-in history is paged, newest first", page1.status === 200 && page1.data.events.length === 1 && !!page1.data.nextBefore && page2.data.events.length >= 1 && page2.data.events[0].createdAt < page1.data.events[0].createdAt);
	check("history rows carry time, IP, device and outcome", ["createdAt", "ip", "action"].every((k) => page1.data.events[0][k]) && !!page1.data.events[0].device.label);
	check("super admin endpoints are closed to admins, customers and anonymous callers", (await call("GET", "/api/super/admins", { token: admin.token })).status === 403 && (await call("GET", "/api/super/admins", { token: bob.token })).status === 403 && (await call("GET", "/api/super/admins")).status === 401);
	check("super admin can only open administrators", (await call("GET", `/api/super/admins/${devId}/sessions`, { token: superToken })).status === 404);
	check("super admin can read any user's sessions", (await call("GET", `/api/sessions/${devId}`, { token: superToken })).status === 200);

	check("admins never see the super admin in the user list", !(await call("GET", "/api/users", { token: admin.token })).data.some((u) => u.email === "super@x.com"));
	check("nobody can find the super admin by e-mail", (await call("POST", "/api/users/find", { token: bob.token, body: { email: "super@x.com" } })).status === 404);
	check("an admin cannot open or edit the super admin", (await call("GET", `/api/users/${superId}`, { token: admin.token })).status === 404 && (await call("PUT", `/api/users/${superId}`, { token: admin.token, body: { status: "HOLD" } })).status === 404);
	check("the super admin can open their own profile", (await call("GET", `/api/users/${superId}`, { token: superToken })).status === 200);
	check("the super admin has no admin powers", (await call("PUT", "/api/account", { token: superToken, body: { userId: devId, accountLevel: 1 } })).status === 403);

	check("unknown route -> 404 json", (await call("GET", "/api/nope", { token: alice.token })).status === 404);
}

try {
	await main();
} catch (e) {
	failures.push(`crashed: ${e.stack || e}`);
} finally {
	try { process.kill(-server.pid, "SIGTERM"); } catch {}
	console.log(`\n${passed} passed, ${failures.length} failed`);
	failures.forEach((f) => console.log(" -", f));
	process.exit(failures.length ? 1 : 0);
}
