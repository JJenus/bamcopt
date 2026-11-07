/** Turns a raw user agent into something a person can recognise, plus a stable key for grouping. */
export type DeviceType = "desktop" | "mobile" | "tablet" | "api" | "unknown";
export type DeviceInfo = { key: string; label: string; browser: string; os: string; deviceType: DeviceType };

const API_CLIENT = /^(node|undici|curl|wget|python|aiohttp|httpx|axios|postman|insomnia|okhttp|java|go-http|apache-httpclient|libwww|php)\b/i;

const browserOf = (ua: string) => {
	if (API_CLIENT.test(ua.trim())) return "API client";
	if (/Edg(e|A|iOS)?\//i.test(ua)) return "Edge";
	if (/OPR\/|Opera/i.test(ua)) return "Opera";
	if (/SamsungBrowser/i.test(ua)) return "Samsung Internet";
	if (/Firefox\/|FxiOS/i.test(ua)) return "Firefox";
	if (/Chrome\/|CriOS/i.test(ua)) return "Chrome";
	if (/Safari\//i.test(ua) && /Version\//i.test(ua)) return "Safari";
	if (/MSIE |Trident\//i.test(ua)) return "Internet Explorer";
	return "Unknown browser";
};

const osOf = (ua: string) => {
	if (/Windows Phone/i.test(ua)) return "Windows Phone";
	if (/Windows NT/i.test(ua)) return "Windows";
	if (/Android/i.test(ua)) return "Android";
	if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
	if (/Mac OS X|Macintosh/i.test(ua)) return "macOS";
	if (/CrOS/i.test(ua)) return "ChromeOS";
	if (/Linux|X11/i.test(ua)) return "Linux";
	return "Unknown OS";
};

export const parseDevice = (userAgent?: string | null): DeviceInfo => {
	const ua = String(userAgent || "");
	const browser = browserOf(ua);
	const os = osOf(ua);
	let deviceType: DeviceType = "unknown";
	if (browser === "API client") deviceType = "api";
	else if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) deviceType = "tablet";
	else if (/Mobi|iPhone|iPod|Android/i.test(ua)) deviceType = "mobile";
	else if (os !== "Unknown OS") deviceType = "desktop";

	const label =
		deviceType === "api" ? "API client"
		: browser === "Unknown browser" && os === "Unknown OS" ? "Unknown device"
		: os === "Unknown OS" ? browser
		: browser === "Unknown browser" ? os
		: `${browser} on ${os}`;
	return { key: `${browser}|${os}|${deviceType}`, label, browser, os, deviceType };
};
