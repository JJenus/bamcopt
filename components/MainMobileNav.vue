<script setup lang="ts">
	import { publicNavigation } from '~/utils/public-content';
	const { auth, accountPath } = usePublicSite();
</script>

<template>
	<nav class="border-top bg-body" aria-label="Mobile navigation">
		<div class="container py-5 d-flex flex-column gap-2">
			<NuxtLink v-for="link in publicNavigation" :key="link.to" :to="link.to" class="marketing-nav-link">{{ link.label }}</NuxtLink>
			<NuxtLink to="/resources/contact-us" class="marketing-nav-link">Contact us</NuxtLink>
			<NuxtLink to="/track/transaction" class="marketing-nav-link">Track a transaction</NuxtLink>
			<div class="d-flex flex-wrap gap-3 pt-4">
				<template v-if="!auth.isAuthenticated.value"><NuxtLink to="/sign-in" class="btn btn-light">Sign in</NuxtLink><NuxtLink to="/sign-up" class="btn btn-primary">Create account</NuxtLink></template>
				<NuxtLink v-else :to="accountPath" class="btn btn-primary">Your account</NuxtLink>
			</div>
		</div>
	</nav>
</template>
