<script setup lang="ts">
	// "<- Settings" shown on every settings sub page (the hub itself shows nothing)
	const props = defineProps<{ hub: string; titles: Record<string, string> }>();
	const route = useRoute();
	const sub = computed(() => route.path !== props.hub && route.path !== props.hub + "/");
	const title = computed(() => props.titles[route.path.replace(/\/$/, "")] || "");
</script>

<template>
	<div v-if="sub" class="d-flex align-items-center mb-5">
		<NuxtLink :to="hub" class="btn btn-icon btn-light-primary btn-sm me-3"><i class="ki-outline ki-left fs-2"></i></NuxtLink>
		<h2 class="m-0">{{ title || "Settings" }}</h2>
	</div>
</template>
