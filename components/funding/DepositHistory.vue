<script setup lang="ts">
	import type { DepositRequest } from '~/utils/interfaces/DepositRequest';
	import { adminMoney } from '~/utils/admin-ui';
	const props = defineProps<{ version?: number }>();
	const route = useRoute();
	const linked = ref<DepositRequest | null>(null);
	const items = ref<DepositRequest[]>([]); const total = ref(0); const loading = ref(false); const error = ref('');
	const visible = computed(() => linked.value && !items.value.some(item => item.id === linked.value?.id) ? [linked.value, ...items.value] : items.value);
	const load = async (more = false) => {
		if (loading.value) return;
		loading.value = true; error.value = '';
		try { const page = await depositService.list({ limit: 20, offset: more ? items.value.length : 0 }); items.value = more ? [...items.value, ...page.items] : page.items; total.value = page.total; const id = String(route.query.request || ''); linked.value = id ? items.value.find(item => item.id === id) || await depositService.get(id) : null; }
		catch { error.value = 'Unable to load your deposit requests.'; }
		finally { loading.value = false; }
	};
	watch([() => props.version, () => route.query.request], () => load()); onMounted(() => load());
</script>
<template>
	<section class="card border"><div class="card-header align-items-center"><h2 class="card-title fs-3">Your deposit requests</h2><button type="button" class="btn btn-sm btn-light" :disabled="loading" @click="load()">Refresh requests</button></div>
		<div class="card-body"><p v-if="error" role="alert" class="alert alert-warning">{{ error }}</p><p v-if="loading && !items.length" role="status">Loading requests…</p><p v-else-if="!visible.length && !error" class="text-gray-600">No deposit requests yet. Submitting a request does not credit your balance until approval.</p>
			<article v-for="item in visible" :key="item.id" class="py-5 border-bottom" :class="{ 'border-primary': item.id === route.query.request }">
				<div class="d-flex justify-content-between gap-4 mb-3"><h3 class="fs-5 mb-0">{{ adminMoney(item.amount, item.currency) }}</h3><span class="badge text-capitalize" :class="item.status === 'approved' ? 'badge-light-success' : item.status === 'rejected' ? 'badge-light-danger' : 'badge-light-warning'">{{ item.status }}</span></div>
				<p class="text-gray-600 fs-8 text-break mb-2">Request {{ item.id }}</p><p class="text-gray-600 fs-7 mb-2">{{ item.fundingSnapshot.label }} · {{ new Date(item.createdAt).toLocaleString() }}</p><p v-if="item.reference" class="text-gray-600 fs-7 text-break mb-2">Payment reference: {{ item.reference }}</p><p v-if="item.decisionNote" class="mb-3 text-break">{{ item.decisionNote }}</p><NuxtLink v-if="item.transactionId" :to="`/app/transaction/${item.transactionId}`" class="fw-semibold fs-7">View credited transaction</NuxtLink>
			</article>
			<button v-if="items.length < total" type="button" class="btn btn-light-primary mt-5" :disabled="loading" @click="load(true)">{{ loading ? 'Loading…' : 'Load more requests' }}</button>
		</div>
	</section>
</template>
