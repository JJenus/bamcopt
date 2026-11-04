<script setup lang="ts">
	import { type INotification, type NotificationGroup } from '~/utils/interfaces/Notification';
	const props = defineProps<{ base: '/app' | '/admin' }>();
	const bell = useNotifications();
	const tab = ref<'all' | 'unread'>('all');
	const group = ref<NotificationGroup | ''>('');
	const items = ref<INotification[]>([]);
	const total = ref(0);
	const loading = ref(false);
	const loadingMore = ref(false);
	const failed = ref(false);
	let generation = 0;
	const groups: { value: NotificationGroup | ''; label: string }[] = [{ value: '', label: 'All types' }, { value: 'transfers', label: 'Transfers' }, { value: 'account', label: 'Account' }, { value: 'system', label: 'System' }];
	const load = async (more = false) => {
		const id = userData().data.value.id;
		if (!id || (more && loadingMore.value)) return;
		const request = ++generation;
		more ? loadingMore.value = true : loading.value = true;
		failed.value = false;
		try {
			const page = await notificationService.list(id, { status: tab.value === 'unread' ? 'unread' : undefined, group: group.value || undefined, limit: 20, offset: more ? items.value.length : 0 });
			if (request !== generation || userData().data.value.id !== id) return;
			items.value = more ? [...items.value, ...page.items] : page.items;
			total.value = page.total;
			bell.unread.value = page.unread;
		} catch { if (request === generation) failed.value = true; }
		finally { if (request === generation) { loading.value = false; loadingMore.value = false; } }
	};
	const open = async (item: INotification) => { await bell.markRead(item); await navigateTo(`${props.base}/notifications/${item.id}`); };
	const markAll = async () => {
		if (!await bell.markAllRead()) return;
		await load();
		successAlert('Notifications marked as read.');
	};
	watch([tab, group], () => load());
	onMounted(() => load());
	onUnmounted(() => { generation++; });
</script>

<template>
	<div>
		<AppPageHeader v-if="base === '/app'" title="Notifications" description="Your account updates, with the details that matter." />
		<section class="card border mb-7">
			<div class="card-header align-items-center flex-wrap gap-4 border-bottom"><h1 v-if="base === '/admin'" class="card-title fw-bold">Notifications</h1><h2 v-else class="card-title fs-5 fw-semibold">{{ bell.unread.value }} unread</h2><button type="button" class="btn btn-sm btn-light-primary" :disabled="!bell.unread.value || bell.marking.value" @click="markAll">{{ bell.marking.value ? 'Updating…' : 'Mark all as read' }}</button></div>
			<div class="card-body p-0">
				<p v-if="bell.actionError.value" role="alert" class="alert alert-danger m-6">{{ bell.actionError.value }}</p>
				<div class="d-flex flex-wrap align-items-center justify-content-between gap-5 p-6 border-bottom"><div class="btn-group" role="group" aria-label="Read status"><button type="button" class="btn btn-sm" :class="tab === 'all' ? 'btn-primary' : 'btn-light'" :aria-pressed="tab === 'all'" @click="tab = 'all'">All</button><button type="button" class="btn btn-sm" :class="tab === 'unread' ? 'btn-primary' : 'btn-light'" :aria-pressed="tab === 'unread'" @click="tab = 'unread'">Unread</button></div><div class="btn-group" role="group" aria-label="Filter by type"><button v-for="item in groups" :key="item.value" type="button" class="btn btn-sm" :class="group === item.value ? 'btn-primary' : 'btn-light'" :aria-pressed="group === item.value" @click="group = item.value">{{ item.label }}</button></div></div>
				<div v-if="loading" class="text-center py-12 text-gray-600" role="status">Loading notifications…</div>
				<div v-else-if="failed" class="text-center py-12"><p role="alert" class="text-gray-600">Could not load notifications.</p><button type="button" class="btn btn-sm btn-light-primary" @click="load()">Try again</button></div>
				<div v-else-if="!items.length" class="text-center py-12 text-gray-600"><i class="ki-outline ki-notification-bing fs-3x d-block mb-4" aria-hidden="true"></i>{{ tab === 'unread' ? 'No unread notifications' : 'No notifications yet' }}</div>
				<template v-else><NotificationsItem v-for="item in items" :key="item.id" :notification="item" @open="open" /><div class="d-flex flex-column align-items-center gap-4 p-6"><span class="text-gray-600 fs-7" aria-live="polite">Showing {{ items.length }} of {{ total }}</span><button v-if="items.length < total" type="button" class="btn btn-sm btn-light-primary" :disabled="loadingMore" @click="load(true)">{{ loadingMore ? 'Loading…' : 'Load more' }}</button></div></template>
			</div>
		</section>
	</div>
</template>
