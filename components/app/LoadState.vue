<script setup lang="ts">
	defineProps<{ loading?: boolean; error?: string; empty?: boolean; title?: string; description?: string }>();
	defineEmits(['retry']);
</script>

<template>
	<div v-if="loading" class="text-center py-12" role="status"><span class="spinner-border text-primary" aria-hidden="true"></span><p class="text-gray-600 mt-4 mb-0">Loading…</p></div>
	<div v-else-if="error" role="alert" class="alert alert-warning d-flex flex-wrap align-items-center gap-4"><span class="flex-grow-1">{{ error }}</span><button type="button" class="btn btn-sm btn-light" @click="$emit('retry')">Try again</button></div>
	<div v-else-if="empty" class="text-center py-12"><i class="ki-outline ki-document fs-4x text-primary" aria-hidden="true"></i><h2 class="fs-3 mt-5 mb-3">{{ title || 'Nothing here yet' }}</h2><p class="text-gray-600 mb-0 lh-lg">{{ description }}</p><slot /></div>
	<slot v-else />
</template>
