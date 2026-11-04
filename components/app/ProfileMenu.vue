<script setup lang="ts">
	const user = userData().data;
	const props = withDefaults(defineProps<{ base?: '/app' | '/admin' }>(), { base: '/app' });
	const links = computed(() => props.base === '/admin' ? [{ to: '/admin/profile', label: 'My profile' }, { to: '/admin/settings', label: 'Workspace settings' }, { to: '/admin/settings/security', label: 'Security' }] : [{ to: '/app/profile', label: 'Personal details' }, { to: '/app/account-info', label: 'Account & limits' }, { to: '/app/settings', label: 'Settings' }]);
	const auth = useAuth();
	const route = useRoute();
	const open = ref(false);
	const themeOpen = ref(false);
	const preference = ref('light');
	const root = ref<HTMLElement>();
	const trigger = ref<HTMLButtonElement>();
	const choices = [{ value: 'light', label: 'Light', icon: 'ki-night-day' }, { value: 'dark', label: 'Dark', icon: 'ki-moon' }, { value: 'system', label: 'System', icon: 'ki-screen' }];
	const close = () => { open.value = false; themeOpen.value = false; };
	const outside = (event: Event) => { if (!root.value?.contains(event.target as Node)) close(); };
	const applyTheme = (mode: string) => {
		preference.value = mode;
		const actual = mode === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;
		document.documentElement.setAttribute('data-bs-theme', actual);
		try { localStorage.setItem('data-bs-theme', mode); } catch {}
		themeOpen.value = false;
		if (open.value) nextTick(() => trigger.value?.focus());
	};
	const systemChanged = () => { if (preference.value === 'system') applyTheme('system'); };
	let media: MediaQueryList;
	onMounted(() => {
		try { preference.value = localStorage.getItem('data-bs-theme') || document.documentElement.getAttribute('data-bs-theme') || 'light'; } catch {}
		document.addEventListener('pointerdown', outside);
		media = window.matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', systemChanged);
	});
	onUnmounted(() => { document.removeEventListener('pointerdown', outside); media?.removeEventListener('change', systemChanged); });
	watch(() => route.path, close);
</script>

<template>
	<div ref="root" class="position-relative" @keydown.esc.stop="close(); trigger?.focus()">
		<button ref="trigger" type="button" class="btn p-0 d-flex align-items-center gap-3" aria-label="Your profile menu" :aria-expanded="open" aria-controls="account-profile-menu" @click="open = !open"><AppAvatar :src="user.imgUrl" :size="38" /><span class="d-none d-md-block fw-semibold text-gray-900">{{ (user.name || '').split(' ')[0] || 'Your account' }}</span></button>
		<div v-if="open" id="account-profile-menu" class="menu menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px position-absolute end-0 mt-4 bg-body border shadow rounded-3" aria-label="Profile options">
			<div class="menu-item px-3"><div class="menu-content d-flex align-items-center px-3 py-4"><AppAvatar :src="user.imgUrl" :size="50" /><div class="d-flex flex-column ms-5" style="min-width: 0"><span class="fw-bold fs-5 text-gray-900 text-truncate">{{ user.name }}</span><span class="text-gray-600 fs-8 mt-1 text-truncate">{{ user.email }}</span></div></div></div>
			<div class="separator my-2"></div>
			<div v-for="link in links" :key="link.to" class="menu-item px-5"><NuxtLink :to="link.to" class="menu-link px-5 py-3">{{ link.label }}</NuxtLink></div>
			<div class="separator my-2"></div>
			<div class="menu-item px-5"><button type="button" class="menu-link px-5 py-3 border-0 bg-transparent w-100 text-start" :aria-expanded="themeOpen" @click="themeOpen = !themeOpen"><span class="menu-title">Appearance</span><i class="ki-outline ki-night-day fs-2 ms-auto" aria-hidden="true"></i></button><div v-if="themeOpen" class="menu menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg py-3 bg-light rounded-3 mx-3" role="group" aria-label="Appearance"><div v-for="choice in choices" :key="choice.value" class="menu-item px-3"><button type="button" class="menu-link px-3 py-2 w-100 border-0 bg-transparent" :class="{ active: preference === choice.value }" :aria-pressed="preference === choice.value" @click="applyTheme(choice.value)"><span class="menu-icon"><i :class="['ki-outline fs-2', choice.icon]" aria-hidden="true"></i></span><span class="menu-title">{{ choice.label }}</span></button></div></div></div>
			<div v-if="base === '/app'" class="menu-item px-5"><NuxtLink to="/app/help" class="menu-link px-5 py-3">Help & support</NuxtLink></div>
			<div class="separator my-2"></div>
			<div class="menu-item px-5"><button type="button" class="menu-link px-5 py-3 w-100 border-0 bg-transparent text-danger" @click="auth.logout()">Sign out</button></div>
		</div>
	</div>
</template>
