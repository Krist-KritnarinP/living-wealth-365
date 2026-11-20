import assert from 'node:assert/strict';
import test from 'node:test';
import { CATEGORY_GROUPS, getPlanInfographic } from '../src/utils/insuranceInfographic.js';

test('CATEGORY_GROUPS defines all 5 AIA Thailand insurance categories', () => {
  const ids = CATEGORY_GROUPS.map((g) => g.id);
  assert.deepEqual(ids, [
    'HEALTH',
    'CRITICAL_ILLNESS',
    'WHOLE_LIFE',
    'RETIREMENT',
    'INVESTMENT_LINKED',
  ]);
});

test('getPlanInfographic returns structured KPI & flow steps for official AIA slugs', () => {
  const info = getPlanInfographic({
    slug: 'aia-health-happy',
    category: 'HEALTH',
    name: 'AIA Health Happy เหมาเบิ้ลคุ้ม',
  });
  assert.ok(info);
  assert.equal(info.kpis.length, 4);
  assert.ok(info.flowSteps.length >= 3);
  assert.equal(info.scores.medicalShield, 95);
});

test('getPlanInfographic falls back cleanly for custom Admin-created plans', () => {
  const custom = getPlanInfographic({
    slug: 'custom-aia-plan-2026',
    category: 'RETIREMENT',
    categoryName: 'วางแผนบำนาญพิเศษ',
    coverageAmount: '5,000,000 บาท',
    startingPrice: '3,000 บ./เดือน',
    features: JSON.stringify(['การันตีเงินคืน', 'ลดหย่อนภาษี', 'คุ้มครองชีวิต']),
    recommendedFor: 'คนวัยเกษียณ, พนักงานบริษัท',
  });
  assert.ok(custom);
  assert.equal(custom.kpis.length, 4);
  assert.equal(custom.scores.wealthTaxReturn, 95);
  assert.deepEqual(custom.personaTags, ['คนวัยเกษียณ', 'พนักงานบริษัท']);
});
