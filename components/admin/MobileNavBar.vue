<script setup lang="ts">
	const route = useRoute();
</script>
<template>
	<div
		style="z-index: 1049; padding-bottom: env(safe-area-inset-bottom)"
		class="position-fixed bg-light bottom-0 start-0 w-100 d-lg-none border-top"
	>
		<div @click="closeDrawer()" data-kt-drawer-dismiss="true" class="w-100 d-flex align-items-stretch">
			<NuxtLink
				v-for="nav in adminNavs"
				:key="nav.dir"
				:to="nav.dir"
				:class="isNavActive(nav.dir, route.path) ? 'text-primary' : 'text-gray-600'"
				class="flex-fill d-flex flex-column align-items-center justify-content-center py-2"
			>
				<i :class="nav.icon" class="fs-1">
					<i v-for="path in nav.paths" :key="path" :class="path"></i>
				</i>
				<span class="fs-9 fw-semibold mt-1" :class="isNavActive(nav.dir, route.path) ? 'fw-bold' : ''">{{ nav.name }}</span>
			</NuxtLink>
		</div>
	</div>
</template>
