<script setup lang="ts">
	useAccountPage('Deposit requests');
</script>
<template><div><NuxtLink to="/app/add-funds" class="d-inline-block fw-semibold mb-6">← Add funds</NuxtLink><AppPageHeader title="Deposit requests" description="Track pending verification, approved credits and rejected requests."><NuxtLink to="/app/add-funds" class="btn btn-primary">New deposit</NuxtLink></AppPageHeader><FundingDepositHistory /></div></template>
