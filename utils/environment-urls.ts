/** Email tokens must never be sent to a hostname taken from untrusted request headers. */
export function applicationOrigin(configured: string, production = false, port = '3000') {
	if (!configured.trim()) {
		if (production) throw new Error('Configure APP_URL or NUXT_PUBLIC_SITE_URL for production email links');
		const number = Number(port);
		return `http://localhost:${Number.isInteger(number) && number > 0 && number <= 65535 ? number : 3000}`;
	}
	const url = new URL(configured);
	if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Application URL must be an http(s) origin without credentials');
	return url.origin;
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => `&#${char.charCodeAt(0)};`);

/** Replace legacy brand-domain links/assets as well as all template placeholders. */
export function renderEmailTemplate(template: string, origin: string, values: Record<string, string> = {}) {
	const base = applicationOrigin(origin);
	return template.replaceAll('https://www.bancopt.com', '{{appUrl}}')
		.replace(/{{\s*(appUrl|name|token|otp)\s*}}/g, (_, key: string) => escapeHtml(key === 'appUrl' ? base : values[key] || ''));
}
