<script setup lang="ts">
	import type { SecurityLogEntry } from '~/services/security.service';
	const props = withDefaults(defineProps<{ base?: '/app' | '/admin' }>(), { base: '/app' });
	const config = useRuntimeConfig().public;
	useSeoMeta({ title: () => `Security - ${config.APP}` });
	const user = userData().data;
	const logs = ref<SecurityLogEntry[]>([]);
	const loading = ref(true);
	const error = ref('');
	const load = async () => {
		const id = user.value.id;
		if (!id) return;
		loading.value = true;
		error.value = '';
		try { const list = await securityService.history(id); if (user.value.id === id) logs.value = list.slice(0, 20); }
		catch { error.value = 'We could not load your sign-in history. Please try again.'; }
		finally { loading.value = false; }
	};
	onMounted(() => { watch(() => user.value.id, load, { immediate: true }); });
	const actions: Record<string, string> = { login: 'Signed in', logout: 'Signed out', attempt_failed: 'Failed sign-in' };
	const label = (action: string) => actions[action] || action;
</script>

<template>
	<div><NuxtLink :to="`${base}/settings`" class="d-inline-block fw-semibold fs-7 mb-6">← Settings</NuxtLink><AppPageHeader title="Security" description="Recent sign-in events and safer account habits." />
		<div class="alert alert-primary lh-lg mb-7">This is a history of recorded sign-in events, not a list of active sessions. If something looks unfamiliar, secure your email and request a password reset.</div>
		<section class="card border mb-7"><div class="card-header border-bottom align-items-center"><h2 class="card-title fs-3 fw-bold">Recent sign-ins</h2><button type="button" class="btn btn-sm btn-light" :disabled="loading" @click="load">Refresh</button></div><div class="card-body"><AppLoadState :loading="loading" :error="error" :empty="!logs.length" title="No recorded sign-in events" description="Recorded sign-ins and failed attempts will appear here." @retry="load"><article v-for="entry in logs" :key="entry.id" class="py-6 border-bottom"><div class="d-flex flex-wrap justify-content-between gap-3 mb-3"><h3 class="fs-6 mb-0" :class="entry.action === 'attempt_failed' ? 'text-danger' : 'text-gray-900'">{{ label(entry.action) }}</h3><time :datetime="entry.createdAt" class="fs-8 text-gray-600">{{ new Date(entry.createdAt).toLocaleString() }}</time></div><p class="text-gray-600 fs-7 text-break mb-2">{{ entry.deviceInfo || 'Device information unavailable' }}</p><span class="text-gray-600 fs-8">IP address: {{ entry.ip || 'Not recorded' }}</span></article></AppLoadState></div></section>
		<div class="d-flex flex-wrap gap-4"><NuxtLink v-if="base === '/app'" to="/app/help" class="btn btn-primary">Report a concern</NuxtLink><NuxtLink to="/security" class="btn btn-light">Account safety guidance</NuxtLink></div>
	</div>
</template>
