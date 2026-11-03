<script setup lang="ts">
	const money = useAppSettings().formatMoney;
	const settings = useAppSettings().settings;
	const { accounts, load } = useFunding();

	const total = computed(() => accounts.value.filter((a) => a.active).reduce((sum, a) => sum + (a.balance || 0), 0));

	onMounted(() => {
		if (!accounts.value.length) load();
	});
</script>

<template>
	<div>
		<div class="card-title mb-3 mb-lg-7">
			<span class="widget-title fw-bold fs-4">Funding Balance</span>
		</div>

		<div class="d-flex align-items-center mb-8">
			<span class="fs-3 fw-semibold text-gray-400 me-1 align-self-start">{{ settings.currencySymbol }}</span>
			<span class="page-title fs-2tx fw-bold me-2 lh-1 ls-n2">{{ money(total, false) }}</span>
		</div>

		<div class="mb-2 d-flex">
			<a
				role="button"
				class="btn btn-sm btn-danger fw-semibold me-2"
				style="background-color: #ff5d53"
				data-bs-toggle="modal"
				data-bs-target="#kt_modal_topup_admin"
			>
				Top Up User
			</a>
			<NuxtLink to="/admin/funding" class="btn btn-sm btn-primary fw-semibold me-2">Funding accounts</NuxtLink>
		</div>
	</div>
</template>
