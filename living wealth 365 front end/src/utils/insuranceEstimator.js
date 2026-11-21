// ==========================================
// 🎯 Living Wealth 365 — AIA Plan Finder & Preliminary Premium Estimator
// Pure JavaScript logic for tap-only profile filtering & age/tier premium ranges.
// ==========================================

export const GENDER_OPTIONS = [
  { id: 'FEMALE', label: 'หญิง', shortLabel: 'หญิง' },
  { id: 'MALE', label: 'ชาย', shortLabel: 'ชาย' },
];

export const AGE_BANDS = [
  { id: '20_29', label: '20–29 ปี', sub: 'เริ่มทำงาน' },
  { id: '30_39', label: '30–39 ปี', sub: 'สร้างครอบครัว' },
  { id: '40_49', label: '40–49 ปี', sub: 'มั่นคง & ภาษี' },
  { id: '50_59', label: '50–59 ปี', sub: 'เตรียมเกษียณ' },
  { id: '60_PLUS', label: '60+ ปี', sub: 'วัยเกษียณ' },
];

export const INCOME_BANDS = [
  {
    id: 'UNDER_30K',
    label: 'ต่ำกว่า 30,000',
    sub: 'บ./เดือน',
    midpoint: 24000,
    suggestedBudgetMin: 1000,
    suggestedBudgetMax: 2500,
    taxBracketLabel: '0% – 5%',
  },
  {
    id: '30K_60K',
    label: '30,000 – 60,000',
    sub: 'บ./เดือน',
    midpoint: 45000,
    suggestedBudgetMin: 2000,
    suggestedBudgetMax: 4500,
    taxBracketLabel: '10% – 15%',
  },
  {
    id: '60K_120K',
    label: '60,000 – 120,000',
    sub: 'บ./เดือน',
    midpoint: 85000,
    suggestedBudgetMin: 4000,
    suggestedBudgetMax: 9000,
    taxBracketLabel: '20% – 25%',
  },
  {
    id: 'OVER_120K',
    label: '120,000 ขึ้นไป',
    sub: 'บ./เดือน',
    midpoint: 160000,
    suggestedBudgetMin: 8000,
    suggestedBudgetMax: 20000,
    taxBracketLabel: '25% – 35%',
  },
];

export const BUDGET_CAPS = [
  { id: 'AUTO', label: 'ตามงบแนะนำจากรายได้', maxMonthly: null },
  { id: '1500', label: 'ไม่เกิน 1,500 บ./ด.', maxMonthly: 1500 },
  { id: '3000', label: 'ไม่เกิน 3,000 บ./ด.', maxMonthly: 3000 },
  { id: '6000', label: 'ไม่เกิน 6,000 บ./ด.', maxMonthly: 6000 },
  { id: '12000', label: 'ไม่เกิน 12,000 บ./ด.', maxMonthly: 12000 },
  { id: 'UNLIMITED', label: 'ไม่จำกัดงบ', maxMonthly: Infinity },
];

export const FOCUS_GOALS = [
  {
    id: 'HEALTH',
    label: 'สุขภาพเหมาจ่าย',
    desc: 'ค่ารักษา รพ.เอกชน ไม่ต้องกังวลส่วนเกิน',
    taxNote: 'ลดหย่อนสูงสุด 25,000 บ./ปี',
  },
  {
    id: 'CRITICAL_ILLNESS',
    label: 'โรคร้ายแรง',
    desc: 'เงินก้อนเมื่อพบมะเร็ง หัวใจ สมอง',
    taxNote: 'ลดหย่อนหมวดสุขภาพ/ชีวิต',
  },
  {
    id: 'ACCIDENT',
    label: 'อุบัติเหตุ 24 ชม. (PA)',
    desc: 'รักษาอุบัติเหตุไม่สำรองจ่าย + ทุนชีวิต',
    taxNote: 'สมัครง่าย เบี้ยคงที่คุ้มค่า',
  },
  {
    id: 'RETIREMENT',
    label: 'เกษียณ & ลดหย่อนภาษี',
    desc: 'บำนาญการันตีทุกปี + ลดภาษีสูงสุด',
    taxNote: 'ลดหย่อนบำนาญสูงสุด 200,000 บ./ปี',
  },
  {
    id: 'WHOLE_LIFE',
    label: 'คุ้มครองชีวิต & มรดก',
    desc: 'ส่งต่อเงินสดให้ครอบครัว ปลอดภาษีมรดก',
    taxNote: 'ลดหย่อนสูงสุด 100,000 บ./ปี',
  },
  {
    id: 'INVESTMENT_LINKED',
    label: 'ลงทุนควบประกัน',
    desc: 'Unit Linked ยืดหยุ่น ปรับทุนและพอร์ตได้',
    taxNote: 'ปรับเบี้ยและกองทุนได้ทุกช่วงชีวิต',
  },
];

export const COVERAGE_TIERS = [
  {
    id: 'ESSENTIAL',
    label: 'คุ้มค่าเริ่มต้น',
    desc: 'เบี้ยประหยัด เสริมสวัสดิการที่มีอยู่',
    multiplier: 0.9,
  },
  {
    id: 'BALANCED',
    label: 'มาตรฐานยอดนิยม',
    desc: 'สมดุลวงเงิน รพ.เอกชน และงบรายเดือน',
    multiplier: 1.15,
  },
  {
    id: 'PREMIUM',
    label: 'พรีเมียม / วงเงินสูง',
    desc: 'คุ้มครองสูงสุด ระดับ VIP หรือทั่วโลก',
    multiplier: 1.55,
  },
];

// Realistic age multipliers grouped by insurance category (reference baseline = 30–39)
const AGE_MULTIPLIERS = {
  HEALTH: { '20_29': 0.8, '30_39': 1.0, '40_49': 1.38, '50_59': 2.05, '60_PLUS': 3.15 },
  CRITICAL_ILLNESS: { '20_29': 0.72, '30_39': 1.0, '40_49': 1.55, '50_59': 2.45, '60_PLUS': 3.6 },
  ACCIDENT: { '20_29': 1.0, '30_39': 1.0, '40_49': 1.0, '50_59': 1.05, '60_PLUS': 1.2 },
  WHOLE_LIFE: { '20_29': 0.85, '30_39': 1.0, '40_49': 1.28, '50_59': 1.65, '60_PLUS': 2.15 },
  RETIREMENT: { '20_29': 0.88, '30_39': 1.0, '40_49': 1.25, '50_59': 1.55, '60_PLUS': 1.75 },
  INVESTMENT_LINKED: { '20_29': 0.9, '30_39': 1.0, '40_49': 1.15, '50_59': 1.35, '60_PLUS': 1.6 },
};

// Subtle actuarial gender factors by category
const GENDER_MULTIPLIERS = {
  HEALTH: { FEMALE: 1.06, MALE: 1.0 },
  CRITICAL_ILLNESS: { FEMALE: 1.03, MALE: 1.0 },
  ACCIDENT: { FEMALE: 1.0, MALE: 1.0 },
  WHOLE_LIFE: { FEMALE: 0.93, MALE: 1.04 },
  RETIREMENT: { FEMALE: 1.02, MALE: 1.0 },
  INVESTMENT_LINKED: { FEMALE: 0.96, MALE: 1.02 },
};

// Known slug tier classification & fallback base monthly premiums (for non-numeric startingPrice)
const SLUG_METADATA = {
  'aia-health-saver': { tier: 'ESSENTIAL', fallbackMonthly: 850, taxCap: 25000 },
  'aia-health-happy': { tier: 'BALANCED', fallbackMonthly: 1850, taxCap: 25000 },
  'aia-infinite-care': { tier: 'PREMIUM', fallbackMonthly: 4200, taxCap: 25000 },
  'aia-multi-pay-ci-plus': { tier: 'BALANCED', fallbackMonthly: 1450, taxCap: 25000 },
  'aia-ci-supercare': { tier: 'PREMIUM', fallbackMonthly: 1900, taxCap: 100000 },
  'aia-pa-personal-accident': { tier: 'ESSENTIAL', fallbackMonthly: 210, taxCap: 0 },
  'aia-accident-rider-ai-rcc': { tier: 'BALANCED', fallbackMonthly: 350, taxCap: 25000 },
  'aia-20-pay-life': { tier: 'ESSENTIAL', fallbackMonthly: 1200, taxCap: 100000 },
  'aia-legacy-prestige': { tier: 'PREMIUM', fallbackMonthly: 8500, taxCap: 100000 },
  'aia-annuity-fix': { tier: 'BALANCED', fallbackMonthly: 2500, taxCap: 200000 },
  'aia-issara-plus': { tier: 'BALANCED', fallbackMonthly: 1500, taxCap: 100000 },
  'aia-infinite-wealth-prestige': { tier: 'PREMIUM', fallbackMonthly: 12000, taxCap: 100000 },
};

const CATEGORY_FALLBACK_MONTHLY = {
  HEALTH: 1800,
  CRITICAL_ILLNESS: 1500,
  ACCIDENT: 250,
  WHOLE_LIFE: 1500,
  RETIREMENT: 2500,
  INVESTMENT_LINKED: 2500,
};

const CATEGORY_TAX_CAP = {
  HEALTH: 25000,
  CRITICAL_ILLNESS: 25000,
  ACCIDENT: 0,
  WHOLE_LIFE: 100000,
  RETIREMENT: 200000,
  INVESTMENT_LINKED: 100000,
};

function normalizeCategory(plan) {
  const cat = String(plan?.category || '').toUpperCase();
  if (cat === 'PA') return 'ACCIDENT';
  if (AGE_MULTIPLIERS[cat]) return cat;
  return 'HEALTH';
}

function roundNice(amount) {
  if (amount < 500) return Math.max(100, Math.round(amount / 10) * 10);
  if (amount < 2000) return Math.round(amount / 50) * 50;
  return Math.round(amount / 100) * 100;
}

/**
 * Extracts a baseline monthly premium (THB/month) from plan.startingPrice,
 * falling back smoothly for yearly prices or bespoke text prices.
 */
export function parseBaseMonthlyPremium(plan) {
  const slugMeta = SLUG_METADATA[plan?.slug];
  const raw = String(plan?.startingPrice || '').trim();

  // If string mentions an explicit monthly estimate in parentheses e.g. "(ประมาณ 210 บ./เดือน)"
  const explicitMonthly = raw.match(/(\d[\d,]*)\s*บ\.?\/เดือน/);
  if (explicitMonthly) {
    const val = Number(explicitMonthly[1].replace(/,/g, ''));
    if (Number.isFinite(val) && val > 0) return val;
  }

  // If string mentions yearly price e.g. "เริ่มต้น 2,500 บ./ปี" or "เริ่มต้น 250,000 บ./ปี"
  const explicitYearly = raw.match(/(\d[\d,]*)\s*บ\.?\/ปี/);
  if (explicitYearly) {
    const val = Number(explicitYearly[1].replace(/,/g, ''));
    if (Number.isFinite(val) && val > 0) return Math.round(val / 12);
  }

  // Generic numeric fallback
  const anyNum = raw.match(/(\d[\d,]*)/);
  if (anyNum) {
    const val = Number(anyNum[1].replace(/,/g, ''));
    if (Number.isFinite(val) && val > 0) {
      return raw.includes('ปี') ? Math.round(val / 12) : val;
    }
  }

  if (slugMeta?.fallbackMonthly) return slugMeta.fallbackMonthly;
  return CATEGORY_FALLBACK_MONTHLY[normalizeCategory(plan)] || 1800;
}

/**
 * Calculates a realistic preliminary monthly & yearly premium range for one AIA plan.
 */
export function estimatePlanPremium(plan, profile = {}) {
  const category = normalizeCategory(plan);
  const ageBand = profile.ageBand || '30_39';
  const gender = profile.gender || 'FEMALE';
  const tier = profile.coverageTier || 'BALANCED';

  const baseMonthly = parseBaseMonthlyPremium(plan);
  const ageFactor = AGE_MULTIPLIERS[category]?.[ageBand] ?? 1.0;
  const genderFactor = GENDER_MULTIPLIERS[category]?.[gender] ?? 1.0;
  const tierObj = COVERAGE_TIERS.find((t) => t.id === tier) || COVERAGE_TIERS[1];

  // For PA plans, tier reflects PA 2,500 -> PA 4,600/7,900 -> VIP packages cleanly
  let tierFactor = tierObj.multiplier;
  if (category === 'ACCIDENT') {
    tierFactor = tier === 'ESSENTIAL' ? 1.0 : tier === 'BALANCED' ? 1.75 : 3.0;
  }

  const centerMonthly = baseMonthly * ageFactor * genderFactor * tierFactor;
  const monthlyMin = roundNice(centerMonthly * 0.88);
  const monthlyMax = Math.max(monthlyMin + (monthlyMin < 500 ? 50 : 200), roundNice(centerMonthly * 1.18));

  const yearlyMin = monthlyMin * 12;
  const yearlyMax = monthlyMax * 12;

  const slugMeta = SLUG_METADATA[plan?.slug];
  const taxCap = slugMeta?.taxCap ?? CATEGORY_TAX_CAP[category] ?? 25000;

  return {
    category,
    baseMonthly,
    monthlyMin,
    monthlyMax,
    yearlyMin,
    yearlyMax,
    taxCap,
    planTier: slugMeta?.tier || (baseMonthly < 1300 ? 'ESSENTIAL' : baseMonthly >= 4000 ? 'PREMIUM' : 'BALANCED'),
  };
}

/**
 * Evaluates, filters, and ranks all active AIA plans against the user's tap-only profile.
 */
export function evaluateAndFilterPlans(plans = [], profile = {}) {
  const activePlans = plans.filter((p) => p && p.isActive !== false);
  const incomeObj = INCOME_BANDS.find((b) => b.id === profile.incomeBand) || INCOME_BANDS[1];
  const budgetCapObj = BUDGET_CAPS.find((b) => b.id === profile.budgetCap) || BUDGET_CAPS[0];
  const selectedGoals = Array.isArray(profile.goals) && profile.goals.length > 0
    ? profile.goals
    : ['HEALTH'];
  const coverageTier = profile.coverageTier || 'BALANCED';
  const onlyInBudget = Boolean(profile.onlyInBudget);

  // Effective monthly ceiling: user explicit cap, or auto-derived from income band
  const effectiveBudgetMax =
    budgetCapObj.id === 'AUTO'
      ? incomeObj.suggestedBudgetMax
      : budgetCapObj.maxMonthly;

  const evaluated = activePlans.map((plan) => {
    const est = estimatePlanPremium(plan, profile);
    const goalMatched = selectedGoals.includes(est.category);

    let score = 45;
    const reasons = [];

    // 1. Goal alignment (heaviest weight)
    if (goalMatched) {
      score += 35;
      const goalInfo = FOCUS_GOALS.find((g) => g.id === est.category);
      if (goalInfo) reasons.push(`ตรงโจทย์${goalInfo.label}`);
    }

    // 2. Budget fit
    let budgetFit = 'IN_BUDGET';
    if (effectiveBudgetMax === Infinity || est.monthlyMin <= effectiveBudgetMax) {
      score += 14;
      budgetFit = 'IN_BUDGET';
      reasons.push('อยู่ในงบประมาณที่เลือก');
    } else if (est.monthlyMin <= effectiveBudgetMax * 1.35) {
      score += 6;
      budgetFit = 'STRETCH';
      reasons.push('สูงกว่างบเล็กน้อยแต่คุ้มครองเพิ่ม');
    } else {
      score -= 8;
      budgetFit = 'PREMIUM';
    }

    // 3. Tier alignment
    if (est.planTier === coverageTier) {
      score += 8;
      const tierInfo = COVERAGE_TIERS.find((t) => t.id === coverageTier);
      if (tierInfo) reasons.push(`ระดับ${tierInfo.label}`);
    }

    // 4. Tax bonus for higher income bands
    if (
      (incomeObj.id === '60K_120K' || incomeObj.id === 'OVER_120K') &&
      est.taxCap >= 100000
    ) {
      score += 4;
      reasons.push(`ลดหย่อนภาษีสูงสุด ${est.taxCap.toLocaleString()} บ.`);
    } else if (est.taxCap > 0 && reasons.length < 3) {
      reasons.push(`ลดหย่อนภาษีได้สูงสุด ${est.taxCap.toLocaleString()} บ.`);
    }

    // Cap 40–99
    const matchScore = Math.max(40, Math.min(99, Math.round(score)));
    const incomeSharePct = Math.max(
      0.5,
      Math.round(((est.monthlyMin / incomeObj.midpoint) * 100) * 10) / 10
    );

    return {
      plan,
      estimate: est,
      goalMatched,
      budgetFit,
      matchScore,
      incomeSharePct,
      reasons: reasons.slice(0, 3),
    };
  });

  // Prefer goal-matched plans first, then matchScore desc, then monthlyMin asc
  let filtered = evaluated.filter((item) => item.goalMatched);
  if (filtered.length === 0) {
    filtered = evaluated;
  }

  if (onlyInBudget && effectiveBudgetMax !== Infinity) {
    const budgetMatches = filtered.filter((item) => item.budgetFit === 'IN_BUDGET');
    filtered = budgetMatches;
  }

  filtered.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return a.estimate.monthlyMin - b.estimate.monthlyMin;
  });

  const topPlan = filtered[0] || null;
  const maxTaxPotential = selectedGoals.reduce((acc, g) => {
    const cap = CATEGORY_TAX_CAP[g] || 0;
    return Math.max(acc, cap);
  }, 0);

  return {
    recommendedPlans: filtered,
    allGoalMatchesCount: evaluated.filter((item) => item.goalMatched).length,
    summary: {
      incomeLabel: `${incomeObj.label} ${incomeObj.sub}`,
      taxBracketLabel: incomeObj.taxBracketLabel,
      suggestedBudgetMin: incomeObj.suggestedBudgetMin,
      suggestedBudgetMax: incomeObj.suggestedBudgetMax,
      effectiveBudgetMax,
      topMonthlyMin: topPlan?.estimate.monthlyMin ?? null,
      topMonthlyMax: topPlan?.estimate.monthlyMax ?? null,
      maxTaxPotential,
    },
  };
}

/**
 * Formats tapped profile into a readable Thai summary string for LeadCaptureForm notes.
 */
export function buildProfileLeadNotes(profile, planItem = null) {
  const genderLabel = GENDER_OPTIONS.find((g) => g.id === profile.gender)?.label || '-';
  const ageLabel = AGE_BANDS.find((a) => a.id === profile.ageBand)?.label || '-';
  const incomeObj = INCOME_BANDS.find((i) => i.id === profile.incomeBand);
  const budgetObj = BUDGET_CAPS.find((b) => b.id === profile.budgetCap);
  const tierLabel = COVERAGE_TIERS.find((t) => t.id === profile.coverageTier)?.label || '-';
  const goalsText = (profile.goals || [])
    .map((id) => FOCUS_GOALS.find((g) => g.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  const lines = [
    `[ผลคัดกรองแผน AIA เบื้องต้น]`,
    `• เพศ: ${genderLabel} | ช่วงอายุ: ${ageLabel}`,
    `• ช่วงรายได้: ${incomeObj ? `${incomeObj.label} ${incomeObj.sub}` : '-'} | งบเบี้ย: ${budgetObj?.label || 'ตามงบแนะนำ'}`,
    `• เป้าหมายความคุ้มครอง: ${goalsText || 'ทุกหมวด'} | ระดับแผน: ${tierLabel}`,
  ];

  if (planItem?.plan) {
    lines.push(
      `• แผนที่สนใจ: ${planItem.plan.name} (ประมาณการ ฿${planItem.estimate.monthlyMin.toLocaleString()}–฿${planItem.estimate.monthlyMax.toLocaleString()}/เดือน)`
    );
  }

  return lines.join('\n');
}
