<script setup lang="ts">
	import type { ReferralDashboard, ReferralRules } from '~/services/referral.service';
	import { CURRENCIES } from '~/utils/app-defaults';
	const data = ref<ReferralDashboard | null>(null);
	const draft = reactive<ReferralRules>({ enabled: false, rewardPoints: 0, pointsPerUnit: 100, currency: 'USD', minWithdrawalPoints: 1, minWithdrawalAmount: 0.01 });
	const loading = ref(true), busy = ref(false);
	const error = ref(''), actionError = ref(''), success = ref('');
	const page = ref(0);
	const pending = ref<ReferralRules | null>(null);
	const rejectedId = ref(''), reason = ref('');
	const pages = computed(() => Math.max(1, Math.ceil(Math.max(data.value?.referrals.total || 0, data.value?.redemptions.total || 0) / 20)));
	const load = async () => {
		loading.value = true; error.value = '';
		try { data.value = await referralService.admin(page.value * 20); const { enabled, rewardPoints, pointsPerUnit, currency, minWithdrawalPoints, minWithdrawalAmount } = data.value.program; Object.assign(draft, { enabled, rewardPoints, pointsPerUnit, currency, minWithdrawalPoints, minWithdrawalAmount }); }
		catch { error.value = 'Unable to load referral oversight. Please try again.'; }
		finally { loading.value = false; }
	};
	onMounted(load);
	watch(draft, () => { pending.value = null; });
	const review = () => {
		actionError.value = ''; success.value = '';
		if (![draft.rewardPoints, draft.pointsPerUnit].every(value => Number.isInteger(value) && value >= 1 && value <= 1_000_000)) { actionError.value = 'Points per referral and points per currency unit must be whole numbers from 1 to 1,000,000.'; return; }
		if (!Number.isInteger(draft.minWithdrawalPoints) || draft.minWithdrawalPoints < 1 || draft.minWithdrawalPoints > 1_000_000_000 || !Number.isFinite(draft.minWithdrawalAmount) || draft.minWithdrawalAmount < 0.01 || draft.minWithdrawalAmount > 1_000_000_000 || Math.abs(draft.minWithdrawalAmount * 100 - Math.round(draft.minWithdrawalAmount * 100)) > 1e-6) { actionError.value = 'Set a positive whole-point minimum and a funds minimum with at most two decimal places.'; return; }
		pending.value = { ...draft };
	};
	const save = async () => {
		if (!pending.value || busy.value) return;
		busy.value = true; actionError.value = '';
		try { await referralService.saveProgram({ ...pending.value }); pending.value = null; await load(); success.value = 'Referral program settings saved.'; }
		catch (e) { actionError.value = (e as Error).message || 'Unable to save. Refresh before retrying.'; }
		finally { busy.value = false; }
	};
	const reject = async () => {
		if (busy.value || !rejectedId.value) return;
		if (reason.value.trim().length < 3) { actionError.value = 'Enter the reason for rejecting this referral.'; return; }
		busy.value = true; actionError.value = '';
		try { await referralService.reject(rejectedId.value, reason.value.trim()); rejectedId.value = ''; reason.value = ''; await load(); success.value = 'Referral marked ineligible. No points were awarded.'; }
		catch (e) { actionError.value = (e as Error).message; }
		finally { busy.value = false; }
	};
	const changePage = async (delta: number) => { page.value += delta; pending.value = null; await load(); };
</script>

<template>
	<div>
		<NuxtLink to="/admin/settings" class="d-inline-block mb-6 fw-semibold">← Workspace settings</NuxtLink>
		<AppPageHeader title="Referral program" description="Configure points, review referrals and trace withdrawals into customer balances."><button type="button" class="btn btn-light" :disabled="loading || busy" @click="pending = null; load()">Refresh</button></AppPageHeader>
		<p v-if="actionError" role="alert" class="alert alert-danger">{{ actionError }}</p><p v-if="success" role="status" class="alert alert-success">{{ success }}</p>
		<AppLoadState :loading="loading && !data" :error="error" @retry="load"><template v-if="data">
			<form class="card border mb-7" @submit.prevent="review"><div class="card-body">
				<h2 class="fs-3 mb-5">Reward rules</h2>
				<p class="alert alert-warning lh-lg">Points are awarded once after a referred customer’s first approved deposit. New conversion rates apply to all unredeemed points, not past withdrawals. Currency cannot change after the first award. Pausing disables withdrawals and makes referrals whose first deposit is approved during the pause ineligible; they are not backfilled later.</p>
				<fieldset :disabled="busy"><div class="form-check form-switch mb-6"><input id="referrals-enabled" v-model="draft.enabled" type="checkbox" class="form-check-input" /><label class="form-check-label" for="referrals-enabled">Enable referral rewards and withdrawals</label></div>
					<div class="row g-6"><div class="col-md-4"><label for="referrals-award" class="form-label">Points per qualifying referral</label><input id="referrals-award" v-model.number="draft.rewardPoints" type="number" min="1" max="1000000" step="1" required class="form-control" /></div><div class="col-md-4"><label for="referrals-rate" class="form-label">Points equal to 1.00 currency unit</label><input id="referrals-rate" v-model.number="draft.pointsPerUnit" type="number" min="1" max="1000000" step="1" required class="form-control" /><p class="form-text">Example: 100 points = 1.00 {{ draft.currency }}.</p></div><div class="col-md-4"><label for="referrals-currency" class="form-label">Reward currency</label><select id="referrals-currency" v-model="draft.currency" class="form-select"><option v-if="!CURRENCIES.some(item => item.code === draft.currency)" :value="draft.currency">{{ draft.currency }}</option><option v-for="currency in CURRENCIES" :key="currency.code" :value="currency.code">{{ currency.code }}</option></select><p class="form-text">Customer account currency must match; no FX.</p></div></div>
					<div class="row g-6 mt-1"><div class="col-md-6"><label for="referrals-min-points" class="form-label">Minimum points per withdrawal</label><input id="referrals-min-points" v-model.number="draft.minWithdrawalPoints" type="number" min="1" max="1000000000" step="1" required class="form-control" /></div><div class="col-md-6"><label for="referrals-min-amount" class="form-label">Minimum funds per withdrawal ({{ draft.currency }})</label><input id="referrals-min-amount" v-model.number="draft.minWithdrawalAmount" type="number" min="0.01" max="1000000000" step="0.01" required class="form-control" /></div></div><p class="form-text mt-4">Each withdrawal must meet both minimums. A converted amount is never rounded up to meet the funds minimum.</p>
					<button class="btn btn-primary mt-5" type="submit">Review reward rules</button>
				</fieldset>
				<div v-if="pending" class="border border-warning rounded-3 p-6 mt-6" aria-live="polite"><h3 class="fs-4">Confirm referral settings</h3><p>{{ pending.enabled ? 'Enable' : 'Pause' }} rewards. Award {{ pending.rewardPoints }} points per qualifying referral; {{ pending.pointsPerUnit }} points convert to 1.00 {{ pending.currency }}. Each withdrawal must be at least {{ pending.minWithdrawalPoints }} points and {{ Number(pending.minWithdrawalAmount).toFixed(2) }} {{ pending.currency }}.</p><button type="button" class="btn btn-primary me-3" :disabled="busy" @click="save">{{ busy ? 'Saving…' : 'Confirm reward rules' }}</button><button type="button" class="btn btn-light" :disabled="busy" @click="pending = null">Cancel</button></div>
			</div></form>
			<section class="card border mb-7"><div class="card-body"><h2 class="fs-3 mb-5">Referrals ({{ data.referrals.total }})</h2><p class="text-gray-600">Review suspected self-referrals and duplicate identities before approving the first deposit. Matching real-world identities requires your verification process; separate email addresses alone do not prove separate people.</p><p v-if="!data.referrals.items.length" class="text-gray-600">No referrals on this page.</p><article v-for="item in data.referrals.items" :key="item.id" class="border-bottom py-5"><div class="d-flex flex-wrap justify-content-between gap-4"><div><strong>{{ item.referrer?.name || 'Former customer' }} → {{ item.referred?.name || 'Former customer' }}</strong><p class="text-gray-600 fs-8 mb-1 text-break">{{ item.referrer?.email }} → {{ item.referred?.email }}</p><p class="fs-8 mb-0">{{ item.reason || 'Awaiting first approved deposit' }}</p></div><div><span class="badge badge-light text-capitalize">{{ item.status }}</span><span class="d-block fs-8 mt-2">{{ item.points }} points</span></div></div><button v-if="item.status === 'pending'" type="button" class="btn btn-sm btn-light-danger mt-3" :disabled="busy" @click="rejectedId = item.id; reason = ''; actionError = ''">Reject referral</button><form v-if="rejectedId === item.id" class="mt-4" @submit.prevent="reject"><label :for="`referral-reason-${item.id}`" class="form-label">Reason for rejection</label><input :id="`referral-reason-${item.id}`" v-model="reason" minlength="3" maxlength="500" required class="form-control mb-3" :disabled="busy" /><button type="submit" class="btn btn-danger me-3" :disabled="busy">Confirm rejection</button><button type="button" class="btn btn-light" :disabled="busy" @click="rejectedId = ''">Cancel</button></form></article></div></section>
			<section class="card border"><div class="card-body"><h2 class="fs-3 mb-5">Withdrawal audit ({{ data.redemptions.total }})</h2><p v-if="!data.redemptions.items.length" class="text-gray-600">No withdrawals on this page.</p><NuxtLink v-for="item in data.redemptions.items" :key="item.id" :to="`/admin/transaction/${item.transactionId}`" class="d-flex flex-wrap justify-content-between gap-4 border-bottom py-4"><span>{{ item.customer?.name || 'Former customer' }}<span class="d-block fs-8 text-gray-600">{{ new Date(item.createdAt).toLocaleString() }} · {{ item.points }} points</span></span><strong>{{ Number(item.amount).toFixed(2) }} {{ item.currency }} ↗</strong></NuxtLink></div></section>
			<nav class="d-flex justify-content-between align-items-center mt-6" aria-label="Referral oversight history pages"><button class="btn btn-light" :disabled="page === 0 || loading || busy" @click="changePage(-1)">Previous</button><span>History page {{ page + 1 }} of {{ pages }}</span><button class="btn btn-light" :disabled="page + 1 >= pages || loading || busy" @click="changePage(1)">Next</button></nav>
		</template></AppLoadState>
	</div>
</template>
