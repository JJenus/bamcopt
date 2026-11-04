<script setup lang="ts">
	const user = userData().data;
	const account = userData().account;
	const tiers = useAppSettings().accountLevels;
	const auth = useAuth();

	const tier = computed(() => tiers.value.find((t) => t.accountLevel === (account.value.accountLevel || user.value.account?.accountLevel))?.title);

	const items = [
		{ title: "Profile", text: "Personal details and photo", icon: "ki-outline ki-user", to: "/app/profile" },
		{ title: "Account & limits", text: "Your plan, daily limit and maximum balance", icon: "ki-outline ki-medal-star", to: "/app/account-info" },
		{ title: "Add funds", text: "Where to send your deposit", icon: "ki-outline ki-plus-square", modal: "#kt_modal_upgrade_plan" },
		{ title: "Security", text: "Recent sign-ins and failed attempts", icon: "ki-outline ki-shield-tick", to: "/app/settings/security" },
		{ title: "Support", text: "Chat with us", icon: "ki-outline ki-message-text-2", action: () => useLiveChat().openChat() },
		{ title: "Sign out", text: "Leave this device", icon: "ki-outline ki-exit-right", action: () => auth.logout() },
	];
</script>

<template>
	<div>
		<div class="card card-custom bg-light-success border-0 mb-5">
			<div class="card-body d-flex align-items-center">
				<div class="symbol symbol-60px symbol-circle me-4"><img :src="user.imgUrl || '/assets/media/svg/avatars/blank.svg'" alt="" /></div>
				<div style="min-width: 0">
					<div class="fw-bold fs-4 text-truncate">{{ user.name }}</div>
					<div class="text-muted text-truncate">{{ user.email }}</div>
					<div v-if="tier" class="badge badge-light-primary mt-1">{{ tier }}</div>
				</div>
			</div>
		</div>
		<SettingsLinks :items="items" />
	</div>
</template>
