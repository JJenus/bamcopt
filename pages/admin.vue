<script setup lang="ts">
	definePageMeta({ layout: 'adminlayout', middleware: ['admin-auth'] });
	const config = useRuntimeConfig().public;
	useSeoMeta({ title: () => `Administration - ${config.APP}`, robots: 'noindex, nofollow' });
	const auth = useAuth();
	const user = userData().data;
	onMounted(async () => {
		const id = auth.userData.value?.userId;
		const token = auth.token.value;
		if (!id) return auth.logout();
		try { const fresh = await userService.get(id); if (auth.token.value === token) user.value = fresh; }
		catch { /* The HTTP service handles expired sessions; each page exposes its own load errors. */ }
	});
</script>
<template><NuxtPage /></template>
