<script setup lang="ts">
	import '~/assets/css/account.css';
	const { state, user, load } = useAccountWorkspace();
</script>

<template>
	<div class="account-shell">
		<a href="#account-content" class="skip-link btn btn-primary">Skip to content</a>
		<AppSideBar />
		<div class="account-main">
			<AppHeader />
			<main id="account-content" class="account-content" tabindex="-1">
				<div v-if="state.error" class="alert alert-warning d-flex align-items-center flex-wrap gap-4" role="alert"><span class="flex-grow-1">{{ state.error }}</span><button type="button" class="btn btn-sm btn-light" :disabled="state.loading" @click="load">Refresh account</button></div>
				<div v-if="user.status?.toUpperCase() === 'HOLD'" role="alert" class="alert alert-warning">Your account is on hold. Transfers are unavailable. <NuxtLink to="/app/help" class="fw-bold">Contact support</NuxtLink>.</div>
				<slot />
			</main>
		</div>
		<AppMobileNavBar />
	</div>
</template>
