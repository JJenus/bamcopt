<script setup lang="ts">
	import { type IUser } from "~/utils/interfaces/IUser";
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
		
		userService
			.get(userId!)
			.then((user) => {
				data.value = user;
				data.value.imgUrl = data.value.imgUrl || "/assets/media/svg/avatars/blank.svg";
			})
			.catch(() => {}); // an expired session logs out inside the service
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
