<script setup lang="ts">
	const user = userData().data;
	const image = user.value.imgUrl || "/assets/media/svg/avatars/blank.svg";

	// const tiers = useAppSettings().accountLevels;
	const account = user.value.account;
	const auth = useAuth();

	const logout = () => {
		auth.logout();
	};
</script>

<template>
	<div>
		<div
			class="cursor-pointer symbol symbol-circle ms-2 symbol-35px symbol-lg-50px"
			data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
			data-kt-menu-attach="parent"
			data-kt-menu-placement="bottom-end"
		>
			<img :src="image" alt="user" />
		</div>

		<!--begin::User account menu-->
		<div
			class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
			data-kt-menu="true"
		>
			<!--begin::Menu item-->
			<div class="menu-item px-3">
				<div class="menu-content d-flex align-items-center px-3">
					<!--begin::Avatar-->
					<div class="symbol symbol-50px me-5">
						<img alt="Logo" :src="image" />
					</div>
					<!--end::Avatar-->

					<!--begin::Username-->
					<div class="d-flex flex-column">
						<div class="fw-bold d-flex align-items-center fs-5">
							<span v-if="user.name">{{ user.name }}</span>
							<span
								v-else
								class="spinner-border spinner-border-sm"
							></span>

							<i
								class="fa-solid fa-circle text-success ms-2 fs-67"
							></i>
						</div>

						<!-- <div
							class="d-flex align-items-center fw-bold fs-7 text-muted"
						>
							<i class="ki-solid ki-medal-star text-primary fs-2">
							</i>
							<span v-for="tier in tiers">
								<span
									v-if="
										account.accountLevel ===
										tier.accountLevel
									"
								>
									{{ tier.title }}
								</span>
							</span>
						</div> -->
					</div>
					<!--end::Username-->
				</div>
			</div>
			<!--end::Menu item-->

			<!--begin::Menu separator-->
			<div class="separator my-2"></div>
			<!--end::Menu separator-->

			<!--begin::Menu item-->
			<div @click="closeDrawer()" class="menu-item px-5">
				<NuxtLink to="/app/profile/" class="menu-link px-5">
					My Profile
				</NuxtLink>
			</div>
			<div @click="closeDrawer()" class="menu-item px-5">
				<NuxtLink to="/app/account-info" class="menu-link px-5">
					<div class="d-flex flex-column align-items-start">
						<span>Account Info</span>
						<small class="text-muted fs-8"
							>View your transaction limits</small
						>
					</div>
				</NuxtLink>
			</div>
			<!--end::Menu item-->

			<!--begin::Menu separator-->
			<div class="separator my-2"></div>
			<!--end::Menu separator-->

			<!--begin::Menu item-->
			<div
				class="menu-item px-5"
				data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
				data-kt-menu-placement="left-start"
				data-kt-menu-offset="-15px, 0"
			>
				<a href="#" class="menu-link px-5">
					<span class="menu-title position-relative">
						Mode

						<span
							class="ms-5 position-absolute translate-middle-y top-50 end-0"
						>
							<i
								class="ki-outline ki-night-day theme-light-show fs-2"
							></i>
							<i
								class="ki-outline ki-moon theme-dark-show fs-2"
							></i>
						</span>
					</span>
				</a>

				<!--begin::Menu-->
				<div
					class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px"
					data-kt-menu="true"
					data-kt-element="theme-mode-menu"
				>
					<!--begin::Menu item-->
					<div class="menu-item px-3 my-0">
						<a
							href="#"
							class="menu-link px-3 py-2"
							data-kt-element="mode"
							data-kt-value="light"
						>
							<span class="menu-icon" data-kt-element="icon">
								<i class="ki-outline ki-night-day fs-2"></i>
							</span>
							<span class="menu-title"> Light </span>
						</a>
					</div>
					<!--end::Menu item-->

					<!--begin::Menu item-->
					<div class="menu-item px-3 my-0">
						<a
							href="#"
							class="menu-link px-3 py-2"
							data-kt-element="mode"
							data-kt-value="dark"
						>
							<span class="menu-icon" data-kt-element="icon">
								<i class="ki-outline ki-moon fs-2"></i>
							</span>
							<span class="menu-title"> Dark </span>
						</a>
					</div>
					<!--end::Menu item-->

					<!--begin::Menu item-->
					<div class="menu-item px-3 my-0">
						<a
							href="#"
							class="menu-link px-3 py-2"
							data-kt-element="mode"
							data-kt-value="system"
						>
							<span class="menu-icon" data-kt-element="icon">
								<i class="ki-outline ki-screen fs-2"></i>
							</span>
							<span class="menu-title"> System </span>
						</a>
					</div>
					<!--end::Menu item-->
				</div>
				<!--end::Menu-->
			</div>
			<!--end::Menu item-->

			<!--begin::Menu item-->
			<div
				class="menu-item px-5"
				data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
				data-kt-menu-placement="left-start"
				data-kt-menu-offset="-15px, 0"
			>
				<a href="#" class="menu-link px-5">
					<span class="menu-title position-relative">
						Language

						<span
							class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"
						>
							English
							<img
								class="w-15px h-15px rounded-1 ms-2"
								src="/assets/media/flags/united-states.svg"
								alt=""
							/>
						</span>
					</span>
				</a>

				<!--begin::Menu sub-->
				<div class="menu-sub menu-sub-dropdown w-175px py-4">
					<!--begin::Menu item-->
					<div class="menu-item px-3">
						<a role="button" class="menu-link d-flex px-5 active">
							<span class="symbol symbol-20px me-4">
								<img
									class="rounded-1"
									src="/assets/media/flags/united-states.svg"
									alt=""
								/>
							</span>
							English
						</a>
					</div>
					<!--end::Menu item-->

					<!--begin::Menu item-->
					<div class="menu-item px-3">
						<a role="button" class="menu-link d-flex px-5">
							<span class="symbol symbol-20px me-4">
								<img
									class="rounded-1"
									src="/assets/media/flags/spain.svg"
									alt=""
								/>
							</span>
							Spanish
						</a>
					</div>
					<!--end::Menu item-->

					<!--begin::Menu item-->
					<div class="menu-item px-3">
						<a role="button" class="menu-link d-flex px-5">
							<span class="symbol symbol-20px me-4">
								<img
									class="rounded-1"
									src="/assets/media/flags/germany.svg"
									alt=""
								/>
							</span>
							German
						</a>
					</div>
					<!--end::Menu item-->

					<!--begin::Menu item-->
					<div class="menu-item px-3">
						<a role="button" class="menu-link d-flex px-5">
							<span class="symbol symbol-20px me-4">
								<img
									class="rounded-1"
									src="/assets/media/flags/japan.svg"
									alt=""
								/>
							</span>
							Japanese
						</a>
					</div>
					<!--end::Menu item-->

					<!--begin::Menu item-->
					<div class="menu-item px-3">
						<a role="button" class="menu-link d-flex px-5">
							<span class="symbol symbol-20px me-4">
								<img
									class="rounded-1"
									src="/assets/media/flags/france.svg"
									alt=""
								/>
							</span>
							French
						</a>
					</div>
					<!--end::Menu item-->
				</div>
				<!--end::Menu sub-->
			</div>
			<!--end::Menu item-->

			<!--begin::Menu item-->
			<div class="menu-item px-5 my-1 d-none">
				<NuxLink to="/app/settings" class="menu-link px-5">
					Account Settings
				</NuxLink>
			</div>
			<!--end::Menu item-->

			<!--begin::Menu item-->
			<div class="menu-item px-5">
				<div @click="logout()" role="button" class="menu-link px-5">
					Sign Out
				</div>
			</div>
			<!--end::Menu item-->
		</div>
		<!--end::User account menu-->
	</div>
</template>
