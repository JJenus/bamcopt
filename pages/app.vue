<script setup lang="ts">
	import { type IUser } from "~/utils/interfaces/IUser";
	import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
	import { UserAccountStatus } from "~/utils/interfaces/UserAccountStatus";

	definePageMeta({
		layout: "app",
		middleware: ["auth"],
	});
	useSeoMeta({
		title: `App - ${useRuntimeConfig().public.APP}`,
	});

	const appConfig = useRuntimeConfig();

	const userId = useAuth().userData.value?.userId;
	const data = userData().data;

	const getUserData = () => {
		if (!useAuth().userData.value) {
			useAuth().logout();
			infoAlert("Session expired, please login.");
		}

		const axiosConfig: AxiosRequestConfig = {
			method: "get",
			url: `${appConfig.public.BE_API}/users/${userId}`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request<IUser>(axiosConfig)
			.then((response: AxiosResponse<IUser, any>) => {
				data.value = response.data;
				data.value.imgUrl =
					data.value.imgUrl || "/assets/media/svg/avatars/blank.svg";
				// console.log(data.value);
			})
			.catch((error) => {
				// console.log(error);
				const data = error.response.data;
				if (
					data.message.includes("Access denied") ||
					error.response.status === 401
				) {
					console.log("Access denied");
					useAuth().logout();
				}
			});
	};

	onBeforeMount(() => {
		const cookie = useAuth().userAuth;
		if (cookie.value === null || cookie.value === undefined) {
			console.log(cookie.value);
			infoAlert("Session expired");
			return useAuth().logout();
		}
		getUserData();

		if (data.value.status === UserAccountStatus.HOLD) {
			infoAlert("Account on hold. Contact support.");
		}

		if (data.value.status === UserAccountStatus.SUSPENDED) {
			errorAlert("Account suspended. Contact support immediately!");
			setTimeout(() => {
				useAuth().logout();
			}, 5000);
		}
	});
</script>
<template>
	<NuxtPage />
</template>
