<script setup lang="ts">
	const props = defineProps<{
		classes?: string;
		appClass?: string;
		appClassDark?: string;
	}>();

	const config = useRuntimeConfig().public;
	// const currentPage = "App";
	// useSeoMeta({
	// 	title: `${currentPage} - ${config.APP}`,
	// });
</script>

<template>
	<NuxtLink
		to="/"
		class="d-flex align-items-center justify-content-center position-relative m-0 p-0"
	>
		<img
			alt="Logo"
			src="/assets/media/logos/logo-ban.png"
			:class="classes"
			class=""
		/>
	</NuxtLink>
</template>
