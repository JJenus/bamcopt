<script setup lang="ts">
	import type { CustomerFundingAccount } from '~/utils/funding-ui';
	const props = defineProps<{ account: CustomerFundingAccount }>();
	const rows = computed(() => [
		['Bank / network', props.account.bankName], ['Account name', props.account.accountName],
		[props.account.type === 'crypto' ? 'Wallet address' : 'Account / destination', props.account.accountNumber],
		['Currency', props.account.currency],
	].filter(([, value]) => value) as [string, string][]);
</script>
<template>
	<section class="card border h-100">
		<div class="card-body p-7">
			<div class="d-flex align-items-center justify-content-between gap-4 mb-7"><h2 class="fs-3 mb-0 text-break">{{ account.label }}</h2><span class="badge badge-light-primary text-capitalize">{{ account.type }}</span></div>
			<p v-if="!account.currency" class="alert alert-warning">Currency is not specified. Contact support before sending any funds.</p>
			<dl class="mb-0"><div v-for="[label, value] in rows" :key="label" class="border-bottom py-5"><dt class="fw-normal text-gray-600 fs-7 mb-3">{{ label }}</dt><dd class="d-flex align-items-center justify-content-between gap-4 mb-0"><span class="fw-semibold text-break" style="min-width: 0">{{ value }}</span><AppCopyButton :value="value" :label="label" /></dd></div></dl>
			<div v-if="account.instructions" class="bg-light rounded-3 p-5 mt-6"><h3 class="fs-6 mb-3">Instructions</h3><p class="text-gray-700 lh-lg mb-0" style="white-space: pre-line">{{ account.instructions }}</p></div>
		</div>
	</section>
</template>
