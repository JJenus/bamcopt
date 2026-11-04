<script setup lang="ts">
	const auth = useAuth();
	const items = [
		{ title: "App defaults", text: "Currency, symbol and language", icon: "ki-outline ki-setting-2", to: "/admin/settings/defaults" },
		{ title: "Account tiers", text: "Daily limits and maximum balances", icon: "ki-outline ki-medal-star", to: "/admin/settings/tiers" },
		{ title: "Funding accounts", text: "Deposit accounts and their balances", icon: "ki-outline ki-bank", to: "/admin/funding" },
		{ title: "Security", text: "Recent sign-ins on your account", icon: "ki-outline ki-shield-tick", to: "/admin/settings/security" },
		{ title: "My profile", text: "Your admin profile", icon: "ki-outline ki-user", to: "/admin/profile" },
		{ title: "Sign out", text: "Leave this device", icon: "ki-outline ki-exit-right", action: () => auth.logout() },
	];
</script>

<template>
	<SettingsLinks :items="items" />
</template>
