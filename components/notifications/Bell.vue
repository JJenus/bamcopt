<script setup lang="ts">
	import type { INotification } from "~/utils/interfaces/Notification";

	/** Bell + dropdown (latest notifications, "mark all as read", "view all"). Used by user and admin layouts. */
	const props = defineProps<{ base: "/app" | "/admin" }>();

	const notifications = useNotifications();
	const { unread, latest, loadingLatest } = notifications;

	const open = ref(false);
	const button = ref<HTMLElement | null>(null);
	const panel = ref<HTMLElement | null>(null);
	const style = ref<Record<string, string>>({});

	/** Anchor to the bell, but keep the panel fully on screen (side bars, phones, short screens). */
	const place = () => {
		if (!button.value) return;
		const r = button.value.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const m = 8;
		const phone = vw < 576;
		const width = phone ? vw - 2 * m : Math.min(380, vw - 2 * m);
		const s: Record<string, string> = { width: `${width}px` };

		const nearRightEdge = r.right > vw - 120;
		const nearLeftEdge = r.left < 120;
		if (!phone && vw >= 992 && (nearRightEdge || nearLeftEdge)) {
			// vertical side bar: open sideways, level with the bell
			s.left = `${nearRightEdge ? Math.max(m, r.left - width - m) : r.right + m}px`;
			const top = Math.min(Math.max(m, r.top - 8), Math.max(m, vh - 240));
			s.top = `${top}px`;
			s.maxHeight = `${Math.min(520, vh - top - m)}px`;
		} else {
			s.left = `${phone ? m : Math.min(Math.max(m, r.left + r.width / 2 - width / 2), vw - width - m)}px`;
			const below = vh - r.bottom - m;
			const above = r.top - m;
			if (below >= 320 || below >= above) {
				s.top = `${r.bottom + 6}px`;
				s.maxHeight = `${Math.min(520, below - 6)}px`;
			} else {
				s.bottom = `${vh - r.top + 6}px`;
				s.maxHeight = `${Math.min(520, above - 6)}px`;
			}
		}
		style.value = s;
	};

	const close = () => (open.value = false);

	const toggle = async () => {
		open.value = !open.value;
		if (!open.value) return;
		place();
		await notifications.loadLatest();
		await nextTick();
		place();
	};

	const openItem = async (n: INotification) => {
		close();
		notifications.markRead(n);
		await navigateTo(`${props.base}/notifications/${n.id}`);
	};

	const onPointerDown = (e: Event) => {
		if (!open.value) return;
		const t = e.target as Node;
		if (panel.value?.contains(t) || button.value?.contains(t)) return;
		close();
	};
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") close();
	};

	onMounted(() => {
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKey);
		window.addEventListener("resize", place);
	});
	onBeforeUnmount(() => {
		document.removeEventListener("pointerdown", onPointerDown);
		document.removeEventListener("keydown", onKey);
		window.removeEventListener("resize", place);
	});
	watch(() => useRoute().fullPath, close);
</script>

<template>
	<div>
		<button
			ref="button"
			type="button"
			class="btn btn-icon btn-custom btn-active-light-primary position-relative w-35px h-35px w-md-40px h-md-40px"
			:class="unread > 0 ? 'btn-color-primary btn-icon-primary' : 'btn-color-muted btn-icon-muted'"
			:aria-label="unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'"
			aria-haspopup="dialog"
			:aria-expanded="open"
			@click="toggle"
		>
			<i class="ki-outline fs-2x" :class="unread > 0 ? 'ki-notification-on' : 'ki-notification-bing'"></i>
			<span
				v-if="unread > 0"
				class="badge badge-circle badge-danger position-absolute fw-bold"
				style="top: 0; right: 0; min-width: 18px; height: 18px; font-size: 10px"
			>
				{{ unread > 9 ? "9+" : unread }}
			</span>
		</button>

		<ClientOnly>
			<Teleport to="body">
				<div v-if="open" ref="panel" class="notif-panel card shadow-lg border" :style="style" role="dialog" aria-label="Notifications">
					<div class="d-flex align-items-center justify-content-between px-5 py-4 border-bottom">
						<div class="d-flex align-items-center gap-2">
							<span class="fw-bold fs-4 text-gray-900">Notifications</span>
							<span v-if="unread > 0" class="badge badge-light-primary">{{ unread }} new</span>
						</div>
						<button type="button" class="btn btn-sm btn-link p-0" :disabled="unread === 0" @click="notifications.markAllRead()">
							Mark all as read
						</button>
					</div>

					<div class="notif-scroll">
						<div v-if="loadingLatest && !latest.length" class="p-8 text-center text-muted">Loading…</div>
						<div v-else-if="!latest.length" class="p-10 text-center text-muted">
							<i class="ki-outline ki-notification-bing fs-3x d-block mb-3"></i>
							You're all caught up
						</div>
						<NotificationsItem v-for="n in latest" :key="n.id" :notification="n" @open="openItem" />
					</div>

					<NuxtLink :to="`${base}/notifications`" class="d-block text-center fw-bold py-4 border-top" @click="close">
						View all notifications
					</NuxtLink>
				</div>
			</Teleport>
		</ClientOnly>
	</div>
</template>

<style scoped>
	.notif-panel {
		position: fixed;
		z-index: 1100;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.notif-scroll {
		overflow-y: auto;
		flex: 1 1 auto;
	}
</style>
