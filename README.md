# App
## Fullstack setup
UI (Nuxt) and API (`server/api`) are one app. Copy `.env.example` to `.env`, set `JWT_SECRET` and `DATABASE_URL` (PostgreSQL), run once with `DB_SYNC=true` on a fresh database (see `db/README.md`), then `npm run dev`.
`npm test` runs an end-to-end check (auth, OTP, authorization, money invariants). `npm run lint:api` checks that UI code never calls the API directly. See `MIGRATION.md`.
