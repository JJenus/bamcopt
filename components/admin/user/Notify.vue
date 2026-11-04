<script setup lang="ts">
	import type { IUser } from '~/utils/interfaces/IUser';
	const props = defineProps<{ user: IUser }>();
	const title = ref(''); const message = ref(''); const busy = ref(false); const review = ref(false);
	const error = ref(''); const errors = ref<Record<string, string>>({});
	const submit = async () => {
		if (busy.value) return;
		errors.value = {}; error.value = '';
		if (!title.value.trim()) errors.value.title = 'Enter a title.';
		if (message.value.trim().length < 3) errors.value.message = 'Enter at least three characters.';
		if (Object.keys(errors.value).length) return;
		if (!review.value) { review.value = true; return; }
		busy.value = true;
		try { await notificationService.send({ userId: props.user.id, title: title.value.trim(), message: message.value.trim(), type: 'info' }); title.value = ''; message.value = ''; review.value = false; successAlert('Notification sent.'); }
		catch { error.value = 'Unable to confirm delivery. Check before sending the message again.'; }
		finally { busy.value = false; }
	};
</script>
<template><form class="card border" novalidate @submit.prevent="submit"><div class="card-body"><h2 class="fs-3 mb-3">Send account notification</h2><p class="text-gray-600 mb-6">An in-app message to {{ user.email }}. This does not send an email or change the account.</p><p v-if="error" role="alert" class="alert alert-danger">{{ error }}</p><label for="notify-title" class="form-label">Title</label><input id="notify-title" v-model="title" class="form-control" :class="{ 'is-invalid': errors.title }" :disabled="busy || review" maxlength="200" /><div class="invalid-feedback">{{ errors.title }}</div><label for="notify-message" class="form-label mt-5">Message</label><textarea id="notify-message" v-model="message" class="form-control" :class="{ 'is-invalid': errors.message }" :disabled="busy || review" rows="5" maxlength="5000"></textarea><div class="invalid-feedback">{{ errors.message }}</div><p v-if="review" class="alert alert-warning mt-6">Review the recipient and message above. Confirm to send.</p><div class="d-flex gap-4 mt-6"><button type="submit" class="btn btn-primary" :disabled="busy">{{ busy ? 'Sending…' : review ? 'Confirm and send' : 'Review notification' }}</button><button v-if="review" type="button" class="btn btn-light" :disabled="busy" @click="review = false">Back to edit</button></div></div></form></template>
