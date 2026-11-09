<script setup lang="ts">
	const config = useRuntimeConfig().public;
	const route = useRoute();
	const links = [
		{ label: 'Overview', to: '/app', icon: 'ki-element-11' },
		{ label: 'Transfer', to: '/app/transfer', icon: 'ki-send' },
		{ label: 'Activity', to: '/app/transactions', icon: 'ki-arrows-loop' },
		{ label: 'Referrals', to: '/app/referrals', icon: 'ki-profile-user' },
		{ label: 'Settings', to: '/app/settings', icon: 'ki-setting-2' },
	];
	const active = (path: string) => path === '/app/settings' ? ['/app/settings', '/app/profile', '/app/account-info'].some(prefix => route.path.startsWith(prefix)) : isNavActive(path, route.path);
</script>

<template>
	<aside class="account-sidebar border-end d-flex flex-column">
		<NuxtLink to="/app" class="d-flex align-items-center gap-3 px-8 py-8" :aria-label="`${config.APP} overview`"><img :src="String(config.LOGO_URL)" width="36" height="36" alt="" class="object-fit-contain" /><span class="text-gray-900 fs-2 fw-bold">{{ config.APP }}<span class="text-primary">.</span></span></NuxtLink>
		<div class="px-7 pt-8 pb-4 text-gray-600 fs-8 fw-bold text-uppercase ls-1">Your workspace</div>
		<nav class="px-5 d-grid gap-3" aria-label="Account navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="account-nav-link" :class="{ active: active(link.to) }" :aria-current="active(link.to) ? 'page' : undefined"><i :class="['ki-outline fs-2', link.icon]" aria-hidden="true"></i>{{ link.label }}</NuxtLink></nav>
		<div class="mt-auto p-6"><div class="border rounded-3 p-6"><i class="ki-outline ki-message-text-2 text-primary fs-2x mb-4 d-block" aria-hidden="true"></i><h2 class="fs-5 mb-3">A little help?</h2><p class="text-gray-600 fs-7 lh-lg mb-5">Find answers or get in touch with support.</p><NuxtLink to="/app/help" class="btn btn-light-primary btn-sm w-100">Help & support</NuxtLink></div><NuxtLink to="/" class="d-block text-center fs-7 text-gray-600 mt-6">Visit website <span aria-hidden="true">↗</span></NuxtLink></div>
	</aside>
</template>
