<script setup lang="ts">
	import type { AdminSummary } from '~/services/super.service';
	import { exactTime, timeAgo } from '~/utils/session-ui';
	const admins = ref<AdminSummary[]>([]);
	const loading = ref(true);
	const error = ref('');
	const load = async () => {
		loading.value = true;
		error.value = '';
		try { admins.value = await superService.admins(); }
		catch { error.value = 'We could not load the administrators. Please try again.'; }
		finally { loading.value = false; }
	};
	onMounted(load);
</script>

<template>
	<div>
		<AppPageHeader title="Administrators" description="Who signs in to the admin area, from which device, where and when."><button type="button" class="btn btn-light" :disabled="loading" @click="load">Refresh</button></AppPageHeader>
		<section class="card border"><div class="card-body">
			<AppLoadState :loading="loading && !admins.length" :error="error" :empty="!admins.length" title="No administrators" description="Administrator accounts will appear here." @retry="load">
				<p class="text-gray-600 fs-7" aria-live="polite">{{ admins.length }} administrator{{ admins.length === 1 ? '' : 's' }}</p>
				<div class="table-responsive d-none d-md-block"><table class="table admin-table"><thead><tr><th>Administrator</th><th>Last sign-in</th><th>Device</th><th>Where</th><th class="text-end">Devices</th><th class="text-end">Sign-ins</th><th class="text-end">Failed (30 d)</th><th></th></tr></thead><tbody>
					<tr v-for="admin in admins" :key="admin.id" class="admin-row">
						<td><NuxtLink :to="`/super/admins/${admin.id}`" class="fw-bold">{{ admin.name || admin.email }}</NuxtLink><span class="d-block text-gray-600 fs-8 text-break">{{ admin.email }}</span><span class="badge mt-1" :class="admin.status === 'ACTIVE' ? 'badge-light-success' : 'badge-light-warning'">{{ admin.status }}</span></td>
						<td><template v-if="admin.lastSignIn"><span :title="exactTime(admin.lastSignIn.at)">{{ timeAgo(admin.lastSignIn.at) }}</span><small class="d-block text-gray-600">{{ exactTime(admin.lastSignIn.at) }}</small></template><span v-else class="text-gray-600">Never</span></td>
						<td>{{ admin.lastSignIn?.device || '—' }}</td>
						<td><template v-if="admin.lastSignIn">{{ admin.lastSignIn.location || 'Location unavailable' }}<small class="d-block text-gray-600">IP {{ admin.lastSignIn.ip }}</small></template><template v-else>—</template></td>
						<td class="text-end">{{ admin.devices }}</td><td class="text-end">{{ admin.signIns }}</td>
						<td class="text-end"><span class="badge" :class="admin.failedAttempts ? 'badge-light-danger' : 'badge-light'">{{ admin.failedAttempts }}</span></td>
						<td><NuxtLink :to="`/super/admins/${admin.id}`" class="btn btn-sm btn-light">Open</NuxtLink></td>
					</tr>
				</tbody></table></div>
				<div class="d-md-none"><NuxtLink v-for="admin in admins" :key="admin.id" :to="`/super/admins/${admin.id}`" class="d-flex align-items-center gap-4 py-5 border-bottom"><div class="admin-identity"><strong class="d-block text-break">{{ admin.name || admin.email }}</strong><span class="d-block text-gray-600 fs-8 text-break">{{ admin.email }}</span><span class="d-block text-gray-700 fs-8 mt-2"><template v-if="admin.lastSignIn">{{ timeAgo(admin.lastSignIn.at) }} · {{ admin.lastSignIn.device }}<br />{{ admin.lastSignIn.location || 'Location unavailable' }} · IP {{ admin.lastSignIn.ip }}</template><template v-else>Never signed in</template></span><span class="d-block text-gray-600 fs-8 mt-1">{{ admin.devices }} device{{ admin.devices === 1 ? '' : 's' }} · {{ admin.signIns }} sign-ins<template v-if="admin.failedAttempts"> · <span class="text-danger">{{ admin.failedAttempts }} failed</span></template></span></div><i class="ki-outline ki-right ms-auto" aria-hidden="true"></i></NuxtLink></div>
			</AppLoadState>
		</div></section>
	</div>
</template>
