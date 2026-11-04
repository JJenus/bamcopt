<script setup lang="ts">
	const transactions = userData().transactions;
	const { stats, load } = useUserStats();
	const money = useAppSettings().formatMoney;
	const symbol = computed(() => useAppSettings().settings.value.currencySymbol);
	const fmt = (n: number) => `${symbol.value}${money(n || 0, false)}`;

	load();
</script>

<template>
	<div class="card card-custom border-0 min-h-500px h-md-100 mb-5 mb-lg-10">
		<div class="card-body ps-xl-15">
			<h1 class="text-center h1 pt-4 fw-bold mb-8">Transactions</h1>
			<div class="row g-3 mb-8">
				<div class="col-6 col-md-4"><StatCard label="Received" :value="fmt(stats.received)" icon="ki-duotone ki-double-left" tone="success" /></div>
				<div class="col-6 col-md-4"><StatCard label="Sent" :value="fmt(stats.sent)" icon="ki-duotone ki-double-right" tone="danger" /></div>
				<div class="col-6 col-md-4"><StatCard label="Net" :value="fmt(stats.net)" icon="ki-outline ki-chart-line-up" tone="info" /></div>
				<div class="col-6 col-md-4"><StatCard label="Received this month" :value="fmt(stats.monthReceived)" icon="ki-outline ki-calendar" tone="success" /></div>
				<div class="col-6 col-md-4"><StatCard label="Sent this month" :value="fmt(stats.monthSent)" icon="ki-outline ki-calendar" tone="danger" /></div>
				<div class="col-6 col-md-4"><StatCard label="Pending" :value="`${stats.pending} of ${stats.count}`" icon="ki-outline ki-time" tone="warning" /></div>
			</div>

			<div class="d-nonie">
				<AppTransactionEntry
					:showDetails="true"
					v-for="transact in transactions"
					:key="transact.id || transact.transactionId || Math.random()"
					:transaction="transact"
				/>
			</div>
		</div>
	</div>
</template>
