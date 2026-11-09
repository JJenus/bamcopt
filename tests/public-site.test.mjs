import { test } from 'node:test';
import assert from 'node:assert/strict';

// Pure public-site helpers run without a server or database.
const { publicContactLinks, siteOrigin, canonicalUrl } = await import('../utils/public-site.ts');
const { guides, frequentlyAskedQuestions } = await import('../utils/public-content.ts');

test('contact links use configured values, not the brand name', () => {
	assert.deepEqual(publicContactLinks('hello@example.org', '+49 (178) 123 456'), {
		email: 'mailto:hello@example.org', phone: 'tel:+49178123456',
	});
});

test('missing or unsafe contact values never become actionable links', () => {
	assert.deepEqual(publicContactLinks('', ''), { email: '', phone: '' });
	assert.deepEqual(publicContactLinks('javascript:alert(1)', 'not a phone'), { email: '', phone: '' });
});

test('canonical URLs accept only http(s), strip queries and avoid duplicate slashes', () => {
	assert.equal(siteOrigin('https://example.org/base/'), 'https://example.org');
	assert.equal(siteOrigin('javascript:alert(1)'), 'http://localhost:3000');
	assert.equal(canonicalUrl('https://example.org/', '/banking?tracking=yes'), 'https://example.org/banking');
});

test('guide cards all have complete, unique article destinations', () => {
	assert.ok(guides.length >= 3);
	assert.equal(new Set(guides.map(g => g.slug)).size, guides.length);
	for (const guide of guides) {
		assert.match(guide.slug, /^[a-z0-9-]+$/);
		assert.ok(guide.title && guide.summary && guide.sections.length >= 3);
		for (const section of guide.sections) assert.ok(section.title && section.text.length > 70);
	}
});

test('FAQ covers the main public customer journeys', () => {
	for (const category of ['Getting started', 'Funding & transfers', 'Account access']) {
		assert.ok(frequentlyAskedQuestions.some(q => q.category === category));
	}
});
