<script setup lang="ts">
	import type { AdminDetail } from '~/services/super.service';
	import type { LoginEvent } from '~/services/security.service';
	import { exactTime, timeAgo } from '~/utils/session-ui';
	const id = String(useRoute().params.id);
	const detail = ref<AdminDetail | null>(null);
	const events = ref<LoginEvent[]>([]);
	const nextBefore = ref<string | null>(null);
	const filter = ref<'' | 'login' | 'attempt_failed'>('');
	const loading = ref(true);
	const moreLoading = ref(false);
	const error = ref('');
	const historyError = ref('');
	const page = async (before?: string) => superService.adminLogins(id, { limit: 25, before, action: filter.value || undefined });
	const load = async () => {
		loading.value = true;
		error.value = '';
		try { [detail.value, { events: events.value, nextBefore: nextBefore.value }] = await Promise.all([superService.adminSessions(id), page()]); }
		catch (e) { error.value = (e as { status?: number }).status === 404 ? 'This administrator does not exist.' : 'We could not load this administrator. Please try again.'; }
		finally { loading.value = false; }
	};
	const reload = async () => {
		historyError.value = '';
		try { ({ events: events.value, nextBefore: nextBefore.value } = await page()); }
		catch { historyError.value = 'We could not load the sign-in history.'; }
	};
	const more = async () => {
		if (!nextBefore.value || moreLoading.value) return;
		moreLoading.value = true;
		historyError.value = '';
		try { const next = await page(nextBefore.value); events.value = [...events.value, ...next.events]; nextBefore.value = next.nextBefore; }
		catch { historyError.value = 'We could not load more.'; }
		finally { moreLoading.value = false; }
	};
	watch(filter, reload);
	onMounted(load);
</script>

<template>
	<div>
		<NuxtLink to="/super" class="d-inline-block mb-6 fw-semibold">← All administrators</NuxtLink>
		<AppLoadState :loading="loading && !detail" :error="error" :empty="!detail" title="Administrator unavailable" @retry="load">
			<template v-if="detail">
				<AppPageHeader :title="detail.admin.name || detail.admin.email" :description="detail.admin.email"><span class="badge fs-7" :class="detail.admin.status === 'ACTIVE' ? 'badge-light-success' : 'badge-light-warning'">{{ detail.admin.status }}</span><button type="button" class="btn btn-light" :disabled="loading" @click="load">Refresh</button></AppPageHeader>

				<section class="card border mb-7"><div class="card-header border-bottom"><h2 class="card-title fs-3 fw-bold">Devices</h2></div><div class="card-body">
					<p v-if="!detail.devices.length" class="text-gray-600 mb-0">This administrator has not signed in yet.</p>
					<AppSettingsDeviceList v-else :devices="detail.devices" detailed />
					<p v-if="detail.truncated" class="text-gray-600 fs-8 mt-5 mb-0">Grouped from the most recent sign-ins only; the full list is in the history below.</p>
				</div></section>

				<section class="card border mb-7"><div class="card-header border-bottom align-items-center flex-wrap gap-3"><h2 class="card-title fs-3 fw-bold">Sign-in history</h2><div><label for="history-filter" class="visually-hidden">Show</label><select id="history-filter" v-model="filter" class="form-select form-select-sm"><option value="">All events</option><option value="login">Successful sign-ins</option><option value="attempt_failed">Failed attempts</option></select></div></div><div class="card-body">
					<div v-if="historyError" role="alert" class="alert alert-warning">{{ historyError }}</div>
					<p v-if="!events.length" class="text-gray-600 mb-0">No events to show.</p>
					<div v-else>
						<div class="table-responsive d-none d-md-block"><table class="table admin-table"><thead><tr><th>Time</th><th>Result</th><th>Device</th><th>IP</th><th>Where</th></tr></thead><tbody>
							<tr v-for="event in events" :key="event.id"><td><span :title="exactTime(event.createdAt)">{{ exactTime(event.createdAt) }}</span><small class="d-block text-gray-600">{{ timeAgo(event.createdAt) }}</small></td><td><span class="badge" :class="event.action === 'attempt_failed' ? 'badge-light-danger' : 'badge-light-success'">{{ event.action === 'attempt_failed' ? 'Failed' : 'Signed in' }}</span><small v-if="event.reason" class="d-block text-gray-600">{{ event.reason }}</small></td><td>{{ event.device.label }}</td><td>{{ event.ip }}</td><td>{{ event.location || '—' }}</td></tr>
						</tbody></table></div>
						<div class="d-md-none"><article v-for="event in events" :key="event.id" class="py-5 border-bottom"><div class="d-flex flex-wrap justify-content-between gap-3 mb-2"><span class="badge" :class="event.action === 'attempt_failed' ? 'badge-light-danger' : 'badge-light-success'">{{ event.action === 'attempt_failed' ? 'Failed' : 'Signed in' }}</span><time :datetime="event.createdAt" class="fs-8 text-gray-600">{{ exactTime(event.createdAt) }}</time></div><strong class="d-block fs-7">{{ event.device.label }}</strong><span class="text-gray-600 fs-8">IP {{ event.ip }}<template v-if="event.location"> · {{ event.location }}</template></span></article></div>
						<div v-if="nextBefore" class="text-center mt-6"><button type="button" class="btn btn-light" :disabled="moreLoading" @click="more">{{ moreLoading ? 'Loading…' : 'Load more' }}</button></div>
					</div>
				</div></section>

				<section class="card border"><div class="card-body"><h2 class="fs-4 mb-2">Actions</h2><p class="text-gray-600 mb-0">What this administrator does (credits, edits, approvals) will be listed here in a later update.</p></div></section>
			</template>
		</AppLoadState>
	</div>
</template>
