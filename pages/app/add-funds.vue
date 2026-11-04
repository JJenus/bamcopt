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
	onMounted(load);
</script>

<template>
	<div><AppPageHeader title="Add funds" description="Follow the current funding instructions for your account."><button type="button" class="btn btn-light" :disabled="loading" @click="load">Refresh instructions</button></AppPageHeader>
		<div class="alert alert-primary text-gray-800 mb-8 lh-lg"><strong>Check before you send.</strong> Verify the destination, currency, and reference. Your balance updates only after the deposit is confirmed. This page does not initiate a payment.</div>
		<AppLoadState :loading="loading" :error="error" :empty="!accounts.length" title="No funding instructions available" description="Please contact support for help adding funds. Do not use old payment details." @retry="load"><div class="row g-6"><div v-for="item in accounts" :key="item.id" class="col-xl-6"><FundingInstructions :account="item" /></div></div></AppLoadState>
		<div class="d-flex flex-wrap gap-4 mt-8"><NuxtLink to="/app/transactions" class="btn btn-light">View activity</NuxtLink><NuxtLink to="/app/help" class="btn btn-light-primary">Need help with a deposit?</NuxtLink></div>
	</div>
</template>
