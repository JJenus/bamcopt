<script setup lang="ts">
	import '~/assets/css/account.css';
	import '~/assets/css/admin.css';
	const config = useRuntimeConfig().public;
	const route = useRoute();
	const auth = useAuth();
	const user = userData().data;
	const links = [{ to: '/super', label: 'Administrators', icon: 'ki-security-user' }];
	const active = (to: string) => to === '/super' ? route.path === to || route.path.startsWith('/super/admins') : route.path.startsWith(to);
</script>

<template>
	<div class="account-shell admin-shell">
		<a href="#super-content" class="skip-link btn btn-primary">Skip to content</a>
		<aside class="account-sidebar border-end p-6 d-flex flex-column" aria-label="Super admin">
			<NuxtLink to="/super" class="d-flex align-items-center gap-3 px-3 py-5 mb-8"><img :src="String(config.LOGO_URL)" width="34" height="34" alt="" /><span class="fs-3 fw-bold text-gray-900">{{ config.APP }}</span></NuxtLink>
			<p class="text-gray-600 text-uppercase fs-8 fw-bold px-4 mb-4">Super admin</p>
			<nav class="d-grid gap-2"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="account-nav-link" :class="{ active: active(link.to) }" :aria-current="active(link.to) ? 'page' : undefined"><i :class="['ki-outline fs-2', link.icon]" aria-hidden="true"></i>{{ link.label }}</NuxtLink></nav>
			<p class="text-gray-600 fs-8 mt-auto border-top pt-6 mb-0 lh-lg">Oversight only. Money, customers and settings stay with the administrators.</p>
		</aside>
		<div class="account-main">
			<header class="account-topbar border-bottom px-5 px-lg-9 d-flex justify-content-between align-items-center gap-4"><NuxtLink to="/super" class="fw-bold text-gray-900 fs-4">Oversight</NuxtLink><div class="d-flex align-items-center gap-4"><span class="text-gray-600 fs-8 d-none d-sm-inline text-break">{{ user.email }}</span><button type="button" class="btn btn-sm btn-light" @click="auth.logout()">Sign out</button></div></header>
			<main id="super-content" class="account-content" tabindex="-1"><slot /></main>
		</div>
		<nav class="account-mobile-nav d-lg-none border-top d-flex" aria-label="Super admin mobile navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="flex-fill d-flex flex-column justify-content-center align-items-center gap-2 fs-9" :class="{ active: active(link.to) }" :aria-current="active(link.to) ? 'page' : undefined"><i :class="['ki-outline fs-2', link.icon]" aria-hidden="true"></i>{{ link.label }}</NuxtLink></nav>
	</div>
</template>
