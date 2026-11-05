-- Additive PostgreSQL migration. Apply before deploying the deposit-request screens.
-- No existing balances or historical transactions are changed.
BEGIN;
CREATE TABLE IF NOT EXISTS deposit_requests (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id),
  funding_account_id uuid NOT NULL REFERENCES funding_accounts(id),
  request_key uuid NOT NULL,
  amount numeric(20,2) NOT NULL CHECK (amount > 0),
  currency varchar(10) NOT NULL,
  funding_snapshot json NOT NULL,
  reference varchar(200) NOT NULL DEFAULT '',
  status varchar(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  decision_note text,
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  transaction_id uuid UNIQUE REFERENCES transactions(id),
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  UNIQUE (user_id, request_key)
);
CREATE INDEX IF NOT EXISTS deposit_requests_user_created_idx ON deposit_requests (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS deposit_requests_status_created_idx ON deposit_requests (status, created_at DESC);
COMMIT;
