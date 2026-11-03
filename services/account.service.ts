import type { Account } from "~/utils/interfaces/Account";

export const accountService = {
	get: (userId: string) => apiRequest<Account>(`/account/${userId}`),
	/** Admin: credit a user by e-mail. Returns the updated account. */
	topUp: (email: string, amount: number) => apiRequest<Account>("/account", { method: "POST", body: { email, amount } }),
	/** Admin: change level / status / currency (never the balance). */
	updateSettings: (account: Partial<Account> & { userId: string }) => apiRequest<Account>("/account", { method: "PUT", body: account }),
};
