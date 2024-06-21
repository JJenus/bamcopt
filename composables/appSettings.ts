import axios from "axios";
import { AccountLevel } from "utils/interfaces/AccountLevel";
import { AppSettings } from "utils/interfaces/AppSettings";

export const useAppSettings = () => {
	const init: AppSettings = {
		id: 0,
		defaultLanguage: "",
		defaultBaseCurrency: "",
		createdAt: "",
		updatedAt: ""
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

	load(settings, "app-settings");
	load(accountLevels, "account-levels");

	return {
		settings,
		isPageLoading,
		accountLevels,
		load,
	};
};
