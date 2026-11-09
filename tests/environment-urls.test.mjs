import test from 'node:test';
import assert from 'node:assert/strict';
import { applicationOrigin, renderEmailTemplate } from '../utils/environment-urls.ts';
import { welcomeEmail } from '../server/emails/welcome.ts';
import { passwordEmail } from '../server/emails/password.ts';
import { otpEmail } from '../server/emails/otp.ts';

test('application links use environment settings or a development origin, never a production-domain fallback', () => {
	assert.equal(applicationOrigin(''), 'http://localhost:3000');
	assert.equal(applicationOrigin('', false, '4123'), 'http://localhost:4123');
	assert.equal(applicationOrigin('', false, 'invalid'), 'http://localhost:3000');
	assert.equal(applicationOrigin('https://staging.example.test/path/'), 'https://staging.example.test');
	assert.throws(() => applicationOrigin('', true), /Configure APP_URL/);
	assert.throws(() => applicationOrigin('javascript:alert(1)'));
	assert.throws(() => applicationOrigin('https://user:password@example.test'));
});
test('all email application links, assets and repeated placeholders follow the configured environment', () => {
	const template = '<a href="https://www.bancopt.com/">Home</a><img src="https://www.bancopt.com/assets/logo.png"><a href="{{appUrl}}/new-password?token={{token}}">{{ name }}</a>{{appUrl}} {{ otp }}';
	const rendered = renderEmailTemplate(template, 'http://localhost:3000', { name: '<Example>', token: 'test-token', otp: '123456' });
	assert.ok(!rendered.includes('bancopt.com'));
	assert.ok(rendered.includes('http://localhost:3000/assets/logo.png'));
	assert.ok(rendered.includes('http://localhost:3000/new-password?token=test-token'));
	assert.ok(rendered.includes('&#60;Example&#62;'));
	assert.ok(rendered.includes('123456'));
});

test('the actual welcome, reset and OTP templates contain no production URLs after rendering', () => {
	for (const template of [welcomeEmail, passwordEmail, otpEmail]) {
		const rendered = renderEmailTemplate(template, 'http://localhost:3000', { name: 'Local QA', token: 'local-token', otp: '654321' });
		assert.ok(!rendered.includes('https://www.bancopt.com'));
		assert.ok(!/{{\s*(appUrl|name|token|otp)\s*}}/.test(rendered));
		assert.ok(rendered.includes('http://localhost:3000/assets/'));
	}
});
