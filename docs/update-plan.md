# Update plan (fullstack-nuxt)

Goal: small, finished, user-visible improvements. No new libraries, no rewrites.

## Findings
| Area | Gap |
|---|---|
| Add funds (user) | Modal is a fake card form; `save()` does nothing |
| Admin funding | No funding accounts / balances anywhere |
| Admin dashboard | Empty page |
| Stats | `/transactions/aggregates` returns cents, UI shows them as dollars (100x); no counts/pending/month |
| Mobile nav | 5 unlabeled icons incl. "Account Info"; Settings tabs use local state, not routes |
| Settings | No hub; profile, limits, notifications, security are scattered |
| Broken | `/app/scan` uses a component that does not exist; `<NuxLink>` typos (dead menu links) |

## Steps (one commit each)
1. **Funding accounts (API)** - `FundingAccount` model (label, type, bank, account name/number, currency, instructions, balance, active); `GET/POST /api/funding-accounts`, `PUT /api/funding-accounts/:id` (admin; balance changes via signed `adjustment`); admin top-up can credit a funding account in the same DB transaction. Users only see active accounts, never balances.
2. **Stats (API)** - fix aggregates units, add counts/pending/this-month; `GET /api/admin/stats`.
3. **Funding (UI)** - user "Add funds" shows funding account details (copy buttons); admin `/admin/funding` list, add/edit, adjust balance, totals; top-up modal picks a funding account.
4. **Nav + settings hubs** - mobile bottom nav with labels (Home, Transfer, Activity, Settings; admin: Dashboard, Users, Funding, Settings); `/app/settings` and `/admin/settings` become link hubs to their own pages (profile, account & limits, notifications, security / defaults, tiers, funding); route-driven tabs; remove dead scan page; fix `NuxLink`.
5. **Stats (UI)** - user dashboard stat cards + transactions page cards; admin dashboard cards, recent transactions/users.

Deploy note: new table is created by `DB_SYNC=true` (creates missing tables only, never alters).
