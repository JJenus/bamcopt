import type { AuthToken } from "~/utils/interfaces/AuthToken";

export type LoginChallenge = { challenge: string; allowedTime: number; devOtp?: string };
/** A challenge when the server has OTP on, the session itself when OTP_ON=false. */
export type LoginResult = LoginChallenge | AuthToken;

export const authService = {
	/** Step 1: e-mail + password. The server e-mails a one-time code and returns a challenge (or the session when OTP is off). */
	login: (email: string, password: string) =>
		apiRequest<LoginResult>("/auth/login", { method: "POST", body: { email, password }, auth: false }),

	/** Step 2: the code from the e-mail. Returns the session. */
	verifyOtp: (challenge: string, code: string) =>
		apiRequest<AuthToken>("/auth/verify-otp", { method: "POST", body: { challenge, code }, auth: false }),

	register: (data: Record<string, unknown>) =>
		apiRequest<AuthToken & { otpRequired?: boolean }>("/auth/register", { method: "POST", body: data, auth: false, timeout: 30000 }),

	verifyEmail: (token: string) => apiRequest("/auth/verify-email", { method: "POST", body: { token }, auth: false }),
	requestPasswordReset: (email: string) =>
		apiRequest("/auth/request-password-reset", { method: "POST", body: { email }, auth: false }),
	resetPassword: (token: string, password: string) =>
		apiRequest("/auth/reset-password", { method: "POST", body: { token, password }, auth: false }),
};
