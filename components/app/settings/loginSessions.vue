<script setup lang="ts">
	import type { DeviceSession, SessionsReport } from '~/services/security.service';
	import { exactTime } from '~/utils/session-ui';
	const props = withDefaults(defineProps<{ base?: '/app' | '/admin' }>(), { base: '/app' });
	const config = useRuntimeConfig().public;
	useSeoMeta({ title: () => `Security - ${config.APP}` });
	const user = userData().data;
	const auth = useAuth();
	const busy = ref('');
	const notice = ref('');
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
	const signOut = async (scope: { deviceKey: string } | { others: true } | { all: true }, key: string, current: boolean, message: string) => {
		if (busy.value || !window.confirm(message)) return;
		busy.value = key;
		notice.value = '';
		error.value = '';
		try {
			const { revoked } = await securityService.revoke(user.value.id, scope);
			if (current) return auth.logout();
			notice.value = revoked ? `Signed out ${revoked} session${revoked === 1 ? '' : 's'}.` : 'Nothing to sign out.';
			await load();
		} catch { error.value = 'We could not sign the device out. Please try again.'; }
		finally { busy.value = ''; }
	};
	const revokeDevice = (device: DeviceSession) => signOut({ deviceKey: device.key }, device.key, device.current, device.current ? 'Sign out of this device? You will need to sign in again.' : `Sign out ${device.label}?`);
	const revokeOthers = () => signOut({ others: true }, 'others', false, 'Sign out every other device? This one stays signed in.');
	const otherActive = computed(() => (report.value?.devices ?? []).some((d) => !d.current && d.activeSessions > 0));
	onMounted(() => { watch(() => user.value.id, load, { immediate: true }); });
</script>

<template>
	<div><NuxtLink :to="`${base}/settings`" class="d-inline-block fw-semibold fs-7 mb-6">← Settings</NuxtLink><AppPageHeader title="Security" description="The devices that have signed in to your account and any failed attempts." />
		<div class="alert alert-primary lh-lg mb-7">Each browser or device appears once, however many times it signed in. "Signed in" means a session is still open on that device. If something looks unfamiliar, sign it out and reset your password.</div>
		<section class="card border mb-7"><div class="card-header border-bottom align-items-center"><h2 class="card-title fs-3 fw-bold">Where you've signed in</h2><button type="button" class="btn btn-sm btn-light" :disabled="loading" @click="load">Refresh</button></div><div class="card-body">
			<AppLoadState :loading="loading && !report" :error="error" :empty="!report?.devices.length" title="No recorded sign-ins" description="Devices you sign in from will appear here." @retry="load">
				<div v-if="notice" role="status" class="alert alert-success mb-4">{{ notice }}</div>
				<AppSettingsDeviceList :devices="report?.devices ?? []" can-revoke :busy-key="busy" @revoke="revokeDevice" />
				<div v-if="otherActive" class="mt-6"><button type="button" class="btn btn-light-danger" :disabled="!!busy" @click="revokeOthers">Sign out all other devices</button></div>
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
