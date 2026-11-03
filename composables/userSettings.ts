import { type Transaction } from "~/utils/interfaces/Transaction";

export const useUserSettings = () => {
	const user = userData().data;
	const transferBank = useState<string>("bank-recipient", () => "bancopt");
	const transactions = useState<Transaction[]>("user-transactions", () => []);

	const fetchTransactions = () => {
		transactionService
			.listForUser(user.value.id)
			.then((list) => (transactions.value = list))
			.catch(() => {});
	};

	fetchTransactions();

	return { transferBank, transactions };
};
