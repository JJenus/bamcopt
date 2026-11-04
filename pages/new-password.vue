<script setup lang="ts">
	definePageMeta({ layout: 'auth' });
	usePublicSeo('Set a new password', 'Choose a new password using your password reset link.', true);
	const route = useRoute();
	const token = computed(() => typeof route.query.token === 'string' ? route.query.token : '');
	const password = ref('');
	const confirmation = ref('');
	const busy = ref(false);
	const saved = ref(false);
	const error = ref('');
	const submit = async () => {
		if (busy.value || !token.value) return;
		error.value = '';
		if (password.value !== confirmation.value) { error.value = 'Your passwords do not match.'; return; }
		busy.value = true;
		try { await authService.resetPassword(token.value, password.value); saved.value = true; password.value = ''; confirmation.value = ''; }
		catch { error.value = 'This reset link may have expired or already been used. Request a new link from the sign-in page.'; }
		finally { busy.value = false; }
	};
</script>

<template>
	<MarketingAuthFrame eyebrow="Account recovery" title="A fresh start for your password." description="Choose a long, unique password you do not use for another account.">
		<div v-if="saved" role="status"><div class="alert alert-success mb-6">Your password has been updated.</div><NuxtLink to="/sign-in" class="btn btn-primary w-100">Continue to sign in</NuxtLink></div>
		<div v-else-if="!token"><p role="alert" class="alert alert-warning">A password reset link is needed. Open the link in your email or request a new one.</p><NuxtLink to="/sign-in" class="btn btn-primary w-100">Back to sign in</NuxtLink></div>
		<form v-else @submit.prevent="submit" :aria-busy="busy"><div class="mb-6"><label for="new-password" class="form-label">New password</label><input id="new-password" v-model="password" type="password" autocomplete="new-password" minlength="8" required class="form-control" :disabled="busy" /></div><div class="mb-7"><label for="confirm-password" class="form-label">Confirm new password</label><input id="confirm-password" v-model="confirmation" type="password" autocomplete="new-password" minlength="8" required class="form-control" :disabled="busy" /></div><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p><button type="submit" class="btn btn-primary w-100" :disabled="busy">{{ busy ? 'Updating…' : 'Save new password' }}</button></form>
	</MarketingAuthFrame>
</template>
