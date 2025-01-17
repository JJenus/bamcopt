import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { type Account, AccountStatus } from "~/utils/interfaces/Account";
import { type IUser } from "~/utils/interfaces/IUser";
import {
	type INotification,
	NotificationStatus,
} from "../utils/interfaces/Notification";

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

	const transactions = useState<any[]>("user-transactions", () => []);
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
	const active = useState<IUser | null>("active-user");
	const admins = useState<IUser[]>("admin", () => []);

	const getUsers = () => {
		if (!useAuth().userData.value?.user) {
			navigateTo("/sign-in");
		}
		const axiosConfig: AxiosRequestConfig = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/users`,
			timeout: 20000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		console.log("TOKEN ", useAuth().userData.value?.token);

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<IUser[], any>) => {
				users.value = response.data
					.filter((e) => {
						return e.userType !== "admin";
					})
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() -
							new Date(a.createdAt).getTime()
					);

				admins.value = response.data
					.filter((e) => {
						return e.userType === "admin";
					})
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() -
							new Date(a.createdAt).getTime()
					);

				// console.log(users.value);
			})
			.catch((error) => {
				// console.log(error);
				const data = error.response.data;
				if (
					data.message.includes("Access denied") ||
					error.response.status === 401
				) {
					// console.log("Access denied");
				}
			});
	};

	const reloadUser = () => {
		
		const axiosConfig: AxiosRequestConfig = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/users/${data.value.id}`,
			timeout: 20000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<IUser, any>) => {
				data.value = response.data;

				// console.log(response.data, data.value.account);
			})
			.catch((error) => {
				// console.log(error);
				const data = error.response.data;
				if (
					data.message.includes("Access denied") ||
					error.response.status === 401
				) {
					// console.log("Access denied");
				}
			});
	};

	const fetchBalance = () => {
		const axiosConfig = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/account/${data.value.id}`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				const data = response.data;
				account.value = data;
			})
			.catch((error) => {
				// console.log(error);
			});
	};

	const showNotifications = () => {
		if (!isNewNotification.value) {
			return;
		}
		const axiosConfig = {
			method: "put",
			data: notifications.value,
			url: `${useRuntimeConfig().public.BE_API}/notifications/all`,
			timeout: 25000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<INotification[], any>) => {})
			.catch((error) => {
				console.log(error);
			});
	};

	const getNotifications = () => {
		const axiosConfig = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/notifications/${
				data.value.id
			}`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<INotification[], any>) => {
				notifications.value = response.data.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
				);

				const xx = notifications.value.filter((notice) => {
					if (notice.status === NotificationStatus.UNREAD) {
						isNewNotification.value = true;
						return true;
					}
					return false;
				});

				if (
					isNewNotification.value &&
					notifications.value.length == 0
				) {
					newNotifications.value = xx;
				}
			})
			.catch((error) => {
				// console.log(error);
			});
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
