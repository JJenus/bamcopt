# Verified deposit requests

## User flow

`/app/add-funds` is a two-step form:

1. Enter a positive amount and choose a published funding account. Continue does not create a request or move money.
2. Review that account's payment instructions, make the external payment, optionally provide its reference, then submit for verification. The site does not initiate the external payment.

Submission opens `/app/add-funds/requests`, a separate view showing pending, approved and rejected requests, decision notes, and links to approved ledger credits. Its records belong to the authenticated user only. A request's submitted amount, currency and funding instructions are preserved rather than silently following later edits to the funding account.

## Administrator flow

`/admin/deposits` lists requests with status filtering and pagination. Opening a pending request shows the submitted instructions and an explicit decision:

- **Approve and credit:** verify actual receipt, amount, currency and destination against the real payment record; check the payment was not credited manually; enter a customer-visible verification note; review and confirm.
- **Reject without credit:** enter a customer-visible rejection reason, then review and confirm. No balance changes or ledger entries are created.

The server never accepts an approval amount, recipient or funding override. Approval uses the persisted request, verifies the current account/currency/maximum-balance rules, and commits the terminal request state, customer credit, associated funding credit and linked ledger transaction in **one database transaction**. Request-row locking plus a conditional pending-state claim prevent duplicate credits. Repeating the same terminal decision returns the recorded result; the opposite decision returns a conflict. If a check fails, the entire transaction rolls back and the request stays pending.

Hiding a funding account prevents new submissions but does not discard already submitted payments. An administrator can still verify an older request against its stored instructions; changing its denomination prevents approval. Internal manual corrections remain separate tools—do not manually credit a payment that is also awaiting request approval.

Admins receive best-effort notifications linking to the review queue. Customers receive approval notifications linking to the credited transaction, or rejection notifications linking to their request history. Notification failure cannot roll back or duplicate the financial operation.

## Submission recovery

The customer sends a UUID submission key. `(user_id, request_key)` is unique in storage. An identical retry returns the same record, including after an unknown network outcome; reusing the key with a different amount/account/reference is rejected. The browser retains an in-flight draft in per-user session storage until success, so a reload can recover the same submission. It stores only the amount, chosen account ID, payment reference and submission key—not transfer codes or account balances.

This deduplicates one submission and approval. It does **not** prove money arrived or identify the same external bank payment across separately created requests. Administrators must reconcile actual bank receipts and existing manual credits before approval. There is no bank-provider webhook/integration or proof-upload feature in this change.

## API

- `POST /api/deposit-requests`: authenticated customer with an account; `{ amount, fundingAccountId, requestKey, reference? }`. Owner/status/currency are server-derived. Only currently published, same-currency destinations are accepted.
- `GET /api/deposit-requests`: own requests for customers, all requests for admins. Optional `status`, `limit` (1–50), `offset`.
- `GET /api/deposit-requests/:id`: owner or admin; a different customer receives 404.
- `POST /api/deposit-requests/:id/decision`: admin only; `{ action: "approve" | "reject", note }`. Notes are required and visible to the customer.

## Deployment

**Before deploying this feature to an existing PostgreSQL database**, apply `db/migrations/20261105_deposit_requests.sql` after a backup. It creates the request table, foreign keys, unique submission keys, unique ledger links and lookup indexes. It does not modify balances or historical transactions. The task does not execute a production migration. Do not drop the table to roll back after accepting live requests; retain records and disable the submission/review UI if a rollback is needed.

Fresh isolated SQLite test databases create the table through `DB_SYNC=true`. Recorded concurrency checks use SQLite; deployment-specific PostgreSQL locking and migration application still require validation in the target environment.

## Verification

The API regression tests were added before implementation and initially failed on the absent request endpoints. Coverage includes pending submission without money movement, per-user isolation, forged fields, amount overrides, submission retry/key conflicts, admin-only decisions, concurrent/repeated approval, one linked ledger credit, rejection without money movement, terminal conflicts, balance-cap rollback, published-account eligibility, currency matching, and pending payments after account hiding.

`tests/funding-browser.cjs` extends the existing real-backend browser journey with both form steps, the dedicated requests page, admin receipt verification/approval, credited receipt navigation, rejection visibility, and a dropped response after a real submission followed by reload/same-key recovery. No financial response is mocked; only the delivery of one response is deliberately interrupted. It uses global Playwright and an isolated SQLite database, never a real customer database.

Recorded results (2026-11-05): **193 API checks passed**, **21/21 SSR route checks passed**, production build and API-boundary check passed. Real-backend browser checks passed the two-step flow, approved credit, rejected request, same-key recovery after a lost response, customer receipt navigation and mobile admin layouts without runtime/hydration errors. The initial API regression run failed on the absent deposit-request endpoints before implementation. Standalone TypeScript checking remains unavailable in this repository; these results do not claim full application coverage or production PostgreSQL migration verification.
