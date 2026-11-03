import {
	differenceInHours,
	format,
	formatDistanceToNow,
	isBefore,
	isSameDay,
	subDays,
} from "date-fns";

export type DateInput = string | number | Date | null | undefined;

const toDate = (value: DateInput): Date => {
	if (value instanceof Date) return value;
	if (typeof value === "string" || typeof value === "number") {
		return new Date(value);
	}
	return new Date(NaN);
};

/** `dd/MM/yyyy hh:mm a` by default, e.g. 03/11/2026 04:25 PM */
export const formatDateTime = (value: DateInput, pattern = "dd/MM/yyyy hh:mm a") =>
	format(toDate(value), pattern);

/** Locale-aware long date, e.g. Nov 3, 2026, 4:25 PM */
export const formatLongDateTime = (value: DateInput) => format(toDate(value), "PPpp");

/** "3 minutes ago" / "in 2 days" */
export const formatRelative = (value: DateInput) =>
	formatDistanceToNow(toDate(value), { addSuffix: true });

export const hoursSince = (value: DateInput) => differenceInHours(new Date(), toDate(value));

export const isToday = (value: DateInput) => isSameDay(new Date(), toDate(value));

/** True when `value` is no older than `days` days. */
export const isWithinDays = (value: DateInput, days: number) =>
	!isBefore(toDate(value), subDays(new Date(), days));

/**
 * Compact timestamp used in transaction/notification lists:
 * relative for the first hour, time-only for today, full date otherwise.
 */
export const formatMessageTime = (value: DateInput) => {
	if (hoursSince(value) <= 1) return formatRelative(value);
	if (isToday(value)) return formatDateTime(value, "hh:mm a");
	return formatDateTime(value);
};

export const currentHour = () => new Date().getHours();
