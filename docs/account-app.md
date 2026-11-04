# Account workspace

The `/app` redesign uses the existing Bootstrap/Metronic theme, with scoped enhancements in `assets/css/account.css`. The public-site styles remain separate. No new project dependencies were added; the direct SweetAlert dependency was removed.

## Pages

| Route | Purpose |
| --- | --- |
| `/app` | Balance, account actions, monthly summaries, recent activity |
| `/app/transfer` | Recipient → amount → review → existing server code checks → explicit final send → recorded result |
| `/app/transactions` | Search/filter/pagination and keyboard-accessible native-dialog details |
| `/app/add-funds` | Current funding instructions and copy controls; no payment initiated here |
| `/app/settings` | Customer settings hub |
| `/app/profile`, `/app/profile/edit` | Personal information and a local edit draft persisted through `userService` |
| `/app/account-info` | Current account/limits and support-only account-level enquiry |
| `/app/settings/security` | Recorded sign-in history, not active-session administration |
| `/app/notifications` | Notification history and explicit mark-all-read |
| `/app/notifications/:id` | Notification detail and related-entity navigation retained from main |
| `/app/transaction/:id` | Authorized transaction detail opened from a notification |
| `/app/help` | Environment-configured support channels and existing guides |

## Data and safety

- `useAccountWorkspace()` refreshes the profile/account, activity, and summary through existing services. Notifications use the paged/list/count/detail contract intentionally added on `main`, through the shared `useNotifications()` composable. Data and errors are separate; unloaded balances are not shown as confirmed zero. Results from a different user/session are ignored.
- Session hydration clears user-scoped workspace/cache/draft state across identities. Existing authorization, cookie behavior, money calculations, account-limit enforcement, and financial endpoints are not rewritten.
- Transfer amounts accept only positive decimal amounts with at most two places and an explicit decimal separator. Required codes exist only in the mounted transfer component and are cleared on changes, navigation, submission, or verification reset.
- A transfer does not submit until the final confirmation. In-flight submission is guarded; unknown/server-error outcomes direct the customer to activity/support instead of offering a blind retry. Server-side idempotency remains a follow-up.
- Profile edits do not mutate shared data until save succeeds. Photo uploads use the existing service, not a new storage integration. Sensitive identity-document collection is not exposed by the upgraded screen.
- Account-level enquiries only notify existing support/admin contacts. They do not modify account levels or claim approval.
- The new shell does not mount the legacy right sidebar, keypad, or funding modal. The notification drawers were intentionally removed upstream and remain removed; the shared bell dropdown, full list, detail view, type/unread filters, pagination, and related-transaction links are preserved.

## Toasts and form feedback

`app.vue` mounts one global `Toast` component. `useToasts().push(message, tone)` adds up to four messages. Messages dismiss after 6.5 seconds and pause on hover/focus; all have explicit dismiss controls and live-region roles. Existing `successAlert`, `errorAlert`, `warningAlert`, and `infoAlert` helpers use this host, so admin callers also receive toasts without an admin redesign.

Upstream live notification behavior is merged into the same host: a cheap unread-count poll every 15 seconds while the tab is visible, no first-load flood, and incoming toasts linking to notification details. No second toast host is mounted in either layout. Profile dropdown styling follows the existing admin menu (avatar summary, grouped menu links, separators, theme submenu) rather than the earlier button-list redesign.

Customer forms use local validation with Bootstrap `is-invalid` / `invalid-feedback`, associated labels and error descriptions. Submission/network errors stay inline. Successes, copy failures, and other non-field notices can use toasts. No blocking SweetAlert popups are invoked by the redesigned flows.

## Verification

Only three new lightweight tests were added in `tests/account-ui.test.mjs`: decimal amount safety, status/direction semantics, and activity filtering. The initial RED run failed because the new helper module did not yet exist; the same tests pass after implementation.

Commands:

```sh
node --test tests/account-ui.test.mjs tests/public-site.test.mjs
pnpm lint:api
NUXT_BUILD_DIR=/tmp/opencode/bancopt-account-build pnpm build
NUXT_BUILD_DIR=/tmp/opencode/bancopt-account-smoke pnpm test
```

Use the globally installed Playwright/Chromium for temporary browser QA; do not add a project dependency. Mock account/API responses and test only against a disposable local server, never real customer accounts. Known operational/security limitations are recorded in `ATTENTION.md`.

`NUXT_BUILD_DIR` also isolates Vite's optimized-dependency cache. After dependency/lockfile changes, restart an already running `pnpm dev` and hard-refresh browser tabs if Vite reports `504 Outdated Optimize Dep`; subsequent isolated smoke checks do not share its dependency cache.

## Upstream integration

Pulled `origin/main` through `dd4ae0f` before final verification. The notification API, entity links, pagination, corrected notification types, account-less admin handling, and upstream regression tests are retained. Notification list/detail/bell components are reused in both areas rather than replaced with an incompatible app-only state store. The app header uses the shared bell; both layouts use the single global toast host. Financial API changes in that commit are upstream work, not rewritten by the account redesign.

## Verification evidence (2026-11-04)

- The merged production build passes with an isolated Nuxt/Vite cache.
- Existing/upstream smoke suite: **143 passed, 0 failed**. Upstream app/admin notification SSR checks: **9/9 passed**.
- Three new account helper tests and five existing public-site helper tests pass; no additional project test dependencies were installed.
- One temporary script using global Playwright/Chromium checks 13 customer routes at desktop/mobile sizes, noindex/headings, the admin-style profile menu and theme options, notification bell → detail → linked transaction, activity filters/dialog Escape, profile save/inline validation, toast feedback, notification read state, funding retry, all transfer code steps, one explicit send, returned status, and unknown-outcome protection. API responses are mocked; these browser checks do not create real payments or change customer data.
- Browser runs report no runtime/hydration errors. Screenshots are outside the repository under `/tmp/opencode/bancopt-account-*.png`. There is no committed visual baseline, full accessibility certification, or performance benchmark.
- `pnpm lint:api` and whitespace/conflict-marker checks pass. Only the inherited notification migration requires existing-database attention; see `ATTENTION.md` and `db/README.md`.
