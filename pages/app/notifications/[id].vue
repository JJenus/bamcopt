<script setup lang="ts">
	useSeoMeta({ title: `Notification - ${useRuntimeConfig().public.APP}` });
	const id = String(useRoute().params.id);
</script>

<template>
	<NotificationsDetail base="/app" :id="id" />
</template>
