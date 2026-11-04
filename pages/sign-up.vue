<script setup lang="ts">
	definePageMeta({ layout: 'auth' });
	usePublicSeo('Create account', 'Create your digital banking account with your contact details and a unique password.', true);
	const auth = useAuth();
	const form = reactive({ name: '', email: '', phone: '', address: '', city: '', country: '', password: '', confirmPassword: '' });
	const accepted = ref(false);
	const busy = ref(false);
	const error = ref('');
	const fields = [
		{ key: 'name', label: 'Full name', type: 'text', autocomplete: 'name' },
		{ key: 'email', label: 'Email address', type: 'email', autocomplete: 'email' },
		{ key: 'phone', label: 'Phone number', type: 'tel', autocomplete: 'tel' },
		{ key: 'address', label: 'Street address', type: 'text', autocomplete: 'street-address' },
		{ key: 'city', label: 'City', type: 'text', autocomplete: 'address-level2' },
		{ key: 'country', label: 'Country', type: 'text', autocomplete: 'country-name' },
	] as const;
	const submit = async () => {
		if (busy.value) return;
		error.value = '';
		if (!accepted.value) { error.value = 'Please agree to the terms before creating an account.'; return; }
		if (form.password !== form.confirmPassword) { error.value = 'Your passwords do not match.'; return; }
		busy.value = true;
		try {
			const { confirmPassword, ...data } = form;
			await auth.login(await authService.register(data));
		} catch (err) { error.value = (err as { message?: string }).message || 'Unable to create your account. Please try again.'; }
		finally { busy.value = false; }
	};
</script>

<template>
	<MarketingAuthFrame eyebrow="Start here" title="Make your next step simpler." description="Create your account with accurate contact details and a password that is only yours.">
		<form @submit.prevent="submit" :aria-busy="busy">
			<div class="row g-5"><div v-for="field in fields" :key="field.key" :class="['city', 'country'].includes(field.key) ? 'col-sm-6' : 'col-12'"><label :for="`signup-${field.key}`" class="form-label">{{ field.label }}</label><input :id="`signup-${field.key}`" v-model="form[field.key]" :name="field.key" :type="field.type" :autocomplete="field.autocomplete" required maxlength="254" class="form-control" :disabled="busy" /></div><div class="col-12"><label for="signup-password" class="form-label">Password</label><input id="signup-password" v-model="form.password" name="password" type="password" autocomplete="new-password" minlength="8" required class="form-control" aria-describedby="password-help" :disabled="busy" /><p id="password-help" class="fs-7 text-gray-600 mt-3 mb-0">Use at least 8 characters. A long, unique password is best.</p></div><div class="col-12"><label for="signup-confirm" class="form-label">Confirm password</label><input id="signup-confirm" v-model="form.confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" minlength="8" required class="form-control" :disabled="busy" /></div></div>
			<div class="form-check mt-7 mb-7"><input id="signup-terms" v-model="accepted" name="terms" type="checkbox" required class="form-check-input" :disabled="busy" /><label for="signup-terms" class="form-check-label text-gray-700 lh-lg">I agree to the <NuxtLink to="/legal/terms" target="_blank" rel="noopener">Terms of service<span class="visually-hidden"> (opens in a new tab)</span></NuxtLink> and acknowledge the <NuxtLink to="/legal/privacy" target="_blank" rel="noopener">Privacy policy<span class="visually-hidden"> (opens in a new tab)</span></NuxtLink>.</label></div>
			<p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p>
			<button type="submit" class="btn btn-primary w-100" :disabled="busy"><span v-if="busy" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>{{ busy ? 'Creating account…' : 'Create account' }}</button>
			<p class="text-gray-600 text-center mt-7 mb-0">Already have an account? <NuxtLink to="/sign-in" class="fw-bold">Sign in</NuxtLink></p>
		</form>
	</MarketingAuthFrame>
</template>
