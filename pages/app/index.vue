<script setup lang="ts">
	import moment from "moment";
	const user = userData().data;
	const userSettings = useUserSettings();
	const active = userSettings.transferBank;
	const transactions = userSettings.transactions;

	const banks = ref({
		skrill: "Skrill",
		others: "Others",
		bancopt: "Bancopt",
		paypal: "Paypal",
		mbway: "MB Way", //new
	});

	const selectBank = (bank: string) => {
		active.value = bank;
		navigateTo("/app/transfer");
	};

	const getPreview = () => {
		if (transactions.value.length <= 5) {
			return transactions.value;
		}
		const list = [];
		for (let i = 0; i < 5; i++) {
			list.push(transactions.value[i]);
		}
		return list;
	};

	const greet = () => {
		let userName = user.value.name.split(" ")[0];
		userName = userName.charAt(0).toUpperCase() + userName.slice(1);

		const now = moment();
		const hour = now.hour();

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
		<div
			class="card card-custom bg-light-success border-0 min-h-200px mb-5 mb-lg-10"
		>
			<!--begin::Body-->
			<div
				class="card-body d-flex align-items-centeri justify-content-center flex-column ps-xl-15 pe-0"
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

					<AppBalance class="d-lg-none mb-8" />

					<!--begin::Action-->
				</div>
				<!--begin::Wrapper-->

				<!--begin::Illustration-->
				<img
					src="/assets/media/illustrations/misc/credit-card.png"
					class="w-175px mx-auto d-none d-lg-block"
					alt=""
				/>
				<!--end::Illustration-->
			</div>
			<!--end::Body-->
		</div>
		<!--end::Engage widget 12-->

		<!--begin::Chart widget 36-->
		<div
			class="card card-flush overflow-hidden mb-5 bg-transparent border-0"
		>
			<!--begin::Card body-->
			<div class="card-body p-4">
				<div class="d-flex flex-center flex-row mb-3 gap-2">
					<button
						@click="selectBank(banks.bancopt)"
						type="button"
						class="btn btn-light-primary px-4 d-lg-flex fw-semibold py-lg-4"
					>
						<NFTexLogoMini
							class="d-inline"
							classes="w-20px w-lg-25px m-0 me-lg-2"
						/>
						{{ $config.public.APP }}
					</button>
					<button
						@click="selectBank(banks.others)"
						type="button"
						class="btn btn-light-primary fw-semibold"
					>
						<i class="ki-solid ki-bank fs-2x mb-1"></i>
						Banks
					</button>
					<button
						@click="selectBank(banks.paypal)"
						type="button"
						class="btn btn-light-primary fw-semibold"
					>
						<i class="ki-duotone ki-paypal fs-2x">
							<span class="path1"></span>
							<span class="path2"></span>
						</i>
						Paypal
					</button>
					<button
						@click="selectBank(banks.skrill)"
						type="button"
						class="btn btn-light-primary fw-semibold"
					>
						<span
							class="rounded fs-3 fw-bold shadow-lg bg-transparent"
							>S</span
						>
						Skrill
					</button>
					<button
						@click="selectBank(banks.mbway)"
						type="button"
						class="btn btn-light-primary fw-semibold"
					>
						<span
							class="rounded fs-3 fw-bold shadow-lg bg-transparent"
							>MB</span
						>
						Way
					</button>
				</div>
			</div>
			<!--end::Card body-->
		</div>

		<!--begin::Chart widget 36-->
		<div class="card card-flush overflow-hidden min-h-200px">
			<!--begin::Header-->
			<div class="card-header pt-5">
				<!--begin::Title-->
				<h3 class="card-title align-items-start flex-column">
					<span class="card-label fw-bold text-dark"
						>Transactions</span
					>
					<span class="text-gray-400 mt-1 fw-semibold fs-6">
						Recent
					</span>
				</h3>
				<!--end::Title-->
			</div>
			<!--end::Header-->

			<!--begin::Card body-->
			<div class="card-body">
				<div
					v-if="getPreview().length == 0"
					class="text-muted text-center"
				>
					No transaction
				</div>
				<AppTransactionEntry
					v-for="transact in getPreview()"
					:show-details="false"
					:transaction="transact"
				/>
			</div>
			<!--end::Card body-->
		</div>
	</div>
</template>
