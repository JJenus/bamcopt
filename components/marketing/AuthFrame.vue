<script setup lang="ts">
	defineProps<{ eyebrow: string; title: string; description: string }>();
</script>

<template>
	<div class="container"><div class="row align-items-start g-10 g-lg-15 justify-content-between"><aside class="col-lg-5 d-none d-lg-block pt-10"><span class="text-primary text-uppercase fw-bold fs-7 ls-1">Your money. A clearer picture.</span><h2 class="marketing-heading mt-6 mb-7">A little less friction.<br />A lot more perspective.</h2><p class="text-gray-600 fs-5 lh-lg mb-8">Your account, transfers, and activity. Together in a simpler digital experience.</p><div class="bg-light-primary rounded-3 p-8"><i class="ki-outline ki-shield-tick text-primary fs-3x mb-5 d-block" aria-hidden="true"></i><p class="text-gray-700 fs-6 lh-lg mb-0">Keep your password and sign-in codes to yourself. Only enter them on the page you opened directly.</p></div></aside><section class="col-lg-6"><div class="marketing-auth-panel mx-auto"><span class="text-primary text-uppercase fw-bold fs-7 ls-1">{{ eyebrow }}</span><h1 class="fs-2qx fw-bold mt-4 mb-4">{{ title }}</h1><p class="text-gray-600 fs-5 lh-lg mb-8">{{ description }}</p><div class="card border"><div class="card-body p-7 p-md-9"><slot /></div></div></div></section></div></div>
</template>
