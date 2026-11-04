<script setup lang="ts">
	import { formatMessageTime } from "~/utils/date";
	import type { INotification } from "~/utils/interfaces/Notification";
	import { notificationMeta } from "~/utils/notification";

	/** Polls the unread count and pops a toast for new notifications. Click opens the notification. */
	const notifications = useNotifications();
	const base = computed(() => (userData().data.value.userType === "admin" ? "/admin" : "/app"));

	const MAX_VISIBLE = 3;
	const VISIBLE_MS = 7000;
	const toasts = ref<INotification[]>([]);
	const timers = new Map<string, ReturnType<typeof setTimeout>>();

	const dismiss = (id: string) => {
		clearTimeout(timers.get(id));
		timers.delete(id);
		toasts.value = toasts.value.filter((t: INotification) => t.id !== id);
	};

	const open = async (n: INotification) => {
		dismiss(n.id);
		notifications.markRead(n);
		await navigateTo(`${base.value}/notifications/${n.id}`);
	};

	watch(notifications.incoming, (list: INotification[]) => {
		if (!list.length) return;
		for (const n of list) {
			toasts.value = [...toasts.value.filter((t: INotification) => t.id !== n.id), n].slice(-MAX_VISIBLE);
			timers.set(n.id, setTimeout(() => dismiss(n.id), VISIBLE_MS));
		}
		notifications.incoming.value = [];
	});

	let poll: ReturnType<typeof setInterval> | undefined;
	const onVisible = () => document.visibilityState === "visible" && useAuth().isAuthenticated.value && notifications.refresh();

	onMounted(() => {
		notifications.refresh();
		poll = setInterval(() => {
			if (useAuth().isAuthenticated.value) notifications.refresh();
			else clearInterval(poll);
		}, 15000);
		document.addEventListener("visibilitychange", onVisible);
	});

	onUnmounted(() => {
		if (poll) clearInterval(poll);
		document.removeEventListener("visibilitychange", onVisible);
		timers.forEach(clearTimeout);
	});
</script>

<template>
	<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1090">
		<TransitionGroup name="toast-slide">
			<div
				v-for="t in toasts"
				:key="t.id"
				class="toast show mb-3"
				role="alert"
				aria-live="assertive"
				style="cursor: pointer"
				@click="open(t)"
			>
				<div class="toast-header">
					<i class="ki-outline fs-2 me-3" :class="[notificationMeta(t.type).icon, `text-${notificationMeta(t.type).color}`]"></i>
					<strong class="me-auto">{{ t.title }}</strong>
					<small>{{ formatMessageTime(t.createdAt) }}</small>
					<button type="button" class="btn-close ms-2" aria-label="Close" @click.stop="dismiss(t.id)"></button>
				</div>
				<div class="toast-body">{{ t.message }}</div>
			</div>
		</TransitionGroup>
	</div>
</template>

<style scoped>
	.toast-slide-enter-active,
	.toast-slide-leave-active {
		transition: all 0.25s ease;
	}
	.toast-slide-enter-from,
	.toast-slide-leave-to {
		opacity: 0;
		transform: translateX(24px);
	}
</style>
