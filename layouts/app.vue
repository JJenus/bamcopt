<script setup>
	// //code.jivosite.com/widget/PDfF9tRuON
	useHead({
		script: [
			{
				type: "text/javascript",
				innerHTML:
					"window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}",
			},
			{
				id: "zsiqscript",
				src: "https://salesiq.zohopublic.com/widget?wc=siq5734dd37dcd71c8a431548ba731c741cb9ff08c84ed8670e795b89e344f0e60d",
				defer: true,
			},
		],
		__dangerouslyDisableSanitizers: ["script"],
	});

	
</script>

<template>
	<!--begin::App-->
	<div
		id="kt_app_body"
		data-kt-app-header-fixed-mobile="true"
		data-kt-app-sidebar-enabled="true"
		data-kt-app-sidebar-fixed="true"
		data-kt-app-sidebar-push-header="true"
		data-kt-app-sidebar-push-toolbar="true"
		data-kt-app-sidebar-push-footer="true"
		data-kt-app-aside-enabled="true"
		data-kt-app-aside-fixed="true"
		data-kt-app-aside-push-header="true"
		data-kt-app-aside-push-toolbar="true"
		data-kt-app-aside-push-footer="true"
		data-bs-theme-mode="dark"
		class="app-default position-relative"
	>
		<Toast class="mt-15 mt-lg-5" />

		<div
			class="d-flex flex-column flex-root app-root position-relative"
			id="kt_app_root"
		>
			<!--begin::Page-->
			<div
				class="app-page flex-column flex-column-fluid"
				id="kt_app_page"
			>
				<!--begin::Header-->
				<AppHeader />
				<!--end::Header-->
				<!--begin::Wrapper-->
				<div
					class="app-wrapper flex-column flex-row-fluid"
					id="kt_app_wrapper"
				>
					<!--begin::Sidebar-->
					<AppSideBar />
					<!--end::Sidebar-->

					<!-- MAIN VIEW -->
					<!--begin::Main-->
					<div
						class="app-main flex-column flex-row-fluid"
						id="kt_app_main"
					>
						<!--begin::Content wrapper-->
						<div class="d-flex flex-column flex-column-fluid">
							<!--begin::Content-->
							<div
								id="kt_app_content"
								class="app-content flex-column-fluid"
							>
								<!--begin::Content container-->
								<div
									id="kt_app_content_container"
									class="app-container container-fluid pb-20 pb-lg-10"
								>
									<slot />
								</div>
								<!--end::Content container-->
							</div>
							<!--end::Content-->
						</div>
						<!--end::Content wrapper-->
					</div>

					<!--begin::aside-->
					<AppAsideBar />
					<!--end::aside-->
				</div>
				<!--end::Wrapper-->
			</div>
			<!--end::Page-->
			<AppMobileNavBar />
		</div>
		<!--end::App-->
		<AppNotifications />

		<!-- To be USED AS NOTIFICATION -->
		<!--begin::Drawers-->

		<!--end::Drawers-->

		<!--end::Engage toolbar--><!--begin::Scrolltop-->
		<div
			style="margin-bottom: 40px"
			id="kt_scrolltop"
			class="scrolltop"
			data-kt-scrolltop="true"
		>
			<i class="ki-outline ki-arrow-up"></i>
		</div>
		<!--end::Scrolltop-->

		<!--begin::Modals-->

		<!--begin::Modal - Upgrade plan-->
		<AppTopUp />

		<!--end::Modals-->
	</div>
</template>
