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
