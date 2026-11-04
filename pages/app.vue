<script setup lang="ts">
	definePageMeta({ layout: 'app', middleware: ['auth'] });
	useSeoMeta({ robots: 'noindex, nofollow' });
	const { user, load } = useAccountWorkspace();
	const auth = useAuth();
	onMounted(() => {
		watch(() => user.value.id, id => { if (id) load(); }, { immediate: true });
		watch(() => user.value.status, status => {
			if (status?.toUpperCase() === 'SUSPENDED') { errorAlert('Your account is suspended. Contact support for help.'); auth.logout(); }
		}, { immediate: true });
	});
</script>

<template><NuxtPage /></template>
