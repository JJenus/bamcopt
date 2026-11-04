<script setup lang="ts">
	const route = useRoute();
	const links = [
		{ label: 'Overview', to: '/app', icon: 'ki-element-11' },
		{ label: 'Transfer', to: '/app/transfer', icon: 'ki-send' },
		{ label: 'Activity', to: '/app/transactions', icon: 'ki-arrows-loop' },
		{ label: 'Settings', to: '/app/settings', icon: 'ki-setting-2' },
	];
	const active = (to: string) => to === '/app/settings' ? ['/app/settings', '/app/profile', '/app/account-info', '/app/help'].some(prefix => route.path.startsWith(prefix)) : isNavActive(to, route.path);
</script>

<template><nav class="account-mobile-nav border-top d-lg-none d-flex" aria-label="Mobile account navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="flex-fill d-flex flex-column justify-content-center align-items-center gap-2" :class="{ active: active(link.to) }" :aria-current="active(link.to) ? 'page' : undefined"><i :class="['ki-outline fs-2', link.icon]" aria-hidden="true"></i><span class="fs-8 fw-semibold">{{ link.label }}</span></NuxtLink></nav></template>
