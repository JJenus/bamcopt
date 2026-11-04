<script setup lang="ts">
	withDefaults(defineProps<{ title?: string; description?: string }>(), {
		title: 'Make room for simpler banking.',
		description: 'Get a clearer view of your account, your transfers, and your next step.',
	});
	const { auth, accountPath } = usePublicSite();
</script>

<template>
	<section class="marketing-section pt-0">
		<div class="container">
			<div class="bg-light-primary rounded-4 p-8 p-lg-15 border border-primary border-opacity-10">
				<div class="row align-items-center g-7">
					<div class="col-lg-8"><h2 class="marketing-heading mb-4 text-gray-900">{{ title }}</h2><p class="text-gray-600 fs-5 mb-0">{{ description }}</p></div>
					<div class="col-lg-4 d-flex flex-wrap justify-content-lg-end gap-4">
						<NuxtLink :to="auth.isAuthenticated.value ? accountPath : '/sign-up'" class="btn btn-primary">{{ auth.isAuthenticated.value ? 'Go to your account' : 'Create account' }} <span aria-hidden="true">↗</span></NuxtLink>
						<NuxtLink to="/resources/contact-us" class="btn btn-light">Talk to us</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
