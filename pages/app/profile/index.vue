<script setup lang="ts">
	useAccountPage('Personal details');
	const { user, state } = useAccountWorkspace();
	const details = computed(() => [
		['Full name', user.value.name], ['Email address', user.value.email], ['Phone number', user.value.phone],
		['Street address', user.value.address], ['City', user.value.city], ['Country', user.value.country],
	]);
</script>

<template><div><NuxtLink to="/app/settings" class="d-inline-block fw-semibold fs-7 mb-6">← Settings</NuxtLink><AppPageHeader title="Personal details" description="The information associated with your account."><NuxtLink to="/app/profile/edit" class="btn btn-primary">Edit details</NuxtLink></AppPageHeader><section class="card border"><div class="card-body p-7 p-lg-9"><div class="d-flex align-items-center gap-5 border-bottom pb-7 mb-3"><AppAvatar :src="user.imgUrl" :size="72" /><div><h2 class="fs-3 mb-3">{{ user.name || 'Your profile' }}</h2><span :class="['badge', user.emailVerified ? 'badge-light-success' : 'badge-light-warning']">{{ user.emailVerified ? 'Email confirmed' : 'Email not confirmed' }}</span></div></div><dl class="mb-0"><div v-for="[label, value] in details" :key="label" class="row g-3 py-5 border-bottom"><dt class="col-sm-4 fw-normal text-gray-600">{{ label }}</dt><dd class="col-sm-8 fw-semibold mb-0 text-break">{{ value || (state.loading ? 'Loading…' : 'Not provided') }}</dd></div></dl></div></section><p class="text-gray-600 fs-7 lh-lg mt-6 mb-0">For changes to your account email or verification details, <NuxtLink to="/app/help">contact support</NuxtLink>. Verification status is managed by the service.</p></div></template>
