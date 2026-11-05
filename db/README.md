# Database (PostgreSQL)

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

Before deploying customer deposit submissions and admin approval, apply
`db/migrations/20261105_deposit_requests.sql` to the existing PostgreSQL database.
It creates an additive table with per-user submission-key uniqueness and a unique ledger link.
It does not alter historical balances or transactions. Back up before migration; do not drop the
table for rollback after requests have been received. Fresh local test databases create it through
`DB_SYNC=true`. No production migration has been run by the coding task.

## Notifications update (existing databases)

New columns link a notification to what it is about (a transaction, a user). Run once:

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
