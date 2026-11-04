<script setup lang="ts">
	import { formatLongDateTime } from "~/utils/date";

	const id = String(useRoute().params.id);
	const money = useAppSettings().formatMoney;
	const me = computed(() => userData().data.value.id);

	useSeoMeta({ title: `Transaction - ${useRuntimeConfig().public.APP}` });

	const tx = ref<Awaited<ReturnType<typeof transactionService.get>> | null>(null);
	const loading = ref(true);
	const notFound = ref(false);

	onMounted(async () => {
		try {
			tx.value = await transactionService.get(id);
		} catch {
			notFound.value = true;
		} finally {
			loading.value = false;
		}
	});

	// what this transaction is from the logged-in user's point of view
	const kind = computed(() => {
		const t = tx.value;
		if (!t) return "";
		if (t.senderId === t.receiverId) return t.notes?.startsWith("Refund") ? "Refund" : "Deposit";
		return t.receiverId === me.value ? "Received" : "Sent";
	});
	const incoming = computed(() => ["Received", "Deposit", "Refund"].includes(kind.value));
	const counterparty = computed(() => {
		const t = tx.value;
		if (!t) return "";
		if (kind.value === "Received") return t.senderName ?? "Unknown";
		return t.beneficiary?.name || t.receiverName || "Unknown";
	});
	const statusColor = computed(() => {
		const s = tx.value?.status;
		if (s === "failed") return "danger";
		if (s === "completed") return "success";
		return "warning";
	});
</script>

<template>
	<div class="card card-custom border-0 min-h-500px mb-5 mb-lg-10">
		<div class="card-header border-0 pt-6">
			<NuxtLink to="/app/transactions" class="btn btn-sm btn-light">
				<i class="ki-outline ki-arrow-left fs-4"></i> All transactions
			</NuxtLink>
		</div>

		<div class="card-body">
			<div v-if="loading" class="text-center text-muted py-15">Loading…</div>

			<div v-else-if="notFound || !tx" class="text-center py-15">
				<i class="ki-outline ki-information-5 fs-3x text-muted d-block mb-3"></i>
				<div class="fw-bold fs-4 mb-2">Transaction not found</div>
				<div class="text-muted mb-6">It may not exist, or it belongs to another account.</div>
				<NuxtLink to="/app/transactions" class="btn btn-primary btn-sm">Back to transactions</NuxtLink>
			</div>

			<div v-else class="mw-600px mx-auto">
				<div class="text-center mb-8">
					<span class="badge mb-3" :class="`badge-light-${statusColor}`">{{ tx.status }}</span>
					<div class="text-muted fs-6">{{ kind }}</div>
					<div class="fs-2hx fw-bolder" :class="incoming ? 'text-success' : 'text-gray-900'">
						{{ incoming ? "+" : "-" }}{{ money(tx.amount) }}
					</div>
				</div>

				<div class="separator mb-6"></div>

				<dl class="row mb-0 gy-4">
					<dt class="col-5 text-muted fw-semibold">{{ kind === "Received" ? "From" : kind === "Sent" ? "To" : "Account" }}</dt>
					<dd class="col-7 fw-bold text-end">{{ counterparty }}</dd>

					<template v-if="tx.beneficiary && kind === 'Sent'">
						<dt class="col-5 text-muted fw-semibold">Bank</dt>
						<dd class="col-7 text-end">{{ tx.beneficiary.bank }}</dd>
						<dt class="col-5 text-muted fw-semibold">Account</dt>
						<dd class="col-7 text-end">{{ tx.beneficiary.destinationAccount }}</dd>
					</template>

					<dt class="col-5 text-muted fw-semibold">Date</dt>
					<dd class="col-7 text-end">{{ formatLongDateTime(tx.createdAt) }}</dd>

					<dt class="col-5 text-muted fw-semibold">Reference</dt>
					<dd class="col-7 text-end text-break">{{ tx.transactionId }}</dd>

					<template v-if="tx.notes">
						<dt class="col-5 text-muted fw-semibold">Note</dt>
						<dd class="col-7 text-end">{{ tx.notes }}</dd>
					</template>
				</dl>
			</div>
		</div>
	</div>
</template>
