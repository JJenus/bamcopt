<script setup lang="ts">
	import { guides } from '~/utils/public-content';
	usePublicSeo('Guides & updates', 'Practical guides to getting started, understanding transfers, and protecting your digital banking account.');
</script>

<template>
	<div><MarketingHero eyebrow="Guides & updates" title="A little knowledge. A better next step." description="Practical reading for your everyday finances. Get started, follow your money, and build safer account habits." /><section class="marketing-section pt-0"><div class="container"><div class="row g-6"><div v-for="guide in guides" :key="guide.slug" class="col-md-4"><article class="card border h-100"><div class="card-body p-8 d-flex flex-column"><div class="bg-light-primary rounded-3 p-8 mb-8"><i :class="['ki-outline fs-5x text-primary', guide.icon]" aria-hidden="true"></i></div><span class="fs-7 text-primary fw-bold mb-4">{{ guide.category }} · {{ guide.readTime }}</span><h2 class="fs-2 lh-base mb-5"><NuxtLink :to="`/resources/guides/${guide.slug}`" class="text-gray-900 text-hover-primary">{{ guide.title }}</NuxtLink></h2><p class="text-gray-600 fs-6 lh-lg mb-7">{{ guide.summary }}</p><NuxtLink :to="`/resources/guides/${guide.slug}`" class="fw-bold mt-auto" :aria-label="`Read: ${guide.title}`">Read the guide <span aria-hidden="true">↗</span></NuxtLink></div></article></div></div></div></section><MarketingCta title="Put clarity into practice." /></div>
</template>
