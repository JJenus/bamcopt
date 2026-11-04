<script setup lang="ts">
	const { user, account } = useAccountWorkspace();
	const tiers = useAppSettings().accountLevels;
	const higher = computed(() => tiers.value.filter(tier => tier.accountLevel > account.value.accountLevel));
	const selected = ref('');
	const busy = ref(false);
	const error = ref('');
	const fieldError = ref('');
	const sent = ref(false);
	const submit = async () => {
		if (busy.value) return;
		error.value = ''; fieldError.value = '';
		const tier = higher.value.find(item => String(item.accountLevel) === selected.value);
		if (!tier) { fieldError.value = 'Choose an available account level.'; return; }
		busy.value = true;
		try {
			const contacts = (await userService.list()).filter(item => item.userType === 'admin');
			if (!contacts.length) { error.value = 'No support recipient is available. Please use Help & support.'; return; }
			const results = await Promise.allSettled(contacts.map(contact => notificationService.send({ userId: contact.id, title: 'Account level enquiry', message: `${user.value.name} (${user.value.email}) asks about ${tier.title} (level ${tier.accountLevel}). Current level: ${account.value.accountLevel}. No account changes have been made.`, type: 'info', entityType: 'user', entityId: user.value.id })));
			if (!results.some(result => result.status === 'fulfilled')) { error.value = 'We could not send your enquiry. Please try again or contact support.'; return; }
			sent.value = true;
			successAlert('Your account-level enquiry was sent to support.');
		} catch { error.value = 'Unable to send your enquiry. Please contact support.'; }
		finally { busy.value = false; }
	};
</script>

<template>
	<section class="card border"><div class="card-body p-7"><h2 class="fs-3 mb-4">Considering a different account level?</h2><p class="text-gray-600 lh-lg mb-6">Send an enquiry to support about eligibility and requirements. Sending a message does not change your account level or confirm approval.</p><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p><div v-if="sent" role="status" class="alert alert-success mb-0">Your enquiry was sent. Your current account level is unchanged. Contact support for updates.</div><form v-else-if="higher.length" class="row g-4 align-items-end" novalidate :aria-busy="busy" @submit.prevent="submit"><div class="col-md-8"><label for="account-level-enquiry" class="form-label">Account level</label><select id="account-level-enquiry" v-model="selected" class="form-select" :class="{ 'is-invalid': fieldError }" :aria-invalid="!!fieldError" aria-describedby="level-feedback" :disabled="busy" @change="fieldError = ''"><option value="">Choose a level</option><option v-for="tier in higher" :key="tier.accountLevel" :value="String(tier.accountLevel)">{{ tier.title }}</option></select><div id="level-feedback" class="invalid-feedback">{{ fieldError }}</div></div><div class="col-md-4"><button type="submit" class="btn btn-light-primary w-100" :disabled="busy">{{ busy ? 'Sending…' : 'Send enquiry' }}</button></div></form><NuxtLink v-else to="/app/help" class="btn btn-light-primary">Ask support about your account</NuxtLink><p class="text-gray-600 fs-8 lh-lg mt-6 mb-0">Do not upload or email identity documents here. Ask support about an approved secure verification process if additional checks are required.</p></div></section>
</template>
