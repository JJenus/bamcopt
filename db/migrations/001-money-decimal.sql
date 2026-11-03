-- Run ONCE on the production MySQL DB before deploying (back up first). Table names are Sequelize defaults.
-- Money columns become DECIMAL(20,2); existing whole numbers convert losslessly.
UPDATE Accounts SET amount = 0 WHERE amount IS NULL;
ALTER TABLE Accounts MODIFY amount DECIMAL(20,2) NOT NULL DEFAULT 0;
UPDATE Transactions SET amount = 0 WHERE amount IS NULL;
ALTER TABLE Transactions MODIFY amount DECIMAL(20,2) NOT NULL DEFAULT 0;
-- Optional integrity (check for duplicates first):
--   SELECT account_number, COUNT(*) FROM Accounts GROUP BY account_number HAVING COUNT(*) > 1;
--   ALTER TABLE Accounts ADD UNIQUE (account_number);
--   ALTER TABLE Transactions ADD UNIQUE (transaction_id);
