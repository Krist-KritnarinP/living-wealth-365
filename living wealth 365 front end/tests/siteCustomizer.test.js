import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SITE_CONTENT,
  getByPath,
  setByPath,
} from '../src/constants/siteCustomizerDefaults.js';

describe('Site Customizer Configuration & Path Helpers', () => {
  test('DEFAULT_SITE_CONTENT has all essential root sections', () => {
    const requiredSections = [
      'announcement',
      'brand',
      'hero',
      'gateways',
      'narrative',
      'minerals',
      'journal',
      'leadForm',
      'footer',
    ];

    for (const section of requiredSections) {
      assert.ok(
        DEFAULT_SITE_CONTENT[section],
        `Missing required section: ${section}`
      );
    }

    assert.equal(typeof DEFAULT_SITE_CONTENT.announcement.enabled, 'boolean');
    assert.equal(DEFAULT_SITE_CONTENT.brand.adminAName, 'Admin A');
    assert.equal(DEFAULT_SITE_CONTENT.brand.adminBName, 'Admin B');
  });

  test('getByPath retrieves deeply nested properties accurately', () => {
    const title = getByPath(DEFAULT_SITE_CONTENT, 'hero.titleLine1');
    assert.equal(title, 'วันนี้... อะไรคือสิ่งที่คุณ');

    const gateway1Title = getByPath(
      DEFAULT_SITE_CONTENT,
      'gateways.living.title'
    );
    assert.equal(gateway1Title, 'Living (วิถีชีวิต)');

    const fallbackVal = getByPath(
      DEFAULT_SITE_CONTENT,
      'nonexistent.deep.path',
      'DEFAULT_FALLBACK'
    );
    assert.equal(fallbackVal, 'DEFAULT_FALLBACK');
  });

  test('setByPath creates an immutable updated clone without mutating source', () => {
    const original = { hero: { title: 'Old Title' }, count: 1 };
    const updated = setByPath(original, 'hero.title', 'New Title');

    assert.equal(original.hero.title, 'Old Title');
    assert.equal(updated.hero.title, 'New Title');
    assert.equal(updated.count, 1);
  });

  test('setByPath handles newly created nested branches', () => {
    const original = {};
    const updated = setByPath(original, 'custom.nested.banner.text', 'Hello World');

    assert.equal(updated.custom.nested.banner.text, 'Hello World');
  });

  test('updating gateway categories and announcement retains valid JSON export', () => {
    let config = { ...DEFAULT_SITE_CONTENT };
    config = setByPath(config, 'announcement.badge', 'SPECIAL');
    config = setByPath(config, 'gateways.living.title', 'หมวดการใช้ชีวิต');

    const jsonString = JSON.stringify(config);
    const parsed = JSON.parse(jsonString);

    assert.equal(getByPath(parsed, 'announcement.badge'), 'SPECIAL');
    assert.equal(getByPath(parsed, 'gateways.living.title'), 'หมวดการใช้ชีวิต');
    assert.equal(getByPath(parsed, 'brand.adminAName'), 'Admin A');
  });
});
