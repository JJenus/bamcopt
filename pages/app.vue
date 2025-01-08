<script setup lang="ts">
	import { type IUser } from "~/utils/interfaces/IUser";
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
	const { data, reloadUser } = userData();

	onMounted(() => {
		const cookie = useAuth().userAuth;
		if (cookie.value === null || cookie.value === undefined) {
			console.log(cookie.value);
			infoAlert("Session expired");
			return useAuth().logout();
		}
		reloadUser();

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
