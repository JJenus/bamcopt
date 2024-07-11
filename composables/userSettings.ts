import axios from "axios";
import { Transaction } from "utils/interfaces/Transaction";

export const useUserSettings = () => {
	const appConfig = useRuntimeConfig();
	const user = userData().data;
	const transferBank = useState<string>("bank-recipient", () => "bancopt");

	const transactions = userData().transactions;

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

	const fetchTransactions = () => {
		const axiosConfig = {
			method: "get",
			url: `${appConfig.public.BE_API}/transactions/${user.value.id}`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				const data = response.data.sort(
					(a: any, b: any) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
				);
				transactions.value = data;
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return {
		transferBank,
		transactions,
		fetchTransactions,
		load,
	};
};
