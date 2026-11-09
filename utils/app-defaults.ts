/**
 * Single source of truth for the system defaults (imported by the server and the admin screen).
 * Currencies: the five most traded in the BIS 2025 Triennial Survey (USD, EUR, JPY, GBP, CNY).
 * Languages: the app is not translated yet, so the chosen code is stored for when it is.
 */
export const CURRENCIES = [
	{ code: "USD", name: "US dollar", symbol: "$" },
	{ code: "EUR", name: "Euro", symbol: "€" },
	{ code: "JPY", name: "Japanese yen", symbol: "¥" },
	{ code: "GBP", name: "British pound", symbol: "£" },
	{ code: "CNY", name: "Chinese yuan", symbol: "CN¥" },
] as const;

export const LANGUAGES = [
	{ code: "en", name: "English" }, { code: "fr", name: "Français (French)" }, { code: "es", name: "Español (Spanish)" },
	{ code: "pt", name: "Português (Portuguese)" }, { code: "de", name: "Deutsch (German)" },
	{ code: "ar", name: "العربية (Arabic)" }, { code: "zh", name: "中文 (Chinese)" },
] as const;

export const currencySymbolFor = (code: string) => CURRENCIES.find((c) => c.code === code)?.symbol;

/**
 * Transfer verification codes (COT / IMF / tax), as a policy:
 *  off       never asked
 *  always    asked on every transfer (the original behaviour)
 *  remember  asked until the user passes once, then not again until an admin resets it
 * A user can follow the system ("default") or override it.
 */
export const CODE_POLICIES = ["off", "always", "remember"] as const;
export type CodePolicy = (typeof CODE_POLICIES)[number];
export const USER_CODE_POLICIES = ["default", ...CODE_POLICIES] as const;
export type UserCodePolicy = (typeof USER_CODE_POLICIES)[number];

export const CODE_POLICY_LABEL: Record<UserCodePolicy, string> = {
	default: "Follow the system setting", off: "Never ask for codes", always: "Ask on every transfer", remember: "Ask once, then remember",
};

/** How amounts are written. USD, GBP, JPY and CNY: 1,234.56 with the symbol first. Anything else keeps the previous comma style. */
const DOT_STYLE = ["USD", "GBP", "JPY", "CNY"];
export const moneyStyle = (code?: string) =>
	DOT_STYLE.includes(String(code)) ? { decimal: ".", group: ",", symbolAfter: false } : { decimal: ",", group: ".", symbolAfter: true };
