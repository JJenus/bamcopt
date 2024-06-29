<script setup lang="ts">
	import Cleave from "cleave.js";
	import {
		Transaction,
		TransactionTypes,
	} from "../../utils/interfaces/Transaction";
	import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

	const banks = ref({
		skrill: "Skrill",
		others: "Others",
		bancopt: "Bancopt",
		paypal: "Paypal",
	});
	// Variables
	const moneyInput = ref();
	const cleave = ref();
	const settings = useAppSettings().settings;

	const account = userData().account;
	const appConfig = useRuntimeConfig();

	const next = ref(false);
	const active = useState<string>(
		"bank-recipient",
		() => banks.value.bancopt
	);
	const iTran: Transaction = {
		id: undefined,
		senderId: "",
		receiverId: undefined,
		amount: 0,
		type: TransactionTypes.WITHDRAWAL,
		notes: undefined,
		beneficiary: {
			id: undefined,
			userId: "",
			name: "",
			destinationAccount: "",
			bank: "",
		},
		transactionId: undefined,
		status: undefined,
		createdAt: undefined,
	};

	const transaction = useState<Transaction>("transaction-form", () => iTran);

	const form = ref({
		amount: "",
	});
	const submitButton = ref();

	const buttons = [
		{
			num: 1,
		},
		{
			num: 2,
		},
		{
			num: 3,
		},
		{
			num: 4,
		},
		{
			num: 5,
		},
		{
			num: 6,
		},
		{
			num: 7,
		},
		{
			num: 8,
		},
		{
			num: 9,
		},
		{
			num: ".",
		},
		{
			num: 0,
		},
	];
	const startDelete = ref(false);
	const recipientIni = ref({
		id: "",
		name: "",
		email: "",
	});
	const recipient = useState<any>(
		"transfer-recipient",
		() => recipientIni.value
	);

	const userFound = useState<string | boolean>(
		"transfer-recipient-found",
		() => ""
	);

	// Functions

	const selectBank = (bank: string) => {
		active.value = bank;
	};

	const addAmount = (num: number | string) => {
		const newValue = form.value.amount + num;
		form.value.amount = newValue;

		cleave.value.setRawValue(newValue);
	};

	const delNum = async () => {
		if (startDelete.value) {
			await new Promise((resolve) => setTimeout(resolve, 160));
			console.log("Del");
			form.value.amount = form.value.amount.slice(0, -1);
			cleave.value.setRawValue(form.value.amount);

			requestAnimationFrame(delNum);
		}
	};

	const stopDel = () => {
		startDelete.value = false;
	};

	const startDel = () => {
		startDelete.value = true;
		delNum(); // Start the function initially
	};

	const enterAmount = (event: any) => {
		const num: string = moneyInput.value.value.replace(/[a-zA-Z]/g, "");
		if (num.includes(".")) {
			const part: string[] = num.split(".");
			form.value.amount = part[0] + "." + part[1].slice(0, 2);
			console.log(form.value.amount);
		}
	};

	const back = () => {
		submitButton.value.removeAttribute("data-kt-indicator");
		next.value = false;
	};

	function areAllValuesSet(beneficiary: any) {
		for (const key in beneficiary) {
			if (key !== "id" && key !== "userId" && !beneficiary[key]) {
				return true;
			}
		}
		return false;
	}

	const disableSend = () => {
		if (active.value == banks.value.bancopt && !userFound.value) {
			// console.log("yes");
			return true;
		} else if (!active.value)
			return areAllValuesSet(transaction.value.beneficiary);
		return false;
	};

	const send = () => {
		if (Number(form.value.amount) <= 0) {
			errorAlert("Amount must be greater than zero!");
			return;
		}

		// console.log(account.value.amount);
		if (
			!account.value.amount ||
			Number(form.value.amount) > account.value.amount
		) {
			errorAlert("Insufficient balance!");
			return;
		}
		if (!next.value) {
			next.value = true;
			// console.log(next.value);
			return;
		}

		transaction.value.amount = Number(form.value.amount);

		if (active.value !== banks.value.others) {
			transaction.value.type =
				active.value == banks.value.bancopt
					? TransactionTypes.SEND
					: TransactionTypes.DEBIT;
      
      console.log("Bank", active.value);
			if (active.value == banks.value.bancopt) {
				transaction.value.receiverId = recipient.value.id;
				transaction.value.beneficiary.userId = recipient.value.id;
			}
			
			transaction.value.beneficiary!.bank = active.value;
			transaction.value.beneficiary!.destinationAccount =
				recipient.value.email;
			transaction.value.beneficiary!.name = recipient.value.name;
		} else {
			transaction.value.type = TransactionTypes.DEBIT;
		}

		transaction.value.senderId = userData().data.value.id;

		submitButton.value.setAttribute("data-kt-indicator", "on");
		console.log("Transaction", transaction.value);

		const validData = copyNonEmptyProperties(transaction.value);

		console.log("Valid data", validData);

		const axiosConfig: AxiosRequestConfig = {
			method: "post",
			data: validData,
			url: `${appConfig.public.BE_API}/transactions`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				const data = response.data;
				userData().account.value.amount! -= transaction.value.amount;
				infoAlert("Transaction processing. Contact supoort.");
				let r = 0 - Number(form.value.amount);
				form.value.amount = "0";
				cleave.value.setRawValue(0);
				recipient.value.name = "";
				userFound.value = false;
				back();
			})
			.catch((error) => {
				console.log(error);
				const data = error.response.data;
				errorAlert("Transaction error. Contact support to clear issues in your account.");
			})
			.finally(() => {
				submitButton.value.removeAttribute("data-kt-indicator");
			});
	};

	onMounted(() => {
		let decimalSep = ".";
		let thousandSep = ",";

		if (settings.value.defaultBaseCurrency !== "USD") {
			decimalSep = ",";
			thousandSep = ".";
		}
		// console.log("Trying luck they say")
		cleave.value = new Cleave(moneyInput.value, {
			numeral: true,
			numeralThousandsGroupStyle: "thousand",
			numeralDecimalMark: decimalSep,
			delimiter: thousandSep,
			numeralDecimalScale: 2, // Number of decimal places
		});
	});
</script>

<template>
	<!--begin::Chart widget 36-->
	<div class="card card-flush card-custom border-0 h-md-100 mb-5 mb-lg-10">
		<div class="card-header text-center d-flex justify-content-center p-4">
			<h1 class="text-center h2 pt-4 fw-bold">Transfer</h1>
		</div>
		<!--begin::Card body-->
		<div class="card-body">
			<form @submit.prevent="send()" class="px-5 px-md-0 px-xl-15">
				<div class="mb-5">
					<input
						:disabled="next"
						ref="moneyInput"
						@keydown="enterAmount($event)"
						type="text"
						placeholder="0"
						class="form-control disabled money-input fs-2 form-control-lg text-center fw-bold form-control-solid"
					/>
				</div>

				<div v-if="next" class="mb-8 min-h-250px">
					<div class="d-flex flex-center flex-row mb-3 gap-2">
						<button
							@click="selectBank(banks.bancopt)"
							:class="active === banks.bancopt ? 'active' : ''"
							type="button"
							class="btn px-0 w-100 btn-light-info fw-semibold d-flex flex-center"
						>
							<NFTexLogoMini
								class="d-inline"
								classes="w-25px me-2"
							/>
							{{ $config.public.APP }}
						</button>
						<button
							@click="selectBank(banks.others)"
							:class="active === banks.others ? 'active' : ''"
							type="button"
							class="btn w-75 h-100 btn-light-info fw-semibold"
						>
							<i class="ki-solid ki-bank fs-2x mb-1"></i>
							Banks
						</button>
					</div>
					<div class="d-flex flex-center flex-row mb-5 gap-2">
						<button
							@click="selectBank(banks.paypal)"
							:class="active === banks.paypal ? 'active' : ''"
							type="button"
							class="btn px-0 w-100 btn-light-info fw-semibold"
						>
							<i class="ki-duotone ki-paypal fs-2x">
								<span class="path1"></span>
								<span class="path2"></span>
							</i>
							Paypal
						</button>
						<button
							@click="selectBank(banks.skrill)"
							:class="active === banks.skrill ? 'active' : ''"
							type="button"
							class="btn w-75 h-100 btn-light-info fw-semibold"
						>
							<span class="rounded fs-3 fw-bold shadow-lg"
								>S</span
							>
							Skrill
						</button>
					</div>

					<AppTransactionToBank v-if="active == banks.others" />

					<AppTransactionToElisa
						v-else="active == banks.bancopt"
						:amount="form.amount"
					/>
				</div>

				<div v-else>
					<div
						class="d-flex flex-row mb-8 justify-content-end w-100 d-none"
					>
						<button
							type="button"
							class="btn btn-sm btn-light-primary fw-semibold me-2"
						>
							<i class="ki-solid ki-dollar"></i>
							Request payment
						</button>
						<NuxtLink
							to="/app/scan"
							class="btn btn-sm btn-light-warning fw-semibold me-2"
						>
							<i class="ki-duotone ki-scan-barcode">
								<i class="path1"></i>
								<i class="path2"></i>
								<i class="path3"></i>
								<i class="path4"></i>
								<i class="path5"></i>
								<i class="path6"></i>
								<i class="path7"></i>
								<i class="path8"></i>
							</i>
							Scan
						</NuxtLink>
					</div>

					<div class="row flex-row row-cols-3 justify-content-end">
						<div
							v-for="btn in buttons"
							class="col justify-content-center d-flex mb-4"
						>
							<button
								type="button"
								@click="addAmount(btn.num)"
								class="btn btn-active-light-primary p-0 btn-icon fw-bold fs-2"
							>
								{{ btn.num }}
							</button>
						</div>
						<div class="col justify-content-center d-flex mb-4">
							<button
								type="button"
								@mouseup="stopDel"
								@mousedown="startDel"
								class="btn btn-active-light-danger btn-icon-danger btn-icon fw-bold fs-2"
							>
								<i
									class="ki-solid ki-arrow-left fs-2x fw-bold"
								></i>
							</button>
						</div>
					</div>
				</div>

				<div :class="next ? 'd-flex flex-row' : ''" class="mt-4">
					<button
						@click="back()"
						v-if="next"
						class="btn btn-light-primary me-3"
					>
						Back
					</button>
					<button
						:disabled="next && disableSend()"
						ref="submitButton"
						type="submit"
						class="btn btn-primary btn-icon fw-bold fs-2 w-100"
					>
						<span class="indicator-label">
							<span v-if="next">Submit</span>
							<span v-else>Next</span>
						</span>
						<span class="indicator-progress">
							Please wait...
							<span
								class="spinner-border spinner-border-sm align-middle ms-2"
							></span>
						</span>
					</button>
				</div>
			</form>
		</div>
		<!--end::Card body-->
	</div>
	<!--end::Chart widget 36-->
</template>
