import { unprocessable } from "./errors";

/**
 * Money is handled in integer minor units (cents) to avoid float drift.
 * DB columns are DECIMAL(20,2); Sequelize returns those as strings, so never add raw column values.
 */
export const toMinor = (amount: number | string): number => {
	const n = Number(amount);
	if (!Number.isFinite(n)) throw unprocessable("Invalid amount");
	const minor = Math.round(n * 100);
	if (Math.abs(n * 100 - minor) > 1e-6) throw unprocessable("Amount can have at most 2 decimal places");
	return minor;
};

export const fromMinor = (minor: number): number => minor / 100;

/** A strictly positive amount, in minor units. */
export const positiveMinor = (amount: number | string): number => {
	const minor = toMinor(amount);
	if (minor <= 0) throw unprocessable("Amount must be greater than zero");
	return minor;
};
