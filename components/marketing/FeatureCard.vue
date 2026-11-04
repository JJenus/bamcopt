<script setup lang="ts">
	defineProps<{ icon: string; title: string; description: string; to?: string; linkLabel?: string }>();
</script>

<template>
	<article class="card border h-100 marketing-feature">
		<div class="card-body p-7 p-lg-9 d-flex flex-column align-items-start">
			<span class="symbol symbol-50px mb-7"><span class="symbol-label bg-light-primary"><i :class="['ki-outline fs-2x text-primary', icon]" aria-hidden="true"></i></span></span>
			<h3 class="fs-2 fw-bold text-gray-900 mb-4">{{ title }}</h3>
			<p class="text-gray-600 fs-6 lh-lg mb-6">{{ description }}</p>
			<NuxtLink v-if="to" :to="to" class="fw-bold mt-auto">{{ linkLabel || 'Explore this feature' }} <span aria-hidden="true">↗</span></NuxtLink>
		</div>
	</article>
</template>
