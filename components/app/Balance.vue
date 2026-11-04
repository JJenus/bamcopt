<script setup lang="ts">
	const { state, account, load } = useAccountWorkspace();
	const { money, currencyCode } = useAccountMoney();
	const hidden = useState('account-balance-hidden', () => false);
</script>

<template>
	<section class="card border h-100"><div class="card-body p-7 p-lg-9"><div class="d-flex align-items-center justify-content-between gap-4 mb-6"><h2 class="fs-6 fw-semibold text-gray-600 mb-0">Available balance<span v-if="currencyCode"> · {{ currencyCode }}</span></h2><button type="button" class="btn btn-sm btn-icon btn-light" :aria-label="hidden ? 'Show balance' : 'Hide balance'" :aria-pressed="hidden" @click="hidden = !hidden"><i :class="['ki-outline fs-2', hidden ? 'ki-eye-slash' : 'ki-eye']" aria-hidden="true"></i></button></div><div v-if="!state.ready" class="py-4" role="status"><div class="account-loading-bar mb-5"></div><span class="text-gray-600 fs-8">{{ state.error ? 'Balance unavailable. Refresh your account to try again.' : 'Loading your balance…' }}</span></div><template v-else><p class="account-balance mb-3">{{ hidden ? '••••••' : money(account.amount || 0) }}</p><p class="text-gray-600 fs-8 mb-7">{{ state.error ? 'Last known balance — refresh needed' : 'Your current account balance' }}</p></template><div class="d-flex flex-wrap gap-3 mt-6"><NuxtLink to="/app/add-funds" class="btn btn-primary"><i class="ki-outline ki-plus fs-3" aria-hidden="true"></i>Add funds</NuxtLink><NuxtLink to="/app/transfer" class="btn btn-light-primary"><i class="ki-outline ki-send fs-3" aria-hidden="true"></i>Transfer</NuxtLink></div></div></section>
</template>
