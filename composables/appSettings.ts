import axios from "axios";
import { AccountLevel } from "utils/interfaces/AccountLevel";
import { AppSettings } from "utils/interfaces/AppSettings";
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

	const load = (obj: any, url: string) => {
		const axiosConfig: any = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/${url}`,
			timeout: 20000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				obj.value = response.data;
				// console.log(settings.value);
			})
			.catch((error): void => {
				console.log(error);
			});
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

	load(settings, "app-settings");
	load(accountLevels, "account-levels");

	return {
		settings,
		isPageLoading,
		accountLevels,
		load,
		formatMoney,
	};
};
