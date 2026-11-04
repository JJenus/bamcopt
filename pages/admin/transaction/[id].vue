<script setup lang="ts">
	definePageMeta({ key: route => route.fullPath });
	const id = String(useRoute().params.id);
	const tx = ref<Awaited<ReturnType<typeof transactionService.get>> | null>(null);
	const error = ref(''); const loading = ref(true);
	const load = async () => { loading.value = true; error.value = ''; try { tx.value = await transactionService.get(id); } catch { error.value = 'Unable to load this transaction. Check the link or try again.'; } finally { loading.value = false; } };
	onMounted(load);
</script>
<template><div><AppPageHeader title="Transaction details" description="Review the record and the consequences of any status change." /><AppLoadState :loading="loading" :error="error" :empty="!tx" title="Transaction unavailable" @retry="load"><template v-if="tx"><NuxtLink :to="`/admin/users/${tx.senderId}`" class="d-inline-block mb-6 fw-semibold">← Sender account</NuxtLink><AdminUserTransaction :transaction="tx" @saved="load" /></template></AppLoadState></div></template>
