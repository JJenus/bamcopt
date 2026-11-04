import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('account illustration caption is outside the card body and is the final figure child', () => {
	const source = readFileSync(new URL('../components/marketing/AccountPreview.vue', import.meta.url), 'utf8');
	assert.match(source, /<\/div>\s*<figcaption\b[^>]*>[^<]*<\/figcaption>\s*<\/figure>/);
});
