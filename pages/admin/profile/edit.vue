<script setup lang="ts">
	const user = userData().data;
	const auth = useAuth();
	const fields = [{ key: 'name', label: 'Full name' }, { key: 'phone', label: 'Phone number' }, { key: 'address', label: 'Street address' }, { key: 'city', label: 'City' }, { key: 'country', label: 'Country' }] as const;
	const draft = reactive({ name: '', phone: '', address: '', city: '', country: '' });
	const errors = ref<Record<string, string>>({}); const error = ref(''); const busy = ref(false); const dirty = ref(false);
	const file = ref<File | null>(null); const preview = ref(''); const input = ref<HTMLInputElement>(); const removePhoto = ref(false);
	const clearPreview = () => { if (preview.value) URL.revokeObjectURL(preview.value); preview.value = ''; };
	const reset = () => { for (const field of fields) draft[field.key] = user.value[field.key] || ''; clearPreview(); file.value = null; removePhoto.value = false; errors.value = {}; error.value = ''; dirty.value = false; if (input.value) input.value.value = ''; };
	watch(user, () => { if (!dirty.value && !busy.value) reset(); }, { immediate: true });
	const choosePhoto = (event: Event) => {
		const selected = (event.target as HTMLInputElement).files?.[0]; if (!selected) return;
		if (!['image/jpeg', 'image/png'].includes(selected.type) || !/\.(jpe?g|png)$/i.test(selected.name) || selected.size > 2 * 1024 * 1024) { errors.value.photo = 'Choose a JPG or PNG up to 2 MB.'; return; }
		errors.value.photo = ''; clearPreview(); file.value = selected; removePhoto.value = false; preview.value = URL.createObjectURL(selected); dirty.value = true;
	};
	const save = async () => {
		if (busy.value || !user.value.id) return;
		errors.value = {}; error.value = '';
		for (const field of fields) if (!draft[field.key].trim()) errors.value[field.key] = `${field.label} is required.`;
		if (Object.keys(errors.value).length) return;
		busy.value = true;
		const id = user.value.id; const token = auth.token.value;
		try { const body: Record<string, string> = Object.fromEntries(fields.map(field => [field.key, draft[field.key].trim()])); if (file.value) body.imgUrl = await uploadService.image(file.value); else if (removePhoto.value) body.imgUrl = ''; if (auth.token.value !== token) return; const updated = await userService.update(id, body); if (auth.token.value !== token) return; user.value = { ...user.value, ...updated }; reset(); successAlert('Admin profile saved.'); }
		catch { error.value = 'Unable to save your profile. Your draft is retained; check the saved details before retrying.'; }
		finally { busy.value = false; }
	};
	onUnmounted(clearPreview);
</script>
<template><div><NuxtLink to="/admin/profile" class="d-inline-block mb-6 fw-semibold">← My profile</NuxtLink><AppPageHeader title="Edit admin profile" description="Changes apply only after a successful save." /><form class="card border" novalidate @submit.prevent="save"><div class="card-body"><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p><div class="d-flex flex-wrap align-items-center gap-6 mb-7"><AppAvatar :src="removePhoto ? '' : preview || user.imgUrl" :size="80" /><div><label for="admin-profile-photo" class="form-label">Profile photo</label><input id="admin-profile-photo" ref="input" type="file" accept="image/jpeg,image/png" class="form-control" :class="{ 'is-invalid': errors.photo }" :disabled="busy" @change="choosePhoto" /><div class="invalid-feedback">{{ errors.photo }}</div><p class="text-gray-600 fs-8 mt-3">JPG or PNG, up to 2 MB. Without a photo your initials are shown.</p><button type="button" class="btn btn-sm btn-light" :disabled="busy" @click="clearPreview(); file = null; removePhoto = true; dirty = true">Use initials instead</button></div></div><div class="row g-5"><div v-for="field in fields" :key="field.key" class="col-md-6"><label :for="`admin-profile-${field.key}`" class="form-label">{{ field.label }}</label><input :id="`admin-profile-${field.key}`" v-model="draft[field.key]" maxlength="254" class="form-control" :class="{ 'is-invalid': errors[field.key] }" :disabled="busy" @input="dirty = true" /><div class="invalid-feedback">{{ errors[field.key] }}</div></div></div><div class="d-flex gap-4 mt-7"><button type="submit" class="btn btn-primary" :disabled="busy || !dirty">{{ busy ? 'Saving…' : 'Save changes' }}</button><button type="button" class="btn btn-light" :disabled="busy || !dirty" @click="reset">Discard changes</button></div></div></form></div></template>
