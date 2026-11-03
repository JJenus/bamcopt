<script setup lang="ts">
	import currency from "currency.js";

	const transactions = userData().transactions;
	const aggregates = ref({ received: 0, sent: 0, net: 0 });

	const loadAggregates = async () => {
		try {
			const res = await $fetch("/api/transactions/aggregates");
			aggregates.value = res;
		} catch (e) {
			console.error("Failed to load aggregates:", e);
		}
	};

	loadAggregates();

	const getAmount = (cAmount: number) => {
		cAmount = cAmount || 0;
		const amount = currency(cAmount, { symbol: "" }).format();
		return amount;
	};
</script>

<template>
	<div class="card card-custom border-0 min-h-500px h-md-100 mb-5 mb-lg-10">
		<div class="card-body ps-xl-15">
			<h1 class="text-center h1 pt-4 fw-bold mb-8">Transactions</h1>
			<div class="d-flex flex-row justify-content-between mb-5">
				<div>
					<div class="card-title mb-2">
						<div class="widget-title fw-bold fs-4 d-flex align-items-center">
							<span>Received</span>
							<i class="ki-duotone ki-double-left fs-1 text-success ms-2"><i class="path1"></i><i class="path2"></i></i>
						</div>
					</div>
					<div class="d-flex align-items-center mb-8">
						<span class="fs-3 fw-semibold text-gray-400 me-1 align-self-start">$</span>
						<span class="page-title fs-2 fw-bold me-2 lh-1 ls-n2">{{ getAmount(aggregates.received) }}</span>
					</div>
				</div>
				<div>
					<div class="card-title mb-2">
						<div class="widget-title fw-bold fs-4 d-flex align-items-center">
							<i class="ki-duotone ki-double-right fs-1 text-danger me-2"><i class="path1"></i><i class="path2"></i></i>
							<span>Sent</span>
						</div>
					</div>
					<div class="d-flex align-items-center mb-8">
						<span class="fs-3 fw-semibold text-gray-400 me-1 align-self-start">$</span>
						<span class="page-title fs-2 fw-bold me-2 lh-1 ls-n2">{{ getAmount(aggregates.sent) }}</span>
					</div>
				</div>
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
