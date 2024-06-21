<script setup lang="ts">
	import "animate.css";
	import axios from "axios";
	import currency from "currency.js";
	import moment from "moment";
	import { Transaction } from "utils/interfaces/Transaction";

	const config = useRuntimeConfig().public;
	const currentPage = "Transaction";
	useSeoMeta({
		title: `${currentPage} - ${config.APP}`,
	});

	const route = useRoute();

	const transactionId = ref();

	if (route.query["id"]) {
		transactionId.value = route.query["id"];
	}

	const showReceipt = ref(false);
	const loading = ref(false);
	const transaction: Transaction | any = ref();

	const money = (amount: string) => {
		return currency(amount, { symbol: "" }).format();
	};

	const loadTransaction = () => {
		if (!transactionId.value) {
			return errorAlert("Invalid transaction ID");
		}

		loading.value = true;

		const conf = {
			method: "GET",
			url: `${config.BE_API}/transactions/find/${transactionId.value}`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(conf)
			.then((res) => {
				transaction.value = res.data;
				showReceipt.value = true;
			})
			.catch((error): void => {
				console.log(error);
			})
			.finally(() => {
				loading.value = false;
			});
	};

	const isActive = (status: string, level: string) => {
		if (status === "completed") {
			return true; // Color the element if status is completed
		} else if (
			status === "awaiting" &&
			(level === "processing" || level === "awaiting")
		) {
			return true; // Color the element if status is awaiting and level is processing
		} else if (
			status === "processing" &&
			(level === "awaiting" || level === "completed")
		) {
			return false; // Do not color the element if status is processing and level is awaiting or completed
		} else {
			return false; // Do not color the element for any other combinations
		}
	};

	//
	onMounted(() => {
		if (transactionId.value) {
			loadTransaction();
		}
	});
</script>

<template>
	<div class="kd-flex flex-column flex-column-fluid">
		<!--begin::Content-->
		<div id="kt_app_content" class="app-content flex-column-fluid">
			<!--begin::Content container-->
			<div
				id="kt_app_content_container"
				class="app-container container-fluid d-flex flex-column align-items-center justify-content-center min-h-500px pt-10 pt-md-15 pt-lg-5"
			>
				<div v-if="!showReceipt">
					<h1 class="mb-8">Track Transaction Progress</h1>
					<form v-if="!loading" @submit.prevent="loadTransaction()">
						<div class="mb-5">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Enter transaction ID"
								v-model="transactionId"
							/>
						</div>
						<button type="submit" class="btn btn-primary w-100">
							Submit
						</button>
					</form>
					<span
						v-else
						class="spinner-border spinner-border-lg"
					></span>
				</div>
				<div
					v-else-if="transaction"
					class="d-flex flex-column align-items-center justify-content-center"
				>
					<div class="fs-2">
						To {{ transaction.beneficiary.name }}
					</div>
					<div class="fs-3x fw-bold mb-5">
						${{ money(transaction.amount) }}
					</div>
					<!--begin::Stepper-->
					<div class="d-flex justify-content-between mb-5">
						<div
							class="d-flex flex-column justify-content-center align-items-center"
						>
							<div
								:class="
									transaction.status === 'processing'
										? 'animate__animated animate__infinite animate__delay-2s animate__pulse'
										: ''
								"
								class="mb-3"
							>
								<button
									:class="
										isActive(
											transaction.status,
											'processing'
										)
											? 'btn-success btn-active-success rounded-circle'
											: 'btn-light-primary btn-active-light-primary'
									"
									class="btn btn-icon w-40px h-40px"
								>
									<i
										:class="
											isActive(
												transaction.status,
												'processing'
											)
												? 'ki-solid ki-check'
												: 'ki-solid ki-loading'
										"
										class="fs-2x fw-bold"
									>
									</i>
								</button>
							</div>
							<div class="text-center w-100">
								<span class="text-center fw-bold fs-4"
									>Processing</span
								>
							</div>
						</div>
						<div
							:class="
								isActive(transaction.status, 'awaiting')
									? 'border-success'
									: 'border-primary'
							"
							class="border-top border-2 w-20px w-md-50px w-lg-100px h-0px mt-5"
						></div>
						<div
							class="d-flex flex-column justify-content-center align-items-center"
						>
							<div
								:class="
									transaction.status === 'awaiting'
										? 'animate__animated animate__infinite animate__delay-2s animate__pulse'
										: ''
								"
								class="mb-3"
							>
								<button
									:class="
										isActive(transaction.status, 'awaiting')
											? 'btn-success btn-active-success rounded-circle'
											: 'btn-light-primary btn-active-light-primary'
									"
									class="btn btn-icon w-40px h-40px"
								>
									<i
										:class="
											isActive(
												transaction.status,
												'awaiting'
											)
												? 'ki-solid ki-check'
												: 'ki-solid ki-loading'
										"
										class="fs-2x fw-bold"
									>
									</i>
								</button>
							</div>
							<div class="text-center w-100">
								<span class="text-center fw-bold fs-4"
									>Sent To Bank</span
								>
							</div>
						</div>
						<div
							:class="
								isActive(transaction.status, 'completed')
									? 'border-success'
									: 'border-primary'
							"
							class="border-top border-2 w-20px w-md-50px w-lg-100px h-0px mt-5"
						></div>
						<div
							class="d-flex flex-column justify-content-center align-items-center"
						>
							<div
								:class="
									transaction.status === 'completed'
										? 'animate__animated animate__infinite animate__delay-2s animate__pulse'
										: ''
								"
								class="mb-3"
							>
								<button
									:class="
										isActive(
											transaction.status,
											'completed'
										)
											? 'btn-success btn-active-success rounded-circle'
											: 'btn-light-primary btn-active-light-primary'
									"
									class="btn btn-icon w-40px h-40px"
								>
									<i
										:class="
											isActive(
												transaction.status,
												'completed'
											)
												? 'ki-solid ki-check'
												: 'ki-solid ki-loading'
										"
										class="fs-2x fw-bold"
									>
									</i>
								</button>
							</div>
							<div class="text-center w-100">
								<span class="text-center fw-bold fs-4">
									Completed
								</span>
							</div>
						</div>
					</div>
					<!--end::Stepper-->
					<!-- Other data -->
					<div class="card bg-gray-100 mb-4">
						<div class="card-body pb-4 fw-bold">
						
							<p>
								{{ transaction.notes }}
							</p>
						</div>
					</div>

					<div class="card w-100 w-lg-500px">
						<div class="card-body pb-4 fw-bold">
							<table class="table table-borderless">
								<tbody>
									<tr>
										<td class="fw-bold text-muted">
											Recipient Name
										</td>
										<td class="fw-bold text-end">
											{{ transaction.beneficiary.name }}
										</td>
									</tr>
									<tr>
										<td class="fw-bold text-muted">Bank</td>
										<td class="fw-bold text-end">
											{{ transaction.beneficiary.bank }}
										</td>
									</tr>
									<tr>
										<td class="fw-bold text-muted">
											Account ID
										</td>
										<td class="fw-bold text-end">
											{{
												transaction.beneficiary
													.destinationAccount
											}}
										</td>
									</tr>
									<tr>
										<td class="fw-bold text-muted">
											Transaction ID
										</td>
										<td class="fw-bold text-end">
											{{ transaction.transactionId }}
										</td>
									</tr>
									<tr>
										<td colspan="2" class="text-center">
											{{
												moment(
													transaction.createdAt
												).format("lll")
											}}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!--end::Content container-->
		</div>
		<!--end::Content-->
	</div>
</template>
