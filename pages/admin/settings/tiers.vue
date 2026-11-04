<script setup lang="ts">
	import type { AccountLevel } from '~/utils/interfaces/AccountLevel';
	import { adminMoney } from '~/utils/admin-ui';
	const settings = useAppSettings();
	const levels = ref<AccountLevel[]>([]); const loading = ref(true); const error = ref(''); const busy = ref(false);
	const editing = ref(false); const review = ref(false); const errors = ref<Record<string, string>>({}); const saveError = ref('');
	const blank = () => ({ id: '', title: '', accountLevel: '', dailyLimit: '', maxBalanceLimit: '' });
	const draft = reactive(blank());
	const load = async () => { loading.value = true; error.value = ''; try { levels.value = await settingsService.listLevels(); settings.accountLevels.value = levels.value; } catch { error.value = 'Unable to load account tiers.'; } finally { loading.value = false; } };
	onMounted(load);
	const edit = (tier?: AccountLevel) => { Object.assign(draft, blank(), tier ? { id: tier.id || '', title: tier.title, accountLevel: String(tier.accountLevel), dailyLimit: String(tier.dailyLimit), maxBalanceLimit: String(tier.maxBalanceLimit) } : { accountLevel: String(Math.max(0, ...levels.value.map(item => item.accountLevel)) + 1) }); editing.value = true; review.value = false; errors.value = {}; saveError.value = ''; };
	const save = async () => {
		if (busy.value) return;
		errors.value = {}; saveError.value = '';
		if (draft.title.trim().length < 2) errors.value.title = 'Enter at least two characters.';
		if (!/^\d+$/.test(draft.accountLevel) || !Number.isSafeInteger(Number(draft.accountLevel))) errors.value.accountLevel = 'Enter a non-negative whole number.';
		if (levels.value.some(item => item.id !== draft.id && item.accountLevel === Number(draft.accountLevel))) errors.value.accountLevel = 'This tier number already exists.';
		for (const key of ['dailyLimit', 'maxBalanceLimit'] as const) if (!/^\d+(\.\d{1,2})?$/.test(draft[key]) || !Number.isFinite(Number(draft[key]))) errors.value[key] = 'Enter a non-negative amount with up to two decimal places.';
		if (Object.keys(errors.value).length) return;
		if (!review.value) { review.value = true; return; }
		busy.value = true;
		const body = { title: draft.title.trim(), accountLevel: Number(draft.accountLevel), dailyLimit: Number(draft.dailyLimit), maxBalanceLimit: Number(draft.maxBalanceLimit) };
		try { if (draft.id) await settingsService.updateLevel({ ...body, id: draft.id }); else await settingsService.createLevel(body); editing.value = false; successAlert('Account tier saved.'); await load(); }
		catch { saveError.value = 'Unable to confirm the save. Reload tiers before retrying.'; }
		finally { busy.value = false; }
	};
</script>
<template><div><AppPageHeader title="Account tiers" description="Review the limits applied to customer accounts."><button type="button" class="btn btn-primary" :disabled="busy" @click="edit()">Add tier</button></AppPageHeader><section v-if="editing" class="card border mb-7"><form class="card-body" novalidate @submit.prevent="save"><h2 class="fs-3 mb-5">{{ draft.id ? 'Edit tier' : 'New tier' }}</h2><p v-if="saveError" role="alert" class="alert alert-danger">{{ saveError }}</p><div class="row g-5"><div v-for="field in (['title', 'accountLevel', 'dailyLimit', 'maxBalanceLimit'] as const)" :key="field" class="col-md-6"><label :for="`tier-${field}`" class="form-label">{{ { title: 'Title', accountLevel: 'Tier number', dailyLimit: 'Daily transfer limit', maxBalanceLimit: 'Maximum balance' }[field] }}</label><input :id="`tier-${field}`" v-model="draft[field]" class="form-control" :class="{ 'is-invalid': errors[field] }" :disabled="busy || review || (field === 'accountLevel' && !!draft.id)" /><div class="invalid-feedback">{{ errors[field] }}</div></div></div><p class="text-gray-600 fs-8 mt-5">Limits are in account units. Zero means no limit under the existing server rules. Existing tier numbers cannot be changed here.</p><p v-if="review" class="alert alert-warning">Confirm these limits. Changes to an existing tier affect subsequent operations for accounts assigned to it.</p><div class="d-flex gap-3 mt-6"><button type="submit" class="btn btn-primary" :disabled="busy">{{ busy ? 'Saving…' : review ? 'Confirm tier' : 'Review tier' }}</button><button v-if="review" type="button" class="btn btn-light" :disabled="busy" @click="review = false">Back to edit</button><button type="button" class="btn btn-light" :disabled="busy" @click="editing = false">Cancel</button></div></form></section><AppLoadState :loading="loading" :error="error" :empty="!levels.length" title="No tiers configured" @retry="load"><div class="row g-6"><div v-for="tier in levels" :key="String(tier.id)" class="col-md-6"><section class="card border h-100"><div class="card-body"><span class="badge badge-light-primary mb-4">Tier {{ tier.accountLevel }}</span><h2 class="fs-3 mb-6">{{ tier.title }}</h2><p class="d-flex justify-content-between gap-4"><span class="text-gray-600">Daily transfer limit</span><strong>{{ Number(tier.dailyLimit) ? adminMoney(tier.dailyLimit) : 'No limit' }}</strong></p><p class="d-flex justify-content-between gap-4"><span class="text-gray-600">Maximum balance</span><strong>{{ Number(tier.maxBalanceLimit) ? adminMoney(tier.maxBalanceLimit) : 'No limit' }}</strong></p><button type="button" class="btn btn-light-primary mt-4" :disabled="busy" @click="edit(tier)">Edit tier</button></div></section></div></div></AppLoadState></div></template>
