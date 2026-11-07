<script setup lang="ts">
	import type { DeviceSession } from '~/services/security.service';
	import { deviceIcon, exactTime, timeAgo } from '~/utils/session-ui';
	defineProps<{ devices: DeviceSession[]; detailed?: boolean }>();
	const others = (device: DeviceSession) => device.ips.filter((ip) => ip !== device.lastIp).slice(0, 4).join(', ');
</script>

<template>
	<div>
		<article v-for="device in devices" :key="device.key" class="d-flex gap-5 py-6 border-bottom">
			<i :class="['ki-outline fs-2x text-primary mt-1', deviceIcon(device.deviceType)]" aria-hidden="true"></i>
			<div class="flex-grow-1 admin-identity">
				<div class="d-flex flex-wrap align-items-center gap-3 mb-2">
					<h3 class="fs-5 mb-0">{{ device.label }}</h3>
					<span v-if="device.current" class="badge badge-light-success">This device</span>
				</div>
				<p class="text-gray-700 fs-7 mb-1"><span :title="exactTime(device.lastSeen)">Last active {{ timeAgo(device.lastSeen) }}</span> · {{ device.signIns }} sign-in{{ device.signIns === 1 ? '' : 's' }}</p>
				<p class="text-gray-600 fs-7 mb-1">{{ device.lastLocation || 'Location unavailable' }} · IP {{ device.lastIp }}</p>
				<p v-if="others(device)" class="text-gray-600 fs-8 mb-1">Also seen from {{ others(device) }}</p>
				<p class="text-gray-600 fs-8 mb-0">First seen {{ exactTime(device.firstSeen) }}</p>
				<p v-if="detailed" class="text-gray-500 fs-9 text-break mt-2 mb-0">{{ device.userAgent }}</p>
			</div>
		</article>
	</div>
</template>
