<script setup lang="ts">
	import type { FundingAccount } from '~/utils/interfaces/Funding';
	import { fundingTotals, adminMoney } from '~/utils/admin-ui';
	import { parseBalanceChange, balanceChangeLabel, customerFundingAccount } from '~/utils/funding-ui';
	const accounts = ref<FundingAccount[]>([]);
	const loading = ref(true); const error = ref(''); const view = ref('manage');
	const busy = ref(false); const errors = ref<Record<string, string>>({}); const saveError = ref(''); const uncertain = ref(false);
	const editing = ref<string | null>(null); const adjusting = ref<FundingAccount | null>(null);
	const direction = ref(''); const amount = ref(''); const reviewed = ref(false);
	const blank = () => ({ label: '', type: 'bank' as FundingAccount['type'], bankName: '', accountName: '', accountNumber: '', currency: '', instructions: '' });
	const draft = reactive(blank());
	const pending = ref<{ id: string; active: boolean; label: string } | null>(null);
	const totals = computed(() => fundingTotals(accounts.value));
	const visibleAccounts = computed(() => accounts.value.filter(item => item.active).map(customerFundingAccount));
	const change = computed(() => parseBalanceChange(direction.value, amount.value));
	const projected = computed(() => Number(adjusting.value?.balance || 0) + (change.value ? (change.value.direction === 'credit' ? change.value.amount : -change.value.amount) : 0));
	const load = async () => { loading.value = true; error.value = ''; try { accounts.value = await fundingService.list(); } catch { error.value = 'Unable to load funding accounts.'; } finally { loading.value = false; } };
	onMounted(load);
	const close = () => { editing.value = null; adjusting.value = null; pending.value = null; reviewed.value = false; errors.value = {}; saveError.value = ''; uncertain.value = false; };
	const edit = (account?: FundingAccount) => { close(); view.value = 'manage'; Object.assign(draft, blank(), account ? Object.fromEntries(Object.keys(blank()).map(key => [key, (account as any)[key] || ''])) : {}); editing.value = account?.id || 'new'; };
	const adjust = (account: FundingAccount) => { close(); adjusting.value = account; direction.value = ''; amount.value = ''; };
	const visibility = (account: FundingAccount) => { close(); pending.value = { id: account.id, active: !account.active, label: account.label }; reviewed.value = true; };
	const save = async () => {
		if (busy.value || uncertain.value) return;
		errors.value = {}; saveError.value = '';
		if (adjusting.value) {
			if (!['credit', 'debit'].includes(direction.value)) errors.value.direction = 'Choose Credit or Debit.';
			if (!parseBalanceChange('credit', amount.value)) errors.value.amount = 'Enter a positive amount with up to two decimal places. Do not use a sign.';
		} else if (editing.value) {
			if (draft.label.trim().length < 2) errors.value.label = 'Enter at least two characters.';
			if (!draft.accountNumber.trim()) errors.value.accountNumber = 'Enter an account number or destination.';
			if (!/^[a-z]{3,10}$/i.test(draft.currency.trim())) errors.value.currency = 'Enter a currency code, for example USD or USDT.';
		} else if (!pending.value) return;
		if (Object.keys(errors.value).length) return;
		if (!reviewed.value) { reviewed.value = true; return; }
		busy.value = true;
		try {
			if (adjusting.value && change.value) await fundingService.update(adjusting.value.id, { balanceChange: change.value });
			else if (pending.value) await fundingService.update(pending.value.id, { active: pending.value.active });
			else { const body = { ...draft, label: draft.label.trim(), currency: draft.currency.trim().toUpperCase() }; if (editing.value === 'new') await fundingService.create({ ...body, active: false }); else await fundingService.update(editing.value!, body); }
			const wasNew = editing.value === 'new'; close(); successAlert(wasNew ? 'Funding account created hidden. Preview it, then publish when ready.' : 'Funding account saved.'); await load();
		} catch (e: any) { uncertain.value = !e.status || e.status >= 500; saveError.value = uncertain.value ? 'Outcome unknown. Refresh funding balances before making another change.' : e.message; }
		finally { busy.value = false; }
	};
</script>

<template>
	<div>
		<AppPageHeader title="Funding accounts" description="Manage deposit instructions and tracked funding balances."><button type="button" class="btn btn-light" :disabled="loading || busy" @click="load">Refresh</button><button type="button" class="btn btn-primary" :disabled="busy" @click="edit()">Add account</button></AppPageHeader>
		<div v-if="view === 'manage'" class="d-flex flex-wrap gap-4 mb-7"><section v-for="[code, total] in totals" :key="code" class="card border flex-grow-1"><div class="card-body p-6"><h2 class="text-gray-600 fs-7 mb-3">Active funding · {{ code }}</h2><strong class="fs-2">{{ adminMoney(total) }}</strong></div></section></div>
		<div class="btn-group mb-7" role="group" aria-label="Funding views"><button type="button" class="btn" :class="view === 'manage' ? 'btn-primary' : 'btn-light'" :aria-pressed="view === 'manage'" @click="view = 'manage'">Manage accounts</button><button type="button" class="btn" :class="view === 'customer' ? 'btn-primary' : 'btn-light'" :aria-pressed="view === 'customer'" @click="view = 'customer'">Customer view</button></div>
		<section v-if="view === 'manage' && (editing || adjusting || pending)" class="card border mb-7">
			<form class="card-body" novalidate @submit.prevent="save">
				<h2 class="fs-3 mb-5">{{ adjusting ? 'Adjust tracked balance' : pending ? 'Change customer visibility' : editing === 'new' ? 'New funding account' : 'Edit funding instructions' }}</h2>
				<p v-if="saveError" role="alert" class="alert alert-danger">{{ saveError }}</p>
				<template v-if="adjusting">
					<p class="text-gray-600">{{ adjusting.label }} · {{ adjusting.currency || 'Currency unspecified' }} · Current balance {{ adminMoney(adjusting.balance) }}</p>
					<div class="row g-5"><div class="col-sm-6"><label for="funding-direction" class="form-label">Operation</label><select id="funding-direction" v-model="direction" class="form-select" :class="{ 'is-invalid': errors.direction }" :disabled="busy || reviewed" :aria-invalid="!!errors.direction" aria-describedby="funding-direction-error"><option value="">Choose an operation</option><option value="credit">Credit (add funds)</option><option value="debit">Debit (remove funds)</option></select><div id="funding-direction-error" class="invalid-feedback">{{ errors.direction }}</div></div><div class="col-sm-6"><label for="funding-amount" class="form-label">Amount (positive)</label><input id="funding-amount" v-model="amount" class="form-control" :class="{ 'is-invalid': errors.amount }" inputmode="decimal" :disabled="busy || reviewed" :aria-invalid="!!errors.amount" aria-describedby="funding-amount-error" placeholder="25.00" /><div id="funding-amount-error" class="invalid-feedback">{{ errors.amount }}</div></div></div>
					<p v-if="reviewed && change" class="alert alert-warning mt-5 lh-lg"><strong>{{ balanceChangeLabel(change.direction) }}: {{ adminMoney(change.amount, adjusting.currency || '') }}</strong><br />Estimated new tracked balance: {{ adminMoney(projected, adjusting.currency || '') }}. This does not change a customer's balance. The server checks the latest balance and rejects overdrafts.</p>
				</template>
				<p v-else-if="pending" class="alert alert-warning">{{ pending.active ? 'Publish' : 'Hide' }} {{ pending.label }} {{ pending.active ? 'on' : 'from' }} the customer Add funds page? This does not move money.</p>
				<template v-else>
					<div class="row g-5"><div class="col-md-6"><label for="funding-label" class="form-label">Label</label><input id="funding-label" v-model="draft.label" class="form-control" :class="{ 'is-invalid': errors.label }" :disabled="busy || reviewed" /><div class="invalid-feedback">{{ errors.label }}</div></div><div class="col-md-6"><label for="funding-type" class="form-label">Type</label><select id="funding-type" v-model="draft.type" class="form-select" :disabled="busy || reviewed"><option value="bank">Bank</option><option value="crypto">Crypto</option><option value="other">Other</option></select></div><div v-for="field in (['bankName', 'accountName', 'accountNumber', 'currency'] as const)" :key="field" class="col-md-6"><label :for="`funding-${field}`" class="form-label">{{ { bankName: 'Bank / network', accountName: 'Account name', accountNumber: 'Account number / destination', currency: 'Currency code' }[field] }}</label><input :id="`funding-${field}`" v-model="draft[field]" class="form-control" :class="{ 'is-invalid': errors[field] }" :disabled="busy || reviewed" /><div class="invalid-feedback">{{ errors[field] }}</div></div><div class="col-12"><label for="funding-instructions" class="form-label">Customer instructions</label><textarea id="funding-instructions" v-model="draft.instructions" rows="4" class="form-control" :disabled="busy || reviewed"></textarea></div></div>
					<p class="text-gray-600 fs-8 mt-5">New accounts start hidden. Existing published instructions change for customers after confirmation.</p>
					<div v-if="reviewed" class="mt-6"><h3 class="fs-5 mb-4">Instruction preview — no balance is shown to customers</h3><FundingInstructions :account="customerFundingAccount({ id: editing || '', ...draft })" /></div>
				</template>
				<div class="d-flex flex-wrap gap-4 mt-6"><button type="submit" class="btn btn-primary" :disabled="busy || uncertain">{{ busy ? 'Saving…' : !reviewed ? 'Review changes' : 'Confirm and save' }}</button><button type="button" class="btn btn-light" :disabled="busy" @click="close(); load()">{{ uncertain ? 'Close and refresh' : 'Cancel' }}</button><button v-if="reviewed && !uncertain && !pending" type="button" class="btn btn-light" :disabled="busy" @click="reviewed = false">Back to edit</button></div>
			</form>
		</section>
		<AppLoadState :loading="loading" :error="error" :empty="view === 'customer' ? !visibleAccounts.length : !accounts.length" :title="view === 'customer' ? 'No published funding instructions' : 'No funding accounts'" description="Create and review an account, then publish it for customers." @retry="load">
			<template v-if="view === 'customer'"><p class="alert alert-primary lh-lg">This is the same instructions card shown on the customer Add funds page. Only published accounts appear; tracked balances and admin controls are never included.</p><div class="row g-6"><div v-for="account in visibleAccounts" :key="account.id" class="col-xl-6"><FundingInstructions :account="account" /></div></div></template>
			<div v-else class="row g-6"><div v-for="account in accounts" :key="account.id" class="col-xl-6"><section class="card border h-100"><div class="card-body"><div class="d-flex justify-content-between gap-4 mb-5"><h2 class="fs-3 mb-0 text-break">{{ account.label }}</h2><span class="badge h-25px" :class="account.active ? 'badge-light-success' : 'badge-light-warning'">{{ account.active ? 'Published' : 'Hidden' }}</span></div><p class="text-gray-600 text-break">{{ account.bankName || account.type }} · {{ account.currency || 'Currency unspecified' }}</p><p class="text-break fw-semibold">{{ account.accountName }}<br />{{ account.accountNumber }}</p><p class="text-gray-600 text-break" style="white-space: pre-wrap">{{ account.instructions }}</p><p class="fs-3 fw-bold border-top pt-5">Tracked balance: {{ adminMoney(account.balance, account.currency || '') }}</p><div class="d-flex flex-wrap gap-3"><button type="button" class="btn btn-sm btn-light-primary" :disabled="busy" @click="edit(account)">Edit</button><button type="button" class="btn btn-sm btn-light" :disabled="busy" @click="adjust(account)">Adjust balance</button><button type="button" class="btn btn-sm btn-light" :disabled="busy" @click="visibility(account)">{{ account.active ? 'Hide from customers' : 'Publish to customers' }}</button></div></div></section></div></div>
		</AppLoadState>
	</div>
</template>
