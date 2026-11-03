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
	get isProd() {
		return process.env.NODE_ENV === "production";
	},
};
