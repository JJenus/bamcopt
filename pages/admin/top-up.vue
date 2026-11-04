<script setup lang="ts">
	import type { IUser } from '~/utils/interfaces/IUser';
	import type { FundingAccount } from '~/utils/interfaces/Funding';
	import { parseTransferAmount } from '~/utils/account-ui';
	import { adminMoney } from '~/utils/admin-ui';
	const route = useRoute();
	const email = ref(String(route.query.email || ''));
	const amount = ref(''); const fundingId = ref('');
	const funding = ref<FundingAccount[]>([]); const fundingError = ref('');
	const recipient = ref<IUser | null>(null); const result = ref<number | null>(null);
	const busy = ref(false); const uncertain = ref(false); const submitted = ref(false);
	const errors = ref<Record<string, string>>({}); const error = ref('');
	const selectedFunding = computed(() => funding.value.find(item => item.id === fundingId.value));
	const loadFunding = async () => { fundingError.value = ''; try { funding.value = await fundingService.list(); } catch { fundingError.value = 'Funding accounts could not be loaded. Retry before choosing an association.'; } };
	onMounted(loadFunding);
	const review = async () => {
		if (busy.value || uncertain.value) return;
		errors.value = {}; error.value = '';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.value.email = 'Enter a valid account email.';
		if (!parseTransferAmount(amount.value)) errors.value.amount = 'Enter a positive amount with up to two decimal places.';
		if (Object.keys(errors.value).length) return;
		busy.value = true;
		try { const users = await userService.list(); const person = users.find(item => item.email.toLowerCase() === email.value.trim().toLowerCase()); if (!person?.account) { errors.value.email = 'No customer account found for this email.'; return; } recipient.value = person; }
		catch { error.value = 'Unable to verify the recipient. No credit was submitted.'; }
		finally { busy.value = false; }
	};
	const confirm = async () => {
		if (!recipient.value || busy.value || uncertain.value || submitted.value) return;
		busy.value = true; error.value = '';
		try { const account = await accountService.topUp(recipient.value.email, parseTransferAmount(amount.value)!, fundingId.value || undefined); result.value = Number(account.amount); submitted.value = true; successAlert('Account credit recorded.'); }
		catch (e: any) { if (e.status && e.status < 500) error.value = e.message; else { uncertain.value = true; error.value = 'The credit outcome is unknown. Do not submit again. Open the customer’s transactions and reconcile the deposit and funding balance before starting a new credit.'; } }
		finally { busy.value = false; }
	};
</script>
<template><div><AppPageHeader title="Credit user account" description="Record a confirmed deposit. This action increases the customer’s balance." /><section v-if="submitted" class="card border"><div class="card-body"><h2 class="fs-3">Credit recorded</h2><p class="text-gray-600">{{ recipient?.email }} · {{ adminMoney(parseTransferAmount(amount)) }} account units</p><p>New customer balance: <strong>{{ adminMoney(result) }}</strong></p><NuxtLink :to="`/admin/users/${recipient?.id}`" class="btn btn-primary">Open updated customer</NuxtLink></div></section><form v-else class="card border" novalidate :aria-busy="busy" @submit.prevent="recipient ? confirm() : review()"><div class="card-body"><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p><div v-if="fundingError" role="alert" class="alert alert-warning">{{ fundingError }} <button type="button" class="btn btn-sm btn-light" @click="loadFunding">Retry</button></div><div v-if="!recipient" class="row g-6"><div class="col-md-6"><label for="credit-email" class="form-label">Customer email</label><input id="credit-email" v-model="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" :disabled="busy" /><div class="invalid-feedback">{{ errors.email }}</div></div><div class="col-md-6"><label for="credit-amount" class="form-label">Amount (customer account units)</label><input id="credit-amount" v-model="amount" inputmode="decimal" class="form-control" :class="{ 'is-invalid': errors.amount }" :disabled="busy" placeholder="0.00" /><div class="invalid-feedback">{{ errors.amount }}</div></div><div class="col-12"><label for="credit-funding" class="form-label">Funding account association (optional)</label><select id="credit-funding" v-model="fundingId" class="form-select" :disabled="busy || !!fundingError"><option value="">No association</option><option v-for="item in funding.filter(item => item.active)" :key="item.id" :value="item.id">{{ item.label }} · {{ item.currency || 'Currency unspecified' }}</option></select><p class="text-gray-600 fs-8 mt-3">If selected, the funding account’s tracked balance increases by the same numeric amount. No conversion is performed. Confirm currencies match.</p></div></div><div v-else><h2 class="fs-3 mb-6">Review account credit</h2><dl class="row g-5"><dt class="col-sm-4 text-gray-600">Recipient</dt><dd class="col-sm-8 text-break">{{ recipient.name }} · {{ recipient.email }}</dd><dt class="col-sm-4 text-gray-600">Account number</dt><dd class="col-sm-8">{{ recipient.account.accountNumber }}</dd><dt class="col-sm-4 text-gray-600">Credit amount</dt><dd class="col-sm-8 fw-bold">{{ adminMoney(parseTransferAmount(amount)) }} account units</dd><dt class="col-sm-4 text-gray-600">Funding association</dt><dd class="col-sm-8">{{ selectedFunding ? `${selectedFunding.label} (${selectedFunding.currency || 'Unspecified'})` : 'None' }}</dd></dl><p class="alert alert-warning lh-lg">Confirm the deposit has been received and the amount and currency are correct. This records a deposit, increases the customer balance, and increases the associated funding balance when selected. It cannot be undone here.</p></div><div class="d-flex flex-wrap gap-4 mt-7"><button type="submit" class="btn btn-primary" :disabled="busy || uncertain">{{ busy ? 'Please wait…' : recipient ? 'Confirm credit' : 'Review credit' }}</button><button v-if="recipient && !uncertain" type="button" class="btn btn-light" :disabled="busy" @click="recipient = null">Back to edit</button><NuxtLink v-if="recipient" :to="`/admin/users/${recipient.id}`" class="btn btn-light">Open customer</NuxtLink><NuxtLink v-else to="/admin/users" class="btn btn-light">Cancel</NuxtLink></div></div></form></div></template>
