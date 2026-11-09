import type { AccountLevel } from "~/utils/interfaces/AccountLevel";
import type { AppSettings } from "~/utils/interfaces/AppSettings";
import currency from "currency.js";
import { moneyStyle } from "~/utils/app-defaults";

export const useAppSettings = () => {
	const init: AppSettings = {
		id: 0,
		defaultLanguage: "",
		defaultBaseCurrency: "",
		currencySymbol: "",
		createdAt: "",
		updatedAt: "",
	};

	const settings = useState<AppSettings>("app-settings", () => init);
	const isPageLoading = useState<boolean>("load-page", () => true);
	const accountLevels = useState<AccountLevel[]>("account-levels", () => []);
	const loaded = useState<boolean>("app-settings-loaded", () => false);
	const loading = useState<boolean>("app-settings-loading", () => false);

	const load = async (force = false) => {
		// These requests are not awaited by SSR. Never serialize an in-flight server
		// loading flag that would prevent the hydrated browser from loading settings.
		if (import.meta.server) return;
		if (loading.value || (loaded.value && !force)) return;

		loading.value = true;
		try {
			const [appSettings, levels] = await Promise.all([
				settingsService.getApp(),
				settingsService.listLevels(),
			]);

			settings.value = appSettings;
			accountLevels.value = levels;
			loaded.value = true;
		} catch {
			// The service layer reports the failure; keep the safe defaults.
		} finally {
			loading.value = false;
		}
	};

	const formatMoney = (amount?: string | number, addSymbol?: boolean) => {
		const style = moneyStyle(settings.value.defaultBaseCurrency);
		const decimalSep = style.decimal;
		const thousandSep = style.group;
		const pattern = style.symbolAfter ? `#!` : `!#`;

		const actual = currency(amount || 0).value;

		const cash = currency(actual, {
			symbol: addSymbol ? settings.value.currencySymbol : "",
			decimal: decimalSep,
			separator: thousandSep,
			pattern: pattern,
		}).format();

		return cash;
	};

	load();

	return {
		settings,
		isPageLoading,
		accountLevels,
		load,
		formatMoney,
	};
};
