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
	<a href="/" class="d-flex text-darki align-items-center ps-3 gap-2">
		<img
			alt="Logo"
			src="/assets/media/logos/logo-ban.png"
			:class="classes"
			class="theme-dark-showi"
		/>
		<span
			:class="appClass"
			class="fw-bold fs-3x truculenta-ero text-danger theme-dark-show"
			>Bancopt</span
		>
		<span
			:class="appClass"
			class="fw-bold fs-3x truculenta-ero theme-light-show text-warning"
			>Bancopt</span
		>
	</a>
</template>

<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Anta&family=Lobster&family=Truculenta:opsz,wght@12..72,800&display=swap");

	.anta-regular {
		font-family: "Anta", sans-serif;
		font-weight: 400;
		font-style: normal;
	}

	.truculenta-ero {
		font-family: "Truculenta", sans-serif;
		font-optical-sizing: auto;
		font-weight: 800;
		font-style: normal;
		font-variation-settings: "wdth" 100;
	}

	.lobster-regular {
		font-family: "Lobster", sans-serif;
		font-weight: 400;
		font-style: normal;
	}
</style>
