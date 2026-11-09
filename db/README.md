# Database (PostgreSQL)

## Referral rewards rollout

Run `pnpm db:migrate` before deploying referral rewards to an existing database. The additive
`20261110000000-create-referrals.js` migration creates program settings, unique invitation codes/point
wallets, signup attribution and idempotent withdrawal receipts. Existing balances are not rewritten.
The program starts **disabled**, with no reward configured. Do not drop these tables to roll back;
disable the program and retain its financial history. Test PostgreSQL locking and backup recovery in
staging before enabling real rewards. No production migration was run by this implementation task.

The subsequent `20261110000100-referral-withdrawal-minimums.js` migration adds minimum points and
minimum funds per withdrawal (defaults: 1 point and 0.01 currency units). Both limits apply, without
rounding up a conversion. Configure them at `/admin/settings/referrals`; old `/admin/referrals` links
redirect there. Disable rewards before rolling back to code that does not enforce these minimums.

## Apply migrations with the Sequelize CLI

Use the installed, official `sequelize-cli` (v6), not individual SQL commands:

```sh
pnpm db:migrate:status
pnpm db:migrate
```

`db:migrate` applies all pending JavaScript migrations in filename order and records them in
`SequelizeMeta`. Re-running it skips recorded migrations. Each shipped migration wraps its DDL in
a transaction; failures stop later migrations. Do not edit a migration once deployed—add a new one.

Configure `DATABASE_URL`, or `DB_HOST`/`DB_PORT`/`DB_NAME`/`DB_USER`/`DB_PASSWORD`, using the same target
as the app. `DB_SSL=true` uses the app's existing TLS configuration. Exported environment variables
take precedence over `.env`. Native `.env` loading requires Node 20.12+ (the tested runtime is Node 24).
For another file: `MIGRATION_ENV_FILE=.env.production pnpm db:migrate --env production`.
Set `MIGRATION_ENV_FILE=-` to use only exported variables. No credentials are stored in CLI config.

Run migrations **once per deployment in a release job**, before starting the new app version;
keep `DB_SYNC=false` in production. Do not launch the CLI independently in every app replica.
The standard CLI does not supply an automatic cross-process migration lock or checksum history;
deployment serialization and immutable migration files are required. Back up before production changes.

The CLI is a dev dependency, as in Sequelize's guidance. The release/build job must install dev
dependencies; a production-only `.output` bundle does not include the CLI or migration files.

To create a future migration:

```sh
pnpm db:migration:generate --name describe-your-schema-change
```

Implement its `up`/`down` functions using `queryInterface`; never import changing application models.
The shipped adoption migrations are explicitly forward-only because those tables/columns may already
contain financial or notification data. Their `down` functions refuse destructive rollback. Use a
reviewed forward fix instead of `db:migrate:undo` on these migrations.

These migrations upgrade an existing Bancopt schema. They do not bootstrap all legacy tables in an
empty production database. Fresh test/development databases use the existing initialization below.
`DB_SYNC=true` creates missing tables; it is not a substitute for migration history or database checks.

`pnpm test:migrations` runs the real Sequelize CLI against disposable SQLite fixtures under
`/tmp/opencode`, including reruns, adopting a sync-created table without deleting requests, required
constraints, rollback-on-failure and rejecting unconfigured production targets. No production database
is contacted by that test. PostgreSQL staging verification is still required before deployment.

Verification (2026-11-05): six migration tests pass using the actual CLI and disposable SQLite
databases, including rejecting invalid existing data without deleting it and exported-env precedence.
The initial regression run failed before CLI configuration/migrations existed. The production build,
API-boundary check and whitespace checks also pass. PostgreSQL execution was not tested here because
no isolated PostgreSQL server was available; no real database migration was executed.

Money columns are `NUMERIC(20,2)` (Sequelize `DECIMAL(20,2)`). Fresh database: run the app once with `DB_SYNC=true`
(creates the missing tables and enum types, never alters existing ones), then set it back to `false`.

Moving existing MySQL data: use `pgloader` (MySQL -> PostgreSQL) into a database that was created by `DB_SYNC=true`,
keeping the same table names (`users`, `accounts`, `transactions`, ...).
Optional integrity after loading:

```sql
-- check for duplicates first
SELECT account_number, COUNT(*) FROM accounts GROUP BY account_number HAVING COUNT(*) > 1;
ALTER TABLE accounts ADD UNIQUE (account_number);
ALTER TABLE transactions ADD UNIQUE (transaction_id);
```

## Deposit requests (2026-11-05)

Before deploying customer deposit submissions and admin approval, run `pnpm db:migrate`.
The deposit-request migration creates the missing table or adopts a table already created by
sync/manual SQL, preserves its records, and adds missing checks and unique indexes. No balance or
historical transaction is rewritten. The older `20261105_deposit_requests.sql` remains an unchanged
manual-reference artifact; the CLI intentionally runs only JavaScript migration files.
No production migration has been run by the coding task.

## Notifications update (existing databases)

`pnpm db:migrate` also handles missing notification entity columns and their lookup index.
The following DDL is retained as a reference, not a separate deployment step:

```sql
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS entity_type varchar(255),
  ADD COLUMN IF NOT EXISTS entity_id   varchar(255);
CREATE INDEX IF NOT EXISTS notifications_user_status_created_idx
  ON notifications (user_id, status, created_at DESC);
```

Notifications written by the OLD Express backend have `debit` / `credit` swapped (a bug that is fixed now).
Only if your data came from that backend, and only ONCE, flip them (check the enum name first with `\dT` in psql):

```sql
UPDATE notifications
   SET type = (CASE type WHEN 'credit' THEN 'debit' ELSE 'credit' END)::enum_notifications_type
 WHERE type IN ('credit', 'debit');
```
