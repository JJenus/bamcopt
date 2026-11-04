<script setup lang="ts">
	import type { IUser } from '~/utils/interfaces/IUser';
	import type { Transaction } from '~/utils/interfaces/Transaction';
	import { adminMoney } from '~/utils/admin-ui';
	definePageMeta({ key: route => route.fullPath });
	const id = String(useRoute().params.id);
	const person = ref<IUser | null>(null);
	const transactions = ref<Transaction[]>([]);
	const loading = ref(true);
	const error = ref('');
	const activityError = ref('');
	const search = ref('');
	const status = ref('');
	const tab = ref('profile');
	const load = async () => {
		loading.value = true; error.value = ''; activityError.value = '';
		const [profile, activity] = await Promise.allSettled([userService.get(id), transactionService.listForUser(id)]);
		if (profile.status === 'fulfilled') person.value = profile.value; else error.value = 'Unable to load this user. Check the link or try again.';
		if (activity.status === 'fulfilled') transactions.value = activity.value; else activityError.value = 'Unable to load recent transactions.';
		loading.value = false;
	};
	const shown = computed(() => transactions.value.filter(tx => (!status.value || tx.status === status.value) && [tx.transactionId, tx.notes, tx.beneficiary?.name, tx.status, tx.type].some(value => String(value || '').toLowerCase().includes(search.value.toLowerCase()))));
	onMounted(load);
</script>
<template><div><NuxtLink to="/admin/users" class="d-inline-block mb-6 fw-semibold">← All users</NuxtLink><AppPageHeader title="User workspace" description="Review account details and activity before making changes."><button type="button" class="btn btn-light" :disabled="loading" @click="load">Refresh</button></AppPageHeader><AppLoadState :loading="loading && !person" :error="error" :empty="!person" title="User unavailable" @retry="load"><template v-if="person"><section class="card border mb-7"><div class="card-body d-flex flex-wrap align-items-center gap-6"><AppAvatar :src="person.imgUrl" :name="person.name || ''" :email="person.email || ''" :size="72" /><div class="flex-grow-1 admin-identity"><h2 class="fs-2 text-break mb-2">{{ person.name || person.email }}</h2><p class="text-gray-600 text-break mb-3">{{ person.email }}</p><span class="badge badge-light-primary me-3">{{ person.userType }}</span><span class="badge badge-light-warning">{{ person.status || 'Unknown status' }}</span></div><div v-if="person.account" class="text-lg-end"><span class="text-gray-600 fs-8 d-block mb-2">Customer balance · account units</span><strong class="fs-2">{{ adminMoney(person.account.amount) }}</strong><span class="text-gray-600 fs-8 d-block mt-2">Account {{ person.account.accountNumber }} · {{ person.account.status }}</span></div><NuxtLink v-if="person.account" :to="{ path: '/admin/top-up', query: { email: person.email } }" class="btn btn-light-primary">Credit account</NuxtLink></div></section><div class="d-flex flex-wrap gap-3 mb-7" role="group" aria-label="User workspace sections"><button v-for="item in [{ key: 'profile', label: 'Profile & controls' }, { key: 'activity', label: 'Transactions' }, { key: 'notify', label: 'Send notification' }]" :key="item.key" type="button" class="btn" :class="tab === item.key ? 'btn-primary' : 'btn-light'" :aria-pressed="tab === item.key" @click="tab = item.key">{{ item.label }}</button></div><AdminUserControls v-if="tab === 'profile'" :user="person" @saved="load" /><AdminUserNotify v-else-if="tab === 'notify'" :user="person" /><section v-else class="card border"><div class="card-body"><h2 class="fs-3 mb-3">Recent transactions</h2><p class="text-gray-600 fs-7 mb-6">Latest records returned by the API, not the full historical ledger.</p><div class="row g-4 mb-6"><div class="col-sm-8"><label for="user-tx-search" class="form-label">Search activity</label><input id="user-tx-search" v-model="search" class="form-control" type="search" /></div><div class="col-sm-4"><label for="user-tx-status" class="form-label">Status</label><select id="user-tx-status" v-model="status" class="form-select"><option value="">All statuses</option><option>completed</option><option>awaiting</option><option>processing</option><option>pending</option><option>failed</option></select></div></div><AppLoadState :loading="loading" :error="activityError" :empty="!shown.length" title="No matching activity" @retry="load"><NuxtLink v-for="tx in shown" :key="String(tx.id)" :to="`/admin/transaction/${tx.id}`" class="admin-row d-flex justify-content-between gap-4 py-5 border-bottom"><span><strong class="d-block text-gray-900">{{ tx.beneficiary?.name || (tx.type === 'credit' ? 'Deposit / refund' : 'Transfer') }}</strong><span class="text-gray-600 fs-8 text-break">{{ tx.transactionId }} · {{ tx.status }}</span></span><strong class="text-gray-900">{{ adminMoney(tx.amount) }}</strong></NuxtLink></AppLoadState></div></section></template></AppLoadState></div></template>
