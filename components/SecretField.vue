<script setup lang="ts">
	const props = defineProps<{ visible: boolean; disabled?: boolean; controlId: string; label: string }>();
	defineEmits<{ toggle: [] }>();
	const action = computed(() => `${props.visible ? 'Hide' : 'Show'} ${props.label}`);
</script>

<template>
	<div class="secret-field">
		<slot />
		<button type="button" class="secret-field-toggle" :aria-label="action" :title="action" :aria-pressed="visible" :aria-controls="controlId" :disabled="disabled" @click="$emit('toggle')">
			<i class="ki-outline" :class="visible ? 'ki-eye-slash' : 'ki-eye'" aria-hidden="true"></i>
		</button>
	</div>
</template>

<style scoped>
.secret-field { position: relative; }
.secret-field :deep(.form-control) { padding-inline-end: 3.5rem; }
.secret-field :deep(.form-control.is-invalid) { background-position: right 3.25rem center; padding-inline-end: 5rem; }
.secret-field-toggle {
	position: absolute;
	inset-inline-end: .5rem;
	top: 50%;
	transform: translateY(-50%);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	padding: 0;
	border: 0;
	border-radius: .5rem;
	background: transparent;
	color: var(--bs-gray-600);
	cursor: pointer;
	transition: color .15s ease, background-color .15s ease;
}
.secret-field-toggle i { font-size: 1.4rem; }
.secret-field-toggle:hover:not(:disabled) { color: var(--bs-primary); background: rgba(var(--bs-primary-rgb), .08); }
.secret-field-toggle:focus-visible { outline: 2px solid var(--bs-primary); outline-offset: 1px; }
.secret-field-toggle:disabled { opacity: .45; cursor: default; }
@media (prefers-reduced-motion: reduce) { .secret-field-toggle { transition: none; } }
</style>
