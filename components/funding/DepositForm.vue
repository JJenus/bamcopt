<script setup lang="ts">
	import type { FundingAccount } from '~/utils/interfaces/Funding';
	import { parseBalanceChange } from '~/utils/funding-ui';
	import { adminMoney } from '~/utils/admin-ui';
	const props = defineProps<{ accounts: FundingAccount[] }>();
	const user = userData().data;
	const step = ref(1);
	const amount = ref(''); const fundingAccountId = ref(''); const reference = ref(''); const requestKey = ref('');
	const busy = ref(false); const uncertain = ref(false); const error = ref(''); const errors = ref<Record<string, string>>({});
	const selected = computed(() => props.accounts.find(item => item.id === fundingAccountId.value));
	const storageKey = () => `deposit-submission:${user.value.id}`;
	onMounted(() => {
		try { const saved = JSON.parse(sessionStorage.getItem(storageKey()) || 'null'); if (saved?.requestKey) { amount.value = saved.amount; fundingAccountId.value = saved.fundingAccountId; reference.value = saved.reference; requestKey.value = saved.requestKey; uncertain.value = true; step.value = 2; error.value = 'An earlier submission may have been received. Retry the same request to retrieve its recorded status; do not submit a new request for the same payment.'; } } catch {}
	});
	const validate = () => {
		errors.value = {}; error.value = '';
		const parsed = parseBalanceChange('credit', amount.value);
		if (!parsed) errors.value.amount = 'Enter a positive amount with up to two decimal places.';
		if (!selected.value && !uncertain.value) errors.value.account = 'Choose a current funding account.';
		return Object.keys(errors.value).length ? null : parsed;
	};
	const next = () => { if (!busy.value && validate()) step.value = 2; };
	const submit = async () => {
		if (busy.value || step.value !== 2) return;
		const parsed = validate(); if (!parsed) { if (!uncertain.value) step.value = 1; return; }
		if (!requestKey.value) requestKey.value = crypto.randomUUID();
		try { sessionStorage.setItem(storageKey(), JSON.stringify({ requestKey: requestKey.value, amount: amount.value, fundingAccountId: fundingAccountId.value, reference: reference.value })); } catch {}
		busy.value = true;
		try {
			const result = await depositService.submit({ amount: parsed.amount, fundingAccountId: fundingAccountId.value, reference: reference.value.trim(), requestKey: requestKey.value });
			uncertain.value = false; try { sessionStorage.removeItem(storageKey()); } catch {}
			successAlert(result.status === 'pending' ? 'Deposit request submitted for verification. No balance has changed yet.' : `Request is ${result.status}.`);
			await navigateTo({ path: '/app/add-funds/requests', query: { request: result.id } });
		} catch (e: any) {
			uncertain.value = !e.status || e.status >= 500 || e.status === 409;
			error.value = uncertain.value ? 'We could not confirm the submission. Use Retry same request to recover its status without creating another request, or check your request history.' : e.message;
			if (!uncertain.value) { try { sessionStorage.removeItem(storageKey()); } catch {} }
		} finally { busy.value = false; }
	};
</script>

<template>
	<section v-if="accounts.length || uncertain" class="card border"><div class="card-body p-7">
		<ol class="list-unstyled d-flex flex-wrap gap-6 mb-8" aria-label="Deposit steps"><li :aria-current="step === 1 ? 'step' : undefined" :class="step === 1 ? 'text-gray-900 fw-bold' : 'text-gray-600'"><span class="account-step me-2" :class="{ active: step === 1 }">1</span>Deposit details</li><li :aria-current="step === 2 ? 'step' : undefined" :class="step === 2 ? 'text-gray-900 fw-bold' : 'text-gray-600'"><span class="account-step me-2" :class="{ active: step === 2 }">2</span>Payment & submit</li></ol>
		<p v-if="error" class="alert alert-warning" role="alert">{{ error }}</p>
		<form v-if="step === 1" novalidate @submit.prevent="next">
			<h2 class="fs-3 mb-3">Choose amount and funding account</h2><p class="text-gray-600 lh-lg mb-6">Choose where you will send your deposit. Next, review the payment instructions and submit for verification.</p>
			<div class="row g-5"><div class="col-md-6"><label for="deposit-amount" class="form-label">Deposit amount</label><input id="deposit-amount" v-model="amount" inputmode="decimal" class="form-control" :class="{ 'is-invalid': errors.amount }" :aria-invalid="!!errors.amount" aria-describedby="deposit-amount-error" placeholder="25.00" /><div id="deposit-amount-error" class="invalid-feedback">{{ errors.amount }}</div></div><div class="col-md-6"><label for="deposit-account" class="form-label">Funding account</label><select id="deposit-account" v-model="fundingAccountId" class="form-select" :class="{ 'is-invalid': errors.account }" :aria-invalid="!!errors.account" aria-describedby="deposit-account-error"><option value="">Choose a funding account</option><option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.label }} · {{ account.currency || 'Currency unspecified' }}</option></select><div id="deposit-account-error" class="invalid-feedback">{{ errors.account }}</div></div></div>
			<button type="submit" class="btn btn-primary mt-6">Continue to payment details</button>
		</form>
		<form v-else novalidate :aria-busy="busy" @submit.prevent="submit">
			<h2 class="fs-3 mb-3">Payment details & submit</h2><p class="fs-2 fw-bold mb-4">{{ adminMoney(amount, selected?.currency || '') }}</p><p class="text-gray-600 lh-lg mb-6">Make your payment using the account below, then submit this request. Submitting does not initiate a transfer or immediately change your balance. An administrator must verify actual receipt first.</p>
			<FundingInstructions v-if="selected" :account="selected" />
			<p v-else class="alert alert-warning">The earlier funding account is no longer listed. Recover your existing request or check your request history; do not send to outdated details.</p>
			<label for="deposit-reference" class="form-label mt-6">Payment reference (optional)</label><input id="deposit-reference" v-model="reference" maxlength="200" class="form-control" :disabled="busy || uncertain" /><p class="text-gray-600 fs-8 mt-3 mb-0">Use the bank/payment reference to help match your deposit. Never enter passwords or transfer verification codes.</p>
			<div class="d-flex flex-wrap gap-4 mt-6"><button type="submit" class="btn btn-primary" :disabled="busy">{{ busy ? 'Submitting…' : uncertain ? 'Retry same request' : 'Submit deposit request' }}</button><button v-if="!uncertain" type="button" class="btn btn-light" :disabled="busy" @click="step = 1">Back to deposit details</button><NuxtLink to="/app/add-funds/requests" class="btn btn-light">View deposit requests</NuxtLink></div>
		</form>
	</div></section>
</template>
