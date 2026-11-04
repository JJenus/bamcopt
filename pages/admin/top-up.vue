<script setup lang="ts">
	import type { IUser } from '~/utils/interfaces/IUser';
	import type { FundingAccount } from '~/utils/interfaces/Funding';
	import { adminMoney } from '~/utils/admin-ui';
	import { parseBalanceChange, balanceChangeLabel } from '~/utils/funding-ui';
	const email = ref(String(useRoute().query.email || ''));
	const direction = ref(''); const amount = ref(''); const reason = ref(''); const fundingId = ref('');
	const funding = ref<FundingAccount[]>([]); const fundingError = ref('');
	const recipient = ref<IUser | null>(null); const result = ref<number | null>(null);
	const busy = ref(false); const uncertain = ref(false); const submitted = ref(false);
	const errors = ref<Record<string, string>>({}); const error = ref('');
	const change = computed(() => parseBalanceChange(direction.value, amount.value));
	const selectedFunding = computed(() => funding.value.find(item => item.id === fundingId.value));
	const projected = computed(() => Number(recipient.value?.account?.amount || 0) + (change.value ? (change.value.direction === 'credit' ? change.value.amount : -change.value.amount) : 0));
	watch(direction, () => { fundingId.value = ''; });
	const loadFunding = async () => { fundingError.value = ''; try { funding.value = await fundingService.list(); } catch { fundingError.value = 'Funding accounts could not be loaded. Retry before choosing an association.'; } };
	onMounted(loadFunding);
	const review = async () => {
		if (busy.value || uncertain.value) return;
		errors.value = {}; error.value = '';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.value.email = 'Enter a valid account email.';
		if (!['credit', 'debit'].includes(direction.value)) errors.value.direction = 'Choose Credit or Debit.';
		if (!parseBalanceChange('credit', amount.value)) errors.value.amount = 'Enter a positive amount with up to two decimal places. Do not use a sign.';
		if (reason.value.trim().length < 3) errors.value.reason = 'Enter a reason of at least three characters.';
		if (Object.keys(errors.value).length) return;
		busy.value = true;
		try { const users = await userService.list(); const person = users.find(item => item.email.toLowerCase() === email.value.trim().toLowerCase()); if (!person?.account) { errors.value.email = 'No customer account found for this email.'; return; } recipient.value = person; }
		catch { error.value = 'Unable to verify the recipient. No adjustment was submitted.'; }
		finally { busy.value = false; }
	};
	const confirm = async () => {
		if (!recipient.value || !change.value || busy.value || uncertain.value || submitted.value) return;
		busy.value = true; error.value = '';
		try { const account = await accountService.adjustBalance({ email: recipient.value.email, ...change.value, reason: reason.value.trim(), ...(direction.value === 'credit' && fundingId.value ? { fundingAccountId: fundingId.value } : {}) }); result.value = Number(account.amount); submitted.value = true; successAlert('Balance adjustment recorded.'); }
		catch (e: any) { if (e.status && e.status < 500) error.value = e.message; else { uncertain.value = true; error.value = 'The adjustment outcome is unknown. Do not submit again. Open the customer’s transactions and reconcile the ledger and funding balance before starting another adjustment.'; } }
		finally { busy.value = false; }
	};
</script>

<template>
	<div>
		<AppPageHeader title="Adjust user balance" description="Choose Credit or Debit and enter a positive amount. Every correction is recorded in the customer’s activity." />
		<section v-if="submitted" class="card border"><div class="card-body"><h2 class="fs-3">Balance adjustment recorded</h2><p class="text-gray-600">{{ recipient?.email }} · {{ change ? balanceChangeLabel(change.direction) : '' }} · {{ adminMoney(change?.amount) }} account units</p><p>New customer balance: <strong>{{ adminMoney(result) }}</strong></p><NuxtLink :to="`/admin/users/${recipient?.id}`" class="btn btn-primary">Open updated customer</NuxtLink></div></section>
		<form v-else class="card border" novalidate :aria-busy="busy" @submit.prevent="recipient ? confirm() : review()">
			<div class="card-body">
				<p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p>
				<div v-if="fundingError" role="alert" class="alert alert-warning">{{ fundingError }} <button type="button" class="btn btn-sm btn-light" @click="loadFunding">Retry</button></div>
				<div v-if="!recipient" class="row g-6">
					<div class="col-12"><label for="balance-email" class="form-label">Customer email</label><input id="balance-email" v-model="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" :disabled="busy" :aria-invalid="!!errors.email" aria-describedby="balance-email-error" /><div id="balance-email-error" class="invalid-feedback">{{ errors.email }}</div></div>
					<div class="col-md-6"><label for="balance-direction" class="form-label">Operation</label><select id="balance-direction" v-model="direction" class="form-select" :class="{ 'is-invalid': errors.direction }" :disabled="busy" :aria-invalid="!!errors.direction" aria-describedby="balance-direction-error"><option value="">Choose an operation</option><option value="credit">Credit (add funds)</option><option value="debit">Debit (remove funds)</option></select><div id="balance-direction-error" class="invalid-feedback">{{ errors.direction }}</div></div>
					<div class="col-md-6"><label for="balance-amount" class="form-label">Amount (positive, account units)</label><input id="balance-amount" v-model="amount" inputmode="decimal" class="form-control" :class="{ 'is-invalid': errors.amount }" :disabled="busy" :aria-invalid="!!errors.amount" aria-describedby="balance-amount-error" placeholder="25.00" /><div id="balance-amount-error" class="invalid-feedback">{{ errors.amount }}</div></div>
					<div class="col-12"><label for="balance-reason" class="form-label">Reason (visible in customer activity)</label><textarea id="balance-reason" v-model="reason" rows="3" maxlength="500" class="form-control" :class="{ 'is-invalid': errors.reason }" :disabled="busy" :aria-invalid="!!errors.reason" aria-describedby="balance-reason-error"></textarea><div id="balance-reason-error" class="invalid-feedback">{{ errors.reason }}</div></div>
					<div v-if="direction === 'credit'" class="col-12"><label for="balance-funding" class="form-label">Funding association (optional, credit only)</label><select id="balance-funding" v-model="fundingId" class="form-select" :disabled="busy || !!fundingError"><option value="">No association</option><option v-for="item in funding.filter(item => item.active)" :key="item.id" :value="item.id">{{ item.label }} · {{ item.currency || 'Currency unspecified' }}</option></select><p class="text-gray-600 fs-8 mt-3">An associated credit increases the funding account’s tracked balance by the same amount. No conversion is performed. Confirm matching currencies.</p></div>
					<p v-if="direction === 'debit'" class="text-gray-600 fs-7 mb-0">A debit removes funds from the customer only. It does not alter funding balances or silently reverse an earlier transaction. Use the transaction’s explicit reversal action for an eligible refund.</p>
				</div>
				<div v-else><h2 class="fs-3 mb-6">Review balance adjustment</h2><dl class="row g-5"><dt class="col-sm-4 text-gray-600">Customer</dt><dd class="col-sm-8 text-break">{{ recipient.name }} · {{ recipient.email }}</dd><dt class="col-sm-4 text-gray-600">Account number</dt><dd class="col-sm-8">{{ recipient.account.accountNumber }}</dd><dt class="col-sm-4 text-gray-600">Operation</dt><dd class="col-sm-8 fw-bold">{{ change ? balanceChangeLabel(change.direction) : '' }}</dd><dt class="col-sm-4 text-gray-600">Amount</dt><dd class="col-sm-8 fw-bold">{{ adminMoney(change?.amount) }} account units</dd><dt class="col-sm-4 text-gray-600">Estimated new balance</dt><dd class="col-sm-8">{{ adminMoney(projected) }} account units</dd><dt class="col-sm-4 text-gray-600">Reason</dt><dd class="col-sm-8 text-break">{{ reason }}</dd><dt class="col-sm-4 text-gray-600">Funding association</dt><dd class="col-sm-8">{{ selectedFunding ? `${selectedFunding.label} (${selectedFunding.currency || 'Unspecified'})` : 'None' }}</dd></dl><p class="alert alert-warning lh-lg">Confirm the operation, customer, amount and denomination. {{ direction === 'debit' ? 'This removes funds and records an administrative debit. Insufficient balances are rejected by the server.' : 'This adds funds and records an administrative credit. An associated funding balance also increases.' }} The estimated balance may change if other activity occurs before confirmation.</p></div>
				<p v-if="recipient" class="text-gray-600 fs-7">Customer currency: <strong>{{ /^[a-z]{3,10}$/i.test(recipient.account.currencyId || '') ? recipient.account.currencyId.toUpperCase() : 'Stored currency identifier — verify denomination' }}</strong>. Funding associations are checked on the server and rejected if currencies do not match.</p>
				<div class="d-flex flex-wrap gap-4 mt-7"><button type="submit" class="btn btn-primary" :disabled="busy || uncertain">{{ busy ? 'Please wait…' : recipient ? 'Confirm adjustment' : 'Review adjustment' }}</button><button v-if="recipient && !uncertain" type="button" class="btn btn-light" :disabled="busy" @click="recipient = null">Back to edit</button><NuxtLink v-if="recipient" :to="`/admin/users/${recipient.id}`" class="btn btn-light">Open customer</NuxtLink><NuxtLink v-else to="/admin/users" class="btn btn-light">Cancel</NuxtLink></div>
			</div>
		</form>
	</div>
</template>
