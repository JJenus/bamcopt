<script setup lang="ts">
	import { currentHour } from "~/utils/date";

	const user = userData().data;
	const { stats, load } = useAdminStats();
	const money = useAppSettings().formatMoney;
	const symbol = computed(() => useAppSettings().settings.value.currencySymbol);
	const fmt = (n: number) => `${symbol.value}${money(n || 0, false)}`;
	onMounted(load);

	const greet = () => {
		let userName = user.value.name.split(" ")[0];
		userName = userName.charAt(0).toUpperCase() + userName.slice(1);

		const hour = currentHour();

		let timeOfDay;

		// if (!user.value.emailVerified) {
		// 	return "Welcome " + userName;
		// }

		if (hour >= 5 && hour < 12) {
			timeOfDay = "Good morning " + userName;
		} else if (hour >= 12 && hour < 17) {
			timeOfDay = "Good afternoon " + userName;
		} else if (hour >= 17 && hour < 20) {
			timeOfDay = "Good evening " + userName;
		} else {
			timeOfDay = `Hi ${userName}, working late`;
		}

		return timeOfDay + "!";
	};
</script>

<template>
	<div>
		<!--begin::Engage widget 12-->
		<div
			class="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10"
		>
			<!--begin::Body-->
			<div
				class="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0"
			>
				<!--begin::Wrapper-->
				<div class="flex-grow-1 mt-2 me-9 me-md-0">
					<!--begin::Title-->
					<div
						class="position-relative text-gray-800 fs-1 z-index-2 fw-bold mb-5"
					>
						{{ greet() }}
					</div>
					<!--end::Title-->

					<AdminBalance class="d-lg-none mb-8" />

					<!--begin::Action-->
				</div>
				<!--begin::Wrapper-->

				<!--begin::Illustration-->
				<img
					src="/assets/media/illustrations/misc/credit-card.png"
					class="h-175px me-15"
					alt=""
				/>
				<!--end::Illustration-->
			</div>
			<!--end::Body-->
		</div>
		<!--end::Engage widget 12-->

		<div v-if="stats" class="row g-3 mb-5">
			<div class="col-6 col-lg-3"><StatCard label="Users" :value="`${stats.users.active} / ${stats.users.total} active`" icon="ki-outline ki-profile-user" to="/admin/users" /></div>
			<div class="col-6 col-lg-3"><StatCard label="User balances" :value="fmt(stats.balances.users)" icon="ki-outline ki-wallet" tone="success" /></div>
			<div class="col-6 col-lg-3"><StatCard label="Funding balance" :value="fmt(stats.balances.funding)" icon="ki-outline ki-bank" tone="info" to="/admin/funding" /></div>
			<div class="col-6 col-lg-3"><StatCard label="Pending transactions" :value="stats.transactions.pending" icon="ki-outline ki-time" tone="warning" /></div>
			<div class="col-6 col-lg-3"><StatCard label="Volume (all time)" :value="fmt(stats.transactions.volume)" icon="ki-outline ki-chart-line-up" tone="success" /></div>
			<div class="col-6 col-lg-3"><StatCard label="Volume (7 days)" :value="fmt(stats.transactions.weekVolume)" icon="ki-outline ki-calendar" tone="success" /></div>
			<div class="col-6 col-lg-3"><StatCard label="Transactions" :value="stats.transactions.total" icon="ki-outline ki-arrows-loop" /></div>
			<div class="col-6 col-lg-3"><StatCard label="Failed" :value="stats.transactions.failed" icon="ki-outline ki-cross-circle" tone="danger" /></div>
		</div>
		<div v-else class="text-center py-10"><span class="spinner-border text-muted"></span></div>

		<div v-if="stats" class="row g-5">
			<div class="col-lg-7">
				<div class="card h-100">
					<div class="card-header"><h3 class="card-title">Recent transactions</h3></div>
					<div class="card-body pt-0">
						<div v-if="!stats.recentTransactions.length" class="text-muted text-center">No transactions yet</div>
						<div
							v-for="t in stats.recentTransactions"
							:key="t.id || t.transactionId"
							class="d-flex justify-content-between align-items-center py-3 border-bottom border-dashed"
						>
							<div style="min-width: 0">
								<div class="fw-semibold text-truncate">{{ t.senderName }} <span class="text-muted fw-normal">· {{ t.type }}</span></div>
								<div class="text-muted fs-7">{{ new Date(t.createdAt || '').toLocaleString() }}</div>
							</div>
							<div class="text-end flex-shrink-0 ms-3">
								<div class="fw-bold">{{ fmt(t.amount) }}</div>
								<span class="badge" :class="t.status === 'completed' ? 'badge-light-success' : t.status === 'failed' ? 'badge-light-danger' : 'badge-light-warning'">{{ t.status }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="card h-100">
					<div class="card-header"><h3 class="card-title">New users</h3></div>
					<div class="card-body pt-0">
						<div v-if="!stats.recentUsers.length" class="text-muted text-center">No users yet</div>
						<div v-for="u in stats.recentUsers" :key="u.id" class="py-3 border-bottom border-dashed">
							<div class="fw-semibold text-truncate">{{ u.name }}</div>
							<div class="text-muted fs-7 text-truncate">{{ u.email }} · {{ new Date(u.createdAt).toLocaleDateString() }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
