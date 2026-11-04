<script setup lang="ts">
	import { publicNavigation } from '~/utils/public-content';
	const { auth, accountPath } = usePublicSite();
	const route = useRoute();
	const mobileOpen = ref(false);
	const toggle = ref<HTMLButtonElement>();
	watch(() => route.path, () => { mobileOpen.value = false; });
	const closeMenu = () => { mobileOpen.value = false; toggle.value?.focus(); };
</script>

<template>
	<header class="border-bottom bg-body position-relative" @keydown.esc="closeMenu">
		<div class="container d-flex align-items-center justify-content-between gap-5 py-5">
			<MarketingBrand />
			<nav class="d-none d-lg-flex align-items-center gap-1" aria-label="Main navigation">
				<NuxtLink v-for="link in publicNavigation" :key="link.to" :to="link.to" class="marketing-nav-link">{{ link.label }}</NuxtLink>
			</nav>
			<div class="d-none d-lg-flex align-items-center gap-3">
				<template v-if="!auth.isAuthenticated.value"><NuxtLink to="/sign-in" class="btn btn-light btn-sm">Sign in</NuxtLink><NuxtLink to="/sign-up" class="btn btn-primary btn-sm">Create account <span aria-hidden="true">↗</span></NuxtLink></template>
				<NuxtLink v-else :to="accountPath" class="btn btn-primary btn-sm">Your account <span aria-hidden="true">↗</span></NuxtLink>
			</div>
			<button ref="toggle" type="button" class="btn btn-light btn-sm d-lg-none" :aria-expanded="mobileOpen" aria-controls="public-mobile-nav" @click="mobileOpen = !mobileOpen">{{ mobileOpen ? 'Close menu' : 'Menu' }} <i :class="['ki-outline ms-2', mobileOpen ? 'ki-cross' : 'ki-burger-menu-5']" aria-hidden="true"></i></button>
		</div>
		<MainMobileNav v-if="mobileOpen" id="public-mobile-nav" class="d-lg-none" />
	</header>
</template>
