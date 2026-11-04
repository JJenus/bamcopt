<script setup lang="ts">
	const forgot = useState<boolean>('forgot', () => false);
	const email = ref('');
	const busy = ref(false);
	const sent = ref(false);
	const error = ref('');
	const submit = async () => {
		if (busy.value) return;
		busy.value = true;
		error.value = '';
		try { await authService.requestPasswordReset(email.value.trim()); sent.value = true; }
		catch { error.value = 'Unable to request a reset right now. Please try again.'; }
		finally { busy.value = false; }
	};
</script>

<template>
	<div><div v-if="sent" class="alert alert-success" role="status">If an account matches that email address, reset instructions will be sent. Check your inbox and spam folder.</div><form v-else @submit.prevent="submit" :aria-busy="busy"><label for="reset-email" class="form-label">Account email address</label><input id="reset-email" v-model="email" type="email" autocomplete="email" required maxlength="254" class="form-control form-control-lg mb-6" :disabled="busy" /><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p><button type="submit" class="btn btn-primary w-100" :disabled="busy">{{ busy ? 'Requesting…' : 'Send reset instructions' }}</button></form><button type="button" class="btn btn-link w-100 mt-5" :disabled="busy" @click="forgot = false">Back to sign in</button></div>
</template>
