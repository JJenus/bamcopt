<script setup lang="ts">
	useAccountPage('Overview');
	const { state, user, load } = useAccountWorkspace();
	const { money } = useAccountMoney();
	const firstName = computed(() => user.value.name.trim().split(' ')[0] || 'there');
</script>

<template>
	<div><AppPageHeader :title="`Welcome back, ${firstName}.`" description="Your account, your activity, and your next step. All in view." />
		<div class="row g-6 mb-8"><div class="col-xl-7"><AppBalance /></div><div class="col-xl-5"><div class="card border h-100"><div class="card-body p-7 p-lg-9"><span class="text-primary fs-8 fw-bold text-uppercase ls-1">Account essentials</span><h2 class="fs-2 mt-5 mb-4">A clearer view of your account.</h2><p class="text-gray-600 fs-6 lh-lg mb-6">Check your account details, review your limits, or get help before your next transfer.</p><div class="d-flex flex-wrap gap-3"><NuxtLink to="/app/account-info" class="btn btn-light btn-sm">Account & limits</NuxtLink><NuxtLink to="/app/help" class="btn btn-light btn-sm">Help & support</NuxtLink></div></div></div></div></div>
		<div v-if="!user.emailVerified && state.ready" class="alert alert-primary d-flex flex-wrap align-items-center gap-4 mb-8"><div class="flex-grow-1"><strong>Email not yet confirmed.</strong> Open the verification link in your welcome email.</div><NuxtLink to="/app/help" class="btn btn-sm btn-light">Need help?</NuxtLink></div>
		<section class="mb-8"><h2 class="fs-3 mb-5">This month at a glance</h2><p v-if="state.statsError" class="text-gray-600 fs-7">{{ state.statsError }}</p><div class="account-summary-grid"><div v-for="metric in [{ label: 'Money received', value: state.stats ? money(state.stats.monthReceived) : '—', icon: 'ki-arrow-down-left' }, { label: 'Money sent', value: state.stats ? money(state.stats.monthSent) : '—', icon: 'ki-arrow-up-right' }, { label: 'Pending transactions', value: state.stats ? String(state.stats.pending) : '—', icon: 'ki-time' }]" :key="metric.label" class="card border"><div class="card-body p-6"><div class="d-flex justify-content-between mb-5"><span class="fs-7 text-gray-600">{{ metric.label }}</span><i :class="['ki-outline fs-2 text-primary', metric.icon]" aria-hidden="true"></i></div><p class="fs-2 fw-bold mb-0">{{ metric.value }}</p></div></div></div></section>
		<section class="card border"><div class="card-header align-items-center border-bottom"><h2 class="card-title fs-3 fw-bold">Recent activity</h2><NuxtLink to="/app/transactions" class="fw-semibold fs-7">View all activity <span aria-hidden="true">↗</span></NuxtLink></div><div class="card-body pt-2"><AppLoadState :loading="state.loading && !state.ready" :error="state.activityError" :empty="!state.transactions.length" title="Your activity starts here" description="Funding and transfers will appear here when they are recorded." @retry="load"><AppActivityList :transactions="state.transactions" :limit="5" /></AppLoadState></div></section>
	</div>
</template>
