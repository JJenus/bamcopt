import type { FundingAccount } from "~/utils/interfaces/Funding";
import type { BalanceChange } from '~/utils/funding-ui';

export const fundingService = {
	/** Users get active accounts without balances; admins get everything. */
	list: () => apiRequest<FundingAccount[]>("/funding-accounts"),
	create: (data: Partial<FundingAccount>) => apiRequest<FundingAccount>("/funding-accounts", { method: "POST", body: data }),
	/** Admin. Balance changes require an explicit direction and positive amount. */
	update: (id: string, data: Partial<FundingAccount> & { balanceChange?: BalanceChange }) =>
		apiRequest<FundingAccount>(`/funding-accounts/${id}`, { method: "PUT", body: data }),
};
