<script setup lang="ts">
	import { type Transaction } from "~/utils/interfaces/Transaction";

	const appResource = useAppResource();
	const userCountry = appResource.country;
	const countries = appResource.countries;
	
	const accountTypes = ref([
		"Checking account",
		"Savings account",
		"Current account"
	])

	const form = useState<Transaction>("transaction-form");
</script>

<template>
	<div class="row row-cols-1 row-cols-lg-2 g-4">
		<div class="col">
			<label class="form-label">Bank Name</label>
			<input
				v-model="form.beneficiary!.bank"
				name="bank_name"
				type="text"
				placeholder="Bank Name"
				class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"
			/>
		</div>
		<div class="col">
			<label class="form-label">Account holder name</label>
			<input
				required
				v-model="form.beneficiary!.name"
				name="account_holder_name"
				type="text"
				placeholder="Account Holder Name"
				class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"
			/>
		</div>
		<div class="col">
			<label class="form-label">Beneficiary account number</label>
			<input
				required
				v-model="form.beneficiary!.destinationAccount"
				name="account_number"
				type="text"
				placeholder="Account Number"
				class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"
			/>
		</div>
		<div class="col">
			<label for="" class="form-label">Account Type</label>
			<select  class="form-control">
				<option
					:value="aType"
					v-for="aType in accountTypes"
				>
					{{ aType }}
				</option>
			</select>
		</div>
		<div class="col">
			<label for="" class="form-label">Country</label>
			<select  class="form-control">
				<option
					:value="country.name.common"
					v-for="country in countries"
				>
					{{ country.name.common }}
				</option>
			</select>
		</div>
		<div class="col">
			<label class="form-label">Swift code</label>
			<input
				name="swift_number"
				type="text"
				placeholder="Swift code"
				class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"
			/>
		</div>
		<div class="col">
			<label class="form-label">Routing number</label>
			<input
				name="routing_number"
				type="text"
				placeholder="Routing Number (optional)"
				class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"
			/>
			<div class="text-end d-none pe-3 fs-1">
				<span class="fs-sm text-muted"
					>Required only if the receiving bank requires it</span
				>
			</div>
		</div>
	</div>
</template>
