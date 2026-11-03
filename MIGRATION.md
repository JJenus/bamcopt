# Bancopt: backend moved into Nuxt (fullstack) - plan & changelog

Scope: move the backend to Nitro, fix lapses (especially balances / crediting). **No new features.**
Same `/api/...` paths and request/response shapes, so the frontend keeps working.

## Approach
- The API now lives in this Nuxt app: `server/api/**` (Nitro, same process as the UI, same origin, no CORS). The old `bancopt-api` repo is retired.
- Keep Sequelize + PostgreSQL (no ORM swap). Routers/controllers collapse into thin route files; logic lives in `server/services`.
- Route file = validate (zod) -> call service -> return. No business logic in routes.

## Lapses found and how they are fixed

### Money (balances / crediting)
| # | Problem | Fix |
|---|---------|-----|
| 1 | `BIGINT` comes back from PostgreSQL as a **string**, so `receiver.amount + amount` concatenated ("100" + 50 = "10050") | money is `DECIMAL(20,2)`; all math in integer minor units (`utils/money.ts`); API returns numbers |
| 2 | Amount columns were whole-number types but the UI allows 2 decimals, so cents were silently dropped | `DECIMAL(20,2)` (SQL in `db/migrations`) |
| 3 | Transfer = read, check, write with no DB transaction: a crash after the debit lost money; concurrent sends could overdraw | one DB transaction, rows locked `FOR UPDATE` in a fixed order, debit + credit + ledger row commit together |
| 4 | Credit notification went to the **account id** instead of the user id (never delivered); `receiverId` was taken from the client instead of the beneficiary | notification -> user id; `receiverId` derived server-side |
| 5 | No server-side checks: zero/negative amounts (a negative "transfer" credits the sender), sending to yourself, frozen/closed account, user on HOLD | validated server-side |
| 6 | `senderId` came from the request body (anyone could spend anyone's money) | sender is always the JWT user |
| 7 | `POST /account` (top-up) open to any logged-in user; `PUT /account` could set `amount` directly | admin-only; `PUT /account` no longer touches the balance |
| 8 | Top-up used `amount \| 0` (32-bit, drops decimals) and wrote the ledger row separately | same atomic service as transfers |
| 9 | Failed-transfer record created without `await`; notification type enum inverted (`DEBIT = "credit"`) | fixed |

### Security / correctness
- Register accepted `userType`, `verified`, `status`, `cot/imf/tax` from the client (self-register as admin): now ignored.
- No authorization: any user could read/update any user, account, transactions, notifications. Now self-or-admin; admin-only routes where needed.
- `PUT /users/:id` whitelisted (user: profile fields; admin: also verified / status / codes).
- Password reset and email verification used the raw user id as the token: now signed, expiring, purpose-bound JWTs.
- Hard-coded secrets (JWT secret, DB password, SMTP password) and a committed `.env.production`: moved to env vars. **Rotate them, they are in git history.**
- Request bodies (including passwords) were `console.log`ged: removed.
- `Model.sync({ alter: true })` on every boot: removed. Schema changes are explicit SQL.
- OTP email contained `15` instead of the code (template placeholder mismatch); reset link pointed to a page that does not exist: fixed.
- `PUT /notifications` read `req.params.id` (always undefined); "mark all read" answered before updating: fixed.
- Consistent error codes (400/401/403/404/409/422), no stack traces in production.
- Dead code removed: SSE controller (never mounted), jest/ts-node, `src.zip`, test DB, `.fff`.

## Not changed (needs a product decision)
- COT/IMF/TAX "billing codes" are still verified in the browser and visible to their owner.
- Account-level `dailyLimit` / `maxBalanceLimit` are stored but were never enforced.

## Frontend
- `services/` is the only place that calls the API (`http.ts` = single `$fetch` wrapper that adds the token, normalises errors to `ApiError`, logs out on an expired session). One file per area: auth, user, account, transaction, notification, settings, upload.
- Components / pages / layouts never call the API. `npm run lint:api` fails if they do.
- Composables only hold state and call services.
- Removed: axios, SSE composable (dead), ip2location call (dead), Cloudinary secret in the public config, committed `.output`, TLS keys, `.env.local`.

## Login OTP (now real)
`POST /api/auth/login` checks the password and e-mails a 6-digit code; it returns only a signed `challenge` (holds an HMAC of the code, 15 min). `POST /api/auth/verify-otp {challenge, code}` returns the session. 5 tries per challenge, single use. Attempt counting is in memory (fine for one instance; use a shared store if you scale out).

## Layout
```
services/                frontend service layer (only code allowed to call /api)
server/
  plugins/db.ts          connect (+ optional create-missing-tables)
  middleware/            jwt auth for /api
  api/**                 thin handlers
  services/              auth, users, accounts, ledger (transfer/top-up), notifications, ...
  models/                Sequelize models
  utils/                 env, errors, validate, money, jwt, mail
  emails/                html templates
db/migrations/           explicit SQL
tests/smoke.mjs          end-to-end check against SQLite (`npm test`)
```
