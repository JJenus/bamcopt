<script setup lang="ts">
	import { CODE_POLICIES, CODE_POLICY_LABEL, CURRENCIES, LANGUAGES, currencySymbolFor } from '~/utils/app-defaults';
	const settings = useAppSettings();
	const draft = reactive({ defaultBaseCurrency: '', defaultLanguage: '', transferCodesPolicy: 'always' as string });
	const loading = ref(true); const busy = ref(false); const resetting = ref(false); const error = ref(''); const errors = ref<Record<string, string>>({});
	const loaded = ref({ defaultBaseCurrency: '', defaultLanguage: '' });
	// A value saved before these lists existed stays selectable (marked), so it is never lost by accident.
	const currencyOptions = computed(() => [...(draft.defaultBaseCurrency && !CURRENCIES.some(c => c.code === loaded.value.defaultBaseCurrency) && loaded.value.defaultBaseCurrency ? [{ code: loaded.value.defaultBaseCurrency, name: 'current value, not in the list', symbol: settings.settings.value.currencySymbol }] : []), ...CURRENCIES]);
	const languageOptions = computed(() => [...(loaded.value.defaultLanguage && !LANGUAGES.some(l => l.code === loaded.value.defaultLanguage) ? [{ code: loaded.value.defaultLanguage, name: 'current value, not in the list' }] : []), ...LANGUAGES]);
	const symbol = computed(() => currencySymbolFor(draft.defaultBaseCurrency) || settings.settings.value.currencySymbol || '');
	const load = async () => {
		loading.value = true; error.value = '';
		try {
			const fresh = await settingsService.getApp();
			settings.settings.value = fresh;
			loaded.value = { defaultBaseCurrency: fresh.defaultBaseCurrency, defaultLanguage: fresh.defaultLanguage };
			Object.assign(draft, { defaultBaseCurrency: fresh.defaultBaseCurrency, defaultLanguage: fresh.defaultLanguage, transferCodesPolicy: fresh.transferCodesPolicy || 'always' });
		} catch { error.value = 'Unable to load defaults.'; } finally { loading.value = false; }
	};
	onMounted(load);
	const save = async () => {
		if (busy.value) return;
		errors.value = {}; error.value = '';
		if (!draft.defaultBaseCurrency) errors.value.defaultBaseCurrency = 'Choose a currency.';
		if (!draft.defaultLanguage) errors.value.defaultLanguage = 'Choose a language.';
		if (Object.keys(errors.value).length) return;
		busy.value = true;
		try {
			const saved = await settingsService.saveApp({ id: settings.settings.value.id, defaultBaseCurrency: draft.defaultBaseCurrency, defaultLanguage: draft.defaultLanguage, transferCodesPolicy: draft.transferCodesPolicy as 'off' | 'always' | 'remember' });
			settings.settings.value = saved; loaded.value = { defaultBaseCurrency: saved.defaultBaseCurrency, defaultLanguage: saved.defaultLanguage };
			successAlert('Workspace defaults saved.');
		} catch (e) { error.value = (e as { status?: number; message?: string }).status === 422 ? (e as { message: string }).message : 'Unable to confirm the save. Reload defaults before retrying.'; }
		finally { busy.value = false; }
	};
	const resetEveryone = async () => {
		if (resetting.value || !window.confirm('Forget that anyone entered their transfer codes? With the "remember" policy, every user is asked again on their next transfer.')) return;
		resetting.value = true; error.value = '';
		try { const { reset } = await settingsService.resetCodesForEveryone(); successAlert(reset ? `Reset for ${reset} user${reset === 1 ? '' : 's'}.` : 'No user had their codes remembered.'); }
		catch { error.value = 'Unable to reset. Please try again.'; }
		finally { resetting.value = false; }
	};
</script>
<template>
	<div>
		<AppPageHeader title="App defaults" description="System-wide settings. Display preferences do not convert existing balances or transactions." />
		<AppLoadState :loading="loading" :error="error" @retry="load">
			<form class="card border" novalidate @submit.prevent="save"><div class="card-body">
				<p class="alert alert-warning lh-lg">Changing the default currency changes display settings. It does not perform foreign exchange or re-denominate the ledger.</p>
				<div class="row g-6">
					<div class="col-md-4"><label for="default-currency" class="form-label">Default currency</label><select id="default-currency" v-model="draft.defaultBaseCurrency" class="form-select" :class="{ 'is-invalid': errors.defaultBaseCurrency }" :disabled="busy"><option v-for="c in currencyOptions" :key="c.code" :value="c.code">{{ c.code }} · {{ c.name }} ({{ c.symbol }})</option></select><div class="invalid-feedback">{{ errors.defaultBaseCurrency }}</div><div class="form-text">The five most traded currencies. Symbol: <strong>{{ symbol }}</strong></div></div>
					<div class="col-md-4"><label for="default-language" class="form-label">Language</label><select id="default-language" v-model="draft.defaultLanguage" class="form-select" :class="{ 'is-invalid': errors.defaultLanguage }" :disabled="busy"><option v-for="l in languageOptions" :key="l.code" :value="l.code">{{ l.name }}</option></select><div class="invalid-feedback">{{ errors.defaultLanguage }}</div><div class="form-text">Stored as the default; the app is not translated yet.</div></div>
					<div class="col-md-4"><label for="default-codes" class="form-label">Transfer codes</label><select id="default-codes" v-model="draft.transferCodesPolicy" class="form-select" :disabled="busy"><option v-for="policy in CODE_POLICIES" :key="policy" :value="policy">{{ CODE_POLICY_LABEL[policy] }}</option></select><div class="form-text">The default for every user. You can override it for one user on their page.</div></div>
				</div>
				<div class="d-flex flex-wrap gap-4 mt-7"><button type="submit" class="btn btn-primary" :disabled="busy">{{ busy ? 'Saving…' : 'Save defaults' }}</button></div>
			</div></form>
			<section class="card border mt-7"><div class="card-body"><h2 class="fs-3 mb-3">Remembered transfer codes</h2><p class="text-gray-700 lh-lg">With "Ask once, then remember", a user who enters their codes correctly is not asked again. Reset forgets that for every user, so everyone is asked again on their next transfer. Changing a user's codes also resets that user.</p><button type="button" class="btn btn-light-danger" :disabled="resetting" @click="resetEveryone">{{ resetting ? 'Resetting…' : 'Reset for everyone' }}</button></div></section>
		</AppLoadState>
	</div>
</template>
