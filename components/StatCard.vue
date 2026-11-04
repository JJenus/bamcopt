<script setup lang="ts">
	const NuxtLink = resolveComponent("NuxtLink");
	defineProps<{ label: string; value: string | number; icon?: string; tone?: "primary" | "success" | "danger" | "warning" | "info"; to?: string }>();
</script>

<template>
	<component :is="to ? NuxtLink : 'div'" :to="to" class="card h-100 text-gray-800">
		<div class="card-body p-4">
			<div class="d-flex align-items-center mb-2 text-muted fs-7 fw-semibold">
				<i v-if="icon" :class="[icon, `text-${tone || 'primary'}`]" class="fs-3 me-2"></i>
				{{ label }}
			</div>
			<div class="fs-2 fw-bold text-break">{{ value }}</div>
		</div>
	</component>
</template>
