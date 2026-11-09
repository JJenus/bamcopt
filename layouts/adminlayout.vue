<script setup lang="ts">
	import '~/assets/css/account.css';
	import '~/assets/css/admin.css';
	const config = useRuntimeConfig().public;
	const route = useRoute();
	const links = [{ to: '/admin', label: 'Overview', icon: 'ki-element-11' }, { to: '/admin/users', label: 'Users', icon: 'ki-people' }, { to: '/admin/funding', label: 'Funding', icon: 'ki-bank' }, { to: '/admin/deposits', label: 'Deposits', icon: 'ki-wallet' }, { to: '/admin/referrals', label: 'Referrals', icon: 'ki-profile-user' }, { to: '/admin/notifications', label: 'Notifications', icon: 'ki-notification-bing' }, { to: '/admin/settings', label: 'Settings', icon: 'ki-setting-2' }];
	const active = (to: string) => to === '/admin' ? route.path === to : route.path.startsWith(to);
</script>

<template>
	<div class="account-shell admin-shell">
		<a href="#admin-content" class="skip-link btn btn-primary">Skip to content</a>
		<aside class="account-sidebar border-end p-6 d-flex flex-column" aria-label="Administration">
			<NuxtLink to="/admin" class="d-flex align-items-center gap-3 px-3 py-5 mb-8"><img :src="String(config.LOGO_URL)" width="34" height="34" alt="" /><span class="fs-3 fw-bold text-gray-900">{{ config.APP }}</span></NuxtLink>
			<p class="text-gray-600 text-uppercase fs-8 fw-bold px-4 mb-4">Administration</p>
			<nav class="d-grid gap-2"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="account-nav-link" :class="{ active: active(link.to) }" :aria-current="active(link.to) ? 'page' : undefined"><i :class="['ki-outline fs-2', link.icon]" aria-hidden="true"></i>{{ link.label }}</NuxtLink></nav>
			<div class="mt-auto border-top pt-6"><NuxtLink to="/admin/top-up" class="btn btn-primary w-100">Adjust user balance</NuxtLink><p class="text-gray-600 fs-8 mt-4 mb-0 lh-lg">Choose Credit or Debit, then review before confirming. Server checks remain authoritative.</p></div>
		</aside>
		<div class="account-main"><header class="account-topbar border-bottom px-5 px-lg-9 d-flex justify-content-between align-items-center gap-4"><NuxtLink to="/admin" class="fw-bold text-gray-900 fs-4">Admin workspace</NuxtLink><div class="d-flex align-items-center gap-4"><NotificationsBell base="/admin" /><AppProfileMenu base="/admin" /></div></header><main id="admin-content" class="account-content" tabindex="-1"><slot /></main></div>
		<nav class="account-mobile-nav admin-mobile-nav d-lg-none border-top d-flex" aria-label="Admin mobile navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="flex-fill d-flex flex-column justify-content-center align-items-center gap-2 fs-9" :class="{ active: active(link.to) }" :aria-current="active(link.to) ? 'page' : undefined"><i :class="['ki-outline fs-2', link.icon]" aria-hidden="true"></i>{{ link.label }}</NuxtLink></nav>
	</div>
</template>

<style scoped>
.admin-mobile-nav { overflow-x: auto; }
.admin-mobile-nav a { flex-shrink: 0; min-width: 4.75rem; padding-inline: .5rem; }
</style>
