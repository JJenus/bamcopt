<script setup lang="ts">
	import type { IUser } from '~/utils/interfaces/IUser';
	const props = defineProps<{ user: IUser }>();
	const emit = defineEmits<{ saved: [] }>();
	const tiers = useAppSettings().accountLevels;
	const draft = reactive({ status: '', level: '', cot: '', imf: '', tax: '' });
	const busy = ref(false);
	const error = ref('');
	const errors = ref<Record<string, string>>({});
	const pending = ref<{ label: string; body: Record<string, unknown>; account?: boolean } | null>(null);
	watch(() => props.user, user => { draft.status = user.status || 'ACTIVE'; draft.level = String(user.account?.accountLevel ?? ''); for (const key of ['cot', 'imf', 'tax'] as const) draft[key] = String(user[key] || ''); }, { immediate: true });
	const review = (kind: string) => {
		errors.value = {}; error.value = '';
		if (kind === 'codes') {
			for (const key of ['cot', 'imf', 'tax'] as const) if (!draft[key].trim()) errors.value[key] = 'Enter a code.';
			if (Object.keys(errors.value).length) return;
			pending.value = { label: 'Replace transfer verification codes? Existing codes will no longer work for subsequent verification.', body: { cot: draft.cot.trim(), imf: draft.imf.trim(), tax: draft.tax.trim() } };
		} else if (kind === 'status') pending.value = { label: `Change user status from ${props.user.status} to ${draft.status}? HOLD prevents transfers. Other restrictions remain server-defined.`, body: { status: draft.status } };
		else if (kind === 'level') {
			if (!tiers.value.some(tier => tier.accountLevel === Number(draft.level))) { errors.value.level = 'Choose an available tier.'; return; }
			pending.value = { label: 'Change the account tier? Its balance and daily transfer limits will apply to subsequent operations.', body: { userId: props.user.id, accountLevel: Number(draft.level) }, account: true };
		} else pending.value = { label: 'Mark this profile as verified? Confirm that the required verification checks have been completed.', body: { verified: true } };
	};
	const confirm = async () => {
		if (!pending.value || busy.value) return;
		busy.value = true; error.value = '';
		try { if (pending.value.account) await accountService.updateSettings(pending.value.body as { userId: string }); else await userService.update(props.user.id, pending.value.body); pending.value = null; successAlert('User changes saved.'); emit('saved'); }
		catch (e: any) { error.value = e.status && e.status < 500 ? e.message : 'Could not confirm the change. Refresh this user before trying again.'; }
		finally { busy.value = false; }
	};
</script>
<template><div class="admin-grid"><section class="card border"><div class="card-body"><h2 class="fs-3 mb-6">Profile details</h2><dl><div v-for="[label, value] in [['Name', user.name], ['Email', user.email], ['Phone', user.phone], ['Address', user.address], ['City', user.city], ['Country', user.country], ['Email confirmed', user.emailVerified ? 'Yes' : 'No'], ['Profile verified', user.verified ? 'Yes' : 'No']]" :key="String(label)" class="row g-3 py-4 border-bottom"><dt class="col-sm-4 text-gray-600 fw-normal">{{ label }}</dt><dd class="col-sm-8 mb-0 text-break">{{ value || 'Not provided' }}</dd></div></dl><button v-if="!user.verified" type="button" class="btn btn-light-primary" :disabled="busy || !!pending" @click="review('verify')">Verify profile</button><p v-if="!user.account" class="alert alert-info mt-6 mb-0">This user has no customer account. Financial controls are unavailable.</p></div></section><div class="d-grid gap-7"><section class="card border"><div class="card-body"><h2 class="fs-4 mb-5">Account controls</h2><label for="control-status" class="form-label">User status</label><select id="control-status" v-model="draft.status" class="form-select mb-4" :disabled="busy || !!pending"><option>ACTIVE</option><option>HOLD</option><option>SUSPENDED</option></select><button type="button" class="btn btn-light-primary mb-6" :disabled="busy || !!pending || draft.status === user.status" @click="review('status')">Review status change</button><template v-if="user.account"><label for="control-level" class="form-label d-block">Account tier</label><select id="control-level" v-model="draft.level" class="form-select" :class="{ 'is-invalid': errors.level }" :disabled="busy || !!pending"><option v-for="tier in tiers" :key="String(tier.id)" :value="String(tier.accountLevel)">{{ tier.title }}</option></select><div class="invalid-feedback">{{ errors.level }}</div><button type="button" class="btn btn-light-primary mt-4" :disabled="busy || !!pending || draft.level === String(user.account.accountLevel)" @click="review('level')">Review tier change</button></template></div></section><section v-if="user.account" class="card border"><form class="card-body" novalidate @submit.prevent="review('codes')"><h2 class="fs-4 mb-3">Transfer verification codes</h2><p class="text-gray-600 fs-8 mb-5">Sensitive account controls. Codes are only replaced after confirmation.</p><div v-for="key in (['cot', 'imf', 'tax'] as const)" :key="key" class="mb-4"><label :for="`control-${key}`" class="form-label text-uppercase">{{ key }}</label><input :id="`control-${key}`" v-model="draft[key]" type="password" autocomplete="new-password" class="form-control" :class="{ 'is-invalid': errors[key] }" :disabled="busy || !!pending" /><div class="invalid-feedback">{{ errors[key] }}</div></div><button type="submit" class="btn btn-light-primary" :disabled="busy || !!pending">Review code changes</button></form></section><section v-if="pending || error" class="card border border-warning" aria-live="polite"><div class="card-body"><h2 class="fs-4">Review change</h2><p v-if="pending" class="lh-lg">{{ pending.label }}</p><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p><div v-if="pending" class="d-flex gap-3"><button type="button" class="btn btn-primary" :disabled="busy" @click="confirm">{{ busy ? 'Saving…' : 'Confirm change' }}</button><button type="button" class="btn btn-light" :disabled="busy" @click="pending = null">Cancel</button></div></div></section></div></div></template>
