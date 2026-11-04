<script setup lang="ts">
	import '~/assets/css/marketing.css';
</script>

<template>
	<div class="marketing-site">
		<a href="#main-content" class="skip-link btn btn-primary">Skip to content</a>
		<header class="border-bottom"><div class="container py-6 d-flex align-items-center justify-content-between gap-5"><MarketingBrand /><NuxtLink to="/resources/contact-us" class="fw-semibold">Need help?</NuxtLink></div></header>
		<main id="main-content" class="marketing-auth-main" tabindex="-1"><slot /></main>
		<div class="container border-top py-7 d-flex flex-wrap justify-content-center gap-7 fs-7"><NuxtLink to="/" class="text-gray-600">Home</NuxtLink><NuxtLink to="/legal/privacy" class="text-gray-600">Privacy policy</NuxtLink><NuxtLink to="/legal/terms" class="text-gray-600">Terms of service</NuxtLink></div>
	</div>
</template>
