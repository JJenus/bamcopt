<script setup lang="ts">
	const { config, contact } = usePublicSite();
	const year = new Date().getFullYear();
	const groups = [
		{ title: 'Explore', links: [{ label: 'Banking', to: '/banking' }, { label: 'Transfers', to: '/transfers' }, { label: 'Investment enquiries', to: '/investment' }, { label: 'Security', to: '/security' }] },
		{ title: 'Here to help', links: [{ label: 'About us', to: '/resources/about-us' }, { label: 'Guides & updates', to: '/news' }, { label: 'Common questions', to: '/resources/faq' }, { label: 'Track a transaction', to: '/track/transaction' }, { label: 'Contact us', to: '/resources/contact-us' }] },
	];
</script>

<template>
	<footer class="border-top bg-body">
		<div class="container pt-12 pb-7">
			<div class="row g-9 pb-10">
				<div class="col-lg-5 pe-lg-15"><MarketingBrand /><p class="text-gray-600 fs-6 lh-lg mt-6 mb-6">A clearer way to manage your money.<br />Your account. Your transfers. In one place.</p><a v-if="contact.email" :href="contact.email" class="fw-semibold d-block mb-3">{{ config.SUPPORT_EMAIL }}</a><a v-if="contact.phone" :href="contact.phone" class="text-gray-700 d-block">{{ config.MOBILE }}</a></div>
				<div v-for="group in groups" :key="group.title" class="col-6 col-lg-3"><h2 class="fs-6 fw-bold mb-5">{{ group.title }}</h2><ul class="list-unstyled m-0"><li v-for="link in group.links" :key="link.to" class="mb-4"><NuxtLink :to="link.to" class="text-gray-600 text-hover-primary">{{ link.label }}</NuxtLink></li></ul></div>
			</div>
			<div class="border-top pt-7 d-flex flex-column flex-md-row justify-content-between gap-5 fs-7 text-gray-600"><span>© {{ year }} {{ config.LEGAL_ENTITY || config.APP }}. All rights reserved.</span><nav class="d-flex flex-wrap gap-6" aria-label="Legal"><NuxtLink to="/legal/privacy" class="text-gray-600 text-hover-primary">Privacy policy</NuxtLink><NuxtLink to="/legal/terms" class="text-gray-600 text-hover-primary">Terms of service</NuxtLink></nav></div>
		</div>
	</footer>
</template>
