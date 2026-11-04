<script setup lang="ts">
	import { notificationMeta } from '~/utils/notification';
	const { messages, dismiss, push } = useToasts();
	const notifications = useNotifications();
	const user = userData().data;
	const auth = useAuth();
	const timers = new Map<number, ReturnType<typeof setTimeout>>();
	const stop = (id: number) => { clearTimeout(timers.get(id)); timers.delete(id); };
	const schedule = (id: number) => { stop(id); timers.set(id, setTimeout(() => dismiss(id), 6500)); };
	let poll: ReturnType<typeof setInterval> | undefined;
	const refresh = () => { if (document.visibilityState === 'visible' && auth.isAuthenticated.value) void notifications.refresh(); };
	onMounted(() => {
		watch(messages, list => {
			for (const id of timers.keys()) if (!list.some(item => item.id === id)) stop(id);
			for (const item of list) if (!timers.has(item.id)) schedule(item.id);
		}, { immediate: true });
		watch(() => user.value.id, () => { messages.value = []; refresh(); }, { immediate: true });
		watch(notifications.incoming, list => {
			for (const item of list) {
				const color = notificationMeta(item.type).color;
				const tone = color === 'success' ? 'success' : color === 'danger' ? 'danger' : color === 'warning' ? 'warning' : 'info';
				push(item.message, tone, { title: item.title, to: `${user.value.userType === 'admin' ? '/admin' : '/app'}/notifications/${item.id}` });
			}
			if (list.length) notifications.incoming.value = [];
		});
		poll = setInterval(refresh, 15000);
		document.addEventListener('visibilitychange', refresh);
	});
	onUnmounted(() => { timers.forEach(clearTimeout); timers.clear(); clearInterval(poll); document.removeEventListener('visibilitychange', refresh); });
</script>

<template>
	<div class="ui-toast-stack" aria-live="polite" aria-relevant="additions"><TransitionGroup name="ui-toast"><div v-for="item in messages" :key="item.id" class="ui-toast card shadow border" :role="item.tone === 'danger' ? 'alert' : 'status'" @mouseenter="stop(item.id)" @mouseleave="schedule(item.id)" @focusin="stop(item.id)" @focusout="schedule(item.id)"><div class="card-body d-flex align-items-start gap-4 p-5"><i :class="['ki-outline fs-2 mt-1', `text-${item.tone}`, item.tone === 'success' ? 'ki-check-circle' : item.tone === 'danger' ? 'ki-cross-circle' : 'ki-information-5']" aria-hidden="true"></i><div class="flex-grow-1" style="min-width: 0"><strong v-if="item.title" class="text-gray-900 d-block mb-2">{{ item.title }}</strong><p class="mb-0 text-gray-900 lh-lg text-break">{{ item.message }}</p><NuxtLink v-if="item.to" :to="item.to" class="fw-bold d-inline-block mt-3" @click="dismiss(item.id)">View notification <span aria-hidden="true">↗</span></NuxtLink></div><button type="button" class="btn btn-sm btn-icon btn-light flex-shrink-0" aria-label="Dismiss notification" @click="dismiss(item.id)"><i class="ki-outline ki-cross fs-3" aria-hidden="true"></i></button></div></div></TransitionGroup></div>
</template>

<style scoped>
.ui-toast-stack { position: fixed; right: 24px; bottom: 24px; z-index: 1100; display: grid; gap: 12px; width: min(420px, calc(100vw - 32px)); pointer-events: none; }
.ui-toast { pointer-events: auto; background: var(--bs-body-bg); }
.ui-toast-enter-active, .ui-toast-leave-active { transition: opacity .18s, transform .18s; }
.ui-toast-enter-from, .ui-toast-leave-to { opacity: 0; transform: translateY(12px); }
@media (max-width: 991.98px) { .ui-toast-stack { right: 16px; bottom: calc(84px + env(safe-area-inset-bottom)); } }
@media (prefers-reduced-motion: reduce) { .ui-toast-enter-active, .ui-toast-leave-active { transition: none; } }
</style>
