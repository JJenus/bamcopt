import test from 'node:test';
import assert from 'node:assert/strict';
import { referralMinor } from '../utils/referrals.ts';

test('points convert to exact cents without floating-point rounding', () => {
	assert.equal(referralMinor(100, 100), 100);
	assert.equal(referralMinor(100, 200), 50);
	assert.equal(referralMinor(1, 100), 1);
	assert.equal(referralMinor(3, 3), 100);
	assert.equal(referralMinor(1, 3), null);
	assert.equal(referralMinor(1, 1000), null);
});
test('unsafe, zero, negative and fractional points/rates are rejected', () => {
	for (const value of [0, -1, 1.1, NaN, Infinity, Number.MAX_SAFE_INTEGER]) assert.equal(referralMinor(value, 100), null);
	for (const rate of [0, -1, 1.1, NaN, Infinity]) assert.equal(referralMinor(100, rate), null);
	assert.equal(referralMinor(1_000_000_000, 1), 100_000_000_000);
});
