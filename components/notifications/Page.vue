<script setup lang="ts">
	import { type INotification, type NotificationGroup, NotificationStatus } from "~/utils/interfaces/Notification";

	/** Full list: tabs (all / unread), type filter, load more. Used by /app/notifications and /admin/notifications. */
	const props = defineProps<{ base: "/app" | "/admin" }>();

	const PAGE_SIZE = 20;
	const bell = useNotifications();

	const tab = ref<"all" | "unread">("all");
	const group = ref<NotificationGroup | "">("");
	const items = ref<INotification[]>([]);
	const total = ref(0);
	const loading = ref(false);
	const loadingMore = ref(false);
	const failed = ref(false);

	const groups: { value: NotificationGroup | ""; label: string }[] = [
		{ value: "", label: "All types" },
		{ value: "transfers", label: "Transfers" },
		{ value: "account", label: "Account" },
		{ value: "system", label: "System" },
	];

	const load = async (more = false) => {
		const userId = userData().data.value.id;
		if (!userId) return;
		more ? (loadingMore.value = true) : (loading.value = true);
		failed.value = false;
		try {
			const page = await notificationService.list(userId, {
				status: tab.value === "unread" ? "unread" : undefined,
				group: group.value || undefined,
				limit: PAGE_SIZE,
				offset: more ? items.value.length : 0,
			});
			items.value = more ? [...items.value, ...page.items] : page.items;
			total.value = page.total;
			bell.unread.value = page.unread;
		} catch {
			failed.value = true;
		} finally {
			loading.value = false;
			loadingMore.value = false;
		}
	};

	const open = async (n: INotification) => {
		await bell.markRead(n);
		await navigateTo(`${props.base}/notifications/${n.id}`);
	};

	const markAll = async () => {
		await bell.markAllRead();
		items.value = tab.value === "unread" ? [] : items.value.map((n: INotification) => ({ ...n, status: NotificationStatus.READ }));
		total.value = tab.value === "unread" ? 0 : total.value;
	};

	watch([tab, group], () => load());
	onMounted(() => load());
</script>

<template>
	<div class="card card-custom border-0 min-h-500px mb-5 mb-lg-10">
		<div class="card-header border-0 pt-6 flex-wrap gap-3">
			<h1 class="card-title fw-bold m-0">Notifications</h1>
			<div class="card-toolbar">
				<button type="button" class="btn btn-sm btn-light-primary" :disabled="bell.unread.value === 0" @click="markAll">
					<i class="ki-outline ki-check-circle fs-4"></i> Mark all as read
				</button>
			</div>
		</div>

		<div class="card-body pt-2 px-0">
			<div class="d-flex flex-wrap align-items-center justify-content-between gap-3 px-6 mb-4">
				<ul class="nav nav-pills nav-pills-custom" role="tablist">
					<li class="nav-item">
						<a role="tab" class="nav-link btn btn-sm btn-active-light-primary py-2 px-4" :class="{ active: tab === 'all' }" href="#" @click.prevent="tab = 'all'">All</a>
					</li>
					<li class="nav-item">
						<a role="tab" class="nav-link btn btn-sm btn-active-light-primary py-2 px-4" :class="{ active: tab === 'unread' }" href="#" @click.prevent="tab = 'unread'">
							Unread
							<span v-if="bell.unread.value > 0" class="badge badge-circle badge-primary ms-2">{{ bell.unread.value }}</span>
						</a>
					</li>
				</ul>

				<div class="btn-group" role="group" aria-label="Filter by type">
					<button
						v-for="g in groups"
						:key="g.value"
						type="button"
						class="btn btn-sm"
						:class="group === g.value ? 'btn-primary' : 'btn-light'"
						@click="group = g.value"
					>
						{{ g.label }}
					</button>
				</div>
			</div>

			<div v-if="loading" class="text-center text-muted py-15">Loading…</div>
			<div v-else-if="failed" class="text-center py-15">
				<div class="text-muted mb-4">Could not load notifications.</div>
				<button type="button" class="btn btn-sm btn-light-primary" @click="load()">Try again</button>
			</div>
			<div v-else-if="!items.length" class="text-center text-muted py-15">
				<i class="ki-outline ki-notification-bing fs-3x d-block mb-3"></i>
				{{ tab === "unread" ? "No unread notifications" : "No notifications yet" }}
			</div>
			<template v-else>
				<NotificationsItem v-for="n in items" :key="n.id" :notification="n" @open="open" />
				<div class="d-flex flex-column align-items-center gap-2 pt-6">
					<span class="text-muted fs-7">Showing {{ items.length }} of {{ total }}</span>
					<button v-if="items.length < total" type="button" class="btn btn-sm btn-light-primary" :disabled="loadingMore" @click="load(true)">
						{{ loadingMore ? "Loading…" : "Load more" }}
					</button>
				</div>
			</template>
		</div>
	</div>
</template>
