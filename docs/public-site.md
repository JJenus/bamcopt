# Public website

The public site uses the existing Bootstrap 5.3/Metronic bundle. Extra styles in `assets/css/marketing.css` are scoped to `.marketing-site`; protected app/admin layouts do not load them. No new project dependencies are required.

## Environment configuration

Nuxt runtime configuration supports these variables in development and at production server startup. Keep real `.env` files private. Public values are visible in browser page data; never put secrets in them.

```dotenv
NUXT_PUBLIC_APP=Bancopt
NUXT_PUBLIC_SUPPORT_EMAIL=support@bancopt.com
NUXT_PUBLIC_MOBILE=+49 (178) 793 1942
NUXT_PUBLIC_SUPPORT_HOURS=Contact us by email for account and product enquiries.
NUXT_PUBLIC_SITE_URL=https://www.bancopt.com
NUXT_PUBLIC_LOGO_URL=/assets/media/logos/logo-ban.png
NUXT_PUBLIC_LEGAL_ENTITY=Bancopt
NUXT_PUBLIC_BUSINESS_ADDRESS=
NUXT_PUBLIC_LEGAL_UPDATED=2026-11-04
```

Use an absolute http(s) origin for `SITE_URL` and a local path or trusted absolute image URL for `LOGO_URL`. Brand name and support mailbox are independent; changing the display name does not manufacture an email address. Empty email/phone values hide those contact links. The phone uses a `tel:` link; no unverified WhatsApp association is assumed. SMTP sender/credentials remain separately configured using `SMTP_USER`, `SMTP_PASS`, and related server settings.

## Routes and content

- Main pages: `/`, `/banking`, `/transfers`, `/security`, `/investment`.
- Resources: `/resources/about-us`, `/resources/contact-us`, `/resources/faq`, `/news`, `/resources/guides/:slug`.
- Legal: `/legal/privacy`, `/legal/terms`.
- Public utilities: `/sign-in`, `/sign-up`, `/verify-email`, `/new-password`, `/track/transaction` (not indexed).
- `/about-us` and `/contact-us` permanently redirect to the canonical resource URLs.

Guide/FAQ content and primary navigation live in `utils/public-content.ts`. Add a complete guide entry to create its article and index card. Unknown slugs return 404. No external news feed, CMS, newsletter, or contact-submission API is implied.

## Checks

- `node --test tests/public-site.test.mjs` — small, database-free helper/content checks (Node 22.18+ supports the TypeScript imports).
- `pnpm build` — compiles all Vue pages and the SSR server.
- `pnpm lint:api` — enforces UI → services → API boundaries.
- `pnpm test` — existing auth/ledger smoke suite, uses its disposable test database.

When a dev server is running, Nuxt locks its generated directory. Set `NUXT_BUILD_DIR` to a separate directory for build/smoke verification (for example `/tmp/opencode/bancopt-build` and `/tmp/opencode/bancopt-smoke`) rather than stopping the developer's server. This variable is build-time only and contains no public business configuration.

Business/legal assumptions requiring review are listed in `ATTENTION.md`.

## Verification evidence (2026-11-04)

- The five focused helper/content tests were written first and initially failed because the public-site implementation modules did not exist. After implementation, the same tests pass. `node --test --experimental-test-coverage tests/public-site.test.mjs` reports 100% lines/functions and 91.67% branches **for the two helper/content modules only**, not the entire UI.
- `NUXT_BUILD_DIR=/tmp/opencode/bancopt-public-build pnpm build` passes. The existing optional Sharp-binary warning remains; public images use local files directly.
- `NUXT_BUILD_DIR=/tmp/opencode/bancopt-smoke-build pnpm test` passes: **120 passed, 0 failed**. The initial non-isolated attempt could not start its dev server; separate build directories avoid the existing dev-server lock.
- `pnpm lint:api` and `git diff --check` pass. No app/admin route, protected-layout, or server/financial implementation changes are included.
- A single temporary Playwright script using the global installation checks all 19 public routes, env-configured branding/contact/canonical URLs, redirects, guide 404, mobile navigation/overflow, verification failure, OTP/recovery screens, and receipt not-found feedback. API interaction checks are mocked and do not change customer data. Desktop/mobile/light/dark screenshots are kept outside the repo in `/tmp/opencode/`. Remote font requests are blocked during this local QA to avoid unrelated network stalls.
- No visual baseline, full accessibility audit, or performance benchmark is claimed. Standard legal wording still requires business/jurisdiction review as recorded in `ATTENTION.md`.
