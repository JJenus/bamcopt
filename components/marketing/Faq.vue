<script setup lang="ts">
	import { frequentlyAskedQuestions } from '~/utils/public-content';
	defineProps<{ limit?: number }>();
</script>

<template>
	<div class="marketing-faq">
		<details v-for="item in frequentlyAskedQuestions.slice(0, limit || frequentlyAskedQuestions.length)" :key="item.question" class="border-bottom py-5">
			<summary class="fs-5 fw-bold text-gray-900 d-flex justify-content-between align-items-center gap-5">{{ item.question }}<span class="text-primary fs-2" aria-hidden="true">+</span></summary>
			<p class="text-gray-600 fs-6 lh-lg mt-5 mb-2">{{ item.answer }}</p>
		</details>
	</div>
</template>
