<script setup lang="ts">
	import { Transaction } from "utils/interfaces/Transaction";
	import "animate.css";
	import axios from "axios";
	import currency from "currency.js";
	import moment from "moment";

	const config = useRuntimeConfig().public;

	const props = defineProps<{ transaction: Transaction }>();
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

	const trans = ref<Transaction>({ ...props.transaction });
	console.log("Trans", trans.value);
	const edit = ref(false);
	const loading = ref(false);

	const money = (amount: string | number) => {
		return currency(amount, { symbol: "" });
	};

	const save = () => {
		const conf = {
			method: "PUT",
			data: trans.value,
			url: `${config.BE_API}/transactions`,
			timeout: 20000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		loading.value = true;

		axios
			.request(conf)
			.then((response) => {
				console.log("Yes ", response.data);
				successAlert("Saved!");
			})
			.catch((err) => {
				const errRes = err.response;
				errorAlert("Failed to update");
				console.log(errRes);
			})
			.finally(() => {
				loading.value = false;
			});
	};
</script>

<template>
	<div class="card transaction">
		<div
			class="card-body d-flex flex-column align-items-center justify-content-center"
		>
			<div class="fs-2">
				To {{ transaction.beneficiary.name }}
				<button
					@click="edit = !edit"
					class="ms-3 btn btn-light-danger p-2"
				>
					<i v-if="edit" class="ki-solid ki-cross fs-2 pe-0"></i>
					<i v-else class="ki-solid ki-pencil fs-2 pe-0"></i>
				</button>
			</div>
			<div class="fs-3x fw-bold mb-5">
				${{ money(transaction.amount) }}
			</div>

			<div class="mb-5 fs-2">Status: {{ trans.status }}</div>

			<!-- Other data -->
			<div class="card bg-gray-100 mb-4">
				<div class="card-body pb-4 fw-bold">
					<div v-if="edit">
						<form @submit.prevent="save()">
							<div class="mb-4">
								<select
									v-model="trans.status"
									class="form-control"
								>
									<option value="processing">
										Processing
									</option>
									<option value="awaiting">Awaiting</option>
									<option value="awaiting">Completed</option>
								</select>
							</div>
							<textarea
								class="form-control mb-4"
								cols="30"
								rows="10"
								v-model="trans.notes"
							></textarea>
							<button v-if="edit" class="btn btn-primary w-100">
								<span
									v-if="loading"
									class="spinner-border spinner-border-sm"
								></span>
								<span v-else>Save</span>
							</button>
						</form>
					</div>

					<p v-else>
						{{ transaction.notes }}
					</p>
				</div>
			</div>

			<div v-if="!edit" class="table-responsive">
				<table class="table table-borderless">
					<tbody>
						<tr>
							<td class="fw-bold text-muted">Recipient Name</td>
							<td class="fw-bold text-end">
								{{ trans.beneficiary.name }}
							</td>
						</tr>
						<tr>
							<td class="fw-bold text-muted">Bank</td>
							<td class="fw-bold text-end">
								{{ trans.beneficiary.bank }}
							</td>
						</tr>
						<tr>
							<td class="fw-bold text-muted">Account ID</td>
							<td class="fw-bold text-end">
								{{ trans.beneficiary.destinationAccount }}
							</td>
						</tr>
						<tr>
							<td class="fw-bold text-muted">Transaction ID</td>
							<td class="fw-bold text-end">
								{{ trans.transactionId }}
							</td>
						</tr>
						<tr>
							<td colspan="2" class="text-center">
								{{ moment(trans.createdAt).format("lll") }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div v-if="!edit" class="w-100">
				<a
					:href="`/track/transaction?id=${transaction.transactionId}`"
					class="btn btn-primary w-100"
					target="_blank"
					>Track</a
				>
			</div>
		</div>
	</div>
</template>
