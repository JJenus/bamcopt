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
| 1 | Device grouping, user agent parser, client IP fix, location column + migration, `GET /api/sessions/:userId`, new Security page, tighter `security-logs` access | this change |
| 2 | `superadmin` role, seed from env, hidden from admin views, `/api/super/admins*`, `/super` layout: administrators table, per-admin devices and full sign-in history (time, device, IP, location, outcome) | this change |
| 3 | **Admin actions**: `audit_logs` table (actor, action, target type/id, summary, ip, device, time) written by one helper from every mutating admin endpoint (credit/debit, user edits, funding accounts, deposits, settings); "Actions" tab per admin in `/super`, filters by action and date | next |
| 4 | Hardening: server-side session list with revoke ("sign out this device"), alert on first sign-in from a new device, require OTP for the super admin whatever `OTP_ON` says (needs mail configured), retention/pruning of old events | later |

## Acceptance (phases 1 and 2)
- Three sign-ins from the same browser show **one** device with `signIns = 3`; another browser shows a second device; wrong passwords never create a device.
- The Security page marks "This device".
- A super admin lands on `/super`, sees every admin with last sign-in (time, device, IP, location), and can open one admin to see all devices and the full event list, failed attempts included.
- An admin gets 403 on `/api/super/*`, cannot read another admin's sessions, and never sees the super admin in lists, search or stats.
- Existing suites still pass with OTP on and off; new tests cover all of the above.

## Setup on alwaysdata (after deploy)
Add `SUPERADMIN_EMAIL`, `SUPERADMIN_PASSWORD` (and optionally `SUPERADMIN_NAME`) to the site environment and restart. The deploy pipeline runs the migration that adds `security_logs.location`.
