<script setup lang="ts">
	import type { LoginChallenge } from "~/services/auth.service";

	const auth = useAuth();
	const appResource = useAppResource();
	const userCountry = appResource.country;
	const countries = appResource.countries;

	const verify = ref({
		otp: "",
		loading: false,
	});
	try {
		const rInterval = setInterval(() => {
			if (rForm.value.country) {
				clearInterval(rInterval);
			} else {
				try {
					if (userCountry.value.name)
						rForm.value.country = userCountry.value.name.common;
				} catch (error) {}
			}
		}, 2000);
	} catch (error) {}

	const form = ref({
		email: "",
		password: "",
	});

	const rForm = ref({
		name: "",
		email: "",
		imgUrl: "",
		phone: "",
		address: "",
		city: "",
		country: "",
		// dob: "",
		password: "",
	});

	const authAction = useState<string>("authAction", () => "login");
	// OTP challenge from step 1 of the login (the code itself only exists in the e-mail)
	const loginChallenge = ref<string | null>(null);
	const loginButton = ref();
	const regButton = ref();
	const closeModalBtn = ref();

	const isInvalidCredentials = ref<boolean | null>(null);
	const passwordType = ref("password");
	const invalidMessage = ref("");
	const loading = ref(false);

	const validateEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validPassword = () => {
		// Define criteria for password strength
		const password = form.value.password;
		const minLength = 6;

		// Regular expressions for character types
		const upperCaseRegex = /[A-Z]/;
		const lowerCaseRegex = /[a-z]/;
		const digitRegex = /[0-9]/;
		const specialCharRegex = /[^A-Za-z0-9]/; // Anything that's not a letter or digit

		// Check length
		if (password.length < minLength) {
			invalidMessage.value = "Password is too short";
			return false;
		}

		// Check for uppercase letters
		else if (!upperCaseRegex.test(password)) {
			invalidMessage.value =
				"Password must contain at least one uppercase letter";
			return false;
		}

		// Check for lowercase letters
		else if (!lowerCaseRegex.test(password)) {
			invalidMessage.value =
				"Password must contain at least one lowercase letter";
			return false;
		}

		// Check for digits
		else if (!digitRegex.test(password)) {
			invalidMessage.value = "Password must contain at least one digit";
			return false;
		}

		// Check for special characters
		else if (!specialCharRegex.test(password)) {
			invalidMessage.value =
				"Password must contain at least one special character";
			return false;
		}

		// If all criteria are met, return a success message
		invalidMessage.value = "Password is strong";

		return true;
	};

	const toggleType = () => {
		if (passwordType.value == "password") {
			passwordType.value = "text";
		} else {
			passwordType.value = "password";
		}
	};

	const checkOTP = () => {
		if (!loginChallenge.value) {
			errorAlert("Go back to login");
			return;
		}
		verify.value.loading = true;
		authService
			.verifyOtp(loginChallenge.value, verify.value.otp)
			.then((session) => auth.login(session))
			.catch((err: ApiError) => errorAlert(err.message))
			.finally(() => (verify.value.loading = false));
	};

	const login = () => {
		loading.value = true;
		loginButton.value.setAttribute("data-kt-indicator", "on");

		authService
			.login(form.value.email, form.value.password)
			.then((res) => {
				// OTP_ON=false: the server returns the session itself, no code step
				if ("token" in res && res.token) return auth.login(res);
				const step = res as LoginChallenge;
				loginChallenge.value = step.challenge;
				verify.value.otp = step.devOtp ?? ""; // only present in local dev without a mail server
				authAction.value = "otp";
			})
			.catch((err: ApiError) => {
				if (err.status === 401 || err.status === 404) {
					isInvalidCredentials.value = true;
					invalidMessage.value = err.message;
				} else errorAlert("Error occurred, check your internet!");
			})
			.finally(() => {
				loading.value = false;
				try {
					loginButton.value.setAttribute("data-kt-indicator", "");
				} catch (error) {}
			});
	};

	const createAccount = (event: any) => {
		const eventF = event.target;
		if (!eventF.checkValidity()) {
			return errorAlert(
				"Looks like there are empty required fields in your form!"
			);
		}

		loading.value = true;
		rForm.value.password = form.value.password;

		regButton.value.setAttribute("data-kt-indicator", "on");

		authService
			.register(rForm.value)
			.then(({ otpRequired, ...session }) => {
				// OTP_ON=false: the account is signed in straight away
				if (otpRequired === false) return auth.login(session);
				successAlert("Account Created. Login now!");
				authAction.value = "login";
			})
			.catch((err: ApiError) => {
				if (err.status === 409) errorAlert(err.message);
				else errorAlert("Error occurred, check your internet!");
			})
			.finally(() => {
				loading.value = false;
				regButton.value.removeAttribute("data-kt-indicator");
			});
	};

	onMounted(() => {});
</script>
<template>
	<div class="modal fade" tabindex="-1" id="kt_modal_login">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content w-300px mx-auto w-lg-450px">
				<div class="modal-header border-0 position-relative mb-0 pb-0">
					<div class="d-flex flex-column modal-title w-100">
						<div
							class="fw-bold position-relative d-flex align-items-center justify-content-center fs-5"
						>
							<NFTexLogoMini :classes="'h-50px'"></NFTexLogoMini>
							<span
								class="badge d-none badge-light-success fw-bold fs-8 px-2 py-1 ms-20 mb-5 position-absolute bottom-0"
								>Pro</span
							>
						</div>

						<a
							role="btn"
							class="fw-bold text-white text-center anta-regular text-hover-primary fs-4 mt-2"
						>
							{{ $config.public.APP }}
						</a>
					</div>

					<!--begin::Close-->
					<div
						ref="closeModalBtn"
						class="btn btn-icon btn-icon-danger btn-sm btn-active-light-primary ms-2 end-0 position-absolute top-0 m-4"
						data-bs-dismiss="modal"
						aria-label="Close"
					>
						<i class="ki-duotone ki-cross fs-3x"
							><span class="path1"></span
							><span class="path2"></span
						></i>
					</div>

					<!--end::Close-->
				</div>

				<div class="modal-body mt-lg-3 pt-0">
					<div v-if="authAction === 'login'">
						<form @submit.prevent="login()">
							<div
								class="d-flex flex-column justify-content-center align-items-center"
							>
								<div class="fs-2">Sign In</div>
								<div
									class="fs-6 text-muted mb-5 text-center fw-bold"
								>
									Welcome back
								</div>
							</div>
							<div class="px-5 menu-item mb-3">
								<label for="" class="form-label">Email</label>
								<input
									type="email"
									class="form-control form-control-solid"
									v-model="form.email"
									name="email"
								/>
							</div>
							<div class="px-5 menu-item mb-2">
								<label for="" class="form-label"
									>Password</label
								>
								<div
									class="d-flex align-items-center justify-content-center flex-column position-relative"
									bis_skin_checked="1"
								>
									<input
										:class="
											isInvalidCredentials
												? 'is-invalid'
												: ''
										"
										:type="passwordType"
										class="form-control form-control-solid pe-10 w-100"
										placeholder="password"
										v-model="form.password"
									/>
									<div class="invalid-feedback">
										{{ invalidMessage }}
									</div>

									<button
										@click.prevent="toggleType()"
										type="button"
										class="btn position-absolute btn-active-icon-danger me-3 bg-transparent p-0 top-0 mt-3 end-0"
									>
										<i
											v-if="passwordType == 'password'"
											class="ki-outline ki-eye fs-3 hover-scale"
										></i>
										<i
											v-else
											class="ki-outline ki-eye-slash fs-3 hover-scale"
										></i>
									</button>
								</div>
							</div>

							<div class="mx-5 menu-item mb-3 text-end">
								<div
									@click="authAction = 'forgot'"
									role="button"
									class="text-primaryi fw-bold"
								>
									Forgot password?
								</div>
							</div>

							<!--begin::Menu item-->
							<div class="menu-item px-5">
								<button
									ref="loginButton"
									class="btn btn-secondary w-100 mb-5"
									:class="loading ? 'disabled' : ''"
								>
									<span class="indicator-label"> Login </span>
									<!--end::Indicator label-->

									<!--begin::Indicator progress-->
									<span class="indicator-progress">
										Please wait...
										<span
											class="spinner-border spinner-border-sm align-middle ms-2"
										></span>
									</span>
								</button>
								<div class="text-center">
									New here?
									<a
										@click="authAction = 'register'"
										role="button"
										class="btn-link"
									>
										Create account</a
									>
								</div>
							</div>

							<div v-if="loginChallenge" class="mx-5 mt-3 text-center">
								<a
									@click="authAction = \'otp\'"
									role="button"
									class="btn-link border-bottom border-4 fw-bold"
								>
									Have OTP?
								</a>
							</div>
						</form>
					</div>

					<form
						v-else-if="authAction === 'register'"
						@submit.prevent="createAccount($event)"
						class="needs-validation"
						novalidate
					>
						<div
							class="d-flex justify-content-center align-items-center"
						>
							<div>
								<div class="fs-2">Create New Account</div>
								<div
									class="fs-6 text-muted mb-5 text-center fw-bold"
								>
									Enjoy endless possibilities.
								</div>
							</div>
						</div>
						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Name</label>
							<input
								required
								type="name"
								class="form-control form-control-solid"
								v-model="rForm.name"
								name="name"
							/>
							<div class="invalid-feedback">Name is required</div>
						</div>

						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Email</label>
							<input
								required
								type="email"
								class="form-control form-control-solid"
								v-model="rForm.email"
								name="email"
								:class="
									!validateEmail(rForm.email) && rForm.email
										? 'is-invalid'
										: ''
								"
							/>
							<div class="invalid-feedback">
								Invalid email address
							</div>
						</div>

						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Country</label>
							<select
								v-model="rForm.country"
								class="form-control"
							>
								<option
									:value="country.name.common"
									v-for="country in countries"
								>
									{{ country.name.common }}
								</option>
							</select>
							<div class="invalid-feedback">
								Country is required
							</div>
						</div>
						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Password</label>
							<div
								class="d-flex align-items-center justify-content-center flex-column position-relative"
								bis_skin_checked="1"
							>
								<input
									required
									:class="
										validPassword() === false
											? 'is-invalid'
											: ''
									"
									:type="passwordType"
									class="form-control form-control-solid pe-10 w-100"
									placeholder="password"
									v-model="form.password"
								/>
								<div class="invalid-feedback">
									{{ invalidMessage }}
								</div>

								<button
									@click.prevent="toggleType()"
									type="button"
									class="btn position-absolute btn-active-icon-danger me-3 bg-transparent p-0 top-0 mt-3 end-0"
								>
									<i
										v-if="passwordType == 'password'"
										class="ki-outline ki-eye fs-3 hover-scale"
									></i>
									<i
										v-else
										class="ki-outline ki-eye-slash fs-3 hover-scale"
									></i>
								</button>
							</div>
						</div>

						<!--begin::Menu item-->
						<div class="menu-item px-5">
							<button
								:disabled="
									!validPassword() ||
									!validateEmail(rForm.email)
								"
								ref="regButton"
								class="btn btn-secondary w-100"
								:class="loading ? 'disabled' : ''"
							>
								<span class="indicator-label">
									Create account
								</span>
								<!--end::Indicator label-->

								<!--begin::Indicator progress-->
								<span class="indicator-progress">
									Please wait...
									<span
										class="spinner-border align-middle ms-2"
									></span>
								</span>
							</button>
						</div>

						<div class="mx-5 mt-3 text-center">
							Have account?
							<a
								@click="authAction = 'login'"
								role="button"
								class="btn-link border-bottom border-4 fw-bold"
							>
								Sign in</a
							>
						</div>
					</form>

					<form
						v-else-if="authAction === 'forgot'"
						@submit.prevent="createAccount($event)"
					>
						<div
							class="d-flex justify-content-center align-items-center"
						>
							<div>
								<div class="fs-2">Forgot password?</div>
								<div
									class="fs-6 text-muted mb-5 text-center fw-bold"
								>
									Recover your password.
								</div>
							</div>
						</div>
						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Email</label>
							<input
								type="email"
								class="form-control form-control-solid"
								v-model="form.email"
								name="email"
								:class="
									!validateEmail(form.email) && form.email
										? 'is-invalid'
										: ''
								"
							/>
							<div class="invalid-feedback">
								Invalid email address
							</div>
						</div>
						<!--begin::Menu item-->
						<div class="menu-item px-5">
							<button
								ref="regButton"
								class="btn btn-secondary w-100"
								:class="loading ? 'disabled' : ''"
							>
								<span class="indicator-label">
									Recover password
								</span>
								<!--end::Indicator label-->

								<!--begin::Indicator progress-->
								<span class="indicator-progress">
									Please wait...
									<span
										class="spinner-border align-middle ms-2"
									></span>
								</span>
							</button>
						</div>

						<div class="mx-5 mt-3 text-center">
							Have account?
							<a
								@click="authAction = 'login'"
								role="button"
								class="btn-link border-bottom border-4 fw-bold"
							>
								Sign in
							</a>
						</div>
					</form>

					<form
						v-else-if="authAction === 'otp'"
						@submit.prevent="checkOTP()"
					>
						<div
							class="d-flex justify-content-center align-items-center mt-8"
						>
							<div>
								<div class="fs-2 text-center">Enter OTP</div>
								<div
									class="fs-6 text-muted mb-5 text-center fw-bold"
								>
									A one time password was sent to your email.
								</div>
							</div>
						</div>
						<div class="px-5 menu-item mb-3">
							<input
								type="text"
								class="form-control form-control-solid text-center fs-2 fw-bold"
								v-model="verify.otp"
								name="otp"
							/>
							<div class="invalid-feedback">Invalid otp</div>
						</div>
						<!--begin::Menu item-->
						<div class="menu-item px-5">
							<button
								ref="regButton"
								class="btn btn-secondary w-100"
								:class="verify.loading ? 'disabled' : ''"
							>
								<span
									v-if="!verify.loading"
									class="indicator-label"
								>
									Continue
								</span>
								<!--end::Indicator label-->

								<!--begin::Indicator progress-->
								<span v-else class="indicator-progressi">
									Please wait...
									<span
										class="spinner-border spinner-border-sm align-middle ms-2"
									></span>
								</span>
							</button>
						</div>

						<div class="mx-5 mt-3 text-center">
							Back to
							<a
								@click="authAction = 'login'"
								role="button"
								class="btn-link border-bottom border-4 fw-bold"
							>
								Sign in
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Anta&family=Lobster&family=Truculenta:opsz,wght@12..72,800&display=swap");

	.anta-regular {
		font-family: "Anta", sans-serif;
		font-weight: 400;
		font-style: normal;
	}

	.truculenta-ero {
		font-family: "Truculenta", sans-serif;
		font-optical-sizing: auto;
		font-weight: 800;
		font-style: normal;
		font-variation-settings: "wdth" 100;
	}

	.lobster-regular {
		font-family: "Lobster", sans-serif;
		font-weight: 400;
		font-style: normal;
	}
</style>
