<script setup lang="ts">
	const NuxtLink = resolveComponent("NuxtLink");
	defineProps<{
		items: { title: string; text: string; icon: string; to?: string; modal?: string; action?: () => void }[];
	}>();
</script>

<template>
	<div class="card">
		<div class="card-body p-0">
			<component
				:is="item.to ? NuxtLink : 'a'"
				v-for="item in items"
				:key="item.title"
				:to="item.to"
				:role="item.to ? undefined : 'button'"
				:data-bs-toggle="item.modal ? 'modal' : undefined"
				:data-bs-target="item.modal"
				class="d-flex align-items-center px-6 py-5 border-bottom border-dashed text-gray-800 text-hover-primary"
				@click="item.action?.()"
			>
				<span class="symbol symbol-45px me-4">
					<span class="symbol-label bg-light-primary"><i :class="item.icon" class="fs-2x text-primary"></i></span>
				</span>
				<span class="flex-grow-1" style="min-width: 0">
					<span class="d-block fw-bold fs-5">{{ item.title }}</span>
					<span class="d-block text-muted fs-7">{{ item.text }}</span>
				</span>
				<i class="ki-outline ki-right fs-2 text-muted"></i>
			</component>
		</div>
	</div>
</template>
