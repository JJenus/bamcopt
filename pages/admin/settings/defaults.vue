<script setup lang="ts">
	const settings = useAppSettings();
	const draft = reactive({ defaultBaseCurrency: '', currencySymbol: '', defaultLanguage: '' });
	const loading = ref(true); const busy = ref(false); const error = ref(''); const errors = ref<Record<string, string>>({});
	const load = async () => { loading.value = true; error.value = ''; try { const fresh = await settingsService.getApp(); settings.settings.value = fresh; Object.assign(draft, { defaultBaseCurrency: fresh.defaultBaseCurrency, currencySymbol: fresh.currencySymbol, defaultLanguage: fresh.defaultLanguage }); } catch { error.value = 'Unable to load defaults.'; } finally { loading.value = false; } };
	onMounted(load);
	const save = async () => {
		if (busy.value) return;
		errors.value = {}; error.value = '';
		if (!/^[a-z]{3}$/i.test(draft.defaultBaseCurrency.trim())) errors.value.defaultBaseCurrency = 'Enter a three-letter currency code.';
		if (draft.defaultLanguage.trim().length < 2) errors.value.defaultLanguage = 'Enter a language code, for example en.';
		if (Object.keys(errors.value).length) return;
		busy.value = true;
		try { const saved = await settingsService.saveApp({ id: settings.settings.value.id, ...draft, defaultBaseCurrency: draft.defaultBaseCurrency.trim().toUpperCase() }); settings.settings.value = saved; successAlert('Workspace defaults saved.'); }
		catch { error.value = 'Unable to confirm the save. Reload defaults before retrying.'; }
		finally { busy.value = false; }
	};
</script>
<template><div><AppPageHeader title="App defaults" description="Display preferences do not convert existing balances or transactions." /><AppLoadState :loading="loading" :error="error" @retry="load"><form class="card border" novalidate @submit.prevent="save"><div class="card-body"><p class="alert alert-warning lh-lg">Changing the default currency changes display settings. It does not perform foreign exchange or re-denominate the ledger.</p><div class="row g-6"><div v-for="field in (['defaultBaseCurrency', 'currencySymbol', 'defaultLanguage'] as const)" :key="field" class="col-md-4"><label :for="`default-${field}`" class="form-label">{{ { defaultBaseCurrency: 'Default currency', currencySymbol: 'Currency symbol', defaultLanguage: 'Language' }[field] }}</label><input :id="`default-${field}`" v-model="draft[field]" class="form-control" :class="{ 'is-invalid': errors[field] }" :disabled="busy" /><div class="invalid-feedback">{{ errors[field] }}</div></div></div><button type="submit" class="btn btn-primary mt-7" :disabled="busy">{{ busy ? 'Saving…' : 'Save defaults' }}</button></div></form></AppLoadState></div></template>
