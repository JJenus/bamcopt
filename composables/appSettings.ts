import { AccountLevel } from "~/utils/interfaces/AccountLevel";
import { AppSettings } from "~/utils/interfaces/AppSettings";
import currency from "currency.js";

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
	const isPageLoading = useState("load-page", () => true);
	const accountLevels = useState<AccountLevel[]>("account-levels", () => []);

	const load = () => {
		settingsService.getApp().then((s) => (settings.value = s)).catch(() => {});
		settingsService.listLevels().then((l) => (accountLevels.value = l)).catch(() => {});
	};

	const formatMoney = (amount?: string | number, addSymbol?: boolean) => {
		let decimalSep = ".";
		let thousandSep = ",";
		let pattern = `!#`;

		const actual = currency(amount || 0).value;

		if (settings.value.defaultBaseCurrency !== "USD") {
			decimalSep = ",";
			thousandSep = ".";
			pattern = `#!`;
		}

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
