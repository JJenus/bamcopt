<script setup lang="ts">
	import type { Transaction } from '~/utils/interfaces/Transaction';
	usePublicSeo('Track a transaction', 'Look up a transaction receipt with your reference and check its current status.', true);
	const route = useRoute();
	const reference = ref(typeof route.query.id === 'string' ? route.query.id : '');
	const busy = ref(false);
	const error = ref('');
	const transaction = ref<Transaction | null>(null);
	const status = computed(() => transaction.value?.status || 'unknown');
	const statusCopy: Record<string, string> = {
		completed: 'This transaction is marked as completed.', failed: 'This transaction is marked as failed. Check your account history or contact support before trying again.',
		pending: 'This transaction is pending. It has not yet completed.', awaiting: 'This transaction is awaiting processing. It has not yet completed.',
		processing: 'This transaction is being processed. It has not yet completed.',
	};
	const amount = computed(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(transaction.value?.amount || 0)));
	const created = computed(() => {
		const value = transaction.value?.createdAt;
		if (!value) return '';
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
	});
	const lookup = async () => {
		if (busy.value) return;
		error.value = '';
		transaction.value = null;
		const value = reference.value.trim();
		if (!value || !/^[a-zA-Z0-9-]{1,100}$/.test(value)) { error.value = 'Enter a valid transaction reference using letters, numbers, or hyphens.'; return; }
		busy.value = true;
		try { transaction.value = await transactionService.findReceipt(value); }
		catch (err) { error.value = (err as { status?: number }).status === 404 ? 'No transaction was found. Check the reference and try again.' : 'Unable to retrieve this transaction right now. Please try again.'; }
		finally { busy.value = false; }
	};
	onMounted(() => { if (reference.value) lookup(); });
</script>

<template>
	<div>
		<MarketingHero eyebrow="Transfer visibility" title="Know where your money stands." description="Enter your transaction reference to see its current receipt and status. Keep references private and share them only with the intended recipient." />
		<section class="marketing-section pt-0"><div class="container"><div class="row g-9"><div class="col-lg-6"><div class="card border"><div class="card-body p-8"><h2 class="fs-2 mb-6">Find your transaction</h2><form @submit.prevent="lookup" :aria-busy="busy"><label for="transaction-reference" class="form-label">Transaction reference</label><input id="transaction-reference" v-model="reference" name="reference" autocomplete="off" required maxlength="100" class="form-control form-control-lg mb-5" :disabled="busy" aria-describedby="reference-help" /><p id="reference-help" class="text-gray-600 fs-7 mb-6">You can find the reference in your account's transaction history or on a shared receipt.</p><button type="submit" class="btn btn-primary w-100" :disabled="busy"><span v-if="busy" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>{{ busy ? 'Looking up transaction…' : 'Track transaction' }}</button></form><p v-if="error" role="alert" class="alert alert-warning mt-6 mb-0">{{ error }}</p></div></div></div><div class="col-lg-6"><div v-if="transaction" class="card border" role="status" aria-live="polite"><div class="card-body p-8"><span :class="['badge text-capitalize mb-6', status === 'completed' ? 'badge-light-success' : status === 'failed' ? 'badge-light-danger' : 'badge-light-primary']">{{ status }}</span><h2 class="fs-2qx mb-5">{{ amount }}</h2><p class="text-gray-600 fs-7">Amount as recorded. Confirm the transaction currency in your account.</p><dl class="mb-7"><dt class="text-gray-600 fw-normal mb-2">Recipient</dt><dd class="fw-bold fs-5 mb-5">{{ transaction.beneficiary?.name || 'Not provided' }}</dd><dt class="text-gray-600 fw-normal mb-2">Reference</dt><dd class="fw-bold text-break mb-5">{{ transaction.transactionId }}</dd><template v-if="created"><dt class="text-gray-600 fw-normal mb-2">Created (UTC)</dt><dd class="fw-bold">{{ created }}</dd></template></dl><p class="text-gray-700 lh-lg mb-0">{{ statusCopy[status] || 'Contact support for more information about this status.' }}</p></div></div><div v-else class="bg-light rounded-3 p-8"><i class="ki-outline ki-document text-primary fs-4x d-block mb-6" aria-hidden="true"></i><h2 class="fs-2 mb-5">A reference. A clearer picture.</h2><p class="text-gray-600 fs-6 lh-lg mb-6">Awaiting or processing does not mean a payment is completed. Check the current status before sending again.</p><NuxtLink to="/resources/guides/understanding-transfers" class="fw-bold">Understand transfer statuses <span aria-hidden="true">↗</span></NuxtLink></div></div></div><p class="text-gray-600 fs-6 mt-8 mb-0">Need help with a transaction? <NuxtLink to="/resources/contact-us">Contact support</NuxtLink> with the reference. Never send passwords or sign-in codes.</p></div></section>
	</div>
</template>
