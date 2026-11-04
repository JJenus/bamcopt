<script setup lang="ts">
	const config = useRuntimeConfig().public;
</script>

<template>
	<NuxtLink to="/" class="d-inline-flex align-items-center gap-3 text-decoration-none" :aria-label="`${config.APP} home`">
		<img :src="String(config.LOGO_URL)" alt="" width="38" height="38" class="object-fit-contain" />
		<span class="fs-2 fw-bolder text-gray-900">{{ config.APP }}<span class="text-primary">.</span></span>
	</NuxtLink>
</template>
