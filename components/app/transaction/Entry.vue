<script setup lang="ts">
	import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
	import moment from "moment";
	import { type IUser } from "~/utils/interfaces/IUser";
	import { type Transaction } from "~/utils/interfaces/Transaction";

	const props = defineProps<{
		transaction: Transaction;
		showDetails: boolean;
	}>();

	const user = ref<any>({
		name: "",
	});

	const money = useAppSettings().formatMoney;

	const appConfig = useRuntimeConfig();

	const tType = ref("");

	const getUserData = () => {
		if (!useAuth().userData.value) {
			return useAuth().logout();
		}

		const axiosConfig: AxiosRequestConfig = {
			method: "get",
			url: `${appConfig.public.BE_API}/users/${props.transaction.senderId}`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request<IUser>(axiosConfig)
			.then((response: AxiosResponse<IUser, any>) => {
				user.value = response.data;
				props.transaction.beneficiary!.name = user.value.name;
				console.log("SENDER", user.value);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const show = ref(false);

	const getType = () => {
		if (props.transaction.receiverId === userData().data.value.id) {
			if (props.transaction.beneficiary && !user.value.name)
				getUserData();
			tType.value = "Received";
			return;
		}

		// if (props.transaction.beneficiary)
		user.value.name = props.transaction.beneficiary!.name;

		tType.value = "Sent";
	};

	const statusColor = (val: string) => {
		if (props.transaction.status === "pending") {
			return val + "-warning";
		} else if (props.transaction.status === "failed") {
			return val + "-danger";
		}
		return val + "-success";
	};

	const statusIcon = () => {
		if (props.transaction.status === "pending") {
			return "ki-information-5 text-warning";
		} else if (props.transaction.status === "failed") {
			return "ki-cross-circle text-danger";
		} else return "ki-check-circle text-success";
	};

	const time = () => {
		const now = moment();
		const inputTime = moment(props.transaction.createdAt);

		if (now.diff(inputTime, "hours") <= 1) {
			return inputTime.fromNow();
		} else if (now.isSame(inputTime, "day")) {
			return inputTime.format("hh:mm A");
		} else {
			return inputTime.format("DD/MM/YY HH:mm");
		}
	};

	const toggleShowData = () => {
		if (props.showDetails) show.value = !show.value;
	};

	onMounted(() => {
		getType();
	});
</script>
<template>
	<div>
		<!--begin::Item-->
		<div
			:class="show ? 'shadow rounded px-3 mx-n4' : ''"
			class="d-flex flex-stack gap-3 mb-6"
			@click="toggleShowData"
		>
			<!--begin::Symbol-->
			<div class="symbol symbol-circle symbol-45px">
				<i :class="statusIcon()" class="ki-outline fs-1"></i>
			</div>
			<!--end::Symbol-->

			<!--begin::Section-->
			<div class="d-flex align-items-center flex-row-fluid flex-wrap">
				<!--begin::Section-->
				<div
					class="d-flex align-items-center flex-row-fluid justify-content-between"
				>
					<!--begin:Author-->
					<div class="d-flex flex-column">
						<span
							class="text-hover-primary text-gray-800 fs-5 fw-bolder"
							style="color: #28346c"
						>
							{{ transaction.beneficiary ? tType : "Deposit" }}
						</span>

						<span class="text-gray-400 fw-semibold fs-n6">
							{{ time() }}
						</span>
					</div>
					<!--end:Author-->
					<div class="d-flex flex-column text-end">
						<!--begin::Info-->
						<span
							:class="
								tType == 'Sent' ? 'text-danger' : 'text-success'
							"
							class="fw-bold fs-6"
						>
							{{ tType == "Sent" ? "-" : "+" }}
							{{ money(transaction.amount, true) }}
						</span>
						<!--end::Info-->
						<div
							v-if="transaction.beneficiary"
							class="text-gray-400 text-truncate w-80pxiu"
						>
							{{ transaction.beneficiary!.bank }}
						</div>
					</div>
					<div v-if="showDetails" class="ms-2">
						<i
							:class="show ? 'ki-up-square' : 'ki-down-square'"
							class="ki-outline mt-5 mt-lg-1 text-primary fs-2x"
						>
						</i>
					</div>
				</div>

				<div v-if="showDetails" class="ms-2 d-none">
					<i
						:class="show ? 'ki-up-square' : 'ki-down-square'"
						class="ki-outline mt-5 mt-lg-1 text-primary fs-2"
					>
					</i>
				</div>
			</div>
			<!--end::Item-->
		</div>

		<div
			v-if="show && transaction.beneficiary"
			class="mb-10 px-8 rounded-2 border-dashed pt-4 border-2 border-gray-500 px-md-15 px-lg-20"
		>
			<div class="table-responsive w-100">
				<table class="table fs-6">
					<tbody>
						<tr v-if="tType == 'Sent'">
							<td class="fw-semibold">Bank</td>
							<td class="text-end">
								{{ transaction.beneficiary!.bank }}
							</td>
						</tr>
						<tr>
							<td class="fw-semibold">
								{{ tType === "Sent" ? "Recipient" : "From" }}
							</td>
							<td class="text-end">
								{{ transaction.beneficiary!.name }}
							</td>
						</tr>
						<tr>
							<td class="fw-semibold">Account</td>
							<td class="text-end">
								{{
									transaction.beneficiary!.destinationAccount
								}}
							</td>
						</tr>
						<tr>
							<td>
								<span
									class="badge fw-bold pt-1"
									:class="statusColor('bg')"
									>Status</span
								>
							</td>
							<td class="text-end" :class="statusColor('text')">
								{{ transaction.status }}
							</td>
						</tr>
						<tr>
							<td class="fw-semibold">transactionId</td>
							<td class="text-end">
								{{ transaction.transactionId }}
							</td>
						</tr>
						<tr>
							<td class="fw-semibold">Time</td>
							<td class="text-end">{{ time() }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="my-3">
				<a
					:href="`/track/transaction?id=${transaction.transactionId}`"
					class="btn btn-outline btn-bg-light-info btn-color-info btn-active-light-success w-100"
					>Track process</a
				>
			</div>
		</div>
	</div>
</template>
