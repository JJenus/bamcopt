import type { FundingAccount } from "~/utils/interfaces/Funding";

export const fundingService = {
	/** Users get active accounts without balances; admins get everything. */
	list: () => apiRequest<FundingAccount[]>("/funding-accounts"),
	create: (data: Partial<FundingAccount>) => apiRequest<FundingAccount>("/funding-accounts", { method: "POST", body: data }),
	/** Admin. `adjustment` is a signed amount added to the balance. */
	update: (id: string, data: Partial<FundingAccount> & { adjustment?: number }) =>
		apiRequest<FundingAccount>(`/funding-accounts/${id}`, { method: "PUT", body: data }),
};
