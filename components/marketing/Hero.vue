<script setup lang="ts">
	defineProps<{ eyebrow: string; title: string; description: string }>();
</script>

<template>
	<section class="marketing-section marketing-hero">
		<div class="container">
			<div class="row align-items-center g-10 g-lg-15">
				<div :class="$slots.visual ? 'col-lg-6' : 'col-lg-9'">
					<div class="d-flex align-items-center gap-3 mb-6">
						<span class="marketing-rule bg-primary"></span><span class="text-primary fw-bold text-uppercase fs-7 ls-1">{{ eyebrow }}</span>
					</div>
					<h1 class="marketing-title text-gray-900 mb-6">{{ title }}</h1>
					<p class="fs-4 text-gray-600 lh-lg mb-8 marketing-copy">{{ description }}</p>
					<div v-if="$slots.default" class="d-flex flex-wrap gap-4"><slot /></div>
				</div>
				<div v-if="$slots.visual" class="col-lg-6"><slot name="visual" /></div>
			</div>
		</div>
	</section>
</template>
