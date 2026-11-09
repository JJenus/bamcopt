<script setup lang="ts">
	import type { ReferralDashboard, ReferralReceipt, ReferralWithdrawal } from '~/services/referral.service';
	import { referralMinor } from '~/utils/referrals';
	useAccountPage('Referrals');
	const auth = useAuth();
	const config = useRuntimeConfig().public;
	const { load: refreshAccount } = useAccountWorkspace();
	const data = ref<ReferralDashboard | null>(null);
	const loading = ref(true), busy = ref(false), uncertain = ref(false);
	const error = ref(''), actionError = ref(''), points = ref('');
	const page = ref(0);
	const review = ref<ReferralWithdrawal | null>(null);
	const receipt = ref<ReferralReceipt | null>(null);
	// Capture the owner at mount so an old response cannot clear a different login's recovery record.
	const storageKey = `referral-withdrawal:${auth.userData.value?.userId || ''}`;
	const link = computed(() => data.value?.code ? `${String(config.SITE_URL).replace(/\/$/, '')}/sign-up?ref=${data.value.code}` : '');
	const amountMinor = computed(() => /^\d+$/.test(points.value) && data.value ? referralMinor(Number(points.value), data.value.program.pointsPerUnit) : null);
	const pages = computed(() => Math.max(1, Math.ceil(Math.max(data.value?.referrals.total || 0, data.value?.redemptions.total || 0) / 20)));
	const load = async () => {
		loading.value = true; error.value = '';
		try { data.value = await referralService.get(page.value * 20); }
		catch { error.value = 'Unable to load referral rewards. Please try again.'; }
		finally { loading.value = false; }
	};
	onMounted(async () => {
		await load();
		try {
			const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
			if (saved && Number.isSafeInteger(saved.points) && saved.points > 0 && Number.isSafeInteger(saved.programVersion) && /^[a-f0-9-]{36}$/i.test(saved.requestKey)) { review.value = saved; points.value = String(saved.points); uncertain.value = true; }
		} catch { /* Storage availability is checked before submitting. */ }
	});
	watch(points, () => { if (!uncertain.value && !busy.value) review.value = null; });
	const prepare = () => {
		actionError.value = ''; receipt.value = null;
		if (!data.value?.program.enabled || amountMinor.value === null || Number(points.value) > (data.value.points || 0)) { actionError.value = 'Choose available whole points that convert to an exact amount of at least 0.01.'; return; }
		review.value = { points: Number(points.value), requestKey: crypto.randomUUID(), programVersion: data.value.program.version };
	};
	const withdraw = async () => {
		if (!review.value || busy.value) return;
		busy.value = true; actionError.value = '';
		try { sessionStorage.setItem(storageKey, JSON.stringify(review.value)); }
		catch { actionError.value = 'Browser recovery storage is unavailable. Enable it before withdrawing points.'; busy.value = false; return; }
		try {
			receipt.value = await referralService.redeem({ ...review.value });
			try { sessionStorage.removeItem(storageKey); } catch { /* Retrying the saved key still returns this receipt. */ }
			review.value = null; uncertain.value = false; points.value = '';
			await Promise.all([load(), refreshAccount()]);
		} catch (e) {
			const failure = e as { status?: number; message?: string };
			uncertain.value = !failure.status || failure.status >= 500;
			if (uncertain.value) actionError.value = 'The outcome is unconfirmed. Check this withdrawal using the same request below; do not start another one.';
			else { actionError.value = failure.message || 'Withdrawal was not accepted.'; review.value = null; try { sessionStorage.removeItem(storageKey); } catch {} await load(); }
		} finally { busy.value = false; }
	};
	const changePage = async (delta: number) => { page.value += delta; await load(); };
</script>

<template>
	<div>
		<AppPageHeader title="Invite friends. Earn points." description="Your referral rewards, from invitation to account balance."><button type="button" class="btn btn-light" :disabled="loading || busy" @click="load">Refresh</button></AppPageHeader>
		<p v-if="actionError" role="alert" class="alert alert-warning">{{ actionError }}</p>
		<p v-if="receipt" role="status" class="alert alert-success">{{ receipt.points }} points withdrawn: {{ Number(receipt.amount).toFixed(2) }} {{ receipt.currency }} credited to your balance. <NuxtLink :to="`/app/transaction/${receipt.transactionId}`">View transaction</NuxtLink></p>
		<AppLoadState :loading="loading && !data" :error="error" @retry="load"><template v-if="data">
			<p v-if="!data.program.enabled" class="alert alert-info">Referral rewards and withdrawals are paused. First deposits approved while paused will not earn points later.</p>
			<div class="row g-6 mb-7">
				<section class="col-lg-7"><div class="card border h-100"><div class="card-body p-7">
					<span class="badge badge-light-primary mb-5">Your invitation</span><h2 class="fs-2 mb-4">Share a link. Make an introduction.</h2>
					<p class="text-gray-600 lh-lg">Earn {{ data.program.rewardPoints }} points when a friend signs up with your code and their first deposit is approved while rewards are enabled. One reward per new account. Self-referrals and duplicate identities are not eligible.</p>
					<label for="referral-link" class="form-label mt-3">Your referral link</label><div class="d-flex gap-3"><input id="referral-link" class="form-control" :value="link" readonly /><AppCopyButton :value="link" label="referral link" /></div>
					<div class="d-flex align-items-center flex-wrap gap-3 mt-5"><span class="text-gray-600">Your code</span><strong class="font-monospace">{{ data.code }}</strong><AppCopyButton :value="data.code || ''" label="referral code" /></div>
				</div></div></section>
				<section class="col-lg-5"><div class="card border h-100"><div class="card-body p-7">
					<h2 class="fs-6 text-gray-600 mb-3">Available points</h2><strong class="account-balance d-block mb-5" data-testid="referral-points">{{ data.points || 0 }}</strong>
					<p class="text-gray-600 fs-7">Current rate: {{ data.program.pointsPerUnit }} points = 1.00 {{ data.program.currency }}. Rates may change before you withdraw. No currency conversion is performed.</p>
					<form @submit.prevent="prepare"><label for="withdraw-points" class="form-label">Points to withdraw to balance</label><input id="withdraw-points" v-model="points" type="text" inputmode="numeric" pattern="[0-9]+" maxlength="10" class="form-control" :disabled="busy || uncertain || !data.program.enabled" /><p class="form-text">{{ amountMinor === null ? 'Choose points that convert to whole cents, with no rounding.' : `You will receive ${(amountMinor / 100).toFixed(2)} ${data.program.currency}.` }}</p><button type="submit" class="btn btn-primary w-100" :disabled="busy || uncertain || !data.program.enabled">Review withdrawal</button></form>
					<div v-if="review" class="border rounded-3 p-5 mt-5" aria-live="polite"><p>{{ uncertain ? 'Recover your pending withdrawal. The same request cannot credit twice.' : `Withdraw ${review.points} points into your account balance?` }}</p><div class="d-flex gap-3"><button type="button" class="btn btn-primary" :disabled="busy" @click="withdraw">{{ busy ? 'Checking…' : uncertain ? 'Check withdrawal' : 'Confirm withdrawal' }}</button><button v-if="!uncertain" type="button" class="btn btn-light" :disabled="busy" @click="review = null">Cancel</button></div></div>
				</div></div></section>
			</div>
			<section class="card border mb-7"><div class="card-body"><h2 class="fs-3 mb-5">Your referrals <span class="text-gray-600 fs-6">({{ data.referrals.total }})</span></h2><p v-if="!data.referrals.items.length" class="text-gray-600">No referrals on this page yet.</p><div v-for="item in data.referrals.items" :key="item.id" class="d-flex flex-wrap justify-content-between gap-3 border-bottom py-4"><div><strong>{{ item.name }}</strong><span class="d-block fs-8 text-gray-600">{{ new Date(item.createdAt).toLocaleDateString() }}</span></div><div class="text-end"><span class="badge text-capitalize" :class="item.status === 'awarded' ? 'badge-light-success' : item.status === 'pending' ? 'badge-light-warning' : 'badge-light'">{{ item.status }}</span><span class="d-block fs-8 mt-2">{{ item.points }} points</span></div></div></div></section>
			<section class="card border"><div class="card-body"><h2 class="fs-3 mb-5">Withdrawal history</h2><p v-if="!data.redemptions.items.length" class="text-gray-600">No withdrawals on this page yet.</p><NuxtLink v-for="item in data.redemptions.items" :key="item.id" :to="`/app/transaction/${item.transactionId}`" class="d-flex flex-wrap justify-content-between gap-3 border-bottom py-4"><span>{{ item.points }} points<span class="d-block fs-8 text-gray-600">{{ new Date(item.createdAt).toLocaleString() }}</span></span><strong>{{ Number(item.amount).toFixed(2) }} {{ item.currency }} ↗</strong></NuxtLink></div></section>
			<nav class="d-flex justify-content-between align-items-center mt-6" aria-label="Referral and withdrawal history pages"><button class="btn btn-light" :disabled="page === 0 || loading || busy" @click="changePage(-1)">Previous</button><span>History page {{ page + 1 }} of {{ pages }}</span><button class="btn btn-light" :disabled="page + 1 >= pages || loading || busy" @click="changePage(1)">Next</button></nav>
		</template></AppLoadState>
	</div>
</template>
