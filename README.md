# App
## Fullstack setup
UI (Nuxt) and API (`server/api`) are one app. Copy `.env.example` to `.env`, set `JWT_SECRET` and the `DB_*` values, run `db/migrations/001-money-decimal.sql` once on an existing database, then `npm run dev`.
`npm test` runs an end-to-end check (auth, OTP, authorization, money invariants). `npm run lint:api` checks that UI code never calls the API directly. See `MIGRATION.md`.
