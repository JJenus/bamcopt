<script setup lang="ts">
	const props = defineProps<{ value: string; label: string }>();
	const copied = ref(false);
	let timer: ReturnType<typeof setTimeout>;
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(props.value);
			copied.value = true;
			clearTimeout(timer);
			timer = setTimeout(() => { copied.value = false; }, 2000);
		} catch { infoAlert('Unable to copy. Select the value and copy it manually.'); }
	};
	onUnmounted(() => clearTimeout(timer));
</script>

<template><button type="button" class="btn btn-sm btn-light-primary flex-shrink-0" :aria-label="copied ? `${label} copied` : `Copy ${label}`" @click="copy"><i :class="['ki-outline fs-3', copied ? 'ki-check' : 'ki-copy']" aria-hidden="true"></i><span class="d-none d-sm-inline">{{ copied ? 'Copied' : 'Copy' }}</span></button></template>
