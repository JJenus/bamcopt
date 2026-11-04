<script setup lang="ts">
	import { guides } from '~/utils/public-content';
	const route = useRoute();
	const guide = computed(() => guides.find(item => item.slug === route.params.slug));
	if (!guide.value) throw createError({ statusCode: 404, statusMessage: 'Guide not found' });
	// Recreate the page on slug changes so both content and SEO stay in sync.
	definePageMeta({ key: route => route.path });
	usePublicSeo(guide.value!.title, guide.value!.summary);
</script>

<template>
	<article v-if="guide"><MarketingHero :eyebrow="`${guide.category} · ${guide.readTime}`" :title="guide.title" :description="guide.summary"><NuxtLink to="/news" class="fw-bold">← All guides</NuxtLink></MarketingHero><div class="container marketing-prose pb-15"><section v-for="section in guide.sections" :key="section.title"><h2 class="fs-2x">{{ section.title }}</h2><p>{{ section.text }}</p></section><p class="fs-7 border-top pt-7 mt-10">This guide is general information. Account terms, availability, and required checks may vary. Contact support for information specific to your account.</p><NuxtLink to="/resources/contact-us" class="btn btn-light-primary mt-4">Need a hand? Contact us</NuxtLink></div></article>
</template>
