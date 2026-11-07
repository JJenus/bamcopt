# Deploying to alwaysdata (GitHub Actions)

Workflow: `.github/workflows/deploy.yml`. On every push to `fullstack-nuxt` it runs `lint:api`, the smoke tests and
`pnpm build`, then uploads the build over SSH to `~/<APP_DIR>/releases/<sha>`, switches the `current` symlink and
restarts the app. Pull requests only run the test/build job.

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
| `DB_HOST` | PostgreSQL host from the alwaysdata Databases page |
| `DB_PORT` | `5432` |
| `DB_NAME` | database name (alwaysdata prefixes it with the account name) |
| `DB_USER` | database user |
| `DB_PASSWORD` | database password |
| `DB_SSL` | `false` unless the server requires TLS |
| `DB_SYNC` | `true` for the FIRST start on an empty database only, then `false` |
| `APP_URL` | public site URL, used in e-mail links |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | mail; e-mails are skipped when `SMTP_PASS` is empty |

`DB_*` variables are used instead of `DATABASE_URL` so passwords with characters such as `@` need no URL encoding.

## Rollback
`ssh <user>@<host>`, then `cd ~/bamcopt && ln -sfn releases/<older-sha> current.new && mv -T current.new current`
and stop the app process (alwaysdata restarts it on the next request). The last 5 releases are kept.
