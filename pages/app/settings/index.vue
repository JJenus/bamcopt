<script setup lang="ts">
	useAccountPage('Settings');
	const { user } = useAccountWorkspace();
	const auth = useAuth();
	const links = [
		{ title: 'Personal details', text: 'Your name, contact details, and profile photo', icon: 'ki-user', to: '/app/profile' },
		{ title: 'Account & limits', text: 'Your account information, level, and limits', icon: 'ki-wallet', to: '/app/account-info' },
		{ title: 'Security', text: 'Recent sign-ins and account safety', icon: 'ki-shield-tick', to: '/app/settings/security' },
		{ title: 'Notifications', text: 'View account updates and unread messages', icon: 'ki-notification-bing', to: '/app/notifications' },
		{ title: 'Help & support', text: 'Answers and configured support channels', icon: 'ki-message-text-2', to: '/app/help' },
	];
</script>

<template><div><AppPageHeader title="Settings" description="Make your account information easy to keep up to date." /><div class="card border mb-7"><div class="card-body d-flex align-items-center gap-5"><AppAvatar :src="user.imgUrl" :size="56" /><div style="min-width: 0"><h2 class="fs-3 mb-2 text-truncate">{{ user.name }}</h2><p class="text-gray-600 mb-0 text-truncate">{{ user.email }}</p></div></div></div><nav class="card border overflow-hidden" aria-label="Account settings"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="account-setting-link"><i :class="['ki-outline text-primary fs-2x', link.icon]" aria-hidden="true"></i><span class="flex-grow-1"><span class="fw-bold text-gray-900 fs-5 d-block mb-2">{{ link.title }}</span><span class="text-gray-600 fs-7">{{ link.text }}</span></span><i class="ki-outline ki-right text-gray-600" aria-hidden="true"></i></NuxtLink></nav><div class="mt-8 d-flex flex-wrap align-items-center justify-content-between gap-4"><p class="text-gray-600 fs-7 mb-0">Manage light or dark mode in your profile menu.</p><button type="button" class="btn btn-light-danger" @click="auth.logout()">Sign out</button></div></div></template>
