<script setup lang="ts">
	import { formatLongDateTime } from "~/utils/date";
	import type { INotification } from "~/utils/interfaces/Notification";
	import { notificationMeta, notificationTarget } from "~/utils/notification";

	const props = defineProps<{ base: "/app" | "/admin"; id: string }>();

	const bell = useNotifications();
	const notification = ref<INotification | null>(null);
	const loading = ref(true);
	const notFound = ref(false);

	const meta = computed(() => notificationMeta(notification.value?.type ?? ""));
	const target = computed(() => (notification.value ? notificationTarget(notification.value, props.base) : null));

	onMounted(async () => {
		try {
			notification.value = await notificationService.get(props.id);
			await bell.markRead(notification.value); // opening it = read
		} catch {
			notFound.value = true;
		} finally {
			loading.value = false;
		}
	});
</script>

<template>
	<div class="card card-custom border-0 min-h-500px mb-5 mb-lg-10">
		<div class="card-header border-0 pt-6">
			<NuxtLink :to="`${base}/notifications`" class="btn btn-sm btn-light">
				<i class="ki-outline ki-arrow-left fs-4"></i> All notifications
			</NuxtLink>
		</div>

		<div class="card-body">
			<div v-if="loading" class="text-center text-muted py-15">Loading…</div>

			<div v-else-if="notFound || !notification" class="text-center py-15">
				<i class="ki-outline ki-information-5 fs-3x text-muted d-block mb-3"></i>
				<div class="fw-bold fs-4 mb-2">Notification not found</div>
				<div class="text-muted mb-6">It may have been removed, or it belongs to another account.</div>
				<NuxtLink :to="`${base}/notifications`" class="btn btn-primary btn-sm">Back to notifications</NuxtLink>
			</div>

			<div v-else class="mw-700px mx-auto">
				<div class="d-flex align-items-center gap-4 mb-6">
					<span class="symbol symbol-60px flex-shrink-0">
						<span class="symbol-label" :class="`bg-light-${meta.color}`">
							<i class="ki-outline fs-1" :class="[meta.icon, `text-${meta.color}`]"></i>
						</span>
					</span>
					<div class="min-w-0">
						<span class="badge mb-2" :class="`badge-light-${meta.color}`">{{ meta.label }}</span>
						<h2 class="fw-bold m-0">{{ notification.title }}</h2>
						<div class="text-muted fs-7 mt-1">{{ formatLongDateTime(notification.createdAt) }}</div>
					</div>
				</div>

				<div class="separator my-6"></div>

				<p class="fs-5 text-gray-800 mb-8" style="white-space: pre-wrap">{{ notification.message }}</p>

				<NuxtLink v-if="target" :to="target.to" class="btn btn-primary">
					{{ target.label }} <i class="ki-outline ki-arrow-right fs-4 ms-1"></i>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
