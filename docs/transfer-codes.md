# Transfer codes and system defaults

## Transfer code policy
Every user has COT / IMF / tax codes (set by an admin). Whether a transfer asks for them is a **policy**:

| Policy | Meaning |
|---|---|
| `off` | never asked |
| `always` | asked on every transfer (the original behaviour, and the default) |
| `remember` | asked until the user enters all three correctly once; not asked again until an admin resets it |

- **System** policy: Admin → Settings → App defaults → *Transfer codes*.
- **Per user**: Admin → Users → user → *Transfer code policy*: `System default`, `off`, `always` or `remember`. A user's own setting wins over the system's.
- **Remembered flag** (`users.codes_verified_at`): set when the codes were verified under `remember` (also when the transfer is then refused for another reason). Cleared by *Reset remembered codes* (one user), *Reset for everyone* (App defaults), and automatically when an admin replaces that user's codes.
- The server is the authority: `POST /api/transactions` decides again whether codes are needed, whatever the page showed. `GET /api/transactions/code-policy` only tells the page whether to show the code steps.
- Customers never see their policy or flag; admins do. Customers cannot change them.
- All admin changes and resets are in the audit trail (`user.update`, `user.codes.reset`, `settings.app.update`, `settings.codes.reset-all`).

Existing databases keep today's behaviour after the migration (system `always`, users `default`) until an admin chooses otherwise.

## System defaults
Currency and language are dropdowns, validated again on the server.
- **Currencies**: the five most traded in the BIS 2025 Triennial Survey: USD, EUR, JPY, GBP, CNY. The symbol is set from the currency, never typed.
- **Languages**: English, French, Spanish, Portuguese, German, Arabic, Chinese. The app is not translated yet, so the choice is only stored.
- A value saved before these lists existed is kept and shown as "current value, not in the list"; saving other settings never fails because of it, but a new value must come from the list.
- Amounts are written `1,234.56` with the symbol first for USD, GBP, JPY and CNY; any other currency keeps the previous comma style (EUR: `1.234,56 €`).
- The lists live in `utils/app-defaults.ts` (shared by the server and the admin screen).

## Tests
`pnpm test` / `pnpm test:otp-off` cover the policy matrix, both resets and the defaults rules; `pnpm test:codes` clicks through the admin screens and a customer's transfer in a real browser.
