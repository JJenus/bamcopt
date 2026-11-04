import type { Account } from "~/utils/interfaces/Account";
import type { BalanceChange } from '~/utils/funding-ui';

export const accountService = {
	adjustBalance: (input: BalanceChange & { email: string; reason: string; fundingAccountId?: string }) =>
		apiRequest<Account>('/account/adjustments', { method: 'POST', body: input }),
	get: (userId: string) => apiRequest<Account>(`/account/${userId}`),
	/** Admin: credit a user by e-mail. Returns the updated account. */
	topUp: (email: string, amount: number, fundingAccountId?: string) =>
		apiRequest<Account>("/account", { method: "POST", body: { email, amount, ...(fundingAccountId && { fundingAccountId }) } }),
	/** Admin: change level / status / currency (never the balance). */
	updateSettings: (account: Partial<Account> & { userId: string }) => apiRequest<Account>("/account", { method: "PUT", body: account }),
};
