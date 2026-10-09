import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizePhone,
  validPhone,
  validUsername,
  validEmail,
  validBirthDate,
  safeRedirect,
  evaluatePasswordStrength,
  validateRegistration,
} from '../src/utils/validation.js';

test('phone formatting accepts Thai local and international numbers and rejects junk', () => {
  assert.equal(normalizePhone('+66812345678'), '0812345678');
  assert.equal(normalizePhone('081-234-5678'), '0812345678');
  assert.equal(normalizePhone('02 123 4567'), '021234567');

  assert.equal(validPhone('0812345678'), true);
  assert.equal(validPhone('081-234-5678'), true);
  assert.equal(validPhone('+66812345678'), true);
  assert.equal(validPhone('021234567'), true);

  // Rejections
  assert.equal(validPhone('abcdefghij'), false);
  assert.equal(validPhone('12345'), false);
  assert.equal(validPhone('0012345678'), false);
  assert.equal(validPhone(''), false);
});

test('username validation accepts valid patterns and rejects invalid chars/length', () => {
  assert.equal(validUsername('somchai_lw'), true);
  assert.equal(validUsername('user123'), true);
  assert.equal(validUsername('admin_365'), true);

  assert.equal(validUsername('ab'), false); // Too short (< 3)
  assert.equal(validUsername('somchai@lw'), false); // Special character '@'
  assert.equal(validUsername('user name'), false); // Space
  assert.equal(validUsername(''), false);
});

test('password strength evaluation accurately grades weak, medium, strong with 8+ chars standard', () => {
  // Too short (< 8)
  const short = evaluatePasswordStrength('Ab1!');
  assert.equal(short.isPassMin, false);
  assert.equal(short.level, 'too_short');

  // Weak: 8 chars but only lowercase
  const weak = evaluatePasswordStrength('password');
  assert.equal(weak.isPassMin, true);
  assert.equal(weak.level, 'weak');

  // Medium: 8+ chars with mixed case and numbers
  const medium = evaluatePasswordStrength('Password123');
  assert.equal(medium.isPassMin, true);
  assert.equal(medium.level, 'medium');

  // Strong: 8+ chars with upper, lower, numbers, and special symbols
  const strong = evaluatePasswordStrength('P@ssword123#');
  assert.equal(strong.isPassMin, true);
  assert.equal(strong.level, 'strong');
  assert.equal(strong.rules.hasSpecial, true);
  assert.equal(strong.rules.hasUpper, true);
  assert.equal(strong.rules.hasLower, true);
  assert.equal(strong.rules.hasNumber, true);
});

test('birth dates reject impossible and future dates', () => {
  assert.equal(validBirthDate(''), true); // Optional
  assert.equal(validBirthDate('1990-05-15'), true);
  assert.equal(validBirthDate('2000-12-31'), true);

  // Future date
  assert.equal(validBirthDate('2099-01-01'), false);
  // Invalid format
  assert.equal(validBirthDate('not-a-date'), false);
  assert.equal(validBirthDate('1990-02-31'), false);
});

test('registration validates all required fields, username separation, and matching passwords', () => {
  const validData = {
    username: 'somchai_99',
    name: 'สมชาย ใจดี',
    email: 'somchai@example.com',
    phone: '081-234-5678',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };
  const errors = validateRegistration(validData);
  assert.equal(Object.keys(errors).length, 0);

  // Password mismatch
  const mismatchErrors = validateRegistration({
    ...validData,
    confirmPassword: 'DifferentPassword!',
  });
  assert.ok(mismatchErrors.confirmPassword);

  // Missing username
  const missingUsername = validateRegistration({
    ...validData,
    username: '',
  });
  assert.ok(missingUsername.username);
});

test('login redirects stay local and prevent open redirect exploits', () => {
  assert.equal(safeRedirect('/account'), '/account');
  assert.equal(safeRedirect('/account/wishlist'), '/account/wishlist');
  assert.equal(safeRedirect('https://evil.com'), '/account');
  assert.equal(safeRedirect('//evil.com'), '/account');
  assert.equal(safeRedirect('/login'), '/account');
});
