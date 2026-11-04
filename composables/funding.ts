import type { FundingAccount } from "~/utils/interfaces/Funding";

/** Shared funding-account list (admin sees balances, users only see active accounts). */
export const useFunding = () => {
	const accounts = useState<FundingAccount[]>("funding-accounts", () => []);
	const loading = useState<boolean>("funding-accounts-loading", () => false);

	const load = async () => {
		loading.value = true;
		try {
			accounts.value = await fundingService.list();
		} catch {
			// keep the cached list; the service layer already handled the error
		} finally {
			loading.value = false;
		}
	};

	return { accounts, loading, load };
};
