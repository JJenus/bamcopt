/** Central place for configuration. Getters are lazy so `nitro build` never needs the secrets. */
const need = (key: string): string => {
	const value = process.env[key];
	if (!value) throw new Error(`Missing required environment variable ${key}`);
	return value;
};

export const env = {
	get jwtSecret() {
		return need("JWT_SECRET");
	},
	get appUrl() {
		return (process.env.APP_URL || "https://www.bancopt.com").replace(/\/$/, "");
	},
	/** Login OTP (2nd step by e-mail). On by default; OTP_ON=false|0|off|no signs in with the password alone. */
	get otpOn() {
		return !/^(false|0|off|no)$/i.test((process.env.OTP_ON || "").trim());
	},
	/**
	 * Whether the super admin must use the e-mailed code even when OTP_ON=false.
	 * SUPERADMIN_OTP=off never forces it; unset ("auto") forces it whenever mail is configured, so the code can actually
	 * reach the owner; =on forces it too, but in production only if mail works (a code that cannot be delivered would
	 * lock the owner out).
	 */
	get superOtpMode(): "on" | "off" | "auto" {
		const value = (process.env.SUPERADMIN_OTP || "").trim().toLowerCase();
		if (/^(false|0|off|no)$/.test(value)) return "off";
		return /^(true|1|on|yes)$/.test(value) ? "on" : "auto";
	},
	get isProd() {
		return process.env.NODE_ENV === "production";
	},
};
