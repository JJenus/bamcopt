import type { Transaction } from "~/utils/interfaces/Transaction";

export const useUserSettings = () => {
	const user = userData().data;
	const transferBank = useState<string>("bank-recipient", () => "bancopt");
	const transactions = useState<Transaction[]>("user-transactions", () => []);
	const loaded = useState<boolean>("user-transactions-loaded", () => false);
	const loading = useState<boolean>("user-transactions-loading", () => false);

	const fetchTransactions = async (force = false) => {
		const userId = user.value.id;
		if (!userId || loading.value || (loaded.value && !force)) return;

		loading.value = true;
		try {
			transactions.value = await transactionService.listForUser(userId);
			loaded.value = true;
		} catch {
			// The service layer reports the failure; keep the cached list.
		} finally {
			loading.value = false;
		}
	};

	watch(
		() => user.value.id,
		(userId: string) => {
			if (userId) fetchTransactions();
		},
		{ immediate: true }
	);

	return { transferBank, transactions, fetchTransactions };
};
