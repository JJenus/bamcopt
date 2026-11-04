<script setup lang="ts">
	definePageMeta({ key: route => route.fullPath });
	useAccountPage('Notification');
	const id = String(useRoute().params.id);
</script>

<template>
	<div><AppPageHeader title="Notification" description="Read the update and open its related account activity." /><NotificationsDetail base="/app" :id="id" /></div>
</template>
