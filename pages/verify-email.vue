<script setup lang="ts">
	definePageMeta({ layout: 'auth', key: route => route.fullPath });
	usePublicSeo('Verify email', 'Confirm your email address using the verification link sent to you.', true);
	const route = useRoute();
	const token = typeof route.query.token === 'string' ? route.query.token : '';
	const state = ref<'loading' | 'success' | 'error' | 'missing'>(token ? 'loading' : 'missing');
	const verify = async () => {
		if (!token) return;
		state.value = 'loading';
		try { await authService.verifyEmail(token); state.value = 'success'; }
		catch { state.value = 'error'; }
	};
	onMounted(verify);
</script>

<template>
	<MarketingAuthFrame eyebrow="Email confirmation" title="Let's confirm it's you." description="Your verification link helps confirm the email address associated with your account.">
		<div v-if="state === 'loading'" role="status" class="text-center py-7"><span class="spinner-border text-primary mb-5" aria-hidden="true"></span><p class="mb-0">Verifying your email…</p></div>
		<div v-else-if="state === 'success'"><p role="status" class="alert alert-success">Verification complete. Your email has been confirmed.</p><NuxtLink to="/sign-in" class="btn btn-primary w-100">Continue to sign in</NuxtLink></div>
		<div v-else><p role="alert" class="alert alert-warning">{{ state === 'missing' ? 'No verification link was provided. Open the link in your email to continue.' : 'We could not verify this link. It may have expired or already been used.' }}</p><button v-if="state === 'error'" type="button" class="btn btn-light-primary w-100 mb-4" @click="verify">Try again</button><NuxtLink to="/resources/contact-us" class="btn btn-primary w-100">Contact support</NuxtLink><NuxtLink to="/sign-in" class="btn btn-link w-100 mt-4">Back to sign in</NuxtLink></div>
	</MarketingAuthFrame>
</template>
