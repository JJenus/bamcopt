/**
 * Best-effort "City, Country" for an IP, used for sign-in history. It never blocks or fails a request:
 * private addresses are skipped, lookups time out quickly and results are cached.
 * GEOIP=off disables it; GEOIP_URL changes the provider ({ip} is replaced; JSON with city/country fields).
 */
const cache = new Map<string, { at: number; value: string }>();
const TTL = 24 * 60 * 60 * 1000;
const PRIVATE = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|0\.|::1$|fc|fd|fe80|localhost$|unknown$)/i;

export const isPublicIp = (ip?: string) => !!ip && ip.length >= 3 && !PRIVATE.test(ip.trim());

export const lookupLocation = async (ip?: string): Promise<string> => {
	if (/^(off|false|0)$/i.test((process.env.GEOIP || "").trim()) || !isPublicIp(ip)) return "";
	const hit = cache.get(ip!);
	if (hit && Date.now() - hit.at < TTL) return hit.value;
	let value = "";
	try {
		const url = (process.env.GEOIP_URL || "https://ipwho.is/{ip}").replace("{ip}", encodeURIComponent(ip!));
		const res = await fetch(url, { signal: AbortSignal.timeout(2500), headers: { accept: "application/json" } });
		if (res.ok) {
			const data: any = await res.json();
			if (data && data.success !== false) value = [data.city, data.country || data.country_name].filter(Boolean).join(", ").slice(0, 120);
		}
	} catch {}
	if (cache.size > 500) cache.clear();
	cache.set(ip!, { at: Date.now(), value });
	return value;
};
