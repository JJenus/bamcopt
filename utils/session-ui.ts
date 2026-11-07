import type { DeviceType } from "~/services/security.service";

const ICONS: Record<string, string> = { mobile: "ki-phone", tablet: "ki-tablet", desktop: "ki-screen" };
export const deviceIcon = (type: DeviceType | string) => ICONS[type] || "ki-devices";

/** "just now", "5 min ago", "3 h ago", "2 d ago", then the date. */
export const timeAgo = (iso: string, now = Date.now()) => {
	const seconds = Math.max(0, (now - new Date(iso).getTime()) / 1000);
	if (seconds < 60) return "just now";
	if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)} h ago`;
	if (seconds < 30 * 86400) return `${Math.floor(seconds / 86400)} d ago`;
	return new Date(iso).toLocaleDateString();
};

export const exactTime = (iso: string) => new Date(iso).toLocaleString();
