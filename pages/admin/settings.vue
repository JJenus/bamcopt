<template>
	<div>
		<SettingsBack
			hub="/admin/settings"
			:titles="{
				'/admin/settings/defaults': 'App defaults',
				'/admin/settings/tiers': 'Account tiers',
				'/admin/settings/security': 'Security',
			}"
		/>
		<NuxtPage />
	</div>
</template>
