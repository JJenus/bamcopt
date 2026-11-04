<script setup lang="ts">
	usePublicSeo('Everyday digital banking', 'Explore account balances, funding instructions, transfers, and transaction history in one digital banking account.');
	const features = [
		{ icon: 'ki-wallet', title: 'An account overview that makes sense', description: 'Check your available balance and recent activity when you sign in. Find your account information without digging through paperwork.' },
		{ icon: 'ki-plus', title: 'Funding, with clear instructions', description: 'Use Add funds to see available funding accounts and instructions. Verify the details and keep your payment reference until funds are confirmed.' },
		{ icon: 'ki-send', title: 'Transfers you can follow', description: 'Review recipient details before sending, then keep the transaction reference to check its status.', to: '/transfers', linkLabel: 'How transfers work' },
		{ icon: 'ki-document', title: 'Your activity, organized', description: 'Review your transaction history, amounts, dates, and statuses. Have the relevant details at hand if you need help.' },
	];
</script>

<template>
	<div>
		<MarketingHero eyebrow="Everyday banking" title="Your day moves fast. Keep your money in view." description="Check your balance, follow funding instructions, and manage transfers from a single account overview."><NuxtLink to="/sign-up" class="btn btn-primary btn-lg">Create account <span aria-hidden="true">↗</span></NuxtLink><NuxtLink to="/resources/faq" class="btn btn-light btn-lg">Your questions, answered</NuxtLink><template #visual><MarketingAccountPreview /></template></MarketingHero>
		<section class="marketing-section pt-0"><div class="container"><h2 class="marketing-heading mb-10">The essentials. Working together.</h2><div class="row g-6"><div v-for="feature in features" :key="feature.title" class="col-md-6"><MarketingFeatureCard v-bind="feature" /></div></div></div></section>
		<section class="marketing-section bg-light"><div class="container"><div class="row g-10"><div class="col-lg-5"><span class="text-primary fw-bold text-uppercase fs-7 ls-1">Before you begin</span><h2 class="marketing-heading mt-4">A few details.<br />A better start.</h2></div><div class="col-lg-7"><div class="bg-body rounded-3 border p-8"><h3 class="fs-2 mb-5">Have your information ready</h3><ul class="text-gray-600 fs-5 lh-lg ps-6 mb-6"><li>Your full name and contact details</li><li>An email address you can access for sign-in codes</li><li>Your address, city, and country</li><li>A unique password you do not use elsewhere</li></ul><p class="text-gray-600 fs-6 mb-0">Feature availability, account limits, and any additional checks depend on your account. Confirm charges and eligibility with support before making a commitment.</p></div></div></div></div></section>
		<section class="marketing-section"><div class="container"><div class="row g-10"><div class="col-lg-5"><h2 class="marketing-heading">Know what comes next.</h2><p class="text-gray-600 fs-5">Practical answers before your first transaction.</p></div><div class="col-lg-7"><MarketingFaq :limit="6" /></div></div></div></section>
		<MarketingCta />
	</div>
</template>
