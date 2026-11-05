<script setup lang="ts">
	import type { DepositRequest, DepositStatus } from '~/utils/interfaces/DepositRequest';
	import { adminMoney } from '~/utils/admin-ui';
	const route = useRoute();
	const items = ref<DepositRequest[]>([]); const total = ref(0); const status = ref<DepositStatus | ''>('pending');
	const loading = ref(false); const error = ref(''); const selected = ref<DepositRequest | null>(null);
	const action = ref(''); const note = ref(''); const verified = ref(false); const review = ref(false); const busy = ref(false); const uncertain = ref(false);
	const actionError = ref(''); const errors = ref<Record<string, string>>({});
	const load = async (more = false) => {
		if (loading.value) return;
		loading.value = true; error.value = '';
		try { const page = await depositService.list({ status: status.value || undefined, limit: 20, offset: more ? items.value.length : 0 }); items.value = more ? [...items.value, ...page.items] : page.items; total.value = page.total; }
		catch { error.value = 'Unable to load deposit requests.'; }
		finally { loading.value = false; }
	};
	const open = (item: DepositRequest) => { selected.value = item; action.value = ''; note.value = ''; verified.value = false; review.value = false; uncertain.value = false; errors.value = {}; actionError.value = ''; };
	const openLinked = async (value: unknown) => { const id = String(value || ''); if (!id || busy.value) return; try { const item = await depositService.get(id); if (String(route.query.request || '') === id && !busy.value) open(item); } catch { error.value = 'The linked deposit request could not be loaded.'; } };
	const recover = async () => {
		if (!selected.value || busy.value) return;
		busy.value = true;
		try { const fresh = await depositService.get(selected.value.id); open({ ...selected.value, ...fresh }); await load(); }
		catch { actionError.value = 'Could not refresh this request. Do not manually credit the same deposit.'; }
		finally { busy.value = false; }
	};
	const decide = async () => {
		if (!selected.value || selected.value.status !== 'pending' || busy.value || uncertain.value) return;
		errors.value = {}; actionError.value = '';
		if (!['approve', 'reject'].includes(action.value)) errors.value.action = 'Choose Approve or Reject.';
		if (note.value.trim().length < 3) errors.value.note = 'Enter a verification note or rejection reason.';
		if (action.value === 'approve' && !verified.value) errors.value.verified = 'Confirm actual receipt before approving.';
		if (Object.keys(errors.value).length) return;
		if (!review.value) { review.value = true; return; }
		busy.value = true;
		try { const fresh = await depositService.decide(selected.value.id, action.value as 'approve' | 'reject', note.value.trim()); selected.value = { ...selected.value, ...fresh }; review.value = false; successAlert(fresh.status === 'approved' ? 'Deposit approved and balances credited.' : 'Deposit request rejected. No money moved.'); await load(); }
		catch (e: any) { uncertain.value = !e.status || e.status >= 500 || e.status === 409; actionError.value = uncertain.value ? 'Refresh this request to recover its recorded outcome. Do not manually credit this deposit or submit a separate adjustment.' : e.message; }
		finally { busy.value = false; }
	};
	watch(status, () => load());
	watch(() => route.query.request, openLinked);
	onMounted(async () => { await load(); await openLinked(route.query.request); });
</script>

<template><div>
	<AppPageHeader title="Deposit requests" description="Verify actual receipt before approving. Approval credits the customer and the associated funding balance once."><button type="button" class="btn btn-light" :disabled="loading" @click="load()">Refresh requests</button></AppPageHeader>
	<div class="mb-6"><label for="deposit-status-filter" class="form-label">Request status</label><select id="deposit-status-filter" v-model="status" class="form-select w-auto" :disabled="loading"><option value="">All requests</option><option value="pending">Pending verification</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div>
	<section class="card border mb-7"><div class="card-body"><AppLoadState :loading="loading && !items.length" :error="error" :empty="!items.length" title="No matching deposit requests" @retry="load()"><p class="text-gray-600 fs-8">Showing {{ items.length }} of {{ total }}</p><button v-for="item in items" :key="item.id" type="button" class="account-activity-row d-flex justify-content-between align-items-center gap-4" :disabled="busy" @click="open(item)"><span class="admin-identity"><strong class="d-block text-break">{{ item.customerName || item.userId }}</strong><span class="d-block text-gray-600 fs-8 text-break">{{ item.customerEmail }} · {{ item.fundingSnapshot.label }}</span><span class="text-gray-600 fs-8">{{ item.reference || item.id }}</span></span><span class="text-end"><strong class="d-block mb-2">{{ adminMoney(item.amount, item.currency) }}</strong><span class="badge text-capitalize" :class="item.status === 'approved' ? 'badge-light-success' : item.status === 'rejected' ? 'badge-light-danger' : 'badge-light-warning'">{{ item.status }}</span></span></button><button v-if="items.length < total" type="button" class="btn btn-light-primary mt-5" :disabled="loading" @click="load(true)">Load more requests</button></AppLoadState></div></section>
	<section v-if="selected" class="card border"><div class="card-body">
		<div class="d-flex flex-wrap justify-content-between gap-4 mb-5"><h2 class="fs-3 mb-0">Review deposit request</h2><button type="button" class="btn btn-sm btn-light" :disabled="busy" @click="selected = null">Close review</button></div>
		<p class="text-gray-600 text-break fs-8">Request {{ selected.id }}</p><p class="fs-3 fw-bold">{{ adminMoney(selected.amount, selected.currency) }} · {{ selected.status }}</p><NuxtLink :to="`/admin/users/${selected.userId}`" class="fw-semibold">Open customer account</NuxtLink><p class="text-gray-600 mt-4 text-break">Payment reference: {{ selected.reference || 'Not supplied' }}</p>
		<div class="admin-grid"><div><h3 class="fs-5 mb-4">Instructions recorded at submission</h3><FundingInstructions :account="selected.fundingSnapshot" /></div><div>
			<p v-if="actionError" role="alert" class="alert alert-danger">{{ actionError }}</p>
			<template v-if="selected.status !== 'pending'"><p class="alert" :class="selected.status === 'approved' ? 'alert-success' : 'alert-warning'">This request is {{ selected.status }}. {{ selected.decisionNote }}</p><NuxtLink v-if="selected.transactionId" :to="`/admin/transaction/${selected.transactionId}`" class="btn btn-light-primary">View credited transaction</NuxtLink></template>
			<form v-else novalidate @submit.prevent="decide">
				<label for="deposit-decision" class="form-label">Decision</label><select id="deposit-decision" v-model="action" class="form-select" :class="{ 'is-invalid': errors.action }" :disabled="busy || review || uncertain"><option value="">Choose a decision</option><option value="approve">Approve and credit</option><option value="reject">Reject without credit</option></select><div class="invalid-feedback">{{ errors.action }}</div>
				<label for="deposit-decision-note" class="form-label mt-5">Verification note / rejection reason (visible to customer)</label><textarea id="deposit-decision-note" v-model="note" rows="4" maxlength="500" class="form-control" :class="{ 'is-invalid': errors.note }" :disabled="busy || review || uncertain"></textarea><div class="invalid-feedback">{{ errors.note }}</div>
				<div v-if="action === 'approve'" class="mt-5"><label class="form-check form-check-custom align-items-start gap-3"><input v-model="verified" type="checkbox" class="form-check-input" :disabled="busy || review || uncertain" /><span class="form-check-label lh-lg">I verified the actual receipt, amount, currency and destination, and checked this payment has not already been credited manually.</span></label><p v-if="errors.verified" class="text-danger mt-3 fs-7">{{ errors.verified }}</p></div>
				<p v-if="review" class="alert alert-warning mt-6 lh-lg">{{ action === 'approve' ? `Approve and credit ${adminMoney(selected.amount, selected.currency)} to this customer and funding account? The recorded amount and destination cannot be changed here.` : 'Reject this request without moving any money? The customer will see your reason.' }}</p>
				<div class="d-flex flex-wrap gap-3 mt-6"><button type="submit" class="btn btn-primary" :disabled="busy || uncertain">{{ busy ? 'Saving…' : review ? 'Confirm decision' : 'Review decision' }}</button><button v-if="review && !uncertain" type="button" class="btn btn-light" :disabled="busy" @click="review = false">Back to edit</button></div>
			</form>
			<button type="button" class="btn btn-light mt-5" :disabled="busy" @click="recover">Refresh recorded status</button>
		</div></div>
	</div></section>
</div></template>
