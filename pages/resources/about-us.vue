<script setup lang="ts">
	const { config } = usePublicSite();
	usePublicSeo('About us', 'Discover our approach to clear, practical digital banking, account management, and transfer visibility.');
	const principles = [
		{ icon: 'ki-eye', title: 'Clarity over complexity', description: 'Account information should be easy to find and easy to understand. We focus on the details that help you make your next decision.' },
		{ icon: 'ki-monitor-mobile', title: 'Useful by design', description: 'Balances, funding instructions, transfers, and activity belong together. Our digital experience brings those everyday tasks into one place.' },
		{ icon: 'ki-message-text', title: 'Help with a next step', description: 'From a first sign-in to a question about a transfer, our guides and support details give you somewhere to start.' },
	];
</script>

<template>
	<div>
		<MarketingHero :eyebrow="`About ${config.APP}`" title="Less complexity. More perspective." :description="`${config.APP} brings everyday account management and transfer visibility together. Our aim is straightforward: help you understand your money and take your next step with more clarity.`"><NuxtLink to="/banking" class="btn btn-primary btn-lg">Explore what you can do <span aria-hidden="true">↗</span></NuxtLink></MarketingHero>
		<section class="marketing-section pt-0"><div class="container"><img src="/assets/media/banking/flat-lay-business-concept_53876-24738.jpg" alt="A workspace for planning and reviewing finances" class="marketing-photo rounded-4 mb-12" width="1200" height="380" loading="lazy" /><h2 class="marketing-heading mb-9">The principles behind the experience.</h2><div class="row g-6"><div v-for="principle in principles" :key="principle.title" class="col-md-4"><MarketingFeatureCard v-bind="principle" /></div></div></div></section>
		<MarketingCta title="Get to know your next account." description="Explore the essentials, read the guides, or ask us a question before you begin." />
	</div>
</template>
