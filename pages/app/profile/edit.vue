<script setup lang="ts">
	useAccountPage('Edit personal details');
	const { user, account, state } = useAccountWorkspace();
	const auth = useAuth();
	const draft = reactive({ name: '', phone: '', address: '', city: '', country: '' });
	const dirty = ref(false);
	const busy = ref(false);
	const errors = ref<Record<string, string>>({});
	const error = ref('');
	const file = ref<File | null>(null);
	const fileInput = ref<HTMLInputElement>();
	const preview = ref('');
	const fields = [
		{ key: 'name', label: 'Full name', autocomplete: 'name', type: 'text' },
		{ key: 'phone', label: 'Phone number', autocomplete: 'tel', type: 'tel' },
		{ key: 'address', label: 'Street address', autocomplete: 'street-address', type: 'text' },
		{ key: 'city', label: 'City', autocomplete: 'address-level2', type: 'text' },
		{ key: 'country', label: 'Country', autocomplete: 'country-name', type: 'text' },
	] as const;
	const clearPreview = () => { if (preview.value) URL.revokeObjectURL(preview.value); preview.value = ''; };
	const reset = () => {
		for (const field of fields) draft[field.key] = user.value[field.key] || '';
		clearPreview(); file.value = null; dirty.value = false; errors.value = {}; error.value = '';
		if (fileInput.value) fileInput.value.value = '';
	};
	watch(user, () => { if (!dirty.value && !busy.value) reset(); }, { immediate: true });
	const choosePhoto = (event: Event) => {
		const selected = (event.target as HTMLInputElement).files?.[0];
		if (!selected) return;
		errors.value.photo = '';
		if (!['image/jpeg', 'image/png'].includes(selected.type) || !/\.(jpe?g|png)$/i.test(selected.name)) { errors.value.photo = 'Choose a JPG or PNG photo.'; return; }
		if (selected.size > 2 * 1024 * 1024) { errors.value.photo = 'Your photo must be 2 MB or smaller.'; return; }
		clearPreview(); file.value = selected; preview.value = URL.createObjectURL(selected); dirty.value = true;
	};
	const save = async () => {
		if (busy.value || !state.value.ready) return;
		errors.value = {}; error.value = '';
		for (const field of fields) {
			if (!draft[field.key].trim()) errors.value[field.key] = `${field.label} is required.`;
			else if (draft[field.key].length > 254) errors.value[field.key] = 'Use 254 characters or fewer.';
		}
		if (Object.keys(errors.value).length) return;
		const id = user.value.id;
		const token = auth.token.value;
		busy.value = true;
		try {
			const payload: Record<string, string> = Object.fromEntries(fields.map(field => [field.key, draft[field.key].trim()]));
			if (file.value) payload.imgUrl = await uploadService.image(file.value);
			if (user.value.id !== id || auth.token.value !== token) return;
			const updated = await userService.update(id, payload);
			if (user.value.id !== id || auth.token.value !== token) return;
			user.value = { ...user.value, ...updated, account: updated.account || account.value };
			dirty.value = false; reset(); successAlert('Your personal details have been saved.');
		} catch { error.value = 'Your changes could not be saved. Please try again. Your current account details have not been changed on this screen.'; }
		finally { busy.value = false; }
	};
	onUnmounted(clearPreview);
</script>

<template><div><NuxtLink to="/app/profile" class="d-inline-block fw-semibold fs-7 mb-6">← Personal details</NuxtLink><AppPageHeader title="Edit personal details" description="Changes are only applied after you save them." /><form class="card border" novalidate :aria-busy="busy" @submit.prevent="save"><div class="card-body p-7 p-lg-9"><p v-if="error" class="alert alert-danger" role="alert">{{ error }}</p><div class="d-flex flex-wrap align-items-center gap-6 border-bottom pb-8 mb-8"><AppAvatar :src="preview || user.imgUrl" :size="80" /><div><label for="profile-photo" class="form-label">Profile photo</label><input id="profile-photo" ref="fileInput" type="file" accept="image/jpeg,image/png" class="form-control" :class="{ 'is-invalid': errors.photo }" :aria-invalid="!!errors.photo" aria-describedby="profile-photo-feedback profile-photo-help" :disabled="busy" @change="choosePhoto" /><div id="profile-photo-feedback" class="invalid-feedback">{{ errors.photo }}</div><p id="profile-photo-help" class="text-gray-600 fs-8 mt-3 mb-0">JPG or PNG, up to 2 MB. Do not upload identity documents.</p></div></div><div class="row g-6"><div v-for="field in fields" :key="field.key" :class="['city', 'country'].includes(field.key) ? 'col-md-6' : 'col-12'"><label :for="`profile-${field.key}`" class="form-label">{{ field.label }}</label><input :id="`profile-${field.key}`" v-model="draft[field.key]" :name="field.key" :type="field.type" :autocomplete="field.autocomplete" required maxlength="254" class="form-control" :class="{ 'is-invalid': errors[field.key] }" :aria-invalid="!!errors[field.key]" :aria-describedby="`profile-${field.key}-feedback`" :disabled="busy" @input="dirty = true; errors[field.key] = ''" /><div :id="`profile-${field.key}-feedback`" class="invalid-feedback">{{ errors[field.key] }}</div></div></div><div class="mt-9 d-flex flex-wrap align-items-center gap-4"><button type="submit" class="btn btn-primary" :disabled="busy || !dirty || !state.ready">{{ busy ? 'Saving…' : 'Save changes' }}</button><button type="button" class="btn btn-light" :disabled="busy || !dirty" @click="reset">Discard changes</button><span v-if="dirty" class="text-gray-600 fs-7">You have unsaved changes.</span></div></div></form></div></template>
