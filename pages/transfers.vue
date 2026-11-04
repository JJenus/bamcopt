<script setup lang="ts">
	usePublicSeo('Money transfers', 'Understand how to prepare a transfer, check recipient details, and track your transaction status.');
	const steps = [
		{ title: 'Choose the recipient', description: 'Enter the destination account, recipient name, and bank details. Confirm the details with the recipient, especially if instructions have changed.' },
		{ title: 'Review and confirm', description: 'Check the amount and destination before submitting. Complete the account checks shown in your transfer flow. Never give your password or sign-in code to another person.' },
		{ title: 'Keep your reference', description: 'Find the transaction in your activity. Save its reference so you can check the public receipt or discuss the transfer with support.' },
	];
</script>

<template>
	<div>
		<MarketingHero eyebrow="Money movement" title="A clearer path from sent to received." description="Prepare your transfer, check the details, and stay informed about its progress. A little clarity at every step."><NuxtLink to="/sign-in" class="btn btn-primary btn-lg">Sign in to transfer <span aria-hidden="true">↗</span></NuxtLink><NuxtLink to="/track/transaction" class="btn btn-light btn-lg">Track a transaction</NuxtLink></MarketingHero>
		<section class="marketing-section pt-0"><div class="container"><div class="row g-6"><div v-for="(step, i) in steps" :key="step.title" class="col-md-4"><article class="border rounded-3 p-8 h-100"><span class="marketing-step text-primary fw-bold d-block mb-7">0{{ i + 1 }}</span><h2 class="fs-2 mb-5">{{ step.title }}</h2><p class="text-gray-600 fs-6 lh-lg mb-0">{{ step.description }}</p></article></div></div></div></section>
		<section class="marketing-section bg-light"><div class="container"><div class="row g-10 align-items-center"><div class="col-lg-6"><h2 class="marketing-heading mb-6">A status you can check.<br />A reference you can keep.</h2><p class="text-gray-600 fs-5 lh-lg mb-7">Awaiting and processing mean a transfer has not yet completed. Check the latest receipt before assuming delivery or sending again.</p><NuxtLink to="/resources/guides/understanding-transfers" class="fw-bold fs-5">Understand transfer statuses <span aria-hidden="true">↗</span></NuxtLink></div><div class="col-lg-6"><div class="card border"><div class="card-body p-9"><h3 class="fs-2 mb-6">Before you send</h3><ul class="text-gray-600 fs-5 lh-lg ps-6 mb-0"><li>Double-check recipient and account details.</li><li>Review your available balance and account limits.</li><li>Confirm applicable terms and charges.</li><li>Keep your reference private; it can open a public receipt.</li><li>Contact support about delays before retrying a payment.</li></ul></div></div></div></div></div></section>
		<section class="marketing-section"><div class="container"><p class="text-gray-600 fs-6 lh-lg mb-0">Transfer availability and timing depend on the destination, account settings, and required checks. No specific delivery time, exchange rate, or fee is promised on this page.</p></div></section>
		<MarketingCta title="Keep your next transfer in view." />
	</div>
</template>
