# Explicit funding and balance operations

Follow-up to the UI revamp pushed as `658b089`. The explicit adjustment/reversal release itself needs no schema migration. The subsequent [verified deposit-request extension](deposit-requests.md) adds a two-step user form, a dedicated requests view and admin approval; **run `pnpm db:migrate`** before deploying that extension. The official Sequelize CLI applies pending migrations and records their history.

## Customer funding instructions

- `/admin/funding` creates new instruction accounts **hidden** through the UI. Review the shared instruction preview, save, then explicitly publish.
- **Customer view** renders only published instructions using the same `FundingInstructions` component as `/app/add-funds`. Tracked balances are not passed to the customer card or returned by the customer API.
- Customers see bank/network, account name, destination, currency, instructions and copy controls. They can refresh instructions. The page does not initiate a payment or promise settlement.
- Editing published instructions requires review; hiding an account removes it from the next customer refresh. Previously copied details cannot be recalled.

## Explicit balance changes

All new adjustment forms require an operation choice and a positive decimal amount. A minus sign is not an operation selector.

### Tracked funding balance

```json
PUT /api/funding-accounts/:id
{ "balanceChange": { "direction": "debit", "amount": 25.29 } }
```

`direction` must be `credit` or `debit`. Signed/zero/unsafe amounts, unknown operations, and legacy `adjustment` payloads are rejected. Metadata-only updates remain supported. Funding adjustments change the tracked funding balance only, not any customer's account. Review shows the estimated resulting balance; the server locks the latest row and rejects overdrafts.

A funding account with a nonzero tracked balance cannot be relabeled to another currency; create a separate account instead. Both legacy top-ups and explicit customer credits enforce matching denominations for funding associations.

### Customer balance

```json
POST /api/account/adjustments
{
  "email": "customer@example.test",
  "direction": "credit",
  "amount": 25.29,
  "reason": "Confirmed deposit reference EXAMPLE"
}
```

The reason is required and visible in customer activity. Credits write a `credit` ledger entry; debits write a `withdrawal` entry with administrative-correction notes. Administrative debits therefore participate in the existing outgoing activity/aggregate/daily-limit accounting. They do not silently change a prior transaction's status.

Credit-only `fundingAccountId` optionally increases the associated tracked funding balance atomically. Customer and funding denominations must match; no FX is performed. Debits cannot carry an association: they remove customer funds only. Make any separately justified funding correction explicitly rather than inferring a second movement.

Customer debits cannot overdraw. Credits preserve the existing maximum-balance checks. Closed customer accounts remain protected. These are privileged reconciliation tools, not customer transfers.

### Explicit reversal

```json
POST /api/transactions/:id/reverse
{ "action": "reverse", "reason": "Outgoing payment was not delivered" }
```

The UI offers **Reverse and refund** for outgoing bank/administrative debits. It shows the fixed positive refund amount and asks for a reason; it never asks for a negative amount. The existing locked ledger transition marks the original failed and creates a once-only credit refund. The reason is retained on both records. Concurrent/repeated reversals cannot refund twice. Internal transfers and deposits remain non-reversible; failed transactions cannot be reopened. Funding balances do not change during a transaction reversal.

The legacy positive-credit endpoint and status-update API remain supported for existing callers. The active UI uses explicit adjustments/reversals rather than signed amounts or implicit failure selection. Legacy signed funding-adjustment clients must migrate to the `balanceChange` payload.

## Verification

- RED: the expanded API smoke suite initially reported **141 passed, 21 failed**, covering the absent explicit-operation endpoints and rejected/misinterpreted payloads.
- GREEN: the first complete explicit-operation implementation passed **164 API checks** before further currency-hardening tests were added.
- Final API suite: **167 passed, 0 failed**, including funded-currency relabel protection, legacy/new association currency checks, concurrent reversal balance safety and one refund ledger row. SQLite contention can reject a concurrent request; the invariant is one refund, not a guarantee that all simultaneous requests succeed.
- `node --test --experimental-test-coverage tests/funding-ui.test.mjs tests/account-ui.test.mjs tests/admin-ui.test.mjs tests/public-site.test.mjs tests/marketing-markup.test.mjs`: **16 passing tests**, with 100% line/branch/function coverage for `funding-ui.ts` (not whole-app coverage).
- `pnpm lint:api` and the production build pass; `pnpm test:pages` checks the updated balance-adjustment page alongside the existing route suite.
- SSR route suite: **19/19 passed**. The real-backend global-Playwright browser test passed the full create/publish/customer-copy/refresh, funding credit/debit, customer credit/debit/reason display, explicit reversal/refund-reason display, retry-without-double-refund and unpublish journey with no runtime/hydration errors.
- `tests/funding-browser.cjs` uses global Playwright and an actual isolated SQLite backend—no financial API mocks. It verifies create/hidden/publish, edit propagation, clipboard copy, customer field privacy, positive Credit/Debit funding adjustments, customer credit/debit ledger entries, reversal/refund-once, unchanged funding balances during debit/refund, unpublish, mobile layouts and runtime/hydration errors.

### Run the optional real-browser check

Use an isolated local server and disposable database only. The script refuses non-loopback URLs or database files outside `/tmp/opencode`. It reads the seeded QA administrator ID and signs a short-lived test session using that server's test secret. It never reads or modifies a real database.

1. Build with `pnpm build`.
2. Start the built server with `PORT=3116`, `HOST=127.0.0.1`, `DB_DIALECT=sqlite`, `DB_STORAGE=/tmp/opencode/bancopt-funding-browser.db`, `DB_SYNC=true`, and a **local test-only** `JWT_SECRET`.
3. Run `node tests/funding-browser.cjs` with `QA_BASE=http://127.0.0.1:3116`, `QA_DB` set to that same SQLite path, `QA_JWT_SECRET` matching the test server, and `PLAYWRIGHT_MODULE` pointing to the globally installed Playwright package. No browser dependency is added to this project.

Screenshots are saved outside the repository under `/tmp/opencode/bancopt-funding-*.png`. The script leaves fixtures in the disposable database for inspection.

## Remaining operational boundaries

Operation enums are not idempotency keys. UI in-flight guards and unknown-outcome blocks do not deduplicate separate requests across tabs/devices. Reconcile uncertain outcomes before trying again. Funding balance-only adjustments still lack a separate durable operator audit-history model; customer corrections/reversals have ledger reasons, not a full approval/audit system. PostgreSQL row-lock behavior still requires environment-specific testing; the recorded automated runs use SQLite.
