<script setup lang="ts">
	definePageMeta({ layout: 'auth' });
	usePublicSeo('Sign in', 'Sign in to your account with your password and one-time email code.', true);
	const auth = useAuth();
	const forgot = useState<boolean>('forgot', () => false);
	const form = reactive({ email: '', password: '' });
	const busy = ref(false);
	const error = ref('');
	const challenge = ref<string | null>(null);
	const otp = ref('');
	const submit = async () => {
		if (busy.value) return;
		busy.value = true;
		error.value = '';
		try {
			if (challenge.value) {
				await auth.login(await authService.verifyOtp(challenge.value, otp.value));
			} else {
				const result = await authService.login(form.email.trim(), form.password);
				challenge.value = result.challenge;
				otp.value = result.devOtp ?? '';
			}
		} catch (err) {
			error.value = (err as { message?: string }).message || 'Unable to sign in. Please try again.';
			if (/expired|already used|Too many/i.test(error.value)) { challenge.value = null; otp.value = ''; }
		} finally { busy.value = false; }
	};
	const back = () => { challenge.value = null; otp.value = ''; error.value = ''; };
	onMounted(() => {
		forgot.value = false;
		if (auth.isAuthenticated.value && auth.userData.value) auth.login(auth.userData.value);
	});
</script>

<template>
	<MarketingAuthFrame eyebrow="Welcome back" :title="forgot ? 'Reset your password' : challenge ? 'Check your email' : 'Sign in to your account'" :description="forgot ? 'We will send recovery instructions if an account matches your email.' : challenge ? 'Enter the six-digit sign-in code sent to your email address.' : 'Good to see you. Pick up where you left off.'">
		<ForgotPassword v-if="forgot" />
		<form v-else @submit.prevent="submit" :aria-busy="busy">
			<template v-if="!challenge"><div class="mb-6"><label for="signin-email" class="form-label">Email address</label><input id="signin-email" v-model="form.email" name="email" type="email" autocomplete="username" required maxlength="254" class="form-control form-control-lg" :disabled="busy" /></div><div class="mb-5"><label for="signin-password" class="form-label">Password</label><input id="signin-password" v-model="form.password" name="password" type="password" autocomplete="current-password" required class="form-control form-control-lg" :disabled="busy" /></div><div class="text-end mb-7"><button type="button" class="btn btn-link p-0 fw-semibold" :disabled="busy" @click="forgot = true">Forgot password?</button></div></template>
			<div v-else class="mb-7"><label for="signin-code" class="form-label">Six-digit code</label><input id="signin-code" v-model="otp" name="code" type="text" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" required class="form-control form-control-lg text-center fs-2" :disabled="busy" /><p class="text-gray-600 fs-7 mt-3 mb-0">Use the latest code. Check your spam folder if it has not arrived.</p></div>
			<p v-if="error" role="alert" class="alert alert-danger py-4">{{ error }}</p>
			<button type="submit" class="btn btn-primary w-100" :disabled="busy || (!!challenge && !/^\d{6}$/.test(otp))"><span v-if="busy" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>{{ busy ? 'Please wait…' : challenge ? 'Verify and sign in' : 'Continue' }}</button>
			<button v-if="challenge" type="button" class="btn btn-link w-100 mt-4" :disabled="busy" @click="back">Back to sign in</button>
			<p v-else class="text-gray-600 text-center mt-7 mb-0">New here? <NuxtLink to="/sign-up" class="fw-bold">Create account</NuxtLink></p>
		</form>
	</MarketingAuthFrame>
</template>
