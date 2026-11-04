import type { AccountLevel } from "~/utils/interfaces/AccountLevel";
import type { AppSettings } from "~/utils/interfaces/AppSettings";

export const settingsService = {
	getApp: () => apiRequest<AppSettings>("/app-settings"),
	saveApp: (settings: Partial<AppSettings>) =>
		settings.id
			? apiRequest<AppSettings>(`/app-settings/${settings.id}`, { method: "PUT", body: settings })
			: apiRequest<AppSettings>("/app-settings", { method: "POST", body: settings }),
	listLevels: () => apiRequest<AccountLevel[]>("/account-levels"),
	createLevel: (level: Partial<AccountLevel>) => apiRequest<AccountLevel>("/account-levels", { method: "POST", body: level }),
	updateLevel: (level: Partial<AccountLevel> & { id: string }) => apiRequest<AccountLevel>("/account-levels", { method: "PUT", body: level }),
};
