// Server-renders the notification / transaction pages with real user + admin sessions (SQLite). Run: npm run test:pages
import { spawn } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
mkdirSync(".data", { recursive: true });
const PORT = 3113, BASE = `http://localhost:${PORT}`;
rmSync(".data/pages-check.db", { force: true });
const srv = spawn("npx", ["nuxt", "dev", "--port", String(PORT)], { cwd: process.cwd(), detached: true, stdio: "ignore",
  env: { ...process.env, DB_DIALECT: "sqlite", DB_STORAGE: ".data/pages-check.db", DB_SYNC: "true", JWT_SECRET: "x", TEST_DATABASE_URL: "" } });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const api = async (m, p, { token, body } = {}) => { const r = await fetch(BASE + "/api" + p, { method: m, headers: { "content-type": "application/json", ...(token && { authorization: `Bearer ${token}` }) }, body: body && JSON.stringify(body) }); return { status: r.status, data: await r.json().catch(() => null) }; };
const login = async (email, password) => { const s1 = await api("POST", "/auth/login", { body: { email, password } }); return (await api("POST", "/auth/verify-otp", { body: { challenge: s1.data.challenge, code: s1.data.devOtp } })).data; };
const cookie = (session) => `auth=${encodeURIComponent(JSON.stringify(session))}`;
const results = [];
const check = (name, ok, extra = "") => { results.push(ok); console.log(`${ok ? "  ok " : "FAIL "} ${name}${ok ? "" : " " + extra}`); };
try {
  for (let i = 0; i < 180; i++) { try { if ((await fetch(BASE + "/api")).ok) break; } catch {} await sleep(1000); }
  await api("GET", "/api"); await sleep(3000); // let the boot seed run
  const reg = await api("POST", "/auth/register", { body: { name: "Ui User", email: "ui@x.com", password: "secret123", phone: "1", address: "a", city: "c", country: "x" } });
  const user = reg.data;
  const admin = await login("admin@bancopt.com", "AdminPass123!");
  check("have user + admin sessions", !!user?.token && !!admin?.token, JSON.stringify(admin)?.slice(0, 80));
  const list = await api("GET", `/notifications/${user.userId}`, { token: user.token });
  const nid = list.data.items[0].id;

  const page = async (path, session) => { const r = await fetch(BASE + path, { headers: { cookie: cookie(session) }, redirect: "manual" }); return { status: r.status, html: await r.text(), loc: r.headers.get("location") }; };
  const bad = (h) => /nuxt-error|__NUXT_ERROR__|"statusCode":5\d\d|Cannot read prop|is not defined|Failed to resolve component/i.test(h);
  for (const [name, path, session, must] of [
    ["user dashboard has the bell", "/app", user, 'aria-label="Notifications'],
    ["user: notifications page", "/app/notifications", user, "Mark all as read"],
    ["user: notification detail page", `/app/notifications/${nid}`, user, "All notifications"],
    ["user: transaction detail page", "/app/transaction/00000000-0000-4000-8000-000000000000", user, "All transactions"],
    ["admin: notifications page", "/admin/notifications", admin, "Mark all as read"],
    ["admin: notification detail page", `/admin/notifications/${nid}`, admin, "All notifications"],
  ]) {
    const r = await page(path, session);
    check(`${name} renders (200)`, r.status === 200 && r.html.includes(must) && !bad(r.html), `status=${r.status} loc=${r.loc} has=${r.html.includes(must)} bad=${bad(r.html)}`);
  }
  const adminDash = await page("/admin", admin);
  check("admin dashboard has the bell", adminDash.status === 200 && adminDash.html.includes('aria-label="Notifications'), `status=${adminDash.status} loc=${adminDash.loc}`);
  check("old drawer is gone", !(await page("/app", user)).html.includes("kt_activities_toggle"));
  console.log(`\n${results.filter(Boolean).length}/${results.length} ok`);
} finally { try { process.kill(-srv.pid, "SIGTERM"); } catch {} process.exit(0); }
