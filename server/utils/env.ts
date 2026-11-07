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
	get isProd() {
		return process.env.NODE_ENV === "production";
	},
};
