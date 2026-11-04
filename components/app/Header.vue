<script setup lang="ts">
	const { state, load } = useAccountWorkspace();
	const config = useRuntimeConfig().public;
</script>

<template>
	<header class="account-topbar border-bottom px-5 px-lg-9 d-flex align-items-center justify-content-between gap-4">
		<NuxtLink to="/app" class="d-flex align-items-center gap-3 d-lg-none"><img :src="String(config.LOGO_URL)" width="30" height="30" class="object-fit-contain" alt="" /><span class="fw-bold fs-4 text-gray-900">{{ config.APP }}</span></NuxtLink>
		<div class="d-none d-lg-flex align-items-center gap-3 fs-7 text-gray-600"><span class="account-status-dot text-success" aria-hidden="true"></span>Your personal workspace</div>
		<div class="d-flex align-items-center gap-3"><button type="button" class="btn btn-sm btn-icon btn-light" aria-label="Refresh account data" :disabled="state.loading" @click="load"><i class="ki-outline ki-arrows-circle fs-2" aria-hidden="true"></i></button><NotificationsBell base="/app" /><AppProfileMenu /></div>
	</header>
</template>
