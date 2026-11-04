<script setup lang="ts">
	import type { Transaction } from '~/utils/interfaces/Transaction';
	import { transactionPresentation } from '~/utils/account-ui';
	const props = defineProps<{ transactions: Transaction[]; limit?: number }>();
	const { user } = useAccountWorkspace();
	const { money } = useAccountMoney();
	const selected = ref<Transaction | null>(null);
	const visible = computed(() => props.limit ? props.transactions.slice(0, props.limit) : props.transactions);
	const view = (tx: Transaction) => transactionPresentation(tx, user.value.id);
	const date = (value?: string | null) => {
		if (!value || Number.isNaN(new Date(value).getTime())) return 'Date unavailable';
		return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
	};
</script>

<template>
	<div><button v-for="tx in visible" :key="tx.id || tx.transactionId" type="button" class="account-activity-row d-flex align-items-center gap-4" :aria-label="`${view(tx).label}, ${view(tx).status}, ${money(tx.amount)}. View details`" @click="selected = tx"><span class="symbol symbol-45px flex-shrink-0"><span class="symbol-label bg-light rounded-circle"><i :class="['ki-outline fs-2', view(tx).incoming ? 'ki-arrow-down-left' : 'ki-arrow-up-right', `text-${view(tx).tone}`]" aria-hidden="true"></i></span></span><span class="flex-grow-1" style="min-width: 0"><span class="fw-bold text-gray-900 d-block text-truncate">{{ view(tx).label }}</span><span class="fs-8 text-gray-600 d-block mt-2">{{ date(tx.createdAt) }}<span class="d-none d-sm-inline"> · {{ tx.beneficiary?.bank || 'Account activity' }}</span></span></span><span class="text-end flex-shrink-0"><span class="d-block fw-bold text-gray-900 mb-2">{{ view(tx).incoming ? '+' : '−' }}{{ money(tx.amount) }}</span><span :class="['badge text-capitalize', `badge-light-${view(tx).tone}`]">{{ view(tx).status }}</span></span><i class="ki-outline ki-right fs-4 text-gray-600 d-none d-sm-block" aria-hidden="true"></i></button><AppTransactionDetails :transaction="selected" @close="selected = null" /></div>
</template>
