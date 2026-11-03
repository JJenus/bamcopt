<script setup lang="ts">
	import type { FundingAccount } from "~/utils/interfaces/Funding";

	useSeoMeta({ title: `Funding - ${useRuntimeConfig().public.APP}` });

	const { accounts, loading, load } = useFunding();
	const money = useAppSettings().formatMoney;
	const symbol = useAppSettings().settings.value.currencySymbol;

	onMounted(load);

	const total = computed(() => accounts.value.filter((a) => a.active).reduce((sum, a) => sum + (a.balance || 0), 0));

	const blank = () => ({ label: "", type: "bank", bankName: "", accountName: "", accountNumber: "", currency: "", instructions: "" });
	const editing = ref<string | null>(null); // account id, or "new"
	const form = ref<Record<string, any>>(blank());
	const saving = ref(false);

	const openNew = () => {
		form.value = blank();
		editing.value = "new";
	};
	const openEdit = (a: FundingAccount) => {
		form.value = { ...blank(), ...a };
		editing.value = a.id;
	};

	const save = async () => {
		const { label, type, bankName, accountName, accountNumber, currency, instructions } = form.value;
		const body = { label, type, bankName, accountName, accountNumber, currency, instructions };
		saving.value = true;
		try {
			if (editing.value === "new") await fundingService.create(body as any);
			else await fundingService.update(editing.value!, body as any);
			editing.value = null;
			await load();
		} catch (e: any) {
			errorAlert(e.message);
		} finally {
			saving.value = false;
		}
	};

	const toggle = async (a: FundingAccount) => {
		try {
			await fundingService.update(a.id, { active: !a.active });
			await load();
		} catch (e: any) {
			errorAlert(e.message);
		}
	};

	const adjust = async (a: FundingAccount) => {
		const input = prompt(`Adjust "${a.label}" balance by (use - to subtract):`, "");
		if (input === null || input.trim() === "") return;
		const amount = Number(input);
		if (!Number.isFinite(amount) || amount === 0) return errorAlert("Enter a valid amount");
		try {
			await fundingService.update(a.id, { adjustment: amount });
			await load();
		} catch (e: any) {
			errorAlert(e.message);
		}
	};
</script>

<template>
	<div>
		<div class="card card-custom bg-light-success border-0 mb-5">
			<div class="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
				<div>
					<div class="text-muted fw-semibold">Total funding balance</div>
					<div class="fs-2hx fw-bold">{{ symbol }}{{ money(total, false) }}</div>
					<div class="text-muted">{{ accounts.filter((a) => a.active).length }} active account(s)</div>
				</div>
				<button class="btn btn-primary" @click="openNew()">
					<i class="ki-outline ki-plus fs-2"></i> Add account
				</button>
			</div>
		</div>

		<form v-if="editing" class="card mb-5" @submit.prevent="save()">
			<div class="card-header"><h3 class="card-title">{{ editing === "new" ? "New" : "Edit" }} funding account</h3></div>
			<div class="card-body row g-4">
				<div class="col-md-6"><label class="form-label required">Label</label><input v-model="form.label" class="form-control" required minlength="2" placeholder="e.g. Main bank (USD)" /></div>
				<div class="col-md-6">
					<label class="form-label">Type</label>
					<select v-model="form.type" class="form-select"><option value="bank">Bank</option><option value="crypto">Crypto</option><option value="other">Other</option></select>
				</div>
				<div class="col-md-6"><label class="form-label">Bank / network</label><input v-model="form.bankName" class="form-control" /></div>
				<div class="col-md-6"><label class="form-label">Account name</label><input v-model="form.accountName" class="form-control" /></div>
				<div class="col-md-6"><label class="form-label required">Account number / address</label><input v-model="form.accountNumber" class="form-control" required /></div>
				<div class="col-md-6"><label class="form-label">Currency</label><input v-model="form.currency" class="form-control" placeholder="USD" /></div>
				<div class="col-12"><label class="form-label">Instructions shown to users</label><textarea v-model="form.instructions" rows="3" class="form-control"></textarea></div>
			</div>
			<div class="card-footer d-flex justify-content-end gap-3">
				<button type="button" class="btn btn-light" @click="editing = null">Cancel</button>
				<button class="btn btn-primary" :disabled="saving">{{ saving ? "Saving..." : "Save" }}</button>
			</div>
		</form>

		<div v-if="loading && !accounts.length" class="text-center py-10"><span class="spinner-border text-muted"></span></div>
		<div v-else-if="!accounts.length" class="card"><div class="card-body text-center text-muted">No funding accounts yet. Add the bank or wallet your users deposit into.</div></div>

		<div v-for="a in accounts" :key="a.id" class="card mb-4" :class="{ 'opacity-50': !a.active }">
			<div class="card-body">
				<div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
					<div>
						<div class="fw-bold fs-4">
							{{ a.label }}
							<span class="badge badge-light-primary ms-2 text-uppercase">{{ a.type }}</span>
							<span v-if="!a.active" class="badge badge-light-danger ms-1">hidden</span>
						</div>
						<div class="text-muted">
							{{ [a.bankName, a.accountName, a.accountNumber, a.currency].filter(Boolean).join(" · ") }}
						</div>
					</div>
					<div class="text-end">
						<div class="text-muted fs-7">Balance</div>
						<div class="fw-bold fs-2">{{ symbol }}{{ money(a.balance || 0, false) }}</div>
					</div>
				</div>
				<div class="d-flex flex-wrap gap-2 mt-4">
					<button class="btn btn-sm btn-light-primary" @click="adjust(a)">Adjust balance</button>
					<button class="btn btn-sm btn-light" @click="openEdit(a)">Edit</button>
					<button class="btn btn-sm btn-light-warning" @click="toggle(a)">{{ a.active ? "Hide from users" : "Show to users" }}</button>
				</div>
			</div>
		</div>
	</div>
</template>
