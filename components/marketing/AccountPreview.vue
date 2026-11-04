<script setup lang="ts">
	const config = useRuntimeConfig().public;
</script>

<template>
	<div class="marketing-preview-wrap">
		<div class="marketing-preview-accent bg-light-primary rounded-circle" aria-hidden="true"></div>
		<figure class="card border shadow-sm marketing-preview m-0">
			<div class="card-body p-7 p-md-9">
				<div class="d-flex align-items-center justify-content-between mb-9"><span class="fw-bold fs-4 text-gray-900">{{ config.APP }}<span class="text-primary">.</span></span><span class="badge badge-light">Product illustration</span></div>
				<div class="bg-primary rounded-3 p-7 mb-7 text-white">
					<div class="fs-7 mb-3 opacity-75">Your account, at a glance</div><div class="fs-2qx fw-bold mb-5">$12,480<span class="fs-2">.00</span></div>
					<div class="d-flex justify-content-between fs-7"><span>Available balance</span><i class="ki-outline ki-wallet fs-2 text-white" aria-hidden="true"></i></div>
				</div>
				<div class="row g-3 mb-8 text-center fs-7 fw-semibold">
					<div class="col-4"><div class="bg-light rounded p-4"><i class="ki-outline ki-plus fs-2 text-primary d-block mb-2" aria-hidden="true"></i>Add funds</div></div>
					<div class="col-4"><div class="bg-light rounded p-4"><i class="ki-outline ki-send fs-2 text-primary d-block mb-2" aria-hidden="true"></i>Transfer</div></div>
					<div class="col-4"><div class="bg-light rounded p-4"><i class="ki-outline ki-time fs-2 text-primary d-block mb-2" aria-hidden="true"></i>Activity</div></div>
				</div>
				<h2 class="fs-6 fw-bold mb-5">Recent activity</h2>
				<div class="d-flex align-items-center gap-4 py-4 border-bottom"><span class="symbol symbol-40px"><span class="symbol-label bg-light-success"><i class="ki-outline ki-arrow-down text-success fs-2" aria-hidden="true"></i></span></span><div class="flex-grow-1"><span class="d-block fw-bold">Account funding</span><span class="text-gray-600 fs-8">Confirmed</span></div><span class="fw-bold">+$1,250.00</span></div>
				<div class="d-flex align-items-center gap-4 py-4"><span class="symbol symbol-40px"><span class="symbol-label bg-light-primary"><i class="ki-outline ki-arrow-up-right text-primary fs-2" aria-hidden="true"></i></span></span><div class="flex-grow-1"><span class="d-block fw-bold">Money transfer</span><span class="text-gray-600 fs-8">Completed</span></div><span class="fw-bold">−$240.00</span></div>
				<figcaption class="text-gray-600 fs-8 mt-5">Illustrative amounts only. Not a live account or an offer.</figcaption>
			</div>
		</figure>
	</div>
</template>
