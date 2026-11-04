<script setup lang="ts">
	definePageMeta({
		layout: "adminlayout",
		middleware: ["admin-auth"],
	});

	const auth = useAuth();
	const userId = auth.userData.value?.userId;
	const data = userData().data;
	const users = userData().users;

	const config = useRuntimeConfig().public;
	const currentPage = "Admin";

	useSeoMeta({
		title: `${currentPage} - ${config.APP}`,
	});

	const getUserData = () => {
		if (!userId) {
			infoAlert("Session expired, please login.");
			return auth.logout();
		}

		userService
			.get(userId)
			.then((user) => {
				data.value = user;
				data.value.imgUrl =
					data.value.imgUrl || "/assets/media/svg/avatars/blank.svg";
			})
			.catch(() => {}); // an expired session logs out inside the service
	};

	onBeforeMount(() => {
		if (!auth.userAuth.value) {
			infoAlert("Session expired");
			return auth.logout();
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
