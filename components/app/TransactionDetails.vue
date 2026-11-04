<script setup lang="ts">
	import type { Transaction } from '~/utils/interfaces/Transaction';
	import { transactionPresentation } from '~/utils/account-ui';
	const props = defineProps<{ transaction: Transaction | null }>();
	const emit = defineEmits(['close']);
	const dialog = ref<HTMLDialogElement>();
	const { money, currencyCode } = useAccountMoney();
	const user = userData().data;
	const view = computed(() => transactionPresentation(props.transaction || {}, user.value.id));
	watch(() => props.transaction, async value => {
		await nextTick();
		if (value && dialog.value && !dialog.value.open) dialog.value.showModal();
		else if (!value && dialog.value?.open) dialog.value.close();
	});
	const copy = async () => {
		try { await navigator.clipboard.writeText(props.transaction?.transactionId || ''); successAlert('Transaction reference copied.'); }
		catch { infoAlert('Unable to copy. Select the reference and copy it manually.'); }
	};
</script>

<template>
	<dialog ref="dialog" class="account-details-panel border-0" aria-labelledby="transaction-detail-title" @close="emit('close')" @click="event => { if (event.target === dialog) dialog?.close(); }">
		<template v-if="transaction"><div class="d-flex align-items-center justify-content-between mb-9"><h2 id="transaction-detail-title" class="fs-2 mb-0">Transaction details</h2><button type="button" class="btn btn-sm btn-icon btn-light" aria-label="Close transaction details" @click="dialog?.close()"><i class="ki-outline ki-cross fs-2" aria-hidden="true"></i></button></div><span :class="['badge text-capitalize mb-5', `badge-light-${view.tone}`]">{{ view.status }}</span><p class="account-balance mb-3">{{ view.incoming ? '+' : '−' }}{{ money(transaction.amount) }}</p><p class="text-gray-600 mb-9">{{ currencyCode }} · {{ view.label }}</p><dl class="mb-9"><dt class="fw-normal text-gray-600 mb-2">Reference</dt><dd class="fw-bold text-break mb-6">{{ transaction.transactionId || 'Not available' }}<button v-if="transaction.transactionId" type="button" class="btn btn-sm btn-icon btn-light ms-2" aria-label="Copy transaction reference" @click="copy"><i class="ki-outline ki-copy fs-3" aria-hidden="true"></i></button></dd><template v-if="transaction.beneficiary"><dt class="fw-normal text-gray-600 mb-2">{{ view.incoming ? 'Recipient recorded on receipt' : 'Recipient' }}</dt><dd class="fw-bold mb-6">{{ transaction.beneficiary.name }}</dd><dt class="fw-normal text-gray-600 mb-2">Bank / destination</dt><dd class="fw-bold text-break mb-6">{{ transaction.beneficiary.bank }}<br />{{ transaction.beneficiary.destinationAccount }}</dd></template><dt class="fw-normal text-gray-600 mb-2">Created</dt><dd class="fw-bold mb-6">{{ transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'Not available' }}</dd><template v-if="transaction.notes"><dt class="fw-normal text-gray-600 mb-2">Note</dt><dd class="text-break">{{ transaction.notes }}</dd></template></dl><p class="text-gray-600 lh-lg fs-7">{{ view.status === 'completed' ? 'This transaction is marked as completed.' : view.status === 'failed' ? 'This transaction failed. Check your balance and contact support before trying again.' : 'This transaction is not marked as completed. Check for updates before sending again.' }}</p><NuxtLink v-if="transaction.transactionId" :to="`/track/transaction?id=${encodeURIComponent(transaction.transactionId)}`" class="btn btn-primary w-100 mt-5">Open public receipt <span aria-hidden="true">↗</span></NuxtLink><p class="text-gray-600 fs-8 lh-lg mt-4">Anyone with the reference can open the public receipt. Share it only with the intended recipient.</p><NuxtLink to="/app/help" class="btn btn-light w-100 mt-3">Get help with this transaction</NuxtLink></template>
	</dialog>
</template>
