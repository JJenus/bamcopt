<script setup lang="ts">
	import type { Transaction } from '~/utils/interfaces/Transaction';
	import { parseTransferAmount } from '~/utils/account-ui';
	useAccountPage('Transfer');
	const { state, user, account, load } = useAccountWorkspace();
	const { money, currencyCode } = useAccountMoney();
	const settings = useAppSettings().settings;
	const config = useRuntimeConfig().public;
	const step = ref(0);
	const kind = ref('internal');
	const recipientEmail = ref('');
	const recipient = ref<{ id: string; name: string; email: string } | null>(null);
	const draft = reactive({ name: '', destination: '', bank: '', amount: '', note: '' });
	const errors = ref<Record<string, string>>({});
	const searching = ref(false);
	const busy = ref(false);
	const uncertain = ref(false);
	const result = ref<Transaction | null>(null);
	const codeInput = ref('');
	const codeIndex = ref(0);
	const codes = ref({ cot: '', imf: '', tax: '' });
	const verification = [
		{ key: 'cot', label: 'Exchange code' }, { key: 'imf', label: 'IMF code' }, { key: 'tax', label: 'Tax code' },
	] as const;
	const destinations = computed(() => [
		{ value: 'internal', label: `${config.APP} account` }, { value: 'bank', label: 'Bank account' },
		{ value: 'paypal', label: 'PayPal' }, { value: 'skrill', label: 'Skrill' }, { value: 'mbway', label: 'MB Way' },
	]);
	const destinationLabel = computed(() => destinations.value.find(item => item.value === kind.value)?.label || '');
	const decimal = computed(() => settings.value.defaultBaseCurrency === 'USD' ? '.' : ',');
	const amount = computed(() => parseTransferAmount(draft.amount, decimal.value));
	const recipientName = computed(() => kind.value === 'internal' ? recipient.value?.name || '' : draft.name.trim());
	const destination = computed(() => kind.value === 'internal' ? recipient.value?.email || '' : draft.destination.trim());
	const blocked = computed(() => !state.value.ready || !currencyCode.value || !!state.value.error || user.value.status?.toUpperCase() === 'HOLD' || String(account.value.status).toLowerCase() !== 'active');
	const clearCodes = () => { codes.value = { cot: '', imf: '', tax: '' }; codeIndex.value = 0; codeInput.value = ''; };
	watch([kind, recipientEmail, () => draft.name, () => draft.destination, () => draft.bank, () => draft.amount, () => draft.note], () => {
		clearCodes();
		errors.value = {};
	});
	watch(recipientEmail, () => { recipient.value = null; });
	watch(kind, () => { recipient.value = null; draft.destination = ''; draft.name = ''; draft.bank = ''; });
	const lookup = async () => {
		if (searching.value || busy.value) return;
		errors.value = {};
		recipient.value = null;
		const email = recipientEmail.value.trim().toLowerCase();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errors.value.email = 'Enter a valid account email address.'; return; }
		searching.value = true;
		try {
			const found = await userService.findByEmail(email);
			if (recipientEmail.value.trim().toLowerCase() !== email || kind.value !== 'internal') return;
			if (found.id === user.value.id) { errors.value.email = 'Choose an account other than your own.'; return; }
			recipient.value = { id: found.id, name: found.name, email: found.email };
		} catch { errors.value.email = 'We could not find that recipient. Check the email and try again.'; }
		finally { searching.value = false; }
	};
	const next = () => {
		errors.value = {};
		if (step.value === 0) {
			if (kind.value === 'internal' && !recipient.value) errors.value.email = 'Find and confirm the recipient before continuing.';
			if (kind.value !== 'internal') {
				if (!draft.name.trim()) errors.value.name = 'Enter the recipient name.';
				if (!draft.destination.trim()) errors.value.destination = 'Enter the destination account or address.';
				if (['paypal', 'skrill'].includes(kind.value) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.destination.trim())) errors.value.destination = 'Enter a valid destination email address.';
				if (kind.value === 'bank' && !draft.bank.trim()) errors.value.bank = 'Enter the bank name.';
			}
		} else if (step.value === 1) {
			if (amount.value === null) errors.value.amount = `Enter a positive amount with up to two decimal places using ${decimal.value === '.' ? 'a dot' : 'a comma'}.`;
			else if (amount.value > Number(account.value.amount || 0)) errors.value.amount = 'The amount is greater than your available balance.';
		}
		if (Object.keys(errors.value).length) return;
		step.value = Math.min(3, step.value + 1);
	};
	const verify = async () => {
		if (busy.value || codeIndex.value >= verification.length) return;
		errors.value = {};
		if (!codeInput.value.trim()) { errors.value.code = 'Enter the required verification code.'; return; }
		busy.value = true;
		const current = verification[codeIndex.value];
		try {
			await transactionService.verifyCode(current.key, codeInput.value.trim());
			codes.value[current.key] = codeInput.value.trim();
			codeInput.value = '';
			codeIndex.value++;
		} catch (error) { errors.value.code = (error as { status?: number; message?: string }).status === 422 ? 'This code was not accepted. Check it and try again.' : 'Unable to verify this code. Check the code and try again.'; }
		finally { busy.value = false; }
	};
	const send = async () => {
		if (busy.value || uncertain.value || result.value) return;
		errors.value = {};
		if (blocked.value) { errors.value.form = 'Your account is not ready to transfer. Refresh your account or contact support.'; return; }
		if (amount.value === null || amount.value > Number(account.value.amount || 0)) { errors.value.form = 'Review your amount and balance before sending.'; step.value = 1; clearCodes(); return; }
		if (!recipientName.value || !destination.value || (kind.value === 'internal' && !recipient.value)) { errors.value.form = 'Review your recipient details before sending.'; step.value = 0; clearCodes(); return; }
		if (verification.some(item => !codes.value[item.key])) return;
		busy.value = true;
		try {
			result.value = await transactionService.send({
				amount: amount.value, type: kind.value === 'internal' ? 'send' : 'debit',
				notes: draft.note.trim() || undefined,
				beneficiary: { name: recipientName.value, destinationAccount: destination.value, bank: kind.value === 'bank' ? draft.bank.trim() : kind.value === 'internal' ? String(config.APP) : destinationLabel.value, ...(kind.value === 'internal' ? { userId: recipient.value!.id } : {}) },
				codes: { ...codes.value },
			});
			clearCodes();
			successAlert('Your transaction record is ready. Review its status below.');
			await load();
		} catch (error) {
			const failure = error as { status?: number; message?: string };
			if (!failure.status || failure.status >= 500) {
				uncertain.value = true;
				clearCodes();
				await load();
			} else {
				errors.value.form = failure.message || 'The transfer was not accepted. Review your details and try again.';
				clearCodes();
			}
		} finally { busy.value = false; }
	};
	const back = () => { if (busy.value) return; step.value = Math.max(0, step.value - 1); errors.value = {}; clearCodes(); };
	const startAgain = () => { result.value = null; step.value = 0; recipient.value = null; recipientEmail.value = ''; Object.assign(draft, { name: '', destination: '', bank: '', amount: '', note: '' }); clearCodes(); errors.value = {}; };
	onUnmounted(clearCodes);
</script>

<template>
	<div><AppPageHeader title="Transfer" description="Check the details. Review your amount. Keep the reference." />
		<div v-if="uncertain" class="card border"><div class="card-body p-8"><i class="ki-outline ki-information-5 text-warning fs-4x d-block mb-6" aria-hidden="true"></i><h2 class="fs-2 mb-5">We could not confirm the outcome.</h2><p class="text-gray-700 lh-lg mb-7" role="alert">Your request may have reached the server. Do not send it again until you have checked your activity and balance. Contact support if the outcome is still unclear.</p><div class="d-flex flex-wrap gap-4"><NuxtLink to="/app/transactions" class="btn btn-primary">Check activity</NuxtLink><NuxtLink to="/app/help" class="btn btn-light">Contact support</NuxtLink></div></div></div>
		<div v-else-if="result" class="card border"><div class="card-body p-8"><span class="badge text-capitalize mb-6" :class="result.status === 'completed' ? 'badge-light-success' : result.status === 'failed' ? 'badge-light-danger' : 'badge-light-warning'">{{ result.status || 'Recorded' }}</span><h2 class="fs-2 mb-5">Your transaction is recorded.</h2><p class="account-balance mb-3">{{ money(result.amount) }}</p><p class="text-gray-600 mb-7">To {{ result.beneficiary?.name || recipientName }} · {{ currencyCode }}</p><div class="bg-light p-6 rounded-3 mb-7"><span class="text-gray-600 fs-7 d-block mb-3">Transaction reference</span><div class="d-flex flex-wrap align-items-center gap-4"><strong class="text-break">{{ result.transactionId || 'See your activity' }}</strong><AppCopyButton v-if="result.transactionId" :value="result.transactionId" label="transaction reference" /></div></div><p class="text-gray-600 lh-lg fs-7 mb-7">The status above is the recorded account status. For external destinations, confirm receipt with the recipient; it is not a delivery guarantee from an external payment provider.</p><div class="d-flex flex-wrap gap-4"><NuxtLink to="/app/transactions" class="btn btn-primary">View activity</NuxtLink><button type="button" class="btn btn-light" @click="startAgain">Start a new transfer</button></div></div></div>
		<template v-else><div v-if="blocked" class="alert alert-warning lh-lg" role="alert">{{ !state.ready ? 'Your account must finish loading before you can transfer.' : 'Transfers are unavailable while your account needs attention. Refresh your data or contact support.' }} <NuxtLink to="/app/help">Get help</NuxtLink></div><div class="row g-6"><div class="col-xl-8"><section class="card border"><div class="card-body p-7 p-lg-9"><ol class="list-unstyled d-flex flex-wrap gap-5 mb-9" aria-label="Transfer progress"><li v-for="(label, index) in ['Recipient', 'Amount', 'Review', 'Verify']" :key="label" class="d-flex align-items-center gap-2 fs-8" :aria-current="step === index ? 'step' : undefined"><span class="account-step" :class="{ active: step === index }">{{ index + 1 }}</span><span :class="step === index ? 'fw-bold text-gray-900' : 'text-gray-600'">{{ label }}</span></li></ol>
					<p v-if="errors.form" role="alert" class="alert alert-danger">{{ errors.form }}</p>
					<form v-if="step === 0" novalidate @submit.prevent="next"><fieldset :disabled="busy || blocked"><legend class="fs-2 fw-bold mb-6">Who are you sending to?</legend><div class="mb-6"><label for="transfer-kind" class="form-label">Destination type</label><select id="transfer-kind" v-model="kind" class="form-select" :disabled="searching"><option v-for="item in destinations" :key="item.value" :value="item.value">{{ item.label }}</option></select></div><template v-if="kind === 'internal'"><label for="recipient-email" class="form-label">Recipient account email</label><div class="d-flex gap-3 align-items-start"><div class="flex-grow-1"><input id="recipient-email" v-model="recipientEmail" name="recipientEmail" type="email" autocomplete="off" maxlength="254" class="form-control" :class="{ 'is-invalid': errors.email }" :aria-invalid="!!errors.email" aria-describedby="recipient-email-feedback" /><div id="recipient-email-feedback" class="invalid-feedback">{{ errors.email }}</div></div><button type="button" class="btn btn-light-primary" :disabled="searching" @click="lookup">{{ searching ? 'Finding…' : 'Find' }}</button></div><p v-if="recipient" class="alert alert-success mt-5 mb-0" role="status">Recipient found: <strong>{{ recipient.name }}</strong>. Check this is who you intend to pay.</p></template><template v-else><div class="mb-6"><label for="recipient-name" class="form-label">Recipient name</label><input id="recipient-name" v-model="draft.name" maxlength="254" class="form-control" :class="{ 'is-invalid': errors.name }" :aria-invalid="!!errors.name" aria-describedby="recipient-name-feedback" /><div id="recipient-name-feedback" class="invalid-feedback">{{ errors.name }}</div></div><div v-if="kind === 'bank'" class="mb-6"><label for="recipient-bank" class="form-label">Bank name</label><input id="recipient-bank" v-model="draft.bank" maxlength="254" class="form-control" :class="{ 'is-invalid': errors.bank }" :aria-invalid="!!errors.bank" aria-describedby="recipient-bank-feedback" /><div id="recipient-bank-feedback" class="invalid-feedback">{{ errors.bank }}</div></div><label for="recipient-destination" class="form-label">{{ kind === 'bank' ? 'Destination account' : kind === 'mbway' ? 'Destination phone number' : 'Destination email' }}</label><input id="recipient-destination" v-model="draft.destination" :type="['paypal', 'skrill'].includes(kind) ? 'email' : kind === 'mbway' ? 'tel' : 'text'" maxlength="254" class="form-control" :class="{ 'is-invalid': errors.destination }" :aria-invalid="!!errors.destination" aria-describedby="recipient-destination-feedback" /><div id="recipient-destination-feedback" class="invalid-feedback">{{ errors.destination }}</div><p class="fs-8 text-gray-600 lh-lg mt-5 mb-0">This records an external-destination transfer. The app does not directly connect to these payment providers.</p></template><button type="submit" class="btn btn-primary w-100 mt-8" :disabled="searching">Continue to amount</button></fieldset></form>
					<form v-else-if="step === 1" novalidate @submit.prevent="next"><fieldset :disabled="busy || blocked"><legend class="fs-2 fw-bold mb-6">How much would you like to send?</legend><label for="transfer-amount" class="form-label">Amount <span v-if="currencyCode">({{ currencyCode }})</span></label><input id="transfer-amount" v-model="draft.amount" name="amount" type="text" inputmode="decimal" autocomplete="off" maxlength="18" class="form-control form-control-lg fs-2" :class="{ 'is-invalid': errors.amount }" :aria-invalid="!!errors.amount" aria-describedby="transfer-amount-feedback transfer-amount-help" /><div id="transfer-amount-feedback" class="invalid-feedback">{{ errors.amount }}</div><p id="transfer-amount-help" class="text-gray-600 fs-8 mt-3 mb-7">Use {{ decimal === '.' ? 'a dot' : 'a comma' }} for decimals, with no thousands separators. Available: {{ money(account.amount || 0) }}.</p><label for="transfer-note" class="form-label">Note <span class="text-gray-600">(optional)</span></label><input id="transfer-note" v-model="draft.note" maxlength="250" class="form-control" /><div class="d-flex gap-4 mt-8"><button type="button" class="btn btn-light" @click="back">Back</button><button type="submit" class="btn btn-primary flex-grow-1">Review transfer</button></div></fieldset></form>
					<div v-else-if="step === 2"><h2 class="fs-2 mb-6">Check every detail.</h2><dl class="mb-7"><dt class="fw-normal text-gray-600 mb-2">Recipient</dt><dd class="fw-bold fs-5 mb-6">{{ recipientName }}</dd><dt class="fw-normal text-gray-600 mb-2">Destination</dt><dd class="fw-bold text-break mb-6">{{ destinationLabel }}<br />{{ destination }}</dd><dt class="fw-normal text-gray-600 mb-2">Amount</dt><dd class="fw-bold fs-2 mb-6">{{ money(amount || 0) }} {{ currencyCode }}</dd><template v-if="draft.note"><dt class="fw-normal text-gray-600 mb-2">Note</dt><dd class="text-break">{{ draft.note }}</dd></template></dl><p class="text-gray-600 fs-7 lh-lg">No transfer has been submitted yet. Complete the required verification, then confirm the final send.</p><div class="d-flex gap-4 mt-8"><button type="button" class="btn btn-light" @click="back">Back</button><button type="button" class="btn btn-primary flex-grow-1" :disabled="blocked" @click="next">Continue to verification</button></div></div>
					<form v-else-if="codeIndex < verification.length" novalidate :aria-busy="busy" @submit.prevent="verify"><h2 class="fs-2 mb-4">Required transfer verification</h2><p class="text-gray-600 lh-lg fs-7 mb-6">Step {{ codeIndex + 1 }} of {{ verification.length }}. These are the transfer codes configured for your account, not your email sign-in code. If you do not have them, contact support.</p><label for="transfer-code" class="form-label">{{ verification[codeIndex].label }}</label><input id="transfer-code" v-model="codeInput" type="password" autocomplete="off" maxlength="100" class="form-control" :class="{ 'is-invalid': errors.code }" :aria-invalid="!!errors.code" aria-describedby="transfer-code-feedback" :disabled="busy" @input="errors.code = ''" /><div id="transfer-code-feedback" class="invalid-feedback">{{ errors.code }}</div><div class="d-flex gap-4 mt-8"><button type="button" class="btn btn-light" :disabled="busy" @click="back">Back</button><button type="submit" class="btn btn-primary flex-grow-1" :disabled="busy || blocked">{{ busy ? 'Verifying…' : 'Verify code' }}</button></div></form>
					<div v-else><h2 class="fs-2 mb-5">Ready for your final confirmation.</h2><p class="text-gray-700 lh-lg mb-7">Send <strong>{{ money(amount || 0) }}</strong> to <strong>{{ recipientName }}</strong>? Submitting will attempt the transfer using the details you reviewed.</p><div class="d-flex gap-4"><button type="button" class="btn btn-light" :disabled="busy" @click="back">Back</button><button type="button" class="btn btn-primary flex-grow-1" :disabled="busy || blocked" @click="send">{{ busy ? 'Submitting transfer…' : `Send ${money(amount || 0)}` }}</button></div><p v-if="busy" class="text-gray-600 fs-8 mt-5 mb-0" role="status">Please stay on this page while your transfer is submitted.</p></div>
				</div></section></div><div class="col-xl-4"><aside class="card border"><div class="card-body p-7"><i class="ki-outline ki-shield-tick fs-3x text-primary d-block mb-6" aria-hidden="true"></i><h2 class="fs-3 mb-4">A moment to check.</h2><ul class="text-gray-600 lh-lg fs-7 ps-5 mb-6"><li>Confirm the recipient through a trusted channel.</li><li>Check the account details and amount.</li><li>Do not repeat a transfer with an unclear outcome.</li><li>Never share your password or sign-in code.</li></ul><NuxtLink to="/app/help" class="fw-semibold">Help with transfers <span aria-hidden="true">↗</span></NuxtLink></div></aside></div></div></template>
	</div>
</template>
