import { type Account, AccountStatus } from "~/utils/interfaces/Account";
import { type IUser } from "~/utils/interfaces/IUser";
import {
	type INotification,
	NotificationStatus,
} from "~/utils/interfaces/Notification";
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
		imgUrl: "/assets/media/svg/avatars/blank.svg",
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
	const notifications = useState<INotification[]>("notifications", () => []);
	const newNotifications = useState<INotification[]>(
		"new-notifications",
		() => []
	);
	const isNewNotification = useState<boolean>(
		"new-notification",
		() => false
	);
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

		userService
			.get(data.value.id)
			.then((user) => (data.value = user))
			.catch(() => {});
	};

	const fetchBalance = () => {
		if (!data.value.id) return;

		accountService
			.get(data.value.id)
			.then((acc) => (account.value = acc))
			.catch(() => {});
	};

	const showNotifications = () => {
		if (!isNewNotification.value) return;

		notifications.value = notifications.value.map((notification) => ({
			...notification,
			status: NotificationStatus.READ,
		}));
		newNotifications.value = [];
		isNewNotification.value = false;

		notificationService.markAllRead().catch(() => {});
	};

	const getNotifications = () => {
		if (!data.value.id) return;

		notificationService
			.listForUser(data.value.id)
			.then((list) => {
				notifications.value = list;
				newNotifications.value = list.filter(
					(notification) =>
						notification.status === NotificationStatus.UNREAD
				);
				isNewNotification.value = newNotifications.value.length > 0;
			})
			.catch(() => {});
	};

	return {
		account,
		data,
		users,
		admins,
		active,
		notifications,
		newNotifications,
		isNewNotification,
		transactions,
		getUsers,
		fetchBalance,
		getNotifications,
		showNotifications,
		reloadUser,
	};
};
