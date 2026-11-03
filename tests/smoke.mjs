/**
 * End-to-end smoke test: boots the Nitro dev server against a throw-away SQLite file and
 * checks auth, authorization and (above all) the money invariants. Run: `npm test`
 */
import { spawn } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";

const PORT = 3111;
const BASE = `http://localhost:${PORT}`;
const DB = ".data/smoke.db";
const SECRET = "smoke-secret";

mkdirSync(".data", { recursive: true });
rmSync(DB, { force: true });

const server = spawn("npx", ["nuxt", "dev", "--port", String(PORT)], {
	env: { ...process.env, DB_DIALECT: "sqlite", DB_STORAGE: DB, DB_SYNC: "true", JWT_SECRET: SECRET },
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

const call = async (method, path, { token, body } = {}) => {
	const res = await fetch(BASE + path, {
		method,
		headers: { "content-type": "application/json", ...(token && { authorization: `Bearer ${token}` }) },
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
	await new Promise((resolve, reject) => {
		const db = new sqlite3.Database(DB);
		db.run("UPDATE Users SET user_type='admin' WHERE email='admin@x.com'", (e) => (e ? reject(e) : resolve()));
	});

	// login = password step -> OTP challenge -> session
	const login = async (email, password = "secret123") => {
		const step1 = await call("POST", "/api/auth/login", { body: { email, password } });
		if (step1.status !== 200) return step1;
		return call("POST", "/api/auth/verify-otp", { body: { challenge: step1.data.challenge, code: step1.data.devOtp } });
	};
	check("wrong password -> 401", (await call("POST", "/api/auth/login", { body: { email: "alice@x.com", password: "nope" } })).status === 401);
	check("unknown user -> 401", (await call("POST", "/api/auth/login", { body: { email: "ghost@x.com", password: "secret123" } })).status === 401);

	const s1 = await call("POST", "/api/auth/login", { body: { email: "alice@x.com", password: "secret123" } });
	check("password step returns a challenge, NOT a session", s1.status === 200 && !!s1.data.challenge && s1.data.token === undefined && s1.data.user === undefined);
	check("challenge is not usable as a session", (await call("GET", `/api/account/${bobReg.data.userId}`, { token: s1.data.challenge })).status === 401);
	check("wrong code -> 401", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: s1.data.devOtp === "000000" ? "111111" : "000000" } })).status === 401);
	check("malformed code -> 422", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: "12" } })).status === 422);
	const otpOk = await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: s1.data.devOtp } });
	check("right code returns the session", otpOk.status === 200 && !!otpOk.data.token && otpOk.data.user.email === "alice@x.com");
	check("code is single-use", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s1.data.challenge, code: s1.data.devOtp } })).status === 401);
	const s2 = await call("POST", "/api/auth/login", { body: { email: "alice@x.com", password: "secret123" } });
	let locked;
	for (let i = 0; i < 6; i++) locked = await call("POST", "/api/auth/verify-otp", { body: { challenge: s2.data.challenge, code: s2.data.devOtp === "123456" ? "654321" : "123456" } });
	check("brute force is cut off after 5 tries", locked.status === 401 && /Too many/.test(locked.data.message));
	check("...even with the right code afterwards", (await call("POST", "/api/auth/verify-otp", { body: { challenge: s2.data.challenge, code: s2.data.devOtp } })).status === 401);
	const [a, b, adm] = await Promise.all([login("alice@x.com"), login("bob@x.com"), login("admin@x.com")]);
	check("login (2 steps) ends with a session", a.status === 200 && !!a.data.token);
	const alice = { id: a.data.userId, name: "alice", email: "alice@x.com", token: a.data.token };
	const bob = { id: b.data.userId, name: "bob", email: "bob@x.com", token: b.data.token };
	const admin = { id: adm.data.userId, token: adm.data.token };
	check("admin token carries role", jwt.decode(admin.token).userType === "admin");

	console.log("\nauthorization");
	check("no token -> 401", (await call("GET", `/api/account/${alice.id}`)).status === 401);
	check("bad token -> 401", (await call("GET", `/api/account/${alice.id}`, { token: "x.y.z" })).status === 401);
	check("read own account", (await call("GET", `/api/account/${alice.id}`, { token: alice.token })).status === 200);
	check("read other's account -> 403", (await call("GET", `/api/account/${alice.id}`, { token: bob.token })).status === 403);
	check("read other's transactions -> 403", (await call("GET", `/api/transactions/${alice.id}`, { token: bob.token })).status === 403);
	check("admin lists users", (await call("GET", "/api/users", { token: admin.token })).data.length === 3);
	const contacts = await call("GET", "/api/users", { token: alice.token });
	check("non-admin only sees admin contacts (name only)", contacts.status === 200 && contacts.data.length === 1 && contacts.data[0].userType === "admin" && contacts.data[0].email === undefined);
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

	console.log("\nhousekeeping");
	check("mark all notifications read", (await call("PUT", "/api/notifications/all", { token: alice.token })).data.every((n) => n.status === "read"));
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
