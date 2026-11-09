# Release review items

The current remaining-work register is [docs/update-plan.md](docs/update-plan.md). It replaces completed feature reports and their stale follow-up lists.

Before a public/financial release, review:

- **Payment truth:** external-destination ledger records are not provider settlement. Verify actual receipts before approving deposits and reconcile unknown outcomes before retrying operations without idempotency keys.
- **Security:** secure administrator provisioning, exposed-credential rotation, fail-open session/account checks, JS-readable auth cookies, upload access, public receipts and durable audit guarantees remain open.
- **Business approval:** legal/operator disclosures, product terms, transfer-code policy, public contact details and privacy providers require approval. Support and investment pages do not imply ticketing or investment execution.
- **Operations:** validate PostgreSQL concurrency/migrations and backup recovery in staging; confirm deployment secrets, runtime configuration, mail delivery, restart/health checks and retention policy. See [docs/deploy-alwaysdata.md](docs/deploy-alwaysdata.md) and [db/README.md](db/README.md).

Server-enforced suspension, role revalidation, session revocation, administrator audit logging, new-device alerts, super-admin OTP policy, retention and CI/CD are implemented. Their remaining hardening gaps are listed in the register; do not treat the older missing-feature claims as current.

This documentation audit did not run migrations, contact production or re-run runtime tests.
