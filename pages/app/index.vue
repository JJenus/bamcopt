<script setup lang="ts">
	import moment from "moment";
	const user = userData().data;

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

				<AppBalance class="d-lg-none mb-8" />

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

	<!--begin::Chart widget 36-->
	<div class="card card-flush overflow-hidden">
		<!--begin::Header-->
		<div class="card-header pt-5">
			<!--begin::Title-->
			<h3 class="card-title align-items-start flex-column">
				<span class="card-label fw-bold text-dark"
					>Payment Requests</span
				>
				<span class="text-gray-400 mt-1 fw-semibold fs-6">
					0 requests today
				</span>
			</h3>
			<!--end::Title-->

			<!--begin::Toolbar-->
			<div class="card-toolbar">
				<!--begin::Daterangepicker(defined in src/js/layout/app.js)-->
				<div
					data-kt-daterangepicker="true"
					data-kt-daterangepicker-opens="left"
					data-kt-daterangepicker-range="today"
					class="btn btn-sm btn-light d-flex align-items-center px-4"
				>
					<!--begin::Display range-->
					<div class="text-gray-600 fw-bold">
						Loading date range...
					</div>
					<!--end::Display range-->

					<i class="ki-outline ki-calendar-8 fs-1 ms-2 me-0"></i>
				</div>
				<!--end::Daterangepicker-->
			</div>
			<!--end::Toolbar-->
		</div>
		<!--end::Header-->

		<!--begin::Card body-->
		<div class="card-body d-flex align-items-end p-0">
			<!--begin::Chart-->
			<div
				id="kt_charts_widget_36"
				class="min-h-auto w-100 ps-4 pe-6"
				style="height: 300px"
			></div>
			<!--end::Chart-->
		</div>
		<!--end::Card body-->
	</div>
	<!--end::Chart widget 36-->
</template>
