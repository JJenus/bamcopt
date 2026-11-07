# App
## Fullstack setup
UI (Nuxt) and API (`server/api`) are one app. This repo is managed with **pnpm** (`pnpm-lock.yaml` is the only lockfile). Run `pnpm install`, copy `.env.example` to `.env`, set `JWT_SECRET` and `DATABASE_URL` (PostgreSQL), run once with `DB_SYNC=true` on a fresh database (see `db/README.md`), then `pnpm dev`.
`pnpm test` runs an end-to-end check (auth, OTP, authorization, money invariants); `pnpm test:otp-off` runs it again with `OTP_ON=false`. `pnpm lint:api` checks that UI code never calls the API directly. See `MIGRATION.md`.
