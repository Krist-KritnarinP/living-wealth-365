import assert from 'node:assert/strict';
import test from 'node:test';
import {
  parseBaseMonthlyPremium,
  estimatePlanPremium,
  evaluateAndFilterPlans,
  buildProfileLeadNotes,
} from '../src/utils/insuranceEstimator.js';

const SAMPLE_PLANS = [
  {
    id: '1',
    slug: 'aia-health-happy',
    category: 'HEALTH',
    categoryName: 'ประกันสุขภาพเหมาจ่าย',
    name: 'AIA Health Happy เหมาเบิ้ลคุ้ม',
    startingPrice: 'เริ่มต้น 1,850 บ./เดือน',
    isActive: true,
  },
  {
    id: '2',
    slug: 'aia-infinite-care',
    category: 'HEALTH',
    categoryName: 'ประกันสุขภาพเหมาจ่าย',
    name: 'AIA Infinite Care (New Standard)',
    startingPrice: 'เริ่มต้น 4,200 บ./เดือน',
    isActive: true,
  },
  {
    id: '3',
    slug: 'aia-pa-personal-accident',
    category: 'ACCIDENT',
    categoryName: 'ประกันอุบัติเหตุส่วนบุคคล (AIA PA)',
    name: 'AIA PA ประกันอุบัติเหตุส่วนบุคคล',
    startingPrice: 'เริ่มต้น 2,500 บ./ปี (ประมาณ 210 บ./เดือน)',
    isActive: true,
  },
  {
    id: '4',
    slug: 'aia-legacy-prestige',
    category: 'WHOLE_LIFE',
    categoryName: 'ประกันชีวิตตลอดชีพ & ส่งต่อมรดก',
    name: 'AIA Legacy Prestige',
    startingPrice: 'ออกแบบตามกระแสเงินสด',
    isActive: true,
  },
  {
    id: '5',
    slug: 'aia-annuity-fix',
    category: 'RETIREMENT',
    categoryName: 'วางแผนเกษียณ & บำนาญ',
    name: 'AIA Annuity Fix (บำนาญมั่นคง)',
    startingPrice: 'เริ่มต้น 2,500 บ./เดือน',
    isActive: true,
  },
];

test('parseBaseMonthlyPremium handles monthly, yearly, and bespoke text pricing cleanly', () => {
  assert.equal(parseBaseMonthlyPremium({ startingPrice: 'เริ่มต้น 1,850 บ./เดือน' }), 1850);
  assert.equal(parseBaseMonthlyPremium({ startingPrice: 'เริ่มต้น 2,500 บ./ปี (ประมาณ 210 บ./เดือน)' }), 210);
  assert.equal(parseBaseMonthlyPremium({ startingPrice: 'เริ่มต้น 12,000 บ./ปี' }), 1000);
  assert.equal(
    parseBaseMonthlyPremium({ slug: 'aia-legacy-prestige', category: 'WHOLE_LIFE', startingPrice: 'ออกแบบตามกระแสเงินสด' }),
    8500
  );
});

test('estimatePlanPremium scales health plans with age while keeping AIA PA nearly flat', () => {
  const healthYoung = estimatePlanPremium(SAMPLE_PLANS[0], { gender: 'FEMALE', ageBand: '20_29', coverageTier: 'BALANCED' });
  const healthOlder = estimatePlanPremium(SAMPLE_PLANS[0], { gender: 'FEMALE', ageBand: '50_59', coverageTier: 'BALANCED' });
  assert.ok(healthOlder.monthlyMin > healthYoung.monthlyMin * 2);
  assert.equal(healthYoung.yearlyMin, healthYoung.monthlyMin * 12);

  const paYoung = estimatePlanPremium(SAMPLE_PLANS[2], { gender: 'MALE', ageBand: '20_29', coverageTier: 'ESSENTIAL' });
  const paMid = estimatePlanPremium(SAMPLE_PLANS[2], { gender: 'MALE', ageBand: '40_49', coverageTier: 'ESSENTIAL' });
  assert.equal(paYoung.monthlyMin, paMid.monthlyMin);
  assert.ok(paYoung.monthlyMax > paYoung.monthlyMin);
});

test('evaluateAndFilterPlans filters by goals and enforces in-budget ceiling when enabled', () => {
  const result = evaluateAndFilterPlans(SAMPLE_PLANS, {
    gender: 'FEMALE',
    ageBand: '30_39',
    incomeBand: '30K_60K',
    budgetCap: '3000',
    goals: ['HEALTH', 'ACCIDENT'],
    coverageTier: 'BALANCED',
    onlyInBudget: true,
  });

  assert.ok(result.recommendedPlans.length >= 2);
  assert.ok(result.recommendedPlans.every((r) => r.budgetFit === 'IN_BUDGET'));
  assert.ok(result.recommendedPlans.every((r) => ['HEALTH', 'ACCIDENT'].includes(r.estimate.category)));
  assert.ok(result.recommendedPlans.every((r) => r.plan.slug !== 'aia-infinite-care'));
});

test('buildProfileLeadNotes outputs concise Thai summary for Admin A handoff', () => {
  const profile = {
    gender: 'MALE',
    ageBand: '40_49',
    incomeBand: '60K_120K',
    budgetCap: '6000',
    goals: ['HEALTH', 'RETIREMENT'],
    coverageTier: 'BALANCED',
  };
  const notes = buildProfileLeadNotes(profile, {
    plan: SAMPLE_PLANS[0],
    estimate: { monthlyMin: 2600, monthlyMax: 3500 },
  });

  assert.ok(notes.includes('เพศ: ชาย'));
  assert.ok(notes.includes('40–49 ปี'));
  assert.ok(notes.includes('AIA Health Happy'));
  assert.ok(notes.includes('฿2,600'));
});
