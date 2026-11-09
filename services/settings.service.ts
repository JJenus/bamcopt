import type { AccountLevel } from "~/utils/interfaces/AccountLevel";
import type { AppSettings } from "~/utils/interfaces/AppSettings";

export const settingsService = {
	getApp: () => apiRequest<AppSettings>("/app-settings"),
	saveApp: (settings: Partial<AppSettings>) =>
		settings.id
			? apiRequest<AppSettings>(`/app-settings/${settings.id}`, { method: "PUT", body: settings })
			: apiRequest<AppSettings>("/app-settings", { method: "POST", body: settings }),
	/** Admin: forget that anyone passed the transfer codes. Resolves with how many users had it remembered. */
	resetCodesForEveryone: () => apiRequest<{ reset: number }>("/app-settings/reset-codes", { method: "POST" }),
	listLevels: () => apiRequest<AccountLevel[]>("/account-levels"),
	createLevel: (level: Partial<AccountLevel>) => apiRequest<AccountLevel>("/account-levels", { method: "POST", body: level }),
	updateLevel: (level: Partial<AccountLevel> & { id: string }) => apiRequest<AccountLevel>("/account-levels", { method: "PUT", body: level }),
};
