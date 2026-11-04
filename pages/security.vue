<script setup lang="ts">
	usePublicSeo('Account security & safety', 'Learn about email-code sign-in, password protection, suspicious messages, and getting help with account access.');
	const features = [
		{ icon: 'ki-sms', title: 'An extra sign-in step', description: 'After your password, sign-in asks for a one-time code sent to your email. Protect your mailbox and only enter codes on the sign-in page you opened yourself.' },
		{ icon: 'ki-lock', title: 'A password that is only yours', description: 'Use a long, unique password. A trusted password manager can help you avoid reusing credentials across different websites.' },
		{ icon: 'ki-eye', title: 'A moment to check', description: 'Review your account activity regularly. If something looks unfamiliar, keep the transaction reference and contact support promptly.' },
	];
</script>

<template>
	<div>
		<MarketingHero eyebrow="Safer account habits" title="Confidence starts with staying alert." description="Understand the sign-in process, protect your details, and know what to do when something does not look right."><NuxtLink to="/resources/contact-us" class="btn btn-primary btn-lg">Report a concern <span aria-hidden="true">↗</span></NuxtLink><NuxtLink to="/resources/guides/protecting-your-account" class="btn btn-light btn-lg">Read the safety guide</NuxtLink></MarketingHero>
		<section class="marketing-section pt-0"><div class="container"><div class="row g-6"><div v-for="feature in features" :key="feature.title" class="col-md-4"><MarketingFeatureCard v-bind="feature" /></div></div></div></section>
		<section class="marketing-section bg-light"><div class="container"><div class="row g-10"><div class="col-lg-5"><h2 class="marketing-heading mb-6">Pressure is a reason to pause.</h2><p class="text-gray-600 fs-5 lh-lg">An urgent message, unexpected payment request, or unfamiliar link deserves a second look.</p></div><div class="col-lg-7"><div class="bg-body border rounded-3 p-9"><h3 class="fs-2 mb-6">Keep these boundaries</h3><ul class="text-gray-600 fs-5 lh-lg ps-6 mb-6"><li>Never share passwords or sign-in codes.</li><li>Open the site directly instead of using unexpected links.</li><li>Verify changed payment instructions with the recipient.</li><li>Sign out on shared devices and keep your browser updated.</li></ul><p class="text-gray-600 fs-6 mb-0">If access may be compromised, change your password, secure your email, and contact support through the details on this website.</p></div></div></div></div></section>
		<section class="marketing-section"><div class="container"><div class="row g-8"><div class="col-md-6"><h2 class="fs-2 mb-4">Trouble signing in?</h2><p class="text-gray-600 fs-5 lh-lg">Use Forgot password on the sign-in page to request recovery instructions.</p><NuxtLink to="/sign-in" class="fw-bold">Go to sign in <span aria-hidden="true">↗</span></NuxtLink></div><div class="col-md-6"><h2 class="fs-2 mb-4">Your information matters.</h2><p class="text-gray-600 fs-5 lh-lg">Read how account and contact information is handled and how to ask a privacy question.</p><NuxtLink to="/legal/privacy" class="fw-bold">Read the privacy policy <span aria-hidden="true">↗</span></NuxtLink></div></div></div></section>
	</div>
</template>
