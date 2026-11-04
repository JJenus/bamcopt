# Administration workspace

The `/admin` revamp retains Nuxt 3, the supplied Bootstrap theme, existing admin authorization, and the server ledger rules. No database migration, production deployment, or real financial operation is part of this UI task.

## Routes and interaction contract

| Route | Purpose |
| --- | --- |
| `/admin` | Operational counts, recent transaction/user links, funding totals grouped by currency |
| `/admin/users` | Search by name, email, phone, ID or account number; filter by role/status; mobile cards |
| `/admin/users/:id` | Refresh-safe user details, isolated account-control drafts, recent transactions and notification composer |
| `/admin/top-up` | Validate and resolve a recipient, review the deposit, explicitly confirm a single credit |
| `/admin/transaction/:id` | Transaction details, constrained status options, notes and refund consequence review |
| `/admin/funding` | Funding instructions, visibility confirmation and reviewed signed balance adjustments |
| `/admin/settings` | Workspace settings hub |
| `/admin/settings/defaults` | Persist and refresh display defaults; no currency conversion |
| `/admin/settings/tiers` | Isolated create/edit drafts; existing tiers use the PUT endpoint; review limit changes |
| `/admin/settings/security` | Shared role-aware sign-in history; not an active-session management screen |
| `/admin/profile`, `/admin/profile/edit` | Persisted administrator profile edits and optional photo upload/removal |
| `/admin/notifications`, `/admin/notifications/:id` | Preserve upstream paging, filters, read state and details; related records link directly |

The shell has one desktop navigation sidebar, a mobile bottom navigation, a notification bell and the preferred grouped profile menu with appearance submenu. There is still only one global toast host. All admin routes inherit the existing admin guard and `noindex, nofollow` metadata.

## Financial boundaries

- Credit review resolves the exact account before submission. The amount uses the existing strict decimal parser. Submit buttons are guarded while requests run. A timeout/server failure blocks another credit on that screen and instructs the operator to reconcile the customer's activity first.
- A funding association **increases** that tracked funding balance by the credited amount, matching the existing server behavior. It is not a debit from a reserve. No foreign exchange occurs. Operators must verify matching denominations.
- Funding accounts are summarized separately by their labeled currency, never under a single global symbol. The existing transaction API does not provide a reliable per-transaction currency snapshot, so these amounts are explicitly described as account units rather than inventing a currency.
- Transaction status editing sends only changed status/notes and the transaction ID. Failing an external transfer explicitly warns about the irreversible, once-only refund. Internal transfers/deposits do not offer failure; failed transactions cannot be reopened. Other server-supported status changes remain available.
- User controls send field-specific payloads rather than broad user records. They refresh the selected user after success; financial actions link to freshly loaded customer records rather than refreshing the administrator's balance.
- Neither the UI guards nor confirmations provide server-side idempotency, two-person approval, or an audit trail. See `ATTENTION.md` for release concerns.

## Shared avatar behavior

`components/app/Avatar.vue` is shared by both workspaces. Genuine photos are retained. Default placeholders, absent photos and failed image requests display Unicode-aware initials: first/last name initials, then email-local-part initials, then `?` when identity is unavailable. Explicit identity props prevent a customer's missing photo from borrowing the administrator's initials. The legacy dropdown component names delegate to the same profile menu.

## Verification and TDD evidence

Journeys were derived from the agreed conversation plan. The focused helper tests were written before implementation and initially failed because the helper module did not exist. A subsequent transaction-options test produced an executed assertion failure when internal/deposit status editing was overly restrictive; the implementation was corrected to preserve supported non-failure transitions.

- `node --test --experimental-test-coverage tests/admin-ui.test.mjs tests/account-ui.test.mjs tests/public-site.test.mjs` checks initials/placeholders, account-less user search, currency-separated totals, status options, money labels and existing customer/public helpers. Coverage is scoped to these imported helpers, not the whole application.
- `pnpm test` checks existing API authorization and ledger behavior using the isolated smoke database.
- `pnpm test:pages` includes ten additional admin SSR routes and now reports a nonzero exit on failure. It uses pnpm rather than downloading an executor through npx.
- Temporary global-Playwright checks live outside the repository in `/tmp/opencode/bancopt-admin-qa.cjs`. They mock API responses to verify 15 admin routes on desktop/mobile, confirmation boundaries, unknown-credit outcomes, refund constraints, decimal funding adjustments, tier draft isolation/PUT, persisted profile edits, role-aware navigation, notification links and initials. Screenshots are in `/tmp/opencode/bancopt-admin-*.png`.
- The existing customer browser script is retained for shared-component regression checks. No project browser dependencies are added.

The pre-existing `/app` revamp is retained alongside the admin changes in this UI release. The user subsequently authorized committing and pushing the combined revamp. This documentation preserves the RED/GREEN evidence for the release.

### Recorded results (2026-11-04)

- Production build: **passed**, with the existing Nuxt Image warning about unavailable optional sharp binaries.
- Existing API/ledger smoke suite: **143 passed, 0 failed**.
- Expanded real-session SQLite SSR suite: **19/19 passed**.
- Helper suite: **13/13 passed**; `admin-ui.ts` has **100% line/function coverage and 97.14% branch coverage**. This is not whole-app coverage.
- Production browser checks: **15 admin routes** and **13 customer routes**, desktop/mobile, passed without runtime/hydration errors. Critical write flows use mocked APIs, not real deposits.
- API-boundary check and `git diff --check`: **passed**. No server/ledger code, credentials, dependencies, or lockfiles were changed by the admin pass; dependency changes already present belong to the earlier account revamp.
- Standalone TypeScript checking/full linting: unavailable in the current repository (no installed `tsc`/`vue-tsc`, formatter or general lint script). No new toolchain dependencies were installed to conceal that limitation.
- Follow-up markup fix: `AccountPreview.vue` now places `figcaption` directly under `figure`, outside the card-body div. `node --test tests/marketing-markup.test.mjs` failed on the old nesting and passed after the fix.

### Self-review

Overall: **4.0/5**, implemented and verified locally, with operational limitations explicitly retained.

| Axis | Score | Evidence / improvement |
| --- | --- | --- |
| Accuracy | 4 | Production build, SSR and browser behavior verified; standalone static type checking is still unavailable. |
| Completeness | 4 | Agreed routes and initials behavior covered; failure-path browser coverage concentrates on consequential money actions rather than every settings error. |
| Clarity | 4 | Route/financial contracts documented; compact templates follow the existing account revamp but could benefit from a project-wide formatter later. |
| Actionability | 4 | Working local screens and explicit verification commands; production idempotency/currency review remains an operator prerequisite, not an implied UI guarantee. |
| Conciseness | 4 | Shared shell/avatar/menu/security UI; profile editor drafts still have some role-specific duplication. |

Highest-impact follow-ups: add a repository-supported static checker, address the documented server-side financial safeguards separately, and expand settings error-path browser coverage. These are not claimed as completed here. Would the user agree? The visible revamp and requested avatar change are delivered; the remaining release concerns are concrete and documented rather than hidden.
