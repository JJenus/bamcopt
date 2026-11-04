<script setup lang="ts">
	definePageMeta({ key: route => route.fullPath });
	useSeoMeta({ title: `Notification - ${useRuntimeConfig().public.APP}` });
	const id = String(useRoute().params.id);
</script>

<template>
	<div><AppPageHeader title="Notification" description="Read the update and open its related record." /><NotificationsDetail base="/admin" :id="id" /></div>
</template>
