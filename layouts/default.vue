<script setup lang="ts">
	import '~/assets/css/marketing.css';
</script>

<template>
	<div class="marketing-site">
		<a href="#main-content" class="skip-link btn btn-primary">Skip to content</a>
		<Header />
		<main id="main-content" tabindex="-1"><slot /></main>
		<Footer />
	</div>
</template>
