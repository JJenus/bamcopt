<script setup lang="ts">
	definePageMeta({ layout: 'superlayout', middleware: ['super-auth'] });
	const config = useRuntimeConfig().public;
	useSeoMeta({ title: () => `Oversight - ${config.APP}`, robots: 'noindex, nofollow' });
	const auth = useAuth();
	const user = userData().data;
	onMounted(async () => {
		const id = auth.userData.value?.userId;
		const token = auth.token.value;
		if (!id) return auth.logout();
		try { const fresh = await userService.get(id); if (auth.token.value === token) user.value = fresh; }
		catch { /* the HTTP service signs out on an expired session; pages show their own load errors */ }
	});
</script>
<template><NuxtPage /></template>
