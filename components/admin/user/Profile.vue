<script setup lang="ts">
	import type { IUser } from '~/utils/interfaces/IUser';
	defineProps<{ user: IUser }>();
</script>
<template><AdminUserControls :user="user" /></template>
