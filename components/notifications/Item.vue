<script setup lang="ts">
	import { formatMessageTime } from "~/utils/date";
	import { type INotification, NotificationStatus } from "~/utils/interfaces/Notification";
	import { notificationMeta } from "~/utils/notification";

	const props = defineProps<{ notification: INotification }>();
	defineEmits<{ (e: "open", n: INotification): void }>();

	const meta = computed(() => notificationMeta(props.notification.type));
	const isUnread = computed(() => props.notification.status === NotificationStatus.UNREAD);
</script>

<template>
	<button
		type="button"
		class="notif-item d-flex align-items-start gap-4 px-5 py-4 w-100 text-start border-0"
		:class="isUnread ? 'bg-light-primary' : ''"
		@click="$emit('open', notification)"
	>
		<span class="symbol symbol-40px flex-shrink-0">
			<span class="symbol-label" :class="`bg-light-${meta.color}`">
				<i class="ki-outline fs-2" :class="[meta.icon, `text-${meta.color}`]"></i>
			</span>
		</span>
		<div class="flex-grow-1 min-w-0">
			<div class="d-flex justify-content-between gap-3">
				<span class="text-gray-900 text-truncate" :class="isUnread ? 'fw-bolder' : 'fw-semibold'">{{ notification.title }}</span>
				<span class="text-muted fs-8 flex-shrink-0 mt-1">{{ formatMessageTime(notification.createdAt) }}</span>
			</div>
			<div class="text-gray-700 fs-7 notif-clamp">{{ notification.message }}</div>
		</div>
		<span v-if="isUnread" class="bullet bullet-dot bg-primary h-8px w-8px mt-3 flex-shrink-0" title="Unread"></span>
	</button>
</template>

<style scoped>
	.notif-item {
		cursor: pointer;
		background: var(--bs-body-bg);
		border-bottom: 1px solid var(--bs-border-color, rgba(128, 128, 128, 0.2));
	}
	.notif-item:hover,
	.notif-item:focus-visible {
		background-color: var(--bs-gray-100, rgba(128, 128, 128, 0.08));
		outline: 2px solid var(--bs-primary);
	}
	.notif-clamp {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.min-w-0 {
		min-width: 0;
	}
</style>
