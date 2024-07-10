<script setup>
	const CONFIG = useRuntimeConfig().public;

	useSeoMeta({
		title: `${CONFIG.APP}`,
	});
</script>

<template>
	<div class="container-fluid">
		<div class="card border-0 bg-transparent">
			<div class="card-body p-0">
				<div
					class="row row-cols-1 row-cols-lg-2 justify-content-between align-items-center mb-5"
				>
					<div class="col">
						<div class="mw-450px ms-md-4i ms-xl-1">
							<h1 class="display-4">
								Banking made simple, secure, and seamless.
								That's the
								<span class="text-danger">{{
									CONFIG.APP
								}}</span>
								promise.
							</h1>
							<h6 class="text-muted mb-10">
								Secure, Seamless, and Smart Banking Solutions
								Await You!
							</h6>
						</div>
					</div>
					<div class="col">
						<div class="mx-n16 rounded me-lg-0">
							<SwiperMainSlide />
						</div>
					</div>
				</div>

				<!-- WHAT TO EXPECT -->

				<div
					class="card border-transparent my-12"
					data-bs-theme="light"
					style="background-color: #1c325e"
				>
					<!--begin::Body-->
					<div class="card-body d-flex ps-xl-15">
						<!--begin::Wrapper-->
						<div class="m-0">
							<!--begin::Title-->
							<div
								class="position-relative mb-5 fs-1 z-index-2 fw-bold text-white mb-7"
							>
								<span class="me-2">
									We here for
									<span
										class="position-relative d-inline-block text-success"
									>
										<a
											role="button"
											class="text-success opacity-75-hover"
										>
											you </a
										>!

										<!--begin::Separator-->
										<span
											class="position-absolute opacity-50 bottom-0 start-0 border-4 border-success border-bottom w-100"
										></span>
										<!--end::Separator-->
									</span>
								</span>
								<br />

								<span class="fs-3x"> What to expect </span>
							</div>
							<!--end::Title-->

							<!--begin::Action-->
							<div
								class="mb-3 position-relative mt-8"
								style="z-index: 2"
							>
								<a
									role="button"
									class="btn btn-success fw-semibold me-2"
									data-bs-toggle="modal"
									data-bs-target="#kt_modal_login"
									@click="useAuth().openAuthModal('register')"
								>
									Created Account
								</a>

								<a
									data-bs-toggle="modal"
									data-bs-target="#kt_modal_login"
									@click="useAuth().openAuthModal('login')"
									role="button"
									class="btn btn-color-white bg-white bg-opacity-15 bg-hover-opacity-25 fw-semibold"
								>
									Sign in
								</a>
							</div>
							<!--begin::Action-->
						</div>
						<!--begin::Wrapper-->

						<!--begin::Illustration-->
						<img
							src="/assets/media/illustrations/sigma-1/17-dark.png"
							class="position-absolute me-3 bottom-0 end-0 h-200px"
							style="z-index: 1"
							alt=""
						/>
						<!--end::Illustration-->
					</div>
					<!--end::Body-->
				</div>

				<!-- SEAMLESS TRANSACTIONS -->
				<div class="card card-flush h-xl-100 mb-5">
					<!--begin::Body-->
					<div class="card-body py-9">
						<!--begin::Row-->
						<div class="row gx-9 h-100">
							<!--begin::Col-->
							<div class="col-sm-6 mb-10 mb-sm-0">
								<!--begin::Overlay-->
								<div class="overlay h-100" role="button">
									<!--begin::Image-->
									<div
										class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100"
										style="
											background-image: url('https://t3.ftcdn.net/jpg/03/30/78/08/240_F_330780882_gUmEzkzPLQebQJclnvXxa0Bt1qE83acZ.jpg');
										"
									></div>
									<!--end::Image-->

									<!--begin::Action-->
									<div
										class="overlay-layer card-rounded bg-dark bg-opacity-25"
									>
										<NFTexLogo :classes="'h-30px'" />
									</div>
									<!--end::Action-->
								</div>
								<!--end::Overlay-->
							</div>
							<!--end::Col-->

							<!--begin::Col-->
							<div class="col-sm-6 card border-0">
								<!--begin::Wrapper-->
								<div
									class="card-body d-flex flex-column justify-content-center h-lg-400px align-items-center"
								>
									<!--begin::Header-->
									<div class="mb-0">
										<!--begin::Title-->
										<div class="text-centeri mb-7 mb-lg-10">
											<i
												class="ki-duotone d-md-none ki-send text-success fs-2 order-1o me-2"
											>
												<span class="path1"></span>
												<span class="path2"></span>
											</i>
											<a
												role="button"
												class="text-gray-800 text-hover-primary fs-3 fs-md-2x fw-bold"
												>Seamless Transactions</a
											>
										</div>
										<!--end::Title-->
									</div>
									<!--end::Header-->

									<div
										class="d-flex flex-column flex-md-row justify-content-between align-items-center"
									>
										<i
											class="ki-duotone d-none d-md-block ki-send text-success fs-5x order-1o me-5"
										>
											<span class="path1"></span>
											<span class="path2"></span>
										</i>
										<div>
											<span
												class="fw-bold text-gray-600i fs-4 pb-5"
												>{{ CONFIG.APP }} ensures that
												your transactions are smooth and
												effortless. With our intuitive
												interface and streamlined
												processes, sending money, paying
												bills, and managing your
												finances is quick and
												easy.4</span
											>
										</div>
									</div>
								</div>
								<!--end::Wrapper-->
							</div>
							<!--end::Col-->
						</div>
						<!--end::Row-->
					</div>
					<!--end::Body-->
				</div>

				<!-- Robost security -->

				<div class="card card-flush h-xl-100 mb-5">
					<!--begin::Body-->
					<div class="card-body py-9">
						<!--begin::Row-->
						<div class="row gx-9 h-100">
							<!--begin::Col-->
							<div
								class="col-sm-6 mb-10 mb-sm-0 order-1 order-lg-2"
							>
								<!--begin::Overlay-->
								<div class="overlay h-100" role="button">
									<!--begin::Image-->
									<div
										class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100"
										style="
											background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockwellautomation.com%2Fcontent%2Fdam%2Frockwell-automation%2Fsites%2Fimages%2Fsimple-content%2Fblogs%2FTailor-cybersecurity-to-OT-environments.jpg&f=1&nofb=1&ipt=303a1f2385dfc3986e20aa3cfc0e1edcfb19f54e9df0ec6d9b801458dc80f68f&ipo=images');
										"
									></div>
									<!--end::Image-->

									<!--begin::Action-->
									<div
										class="overlay-layer card-rounded bg-dark bg-opacity-25"
									>
										<NFTexLogo :classes="'h-30px'" />
									</div>
									<!--end::Action-->
								</div>
								<!--end::Overlay-->
							</div>
							<!--end::Col-->

							<!--begin::Col-->
							<div
								class="col-sm-6 card border-0 order-2 order-lg-1"
							>
								<!--begin::Wrapper-->
								<div
									class="card-body d-flex flex-column justify-content-center h-lg-400px align-items-center"
								>
									<!--begin::Header-->
									<div class="mb-0">
										<!--begin::Title-->
										<div class="text-centeri mb-7 mb-lg-10">
											<i
												class="ki-solid d-md-none ki-lock-3 fs-2 text-danger me-2"
											>
											</i>

											<a
												role="button"
												class="text-gray-800 text-hover-primary fs-3 fs-md-2x fw-bold"
												>Robust Security Measures</a
											>
										</div>
										<!--end::Title-->
									</div>
									<!--end::Header-->

									<div
										class="d-flex flex-column flex-md-row justify-content-between align-items-center"
									>
										<i
											class="ki-duotone ki-lock-3 fs-5x text-danger me-5"
										>
											<span class="path1"></span>
											<span class="path2"></span>
											<span class="path3"></span>
										</i>
										<div>
											<span
												class="fw-bold text-gray-600i fs-4 pb-5"
												>our security is our top
												priority.
												{{ CONFIG.APP }} employs
												state-of-the-art encryption
												techniques and multi-factor
												authentication to safeguard your
												account and personal
												information. Rest assured, your
												data is protected against
												unauthorized access and cyber
												threats.
											</span>
										</div>
									</div>
								</div>
								<!--end::Wrapper-->
							</div>
							<!--end::Col-->
						</div>
						<!--end::Row-->
					</div>
					<!--end::Body-->
				</div>

				<!-- Hassle-Free Banking Experiences: -->
				<div class="card card-flush h-xl-100 mb-5">
					<!--begin::Body-->
					<div class="card-body py-9">
						<!--begin::Row-->
						<div class="row gx-9 h-100">
							<!--begin::Col-->
							<div class="col-sm-6 mb-10 mb-sm-0">
								<!--begin::Overlay-->
								<div
									class="d-block overlay h-100"
									role="button"
								>
									<!--begin::Image-->
									<div
										class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100"
										style="
											background-image: url('/assets/media/banking/All-Web-Banner-Banking-2426953948.jpg');
										"
									></div>
									<!--end::Image-->

									<!--begin::Action-->
									<div
										class="overlay-layer card-rounded bg-dark bg-opacity-25"
									>
										<NFTexLogo :classes="'h-30px'" />
									</div>
									<!--end::Action-->
								</div>
								<!--end::Overlay-->
							</div>
							<!--end::Col-->

							<!--begin::Col-->
							<div class="col-sm-6 card border-0">
								<!--begin::Wrapper-->
								<div
									class="card-body d-flex flex-column justify-content-center h-lg-300px align-items-center"
								>
									<!--begin::Header-->
									<div class="mb-0">
										<!--begin::Title-->
										<div class="text-centeri mb-7 mb-lg-10">
											<i
												class="ki-duotone ki-monitor-mobile fs-1 text-warning me-2 d-md-none"
											>
												<span class="path1"></span>
												<span class="path2"></span>
											</i>
											<a
												role="button"
												class="text-gray-800 text-hover-primary fs-3 fs-md-2x fw-bold"
												>Hassle-Free Banking
											</a>
										</div>
										<!--end::Title-->
									</div>
									<!--end::Header-->

									<div
										class="d-flex flex-column flex-md-row justify-content-between align-items-center"
									>
										<i
											class="ki-duotone ki-monitor-mobile fs-5x text-warning me-5 d-none d-md-block"
										>
											<span class="path1"></span>
											<span class="path2"></span>
										</i>
										<div>
											<span
												class="fw-bold text-gray-600i fs-4 pb-5"
												>{{ CONFIG.APP }} ensures that
												your transactions are smooth and
												effortless. With our intuitive
												interface and streamlined
												processes, sending money, paying
												bills, and managing your
												finances is quick and
												easy.4</span
											>
										</div>
									</div>
								</div>
								<!--end::Wrapper-->
							</div>
							<!--end::Col-->
						</div>
						<!--end::Row-->
					</div>
					<!--end::Body-->
				</div>
			</div>
			<!--end::Card body-->
		</div>
		<!--end::Card-->
	</div>
</template>
