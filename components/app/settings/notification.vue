<script setup lang="ts">
	type ISetting = {
		id: string;
		name: string;
		email: string;
		bill: string;
		news: string;
		dispute: any;
	};
	const settings = useCookie<ISetting>("n-sett", { maxAge: 15778800000 });
	const iSet = ref<ISetting>({
		id: "",
		name: "",
		email: "",
		bill: "",
		news: "",
		dispute: "",
	});

	if (!!settings.value) {
		iSet.value = settings.value;
	}

	const save = () => {
		successAlert("Saved");
		settings.value = iSet.value;
	};
</script>
<template>
	<div class="card mb-5 mb-xl-10">
		<!--begin::Card header-->
		<div
			class="card-header border-0 cursor-pointer"
			role="button"
			data-bs-toggle="collapse"
			data-bs-target="#kt_account_notifications"
			aria-expanded="true"
			aria-controls="kt_account_notifications"
		>
			<div class="card-title m-0">
				<h3 class="fw-bold m-0">Notifications</h3>
			</div>
		</div>
		<!--begin::Card header-->

		<!--begin::Content-->
		<div id="kt_account_settings_notifications" class="collapse show">
			<!--begin::Form-->
			<form class="form" @submit.prevent="save()">
				<!--begin::Card body-->
				<div class="card-body border-top px-9 pt-3 pb-4">
					<!--begin::Table-->
					<div class="table-responsive">
						<table
							class="table table-row-dashed border-gray-300 align-middle gy-6"
						>
							<tbody class="fs-6 fw-semibold">
								<!--begin::Table row-->
								<tr>
									<td class="min-w-200px fs-4 fw-bold">
										Notifications
									</td>
									<td class="w-125px">
										<div
											class="form-check form-check-custom form-check-solid"
										>
											<input
												v-model="iSet.bill"
												class="form-check-input"
												type="checkbox"
												value=""
												id="kt_settings_notification_email"
												checked
												data-kt-check="true"
												data-kt-check-target="[data-kt-settings-notification=email]"
											/>
										</div>
									</td>
								</tr>
								<!--begin::Table row-->

								<!--begin::Table row-->
								<tr>
									<td>Email Updates</td>
									<td>
										<div
											class="form-check form-check-custom form-check-solid"
										>
											<input
												v-model="iSet.email"
												class="form-check-input"
												type="checkbox"
												id="billing1"
												data-kt-settings-notification="email"
											/>
											<label
												class="form-check-label ps-2"
												for="billing1"
											></label>
										</div>
									</td>
								</tr>
								<!--begin::Table row-->

								<!--begin::Table row-->
								<tr>
									<td class="border-bottom-0">Newsletters</td>
									<td class="border-bottom-0">
										<div
											class="form-check form-check-custom form-check-solid"
										>
											<input
												v-model="iSet.news"
												class="form-check-input"
												type="checkbox"
												id="newsletter1"
												data-kt-settings-notification="email"
											/>
											<label
												class="form-check-label ps-2"
												for="newsletter1"
											></label>
										</div>
									</td>
								</tr>
								<!--begin::Table row-->
							</tbody>
						</table>
					</div>
					<!--end::Table-->
				</div>
				<!--end::Card body-->

				<!--begin::Card footer-->
				<div class="card-footer d-flex justify-content-end py-6 px-9">
					<button class="btn btn-light btn-active-light-primary me-2">
						Discard
					</button>
					<button class="btn btn-primary px-6">Save Changes</button>
				</div>
				<!--end::Card footer-->
			</form>
			<!--end::Form-->
		</div>
		<!--end::Content-->
	</div>
</template>
