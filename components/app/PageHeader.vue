<script setup lang="ts">
	defineProps<{ title: string; description?: string }>();
</script>

<template>
	<div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-5 mb-9">
		<div><h1 class="account-page-title mb-3">{{ title }}</h1><p v-if="description" class="text-gray-600 fs-6 mb-0 lh-lg">{{ description }}</p></div>
		<div v-if="$slots.default" class="d-flex flex-wrap gap-3"><slot /></div>
	</div>
</template>
