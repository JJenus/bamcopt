<script setup lang="ts">
	import type { SessionsReport } from '~/services/security.service';
	import { exactTime } from '~/utils/session-ui';
	const props = withDefaults(defineProps<{ base?: '/app' | '/admin' }>(), { base: '/app' });
	const config = useRuntimeConfig().public;
	useSeoMeta({ title: () => `Security - ${config.APP}` });
	const user = userData().data;
	const report = ref<SessionsReport | null>(null);
	const loading = ref(true);
	const error = ref('');
	const load = async () => {
		const id = user.value.id;
		if (!id) return;
		loading.value = true;
		error.value = '';
		try { const next = await securityService.sessions(id); if (user.value.id === id) report.value = next; }
		catch { error.value = 'We could not load your sign-in activity. Please try again.'; }
		finally { loading.value = false; }
	};
	onMounted(() => { watch(() => user.value.id, load, { immediate: true }); });
</script>

<template>
	<div><NuxtLink :to="`${base}/settings`" class="d-inline-block fw-semibold fs-7 mb-6">← Settings</NuxtLink><AppPageHeader title="Security" description="The devices that have signed in to your account and any failed attempts." />
		<div class="alert alert-primary lh-lg mb-7">Each browser or device appears once, however many times it signed in. This is a record of past sign-ins, not a list of live sessions. If something looks unfamiliar, secure your email and reset your password.</div>
		<section class="card border mb-7"><div class="card-header border-bottom align-items-center"><h2 class="card-title fs-3 fw-bold">Where you've signed in</h2><button type="button" class="btn btn-sm btn-light" :disabled="loading" @click="load">Refresh</button></div><div class="card-body">
			<AppLoadState :loading="loading && !report" :error="error" :empty="!report?.devices.length" title="No recorded sign-ins" description="Devices you sign in from will appear here." @retry="load">
				<AppSettingsDeviceList :devices="report?.devices ?? []" />
				<p v-if="report?.truncated" class="text-gray-600 fs-8 mt-5 mb-0">Based on your most recent sign-ins.</p>
			</AppLoadState>
		</div></section>
		<section v-if="report?.failedAttempts.count" class="card border mb-7"><div class="card-header border-bottom"><h2 class="card-title fs-3 fw-bold text-danger">Failed sign-in attempts</h2></div><div class="card-body">
			<p class="text-gray-700 mb-4">{{ report.failedAttempts.count }} failed attempt{{ report.failedAttempts.count === 1 ? '' : 's' }} in the last {{ report.failedAttempts.days }} days. Most recent:</p>
			<article v-for="entry in report.failedAttempts.recent" :key="entry.id" class="py-4 border-top"><div class="d-flex flex-wrap justify-content-between gap-3"><strong class="fs-7">{{ entry.device.label }}</strong><time :datetime="entry.createdAt" class="fs-8 text-gray-600">{{ exactTime(entry.createdAt) }}</time></div><span class="text-gray-600 fs-8">IP {{ entry.ip }}<template v-if="entry.location"> · {{ entry.location }}</template></span></article>
		</div></section>
		<div class="d-flex flex-wrap gap-4"><NuxtLink v-if="base === '/app'" to="/app/help" class="btn btn-primary">Report a concern</NuxtLink><NuxtLink to="/security" class="btn btn-light">Account safety guidance</NuxtLink></div>
	</div>
</template>
