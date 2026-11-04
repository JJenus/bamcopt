<script setup lang="ts">
	import { avatarInitials, isPlaceholderPhoto } from '~/utils/admin-ui';
	const props = withDefaults(defineProps<{ src?: string; name?: string; email?: string; size?: number }>(), { size: 40 });
	const failed = ref(false);
	const me = userData().data;
	const config = useRuntimeConfig().public;
	const name = computed(() => props.name ?? me.value.name ?? '');
	const email = computed(() => props.email ?? me.value.email ?? '');
	const initials = computed(() => avatarInitials(name.value, email.value));
	const photo = computed(() => !failed.value && !isPlaceholderPhoto(props.src, String(config.DEFAULT_DP || '')));
	watch(() => props.src, () => { failed.value = false; });
</script>

<template><img v-if="photo" :src="src" :width="size" :height="size" class="rounded-circle account-avatar" style="object-fit: cover; flex-shrink: 0" :alt="`${name || email || 'Account'} profile photo`" @error="failed = true" /><span v-else role="img" :aria-label="`${name || email || 'Account'} initials`" class="rounded-circle bg-light-primary text-primary fw-bold d-inline-flex align-items-center justify-content-center flex-shrink-0" :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${size * .36}px` }">{{ initials }}</span></template>
