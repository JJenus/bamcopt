<script setup lang="ts">
	import { type IUser } from "~/utils/interfaces/IUser";
	import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
	import { type AuthToken } from "~/utils/interfaces/AuthToken";

	definePageMeta({
		layout: "adminlayout",
		middleware: ["admin-auth"],
	});

	const loaded = useCookie<boolean>("reload", { maxAge: 60 * 60 * 24 });

	if (process.client) {
		// if (!loaded.value) {
		// 	window.location.reload();
		// 	loaded.value = true;
		// }
	}
	
	const appConfig = useRuntimeConfig();
	const userId = useAuth().userData.value?.userId;
	const data = userData().data;
	const users = userData().users;

	const config = useRuntimeConfig().public;
	const currentPage = "Admin";

	useSeoMeta({
		title: `${currentPage} - ${config.APP}`,
	});

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
		const cookie = useCookie<AuthToken | null | undefined>("auth");
		if (cookie.value == null || cookie.value == undefined) {
			infoAlert("Session expired");
			return useAuth().logout();
		}
		getUserData();
		if (users.value.length === 0) {
			userData().getUsers();
		}
	});
</script>
<template>
	<NuxtPage />
</template>
