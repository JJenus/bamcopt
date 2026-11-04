<script setup lang="ts">
	import type { Transaction } from '~/utils/interfaces/Transaction';
	import { adminMoney, transactionStatuses } from '~/utils/admin-ui';
	const props = defineProps<{ transaction: Transaction }>();
	const emit = defineEmits<{ saved: [] }>();
	const action = ref(''); const status = ref(''); const notes = ref(''); const reason = ref('');
	const review = ref(false); const busy = ref(false); const error = ref(''); const errors = ref<Record<string, string>>({}); const uncertain = ref(false);
	watch(() => props.transaction, tx => { status.value = tx.status || ''; notes.value = tx.notes || ''; action.value = ''; reason.value = ''; review.value = false; uncertain.value = false; errors.value = {}; }, { immediate: true });
	const canReverse = computed(() => !['send', 'credit'].includes(props.transaction.type) && props.transaction.status !== 'failed');
	const options = computed(() => transactionStatuses(props.transaction).filter(value => value !== 'failed' || props.transaction.status === 'failed'));
	const save = async () => {
		if (busy.value || uncertain.value || !props.transaction.id) return;
		errors.value = {}; error.value = '';
		if (!['update', 'reverse'].includes(action.value)) errors.value.action = 'Choose an operation.';
		if (action.value === 'reverse' && (!canReverse.value || reason.value.trim().length < 3)) errors.value.reason = 'Enter a reversal reason of at least three characters.';
		if (Object.keys(errors.value).length) return;
		if (!review.value) { review.value = true; return; }
		busy.value = true;
		try {
			if (action.value === 'reverse') await transactionService.reverse(props.transaction.id, reason.value.trim());
			else await transactionService.update({ id: props.transaction.id, ...(status.value !== props.transaction.status ? { status: status.value } : {}), ...(notes.value !== (props.transaction.notes || '') ? { notes: notes.value } : {}) });
			review.value = false; successAlert(action.value === 'reverse' ? 'Transaction reversed and refunded.' : 'Transaction updated.'); emit('saved');
		} catch (e: any) { uncertain.value = !e.status || e.status >= 500; error.value = uncertain.value ? 'Outcome unknown. Reload this transaction and the sender’s balance before making another change.' : e.message; }
		finally { busy.value = false; }
	};
</script>

<template>
	<div class="admin-grid">
		<section class="card border"><div class="card-body"><h2 class="fs-3 mb-6">Recorded transaction</h2><strong class="fs-2x d-block mb-2">{{ adminMoney(transaction.amount) }}</strong><p class="text-gray-600 fs-8 mb-6">Account units · {{ transaction.type }}</p><dl><div v-for="[label, value] in [['Reference', transaction.transactionId || transaction.id], ['Status', transaction.status], ['Date', transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'Not recorded'], ['Beneficiary', transaction.beneficiary?.name || 'Not applicable'], ['Destination', transaction.beneficiary?.destinationAccount || 'Not applicable'], ['Bank', transaction.beneficiary?.bank || 'Not applicable'], ['Notes', transaction.notes || 'None']]" :key="String(label)" class="row g-3 py-4 border-bottom"><dt class="col-sm-4 text-gray-600 fw-normal">{{ label }}</dt><dd class="col-sm-8 mb-0 text-break" style="white-space: pre-wrap">{{ value }}</dd></div></dl></div></section>
		<form class="card border" novalidate @submit.prevent="save"><div class="card-body">
			<h2 class="fs-4 mb-5">Transaction actions</h2><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p>
			<label for="transaction-action" class="form-label">Operation</label><select id="transaction-action" v-model="action" class="form-select" :class="{ 'is-invalid': errors.action }" :disabled="busy || review" :aria-invalid="!!errors.action" aria-describedby="transaction-action-error"><option value="">Choose an operation</option><option value="update">Update status / notes</option><option v-if="canReverse" value="reverse">Reverse and refund</option></select><div id="transaction-action-error" class="invalid-feedback">{{ errors.action }}</div>
			<p v-if="!canReverse" class="text-gray-600 fs-8 mt-4">Internal transfers and deposits cannot be reversed here. Failed transactions cannot be reopened or refunded again.</p>
			<template v-if="action === 'update'"><label for="transaction-status" class="form-label mt-5">Status</label><select id="transaction-status" v-model="status" class="form-select mb-5" :disabled="busy || review || options.length === 1"><option v-if="!options.includes(status)" :value="status">{{ status }}</option><option v-for="option in options" :key="option" :value="option">{{ option }}</option></select><label for="transaction-notes" class="form-label">Notes</label><textarea id="transaction-notes" v-model="notes" rows="5" maxlength="5000" class="form-control" :disabled="busy || review"></textarea></template>
			<template v-if="action === 'reverse'"><p class="alert alert-warning mt-5 lh-lg">This explicitly credits {{ adminMoney(transaction.amount) }} account units back to the sender. No negative amount is entered. The transaction is marked failed and cannot be reopened.</p><label for="transaction-reversal-reason" class="form-label">Reversal reason (visible in activity)</label><textarea id="transaction-reversal-reason" v-model="reason" rows="3" maxlength="500" class="form-control" :class="{ 'is-invalid': errors.reason }" :disabled="busy || review" :aria-invalid="!!errors.reason" aria-describedby="transaction-reason-error"></textarea><div id="transaction-reason-error" class="invalid-feedback">{{ errors.reason }}</div></template>
			<div v-if="review" class="alert mt-6 lh-lg" :class="action === 'reverse' ? 'alert-danger' : 'alert-warning'"><strong class="d-block mb-2">{{ action === 'reverse' ? 'Reversal confirmation' : 'Review transaction change' }}</strong>{{ action === 'reverse' ? 'Confirm the full refund to the sender. The server records it once atomically; repeating the request cannot refund twice. This does not change any funding-account balance.' : 'Confirm the new status and notes above. This updates the record; it does not initiate a new bank transfer.' }}</div>
			<div class="d-flex flex-wrap gap-3 mt-6"><button type="submit" class="btn btn-primary" :disabled="busy || uncertain || (action === 'update' && status === transaction.status && notes === (transaction.notes || ''))">{{ busy ? 'Saving…' : review ? (action === 'reverse' ? 'Confirm reversal' : 'Confirm update') : 'Review action' }}</button><button v-if="review && !uncertain" type="button" class="btn btn-light" :disabled="busy" @click="review = false">Back to edit</button><button v-if="uncertain" type="button" class="btn btn-light" @click="emit('saved')">Reload record</button></div>
		</div></form>
	</div>
</template>
