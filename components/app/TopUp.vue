<script setup lang="ts">
	import type { FundingAccount } from "~/utils/interfaces/Funding";

	const accounts = ref<FundingAccount[]>([]);
	const loading = ref(true);

	onMounted(async () => {
		try {
			accounts.value = await fundingService.list();
		} catch {
			accounts.value = [];
		} finally {
			loading.value = false;
		}
	});

	const copied = ref("");
	const copy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			copied.value = text;
			setTimeout(() => (copied.value = ""), 1500);
		} catch {
			errorAlert("Unable to copy, please copy it manually");
		}
	};

	const rows = (a: FundingAccount) =>
		[
			["Bank / Network", a.bankName],
			["Account name", a.accountName],
			["Account / Address", a.accountNumber],
			["Currency", a.currency],
		].filter(([, v]) => v) as [string, string][];
</script>

<template>
	<div class="modal fade" id="kt_modal_upgrade_plan" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content rounded">
				<div class="modal-header justify-content-end border-0 pb-0">
					<div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
						<i class="ki-outline ki-cross fs-1"></i>
					</div>
				</div>

				<div class="modal-body pt-0 pb-10 px-5 px-lg-10">
					<div class="mb-8 text-center">
						<h1 class="mb-3">Add funds</h1>
						<div class="text-muted fw-semibold fs-6">
							Send your deposit to one of the accounts below. Your balance is credited once the
							deposit is confirmed. Need help? Contact support.
						</div>
					</div>

					<div v-if="loading" class="text-center"><span class="spinner-border text-muted"></span></div>
					<div v-else-if="!accounts.length" class="text-center text-muted">
						No deposit account is available right now. Please contact support.
					</div>

					<div v-for="a in accounts" :key="a.id" class="card card-bordered mb-5">
						<div class="card-body">
							<div class="fw-bold fs-4 mb-3">{{ a.label }}</div>
							<div
								v-for="[name, value] in rows(a)"
								:key="name"
								class="d-flex justify-content-between align-items-center py-2 border-bottom border-dashed"
							>
								<span class="text-muted me-3">{{ name }}</span>
								<span class="d-flex align-items-center text-end text-break">
									<span class="fw-semibold">{{ value }}</span>
									<button
										type="button"
										class="btn btn-icon btn-sm btn-light-primary ms-3"
										title="Copy"
										@click="copy(value)"
									>
										<i :class="copied === value ? 'ki-outline ki-check fs-3' : 'ki-outline ki-copy fs-3'"></i>
									</button>
								</span>
							</div>
							<div v-if="a.instructions" class="text-muted mt-3" style="white-space: pre-line">
								{{ a.instructions }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
