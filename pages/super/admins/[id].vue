<script setup lang="ts">
	import type { AdminAction, AdminDetail } from '~/services/super.service';
	import type { DeviceSession, LoginEvent } from '~/services/security.service';
	import { exactTime, timeAgo } from '~/utils/session-ui';
	const id = String(useRoute().params.id);
	const detail = ref<AdminDetail | null>(null);
	const events = ref<LoginEvent[]>([]);
	const nextBefore = ref<string | null>(null);
	const filter = ref<'' | 'login' | 'attempt_failed' | 'logout'>('');
	const actions = ref<AdminAction[]>([]);
	const actionsNext = ref<string | null>(null);
	const area = ref('');
	const actionsError = ref('');
	const actionsMore = ref(false);
	const areas = [{ value: '', label: 'All actions' }, { value: 'account', label: 'Balances' }, { value: 'deposit', label: 'Deposits' }, { value: 'transaction', label: 'Transactions' }, { value: 'user', label: 'Users' }, { value: 'funding', label: 'Funding accounts' }, { value: 'notification', label: 'Notifications' }, { value: 'settings', label: 'Settings' }];
	const actionPage = async (before?: string) => superService.adminActions(id, { limit: 25, before, area: area.value || undefined });
	const busy = ref('');
	const notice = ref('');
	const loading = ref(true);
	const moreLoading = ref(false);
	const error = ref('');
	const historyError = ref('');
	const page = async (before?: string) => superService.adminLogins(id, { limit: 25, before, action: filter.value || undefined });
	const load = async () => {
		loading.value = true;
		error.value = '';
		try { const [d, h, a] = await Promise.all([superService.adminSessions(id), page(), actionPage()]); detail.value = d; ({ events: events.value, nextBefore: nextBefore.value } = h); ({ actions: actions.value, nextBefore: actionsNext.value } = a); }
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
	const reloadActions = async () => {
		actionsError.value = '';
		try { ({ actions: actions.value, nextBefore: actionsNext.value } = await actionPage()); }
		catch { actionsError.value = 'We could not load the actions.'; }
	};
	const moreActions = async () => {
		if (!actionsNext.value || actionsMore.value) return;
		actionsMore.value = true;
		actionsError.value = '';
		try { const next = await actionPage(actionsNext.value); actions.value = [...actions.value, ...next.actions]; actionsNext.value = next.nextBefore; }
		catch { actionsError.value = 'We could not load more.'; }
		finally { actionsMore.value = false; }
	};
	const signOut = async (scope: { deviceKey: string } | { all: true }, key: string, message: string) => {
		if (busy.value || !window.confirm(message)) return;
		busy.value = key;
		notice.value = '';
		try {
			const { revoked } = await securityService.revoke(id, scope);
			notice.value = revoked ? `Signed out ${revoked} session${revoked === 1 ? '' : 's'}. They end on the administrator's next request.` : 'Nothing to sign out.';
			await load();
		} catch { error.value = ''; historyError.value = 'We could not sign out. Please try again.'; }
		finally { busy.value = ''; }
	};
	const suspended = computed(() => detail.value?.admin.status?.toUpperCase() === 'SUSPENDED');
	const toggleSuspension = async () => {
		if (busy.value || !detail.value) return;
		const next = suspended.value ? 'ACTIVE' : 'SUSPENDED';
		if (!window.confirm(next === 'SUSPENDED' ? 'Suspend this administrator? They are signed out everywhere and cannot sign in until you restore them.' : 'Restore this administrator? They can sign in again.')) return;
		busy.value = 'status';
		notice.value = '';
		try {
			const { sessionsEnded } = await superService.setAdminStatus(id, next);
			notice.value = next === 'SUSPENDED' ? `Suspended. ${sessionsEnded} session${sessionsEnded === 1 ? '' : 's'} ended.` : 'Restored. They can sign in again.';
			await load();
		} catch { historyError.value = 'We could not change the status. Please try again.'; }
		finally { busy.value = ''; }
	};
	const signOutDevice = (device: DeviceSession) => signOut({ deviceKey: device.key }, device.key, `Sign out ${device.label} for this administrator?`);
	const signOutEverywhere = () => signOut({ all: true }, 'all', 'Sign this administrator out of every device? They can sign in again with their password.');
	watch(filter, reload);
	watch(area, reloadActions);
	onMounted(load);
</script>

<template>
	<div>
		<NuxtLink to="/super" class="d-inline-block mb-6 fw-semibold">← All administrators</NuxtLink>
		<AppLoadState :loading="loading && !detail" :error="error" :empty="!detail" title="Administrator unavailable" @retry="load">
			<template v-if="detail">
				<AppPageHeader :title="detail.admin.name || detail.admin.email" :description="detail.admin.email"><span class="badge fs-7" :class="detail.admin.status === 'ACTIVE' ? 'badge-light-success' : suspended ? 'badge-light-danger' : 'badge-light-warning'">{{ detail.admin.status }}</span><button type="button" class="btn" :class="suspended ? 'btn-light-success' : 'btn-light-danger'" :disabled="!!busy" @click="toggleSuspension">{{ busy === 'status' ? 'Working…' : suspended ? 'Restore administrator' : 'Suspend administrator' }}</button><button type="button" class="btn btn-light" :disabled="loading" @click="load">Refresh</button></AppPageHeader>

				<section class="card border mb-7"><div class="card-header border-bottom align-items-center"><h2 class="card-title fs-3 fw-bold">Devices</h2><button v-if="detail.activeSessions" type="button" class="btn btn-sm btn-light-danger" :disabled="!!busy" @click="signOutEverywhere">{{ busy === 'all' ? 'Signing out…' : `Sign out everywhere (${detail.activeSessions})` }}</button></div><div class="card-body">
					<div v-if="notice" role="status" class="alert alert-success">{{ notice }}</div>
					<p v-if="!detail.devices.length" class="text-gray-600 mb-0">This administrator has not signed in yet.</p>
					<AppSettingsDeviceList v-else :devices="detail.devices" detailed can-revoke :busy-key="busy" @revoke="signOutDevice" />
					<p v-if="detail.truncated" class="text-gray-600 fs-8 mt-5 mb-0">Grouped from the most recent sign-ins only; the full list is in the history below.</p>
				</div></section>

				<section class="card border mb-7"><div class="card-header border-bottom align-items-center flex-wrap gap-3"><h2 class="card-title fs-3 fw-bold">Sign-in history</h2><div><label for="history-filter" class="visually-hidden">Show</label><select id="history-filter" v-model="filter" class="form-select form-select-sm"><option value="">All events</option><option value="login">Successful sign-ins</option><option value="attempt_failed">Failed attempts</option><option value="logout">Sign-outs</option></select></div></div><div class="card-body">
					<div v-if="historyError" role="alert" class="alert alert-warning">{{ historyError }}</div>
					<p v-if="!events.length" class="text-gray-600 mb-0">No events to show.</p>
					<div v-else>
						<div class="table-responsive d-none d-md-block"><table class="table admin-table"><thead><tr><th>Time</th><th>Result</th><th>Device</th><th>IP</th><th>Where</th></tr></thead><tbody>
							<tr v-for="event in events" :key="event.id"><td><span :title="exactTime(event.createdAt)">{{ exactTime(event.createdAt) }}</span><small class="d-block text-gray-600">{{ timeAgo(event.createdAt) }}</small></td><td><span class="badge" :class="event.action === 'attempt_failed' ? 'badge-light-danger' : event.action === 'logout' ? 'badge-light-warning' : 'badge-light-success'">{{ event.action === 'attempt_failed' ? 'Failed' : event.action === 'logout' ? 'Signed out' : 'Signed in' }}</span><small v-if="event.reason" class="d-block text-gray-600">{{ event.reason }}</small></td><td>{{ event.device.label }}</td><td>{{ event.ip }}</td><td>{{ event.location || '—' }}</td></tr>
						</tbody></table></div>
						<div class="d-md-none"><article v-for="event in events" :key="event.id" class="py-5 border-bottom"><div class="d-flex flex-wrap justify-content-between gap-3 mb-2"><span class="badge" :class="event.action === 'attempt_failed' ? 'badge-light-danger' : event.action === 'logout' ? 'badge-light-warning' : 'badge-light-success'">{{ event.action === 'attempt_failed' ? 'Failed' : event.action === 'logout' ? 'Signed out' : 'Signed in' }}</span><time :datetime="event.createdAt" class="fs-8 text-gray-600">{{ exactTime(event.createdAt) }}</time></div><strong class="d-block fs-7">{{ event.device.label }}</strong><span class="text-gray-600 fs-8">IP {{ event.ip }}<template v-if="event.location"> · {{ event.location }}</template></span></article></div>
						<div v-if="nextBefore" class="text-center mt-6"><button type="button" class="btn btn-light" :disabled="moreLoading" @click="more">{{ moreLoading ? 'Loading…' : 'Load more' }}</button></div>
					</div>
				</div></section>

				<section class="card border"><div class="card-header border-bottom align-items-center flex-wrap gap-3"><h2 class="card-title fs-3 fw-bold">Actions</h2><div><label for="actions-area" class="visually-hidden">Show</label><select id="actions-area" v-model="area" class="form-select form-select-sm"><option v-for="item in areas" :key="item.value" :value="item.value">{{ item.label }}</option></select></div></div><div class="card-body">
					<div v-if="actionsError" role="alert" class="alert alert-warning">{{ actionsError }}</div>
					<p v-if="!actions.length" class="text-gray-600 mb-0">No recorded actions{{ area ? ' in this area' : ' yet' }}.</p>
					<div v-else>
						<article v-for="entry in actions" :key="entry.id" class="py-5 border-bottom"><div class="d-flex flex-wrap justify-content-between gap-3 mb-2"><span class="badge badge-light-primary">{{ entry.action }}</span><time :datetime="entry.createdAt" class="fs-8 text-gray-600" :title="timeAgo(entry.createdAt)">{{ exactTime(entry.createdAt) }}</time></div><p class="text-gray-900 mb-1 text-break">{{ entry.summary }}</p><span class="text-gray-600 fs-8">IP {{ entry.ip }}</span></article>
						<div v-if="actionsNext" class="text-center mt-6"><button type="button" class="btn btn-light" :disabled="actionsMore" @click="moreActions">{{ actionsMore ? 'Loading…' : 'Load more' }}</button></div>
					</div>
				</div></section>
			</template>
		</AppLoadState>
	</div>
</template>
