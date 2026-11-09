# Deploying to alwaysdata (GitHub Actions)

Workflow: `.github/workflows/deploy.yml`. On every push to `main` it runs `lint:api`, the smoke and migration tests and
`pnpm build`, runs `pnpm db:migrate` against the production database, then uploads the build over SSH to `~/<APP_DIR>/releases/<sha>`, switches the `current` symlink and
requests an app restart when API credentials are configured (otherwise a manual restart is required). Pull requests only run the test/build job. On an empty database, the migration step is skipped for the first-start bootstrap described below.

This is an operational runbook, not an unfinished feature plan. Setup and production execution have not been verified by the documentation audit. See [update-plan.md](update-plan.md) for remaining implementation gaps.

## 1. SSH key
Generate a key pair dedicated to deploys (`ssh-keygen -t ed25519 -C bamcopt-github-deploy`).
- Public key: alwaysdata dashboard -> Remote access -> SSH keys.
- Private key: GitHub secret `ALWAYSDATA_SSH_KEY`.
Also enable SSH for the account user in the dashboard (Remote access -> SSH).

## 2. GitHub (repo Settings -> Secrets and variables -> Actions)
Create an environment named `production`, then:

| Name | Type | Value |
|---|---|---|
| `ALWAYSDATA_SSH_HOST` | secret | `ssh-<account>.alwaysdata.net` |
| `ALWAYSDATA_SSH_USER` | secret | the alwaysdata account/SSH user |
| `ALWAYSDATA_SSH_KEY` | secret | private key from step 1 |
| `ALWAYSDATA_KNOWN_HOSTS` | secret, optional | output of `ssh-keyscan -t ed25519 <host>` (pins the host key; otherwise it is scanned at deploy time) |
| `ALWAYSDATA_DB_HOST`, `ALWAYSDATA_DB_NAME`, `ALWAYSDATA_DB_USER`, `ALWAYSDATA_DB_PASSWORD` | secrets | same database the app uses; the runner connects directly to run migrations |
| `ALWAYSDATA_DB_PORT`, `ALWAYSDATA_DB_SSL` | variables, optional | default `5432` / `false` |
| `ALWAYSDATA_API_TOKEN`, `ALWAYSDATA_SITE_ID` | secrets, optional | alwaysdata API token (Account -> API tokens) and the site id (visible in the site's dashboard URL); enables automatic restart |
| `ALWAYSDATA_APP_DIR` | variable, optional | directory under `$HOME`, default `bamcopt` |
| `HEALTH_URL` | variable, optional | e.g. `https://<site>/api`, must return `api - v1` |

## 3. alwaysdata site (Web -> Sites -> Add a site)
- Type: **Node.js**
- Command: `./start.sh`
- Working directory: `bamcopt/current` (same as `ALWAYSDATA_APP_DIR` + `/current`)
- Environment (runtime variables):

| Variable | Notes |
|---|---|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | long random string |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | set explicit private values; the current seed has unsafe defaults and can overwrite an existing admin's password/role/status at startup. Review provisioning before production; see the remaining-work register |
| `DB_HOST` | PostgreSQL host from the alwaysdata Databases page |
| `DB_PORT` | `5432` |
| `DB_NAME` | database name (alwaysdata prefixes it with the account name) |
| `DB_USER` | database user |
| `DB_PASSWORD` | database password |
| `DB_SSL` | `false` unless the server requires TLS |
| `DB_SYNC` | `true` for the FIRST start on an empty database only, then `false`. On an empty database the migrate step is skipped; the next deploy adopts the tables via the migrations |
| `OTP_ON` | `true` (default) asks for the e-mailed login code; `false` signs in with the password alone. Restart the site after changing it |
| `SUPERADMIN_EMAIL`, `SUPERADMIN_PASSWORD`, `SUPERADMIN_NAME` | optional. Creates the owner account that signs in to `/super`. Both e-mail and password are needed and the e-mail must differ from `ADMIN_EMAIL`. There is no default super admin |
| `SUPERADMIN_OTP` | `auto` (default): the super admin must enter the e-mailed code even when `OTP_ON=false`, as soon as mail (`SMTP_PASS`) is configured. `on` forces it but, in production, only if mail works (otherwise the owner would be locked out). `off` never forces it |
| `SECURITY_LOG_RETENTION_DAYS`, `SESSION_RETENTION_DAYS`, `AUDIT_RETENTION_DAYS` | days to keep sign-in history (365), ended sessions (30) and the administrator action trail (0 = forever). A daily job prunes; `/super` has a "Clean up now" button |
| `TRUST_PROXY_HOPS` | `1` (default). Reverse proxies in front of the app; the client IP is the entry they appended to `X-Forwarded-For` |
| `GEOIP` / `GEOIP_URL` | `GEOIP=off` stops the background IP-to-city lookup (the IP is then sent to no third party). Default provider `https://ipwho.is/{ip}` |
| `APP_URL` | public site URL, used in e-mail links |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | mail; e-mails are skipped when `SMTP_PASS` is empty |

Public runtime values (visible to browsers; never put secrets here): `NUXT_PUBLIC_APP`, `NUXT_PUBLIC_SUPPORT_EMAIL`, `NUXT_PUBLIC_MOBILE`, `NUXT_PUBLIC_SUPPORT_HOURS`, `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_LOGO_URL`, `NUXT_PUBLIC_LEGAL_ENTITY`, `NUXT_PUBLIC_BUSINESS_ADDRESS`, `NUXT_PUBLIC_LEGAL_UPDATED`. Confirm the real operator, contact details and policy date before launch. Use an absolute http(s) origin for the site URL and a local or trusted image URL for the logo. See `.env.example` for examples. Public branding does not configure SMTP or the separate email-link `APP_URL`.

`DB_*` variables are used instead of `DATABASE_URL` so passwords with characters such as `@` need no URL encoding.

## Referral program activation

After migrations, open `/admin/referrals`. Set points per qualifying referral, the number of points
equal to **1.00** of the chosen reward currency, then review and confirm activation. Example:
150 points per referral, 100 points = 1.00 USD. Customers use `/app/referrals`; invitation links open
`/sign-up?ref=<code>`. Configure `NUXT_PUBLIC_SITE_URL` to the real public origin before sharing links.

- Signup attribution cannot be reassigned. Only the first approved **deposit request** qualifies;
  rejected requests and manual top-ups do not. Approval and the points award share one transaction.
- Review suspected duplicate identities before approving that first deposit. Unique account/email
  rules do not establish that two different emails belong to different people. Admins can reject
  pending referrals with a reason; this release does not automate identity verification or claw back
  already withdrawn rewards.
- New conversion rates apply to unspent points; past withdrawals retain their rate/currency. Customer
  confirmation includes a rules version, so changed rules require a fresh review. Currency is locked
  after the first award. Withdrawals require matching account currency, an active user/account, exact
  whole-cent conversion and room under the account balance cap. There is no FX or external payout.
- Disabling pauses both earning and withdrawals. A first deposit approved while disabled makes that
  referral ineligible permanently; enabling later does not backfill it. Previously earned points remain.
- A withdrawal debits points and credits the account with a linked ledger transaction atomically.
  Same-key retries recover the original receipt, including after a lost response/reload. Reconcile
  histories before creating another request if the browser’s recovery storage was cleared.
- Referral rules/rejections are transactionally audited. Reward funding is an operator obligation:
  withdrawing points creates a customer credit, not a debit against an external funding account.

## Rollback procedure
`ssh <user>@<host>`, then `cd ~/bamcopt && ln -sfn releases/<older-sha> current.new && mv -T current.new current`
and stop the app process (alwaysdata restarts it). The last 5 releases are kept.
