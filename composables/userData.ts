import { type Account, AccountStatus } from "~/utils/interfaces/Account";
import { type IUser } from "~/utils/interfaces/IUser";
import type { Transaction } from "~/utils/interfaces/Transaction";

export const userData = () => {
	const initAcc: Account = {
		id: "",
		userId: "",
		currencyId: "",
		status: AccountStatus.ACTIVE,
		accountLevel: 0,
		accountNumber: 0,
	};

	const initUser: IUser = {
		id: "",
		name: "",
		email: "",
		imgUrl: "",
		phone: "",
		address: "",
		city: "",
		country: "",
		dob: "",
		verified: false,
		emailVerified: false,
		account: {
			id: "",
			userId: "",
			currencyId: "",
			amount: 0,
			status: AccountStatus.ACTIVE,
			accountLevel: 0,
			accountNumber: 0,
		},
		userType: "",
		createdAt: "",
		idUrl: undefined,
		cot: undefined,
		imf: undefined,
		tax: undefined,
	};

	const transactions = useState<Transaction[]>("user-transactions", () => []);
	const data = useState<IUser>("userData", () => initUser);
	const account = useState<Account>("userAccount", () => initAcc);
	const users = useState<IUser[]>("users", () => []);
	const active = useState<IUser | null>("active-user", () => null);
	const admins = useState<IUser[]>("admin", () => []);

	const byNewest = (a: IUser, b: IUser) =>
		new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

	const getUsers = () => {
		if (!useAuth().isAuthenticated.value) {
			navigateTo("/sign-in");
			return;
		}
		userService
			.list()
			.then((all) => {
				users.value = all
					.filter((u) => u.userType !== "admin")
					.sort(byNewest);
				admins.value = all
					.filter((u) => u.userType === "admin")
					.sort(byNewest);
			})
			.catch(() => {});
	};

	const reloadUser = () => {
		if (!data.value.id) return;
		const id = data.value.id;

		userService
			.get(data.value.id)
			.then((user) => {
				if (data.value.id !== id) return;
				data.value = user;
				if (user.account) account.value = user.account;
			})
			.catch(() => {});
	};

	const fetchBalance = () => {
		if (!data.value.id) return;

		accountService
			.get(data.value.id)
			.then((acc) => (account.value = acc))
			.catch(() => {});
	};

	return {
		reset: () => {
			data.value = initUser;
			account.value = initAcc;
			transactions.value = [];
			users.value = [];
			admins.value = [];
			active.value = null;
		},
		account,
		data,
		users,
		admins,
		active,
		transactions,
		getUsers,
		fetchBalance,
		reloadUser,
	};
};
