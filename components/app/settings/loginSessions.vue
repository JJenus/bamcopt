<script setup lang="ts">
	import type { SecurityLogEntry } from "~/services/security.service";

	const user = userData().data;
	const logs = ref<SecurityLogEntry[]>([]);
	const loading = ref(true);

	const label = (a: SecurityLogEntry["action"]) =>
		({ login: "Signed in", logout: "Signed out", attempt_failed: "Failed sign-in" })[a] || a;

	// the user id arrives after the profile loads on a hard refresh
	watch(
		() => user.value.id,
		async (id) => {
			if (!id) return;
			try {
				logs.value = (await securityService.history(id)).slice(0, 20);
			} catch {
				logs.value = [];
			} finally {
				loading.value = false;
			}
		},
		{ immediate: true }
	);
</script>

<template>
	<div class="card mb-5">
		<div class="card-header"><h3 class="card-title fw-bold">Recent sign-ins</h3></div>
		<div class="card-body">
			<div v-if="loading" class="text-center"><span class="spinner-border text-muted"></span></div>
			<div v-else-if="!logs.length" class="text-muted text-center">No activity recorded yet.</div>
			<div
				v-for="l in logs"
				:key="l.id"
				class="d-flex justify-content-between align-items-start py-3 border-bottom border-dashed"
			>
				<div class="me-3" style="min-width: 0">
					<div class="fw-semibold" :class="l.action === 'attempt_failed' ? 'text-danger' : ''">{{ label(l.action) }}</div>
					<div class="text-muted fs-7 text-truncate">{{ l.deviceInfo }}</div>
				</div>
				<div class="text-end text-muted fs-7 flex-shrink-0">
					<div>{{ l.ip }}</div>
					<div>{{ new Date(l.createdAt).toLocaleString() }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
