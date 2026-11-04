<script setup lang="ts">
	import { filterActivity } from '~/utils/account-ui';
	useAccountPage('Activity');
	const { state, user, load } = useAccountWorkspace();
	const search = ref('');
	const direction = ref('all');
	const status = ref('all');
	const page = ref(1);
	const pageSize = 15;
	const filtered = computed(() => filterActivity(state.value.transactions, user.value.id, search.value, direction.value, status.value));
	const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
	const visible = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));
	watch([search, direction, status], () => { page.value = 1; });
	watch(pages, count => { if (page.value > count) page.value = count; });
	const reset = () => { search.value = ''; direction.value = 'all'; status.value = 'all'; };
</script>

<template>
	<div><AppPageHeader title="Activity" description="Find a payment, check its status, or open a receipt."><NuxtLink to="/app/transfer" class="btn btn-primary">New transfer <span aria-hidden="true">↗</span></NuxtLink></AppPageHeader>
		<section class="card border"><div class="card-body"><div class="row g-4 pb-7 border-bottom mb-2"><div class="col-lg-6"><label for="activity-search" class="form-label">Search activity</label><input id="activity-search" v-model="search" type="search" class="form-control" placeholder="Name, bank, account, or reference" /></div><div class="col-sm-6 col-lg-3"><label for="activity-direction" class="form-label">Direction</label><select id="activity-direction" v-model="direction" class="form-select"><option value="all">All activity</option><option value="incoming">Money in</option><option value="outgoing">Money out</option></select></div><div class="col-sm-6 col-lg-3"><label for="activity-status" class="form-label">Status</label><select id="activity-status" v-model="status" class="form-select"><option value="all">All statuses</option><option v-for="value in ['completed', 'pending', 'awaiting', 'processing', 'failed']" :key="value" :value="value">{{ value.charAt(0).toUpperCase() + value.slice(1) }}</option></select></div></div>
			<AppLoadState :loading="state.loading && !state.ready" :error="state.activityError" :empty="!filtered.length" :title="state.transactions.length ? 'No matching transactions' : 'No activity yet'" :description="state.transactions.length ? 'Try another search or clear the filters.' : 'Your recorded funding and transfers will appear here.'" @retry="load"><AppActivityList :transactions="visible" /></AppLoadState>
			<div class="d-flex flex-wrap justify-content-between align-items-center gap-4 mt-7"><span class="text-gray-600 fs-7" aria-live="polite">{{ filtered.length }} transactions · Page {{ page }} of {{ pages }}</span><div class="d-flex gap-3"><button v-if="search || direction !== 'all' || status !== 'all'" type="button" class="btn btn-sm btn-light" @click="reset">Clear filters</button><button type="button" class="btn btn-sm btn-light" :disabled="page === 1" @click="page--">Previous</button><button type="button" class="btn btn-sm btn-light" :disabled="page >= pages" @click="page++">Next</button></div></div>
		</div></section>
	</div>
</template>
