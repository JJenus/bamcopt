<script setup lang="ts">
	import axios from "axios";

	const settings = useAppSettings().settings;
	const form = ref({ ...settings.value });
	const loading = ref(false);

	const save = () => {
		loading.value = true;

		const method = !!settings.value.id ? "PUT" : "POST";
		const path = !!settings.value.id ? `/${settings.value.id}` : "";

		const axiosConfig: any = {
			method: method,
			url: `${useRuntimeConfig().public.BE_API}/app-settings${path}`,
			timeout: 20000,
			data: form.value,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				successAlert("Saved!");
			})
			.catch((error): void => {
				console.log(error);
				errorAlert("Error occurred");
			})
			.finally(() => (loading.value = false));
	};
</script>
<template>
	<div class="card">
		<div class="card-header">
			<div class="card-title m-0">
				<h3 class="fw-bold m-0">Default App Settings</h3>
			</div>
		</div>
		<div class="card-body">
			<form
				class="row row-cols-2"
				ref="formElement"
				@submit.prevent="save()"
			>
				<div class="mb-5">
					<label class="form-label">Default Currency</label>
					<input
						v-model="form.defaultBaseCurrency"
						type="text"
						class="form-control"
						required
					/>
				</div>
				<div class="mb-5">
					<label class="form-label">Symbol</label>
					<input
						v-model="form.currencySymbol"
						type="text"
						class="form-control"
						placeholder="$"
						required
					/>
				</div>
				<div class="mb-5">
					<label class="form-label">Default Language</label>
					<input
						v-model="form.defaultLanguage"
						type="text"
						class="form-control"
						required
					/>
				</div>

				<div class="mb-3i d-flex">
					<button :disabled="loading" class="btn btn-primary w-100">
						<span v-if="!loading">Save</span>
						<span
							v-else
							class="spinner-border spinner-border-sm"
						></span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
