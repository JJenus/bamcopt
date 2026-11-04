/** Public configuration helpers; never infer a mailbox from a display name. */
export function publicContactLinks(email: string, phone: string) {
	const address = email.trim();
	const number = phone.replace(/[\s().-]/g, '');
	return {
		email: /^[^\s@:<>,;]+@[^\s@:<>,;]+\.[^\s@:<>,;]+$/.test(address) ? `mailto:${address}` : '',
		phone: /^\+?\d{6,15}$/.test(number) ? `tel:${number}` : '',
	};
}

export function siteOrigin(value: string) {
	try {
		const url = new URL(value);
		if (['https:', 'http:'].includes(url.protocol)) return url.origin;
	} catch {}
	return 'https://www.bancopt.com';
}

export function canonicalUrl(origin: string, path: string) {
	return `${siteOrigin(origin)}/${path.split(/[?#]/)[0].replace(/^\/+/, '')}`;
}
