/** Exact conversion only: never silently round away customer points or create fractional cents. */
export const referralMinor = (points: number, pointsPerUnit: number) => {
	if (!Number.isSafeInteger(points) || points <= 0 || points > 1_000_000_000 || !Number.isSafeInteger(pointsPerUnit) || pointsPerUnit <= 0) return null;
	const numerator = points * 100;
	if (!Number.isSafeInteger(numerator) || numerator % pointsPerUnit !== 0) return null;
	const minor = numerator / pointsPerUnit;
	return Number.isSafeInteger(minor) && minor > 0 ? minor : null;
};
