<script setup lang="ts">
	import type { FundingAccount } from '~/utils/interfaces/Funding';
	useAccountPage('Add funds');
	const accounts = ref<FundingAccount[]>([]);
	const loading = ref(true);
	const error = ref('');
	const load = async () => {
		loading.value = true;
		error.value = '';
		try { accounts.value = await fundingService.list(); }
		catch { error.value = 'We could not load the funding instructions. Please try again.'; }
		finally { loading.value = false; }
	};
	const rows = (item: FundingAccount) => [
		['Bank / network', item.bankName], ['Account name', item.accountName],
		[item.type === 'crypto' ? 'Wallet address' : 'Account / destination', item.accountNumber], ['Currency', item.currency],
	].filter(([, value]) => value) as [string, string][];
	onMounted(load);
</script>

<template>
	<div><AppPageHeader title="Add funds" description="Follow the current funding instructions for your account." />
		<div class="alert alert-primary mb-8 lh-lg"><strong>Check before you send.</strong> Verify the destination, currency, and reference. Your balance updates only after the deposit is confirmed. This page does not initiate a payment.</div>
		<AppLoadState :loading="loading" :error="error" :empty="!accounts.length" title="No funding instructions available" description="Please contact support for help adding funds. Do not use old payment details." @retry="load"><div class="row g-6"><div v-for="item in accounts" :key="item.id" class="col-xl-6"><section class="card border h-100"><div class="card-body p-7"><div class="d-flex align-items-center justify-content-between gap-4 mb-7"><h2 class="fs-3 mb-0">{{ item.label }}</h2><span class="badge badge-light-primary text-capitalize">{{ item.type }}</span></div><dl class="mb-0"><div v-for="[label, value] in rows(item)" :key="label" class="border-bottom py-5"><dt class="fw-normal text-gray-600 fs-7 mb-3">{{ label }}</dt><dd class="d-flex align-items-center justify-content-between gap-4 mb-0"><span class="fw-semibold text-break" style="min-width: 0">{{ value }}</span><AppCopyButton :value="value" :label="label" /></dd></div></dl><div v-if="item.instructions" class="bg-light rounded-3 p-5 mt-6"><h3 class="fs-6 mb-3">Instructions</h3><p class="text-gray-700 lh-lg mb-0" style="white-space: pre-line">{{ item.instructions }}</p></div></div></section></div></div></AppLoadState>
		<div class="d-flex flex-wrap gap-4 mt-8"><NuxtLink to="/app/transactions" class="btn btn-light">View activity</NuxtLink><NuxtLink to="/app/help" class="btn btn-light-primary">Need help with a deposit?</NuxtLink></div>
	</div>
</template>
