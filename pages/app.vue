<script setup lang="ts">
	import { UserAccountStatus } from "~/utils/interfaces/UserAccountStatus";

	definePageMeta({
		layout: "app",
		middleware: ["auth"],
	});
	useSeoMeta({
		title: `App - ${useRuntimeConfig().public.APP}`,
	});

	const auth = useAuth();
	const { data, reloadUser } = userData();

	onMounted(() => {
		if (!auth.userAuth.value) {
			infoAlert("Session expired");
			return auth.logout();
		}

		reloadUser();

		if (data.value.status === UserAccountStatus.HOLD) {
			infoAlert("Account on hold. Contact support.");
		}

		if (data.value.status === UserAccountStatus.SUSPENDED) {
			errorAlert("Account suspended. Contact support immediately!");
			setTimeout(() => {
				auth.logout();
			}, 5000);
		}
	});
</script>
<template>
	<NuxtPage />
</template>
