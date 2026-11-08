# Device-aware sessions and the super admin area

## Problems being solved
1. The "Security" page lists **every** successful sign-in as its own row, so one person on one laptop looks like twenty sessions.
2. There is nobody above the admins. The owner cannot see which admins sign in, from which device, when, where and from which IP, and later cannot see what they did.

## Decisions
- **Events stay raw, sessions are derived.** `security_logs` keeps one row per sign-in or failed attempt (audit trail, never merged). A *device* is computed when reading: successful sign-ins are grouped by `browser | operating system | device type` parsed from the user agent. No new table, and old history is grouped retroactively.
- **Failed attempts are separate** from devices and shown as a short list, never as sessions.
- **Location** is resolved once per event, in the background, from the IP (`GEOIP_URL`, default `https://ipwho.is/{ip}`; `GEOIP=off` disables it). It is stored on the event (`security_logs.location`), so history does not change if the provider does. Private and loopback addresses are skipped.
- **Client IP** is the entry the trusted proxy appended to `X-Forwarded-For` (last entry; `TRUST_PROXY_HOPS`, default 1), not the first one, which a client can forge.
- **Super admin is its own role** (`userType = superadmin`), not an admin with extra checks. `isAdmin()` stays strict, so a super admin has none of the money/customer powers, and admins cannot see, list, find or edit a super admin. It is created **only** when `SUPERADMIN_EMAIL` and `SUPERADMIN_PASSWORD` are set (no default credentials). Every super endpoint re-reads the user from the database, so a demoted or suspended account loses access immediately instead of when its token expires.
- Admins' sign-in data is readable only by the admin themselves and the super admin. Admins can read customers' sign-in data, as before, but not other admins'.

## Phases
| # | Scope | Status |
|---|---|---|
| 1 (done) | Device grouping, user agent parser, client IP fix, location column + migration, `GET /api/sessions/:userId`, new Security page, tighter `security-logs` access | this change |
| 2 (done) | `superadmin` role, seed from env, hidden from admin views, `/api/super/admins*`, `/super` layout: administrators table, per-admin devices and full sign-in history (time, device, IP, location, outcome) | this change |
| 3 (done) | **Admin actions**: `audit_logs` table (actor, action, target type/id, summary, ip, device, time) written by one helper from every mutating admin endpoint (credit/debit, user edits, funding accounts, deposits, settings); "Actions" tab per admin in `/super`, filters by action and date | done |
| 4 (done) | Hardening: server-side session list with revoke ("sign out this device"), alert on first sign-in from a new device, require OTP for the super admin whatever `OTP_ON` says (needs mail configured), retention/pruning of old events | done |

## Acceptance (phases 1 and 2)
- Three sign-ins from the same browser show **one** device with `signIns = 3`; another browser shows a second device; wrong passwords never create a device.
- The Security page marks "This device".
- A super admin lands on `/super`, sees every admin with last sign-in (time, device, IP, location), and can open one admin to see all devices and the full event list, failed attempts included.
- An admin gets 403 on `/api/super/*`, cannot read another admin's sessions, and never sees the super admin in lists, search or stats.
- Existing suites still pass with OTP on and off; new tests cover all of the above.

## Setup on alwaysdata (after deploy)
Add `SUPERADMIN_EMAIL`, `SUPERADMIN_PASSWORD` (and optionally `SUPERADMIN_NAME`) to the site environment and restart. The deploy pipeline runs the migration that adds `security_logs.location`.

## What phases 3 and 4 turned into
- **Admin actions** (`audit_logs`): every successful admin change records who, what and the real values (amounts, reasons, new status), plus IP and device. Covered: balance credits/debits/top-ups, account settings, transaction updates and reversals, deposit approve/reject, funding accounts, user edits, notifications sent, account levels, currencies, app defaults. Self-edits and customer actions are not recorded. Never stored: account numbers, codes, passwords. `meta` keeps only a few safe fields.
- **Sessions you can end**: each sign-in is a row (`user_sessions`) and its id is in the token. Revoking (a device, all other devices, everything) takes effect on the next request. Sign-out, a password reset and the super admin's "sign out everywhere" end sessions. If the table cannot be read the check fails open so a database error cannot lock everyone out; tokens issued before this change have no session id and run until they expire (5 days).
- **New-device alerts**: a notification (and an e-mail when mail is configured) the first time a browser/device signs in, never on the very first sign-in; the administrators list shows new devices this week.
- **Super admin code step**: `SUPERADMIN_OTP` (auto/on/off), see the deploy doc.
- **Retention**: sign-in history 365 days, ended sessions 30, audit trail forever by default; daily job plus "Clean up now".

## Known limits
- Two identical browsers on different machines look like one device (grouping is by browser, OS and type).
- Revocation cache and session checks assume a single server process (true on alwaysdata); behind several instances a revoked session could live a few seconds longer.

## Account status (SUSPENDED / HOLD)
- `ACTIVE` normal · `HOLD` signs in but cannot send money · `SUSPENDED` cannot sign in and every session is dead at once.
- Enforced on the server in three places: the password step and the OTP step refuse a suspended account (403, after the password was right, so status is never revealed to someone without it, and the attempt is logged); every authenticated request re-checks the account for every token, including ones issued before sessions were stored; and suspending ends all sessions immediately.
- The same per-request check also rejects a token whose role differs from the account's (a demoted administrator no longer keeps admin powers for the rest of the token's life).
- Administrators may only set `ACTIVE`, `HOLD` or `SUSPENDED` (any casing, stored upper-case); anything else is a 422. The super admin can suspend and restore administrators from `/super`.
