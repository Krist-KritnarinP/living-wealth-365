import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  ShieldCheck,
  HeartPulse,
  Zap,
  Landmark,
  TrendingUp,
  Umbrella,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  FileText,
  Info,
  Wallet,
  BadgePercent,
  Eye,
} from 'lucide-react';
import FramedImage from '../common/FramedImage';
import {
  GENDER_OPTIONS,
  AGE_BANDS,
  INCOME_BANDS,
  BUDGET_CAPS,
  FOCUS_GOALS,
  COVERAGE_TIERS,
  evaluateAndFilterPlans,
  buildProfileLeadNotes,
} from '../../utils/insuranceEstimator';

const GOAL_ICONS = {
  HEALTH: HeartPulse,
  CRITICAL_ILLNESS: ShieldCheck,
  ACCIDENT: Zap,
  RETIREMENT: Umbrella,
  WHOLE_LIFE: Landmark,
  INVESTMENT_LINKED: TrendingUp,
};

const DEFAULT_PROFILE = {
  gender: 'FEMALE',
  ageBand: '30_39',
  incomeBand: '30K_60K',
  budgetCap: 'AUTO',
  goals: ['HEALTH', 'ACCIDENT'],
  coverageTier: 'BALANCED',
  onlyInBudget: false,
};

const fmt = (n) => Math.round(Number(n || 0)).toLocaleString('th-TH');

export default function InsurancePlanFinder({ plans = [], onRequestQuote }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  const toggleGoal = (goalId) => {
    setProfile((prev) => {
      const exists = prev.goals.includes(goalId);
      if (exists) {
        if (prev.goals.length === 1) return prev; // Keep at least 1 goal selected
        return { ...prev, goals: prev.goals.filter((g) => g !== goalId) };
      }
      return { ...prev, goals: [...prev.goals, goalId] };
    });
  };

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
  };

  const { recommendedPlans, allGoalMatchesCount, summary } = useMemo(
    () => evaluateAndFilterPlans(plans, profile),
    [plans, profile]
  );

  const selectedGenderLabel =
    GENDER_OPTIONS.find((g) => g.id === profile.gender)?.label || 'หญิง';
  const selectedAgeLabel =
    AGE_BANDS.find((a) => a.id === profile.ageBand)?.label || '30–39 ปี';

  const handleQuotePlan = (item) => {
    if (!onRequestQuote) return;
    onRequestQuote({
      plan: item.plan,
      interest: `${item.plan.name} (ประมาณ ฿${fmt(item.estimate.monthlyMin)}–฿${fmt(item.estimate.monthlyMax)}/เดือน)`,
      notes: buildProfileLeadNotes(profile, item),
    });
  };

  const handleQuotePortfolio = () => {
    if (!onRequestQuote) return;
    const goalNames = profile.goals
      .map((id) => FOCUS_GOALS.find((g) => g.id === id)?.label)
      .filter(Boolean)
      .join(' + ');
    onRequestQuote({
      plan: { name: `จัดพอร์ตประกัน AIA: ${goalNames || 'คุ้มครองรอบด้าน'}` },
      interest: `ขอใบเสนอราคาพอร์ต AIA (${goalNames || 'คุ้มครองรอบด้าน'})`,
      notes: buildProfileLeadNotes(profile, null),
    });
  };

  return (
    <div className="w-full space-y-8 min-w-0">
      {/* Header Banner */}
      <div className="zen-surface rounded-3xl p-5 sm:p-7 border border-base-300/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/35 text-primary text-xs font-black tracking-wide">
            <SlidersHorizontal className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>AIA PLAN FINDER • ค้นหาแผนที่ใช่สำหรับคุณ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary leading-tight">
            คัดกรองแผนประกัน AIA & ประมาณการเบี้ยเบื้องต้น
          </h2>
          <p className="text-sm text-base-content/75 max-w-2xl leading-relaxed">
            เลือกช่วงอายุ รายได้ และความคุ้มครองที่ต้องการใน 4 ขั้นตอน เพื่อดูแผน AIA ที่ตรงโจทย์พร้อมช่วงค่าเบี้ยประมาณการต่อเดือนและต่อปีทันที
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-outline btn-sm rounded-xl border-base-300 font-bold gap-1.5 self-start md:self-center shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีเซ็ตตัวเลือก</span>
        </button>
      </div>

      {/* Main 2-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: 4 Tap-Only Filter Steps (5 cols) */}
        <div className="lg:col-span-5 zen-surface rounded-3xl p-5 sm:p-6 border border-base-300/60 space-y-6 min-w-0">
          {/* STEP 1: Gender & Age Band */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-black text-primary">
                1. เพศ & ช่วงอายุของคุณ
              </span>
              <div className="flex items-center gap-1.5 bg-base-200/80 p-1 rounded-xl border border-base-300/50">
                {GENDER_OPTIONS.map((g) => {
                  const active = profile.gender === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, gender: g.id }))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        active
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-base-content/75 hover:bg-base-100'
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {AGE_BANDS.map((age) => {
                const active = profile.ageBand === age.id;
                return (
                  <button
                    key={age.id}
                    type="button"
                    onClick={() => setProfile((p) => ({ ...p, ageBand: age.id }))}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer min-w-0 ${
                      active
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-base-100/80 text-base-content border-base-300/70 hover:border-primary/40 hover:bg-base-100'
                    }`}
                  >
                    <div className="text-sm font-extrabold leading-tight">{age.label}</div>
                    <div
                      className={`text-[11px] mt-0.5 leading-tight ${
                        active ? 'text-white/85' : 'text-base-content/65'
                      }`}
                    >
                      {age.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Income Band & Budget Cap */}
          <div className="space-y-3 pt-4 border-t border-base-300/50">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-sm font-black text-primary">
                2. ช่วงรายได้ต่อเดือน & งบเบี้ย
              </span>
              <span className="text-xs font-semibold text-base-content/65">
                งบแนะนำ 5–10% ของรายได้
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {INCOME_BANDS.map((inc) => {
                const active = profile.incomeBand === inc.id;
                return (
                  <button
                    key={inc.id}
                    type="button"
                    onClick={() => setProfile((p) => ({ ...p, incomeBand: inc.id }))}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer min-w-0 ${
                      active
                        ? 'bg-secondary text-secondary-content border-secondary font-bold shadow-sm'
                        : 'bg-base-100/80 text-base-content border-base-300/70 hover:border-secondary/50'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black leading-tight">{inc.label}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        active ? 'text-secondary-content/80' : 'text-base-content/60'
                      }`}
                    >
                      {inc.sub} • ฐานภาษี {inc.taxBracketLabel}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Optional quick budget ceiling chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-base-content/75 block">
                เพดานงบเบี้ยต่อเดือนที่สบายใจ:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BUDGET_CAPS.map((cap) => {
                  const active = profile.budgetCap === cap.id;
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, budgetCap: cap.id }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        active
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-base-100 text-base-content/80 border-base-300/70 hover:border-primary/40'
                      }`}
                    >
                      {cap.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 3: Protection Goals (Multi-Select) */}
          <div className="space-y-3 pt-4 border-t border-base-300/50">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-sm font-black text-primary">
                3. ความคุ้มครองที่ต้องการเน้น
              </span>
              <span className="text-xs font-semibold text-secondary">
                เลือกได้หลายข้อ ({profile.goals.length} รายการ)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FOCUS_GOALS.map((goal) => {
                const Icon = GOAL_ICONS[goal.id] || ShieldCheck;
                const active = profile.goals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer min-w-0 ${
                      active
                        ? 'bg-primary/10 border-primary text-primary shadow-xs ring-1 ring-primary/30'
                        : 'bg-base-100/80 border-base-300/70 text-base-content hover:bg-base-100'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        active ? 'bg-primary text-white' : 'bg-base-200 text-primary'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs sm:text-sm font-extrabold leading-snug">
                          {goal.label}
                        </span>
                        {active && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                      </div>
                      <p className="text-[11px] text-base-content/70 leading-snug mt-0.5">
                        {goal.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Coverage Tier */}
          <div className="space-y-3 pt-4 border-t border-base-300/50">
            <span className="text-sm font-black text-primary block">
              4. ระดับความคุ้มครองที่มองหา
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {COVERAGE_TIERS.map((tier) => {
                const active = profile.coverageTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setProfile((p) => ({ ...p, coverageTier: tier.id }))}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer min-w-0 ${
                      active
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-base-100/80 text-base-content border-base-300/70 hover:border-primary/40'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-extrabold leading-tight">
                      {tier.label}
                    </div>
                    <div
                      className={`text-[11px] mt-1 leading-snug ${
                        active ? 'text-white/85' : 'text-base-content/65'
                      }`}
                    >
                      {tier.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Summary & Filtered AIA Plans (7 cols) */}
        <div className="lg:col-span-7 space-y-5 min-w-0">
          {/* Live Budget & Tax KPI Strip */}
          <div className="zen-surface rounded-3xl p-5 border border-primary/20 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-base-100/90 border border-base-300/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/70">
                  <Wallet className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>งบประมาณที่แนะนำ</span>
                </div>
                <div className="text-base sm:text-lg font-black text-primary mt-1">
                  ฿{fmt(summary.suggestedBudgetMin)} – ฿{fmt(summary.suggestedBudgetMax)}{' '}
                  <span className="text-xs font-semibold text-base-content/60 whitespace-nowrap">/เดือน</span>
                </div>
                <div className="text-[11px] text-base-content/65 mt-0.5">
                  อิงช่วงรายได้ {summary.incomeLabel}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-secondary/12 border border-secondary/35">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                  <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>เบี้ยแผนแนะนำอันดับ 1</span>
                </div>
                <div className="text-base sm:text-lg font-black text-primary mt-1">
                  {summary.topMonthlyMin
                    ? `฿${fmt(summary.topMonthlyMin)} – ฿${fmt(summary.topMonthlyMax)}`
                    : 'ไม่มีแผนในเพดานงบนี้'}{' '}
                  {summary.topMonthlyMin && (
                    <span className="text-xs font-semibold text-base-content/60 whitespace-nowrap">/เดือน</span>
                  )}
                </div>
                <div className="text-[11px] text-base-content/70 mt-0.5">
                  สำหรับ{selectedGenderLabel} อายุ {selectedAgeLabel}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-base-100/90 border border-base-300/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/70">
                  <BadgePercent className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>สิทธิ์ลดหย่อนภาษีสูงสุด</span>
                </div>
                <div className="text-base sm:text-lg font-black text-success mt-1">
                  {summary.maxTaxPotential > 0
                    ? `฿${fmt(summary.maxTaxPotential)}`
                    : 'คุ้มครองอุบัติเหตุ'}{' '}
                  {summary.maxTaxPotential > 0 && (
                    <span className="text-xs font-semibold text-base-content/60 whitespace-nowrap">/ปี</span>
                  )}
                </div>
                <div className="text-[11px] text-base-content/65 mt-0.5">
                  ฐานภาษีโดยประมาณ {summary.taxBracketLabel}
                </div>
              </div>
            </div>

            {/* Result Counter & In-Budget Filter Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-base-300/50">
              <div className="text-xs sm:text-sm font-bold text-primary">
                พบแผน AIA ที่ตรงโจทย์{' '}
                <span className="text-secondary font-black">{recommendedPlans.length} แผน</span>
                {profile.onlyInBudget && allGoalMatchesCount > recommendedPlans.length && (
                  <span className="text-base-content/60 font-medium">
                    {' '}
                    (จากทั้งหมด {allGoalMatchesCount} แผนในหมวดที่เลือก)
                  </span>
                )}
              </div>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-base-content/80">
                <input
                  type="checkbox"
                  checked={profile.onlyInBudget}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, onlyInBudget: e.target.checked }))
                  }
                  className="toggle toggle-primary toggle-sm"
                />
                <span>แสดงเฉพาะแผนในงบ</span>
              </label>
            </div>
          </div>

          {/* Filtered Plan Cards List */}
          {recommendedPlans.length === 0 ? (
            <div className="zen-surface rounded-3xl p-8 text-center space-y-4 border border-base-300/60">
              <p className="text-base font-bold text-primary">
                ยังไม่มีแผนในหมวดที่เลือกที่ต่ำกว่าเพดานงบนี้สำหรับช่วงอายุ {selectedAgeLabel}
              </p>
              <p className="text-sm text-base-content/70">
                ลองปิดตัวกรอง &ldquo;แสดงเฉพาะแผนในงบ&rdquo; หรือเลือกเพดานงบที่สูงขึ้น เพื่อเปรียบเทียบทุกแผนที่ใกล้เคียงครับ
              </p>
              <button
                type="button"
                onClick={() =>
                  setProfile((p) => ({ ...p, onlyInBudget: false, budgetCap: 'UNLIMITED' }))
                }
                className="btn btn-primary btn-sm rounded-xl font-bold"
              >
                แสดงทุกแผนที่ตรงโจทย์
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendedPlans.map((item, idx) => {
                const { plan, estimate, matchScore, budgetFit, incomeSharePct, reasons } = item;
                const isTop = idx === 0;

                return (
                  <article
                    key={plan.id || plan.slug}
                    className={`zen-surface rounded-3xl p-4 sm:p-5 border transition-all min-w-0 ${
                      isTop
                        ? 'border-secondary shadow-md ring-1 ring-secondary/30'
                        : 'border-base-300/60 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 min-w-0">
                      {/* Thumbnail */}
                      <Link
                        to={`/wealth/plan/${plan.slug || plan.id}`}
                        className="w-full sm:w-36 h-40 sm:h-auto sm:min-h-[140px] rounded-2xl overflow-hidden bg-base-200 border border-base-300/50 shrink-0 block"
                      >
                        <FramedImage
                          src={plan.imageUrl}
                          alt={plan.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          fallback="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80"
                        />
                      </Link>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0 space-y-3">
                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {isTop && (
                            <span className="badge badge-secondary font-black text-xs px-2.5 py-1 gap-1">
                              <Sparkles className="w-3 h-3 shrink-0" />
                              แนะนำอันดับ 1
                            </span>
                          )}
                          <span className="badge badge-primary font-bold text-xs px-2.5 py-1">
                            ตรงโจทย์ {matchScore}%
                          </span>
                          <span
                            className={`badge text-xs font-bold px-2.5 py-1 ${
                              budgetFit === 'IN_BUDGET'
                                ? 'badge-success text-white'
                                : budgetFit === 'STRETCH'
                                ? 'badge-warning text-warning-content'
                                : 'badge-outline text-base-content/75'
                            }`}
                          >
                            {budgetFit === 'IN_BUDGET'
                              ? 'อยู่ในงบของคุณ'
                              : budgetFit === 'STRETCH'
                              ? 'สูงกว่างบเล็กน้อย'
                              : 'ระดับพรีเมียม'}
                          </span>
                          <span className="badge badge-ghost text-xs font-semibold px-2.5 py-1">
                            {plan.categoryName || plan.category}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <Link
                            to={`/wealth/plan/${plan.slug || plan.id}`}
                            className="text-lg sm:text-xl font-black text-primary hover:text-secondary transition-colors leading-snug block"
                          >
                            {plan.name}
                          </Link>
                          <p className="text-xs sm:text-sm text-base-content/75 mt-1 leading-relaxed">
                            {plan.tagline}
                          </p>
                        </div>

                        {/* Estimated Premium Highlight Box */}
                        <div className="p-3.5 rounded-2xl bg-base-100/95 border border-secondary/35 flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-[11px] font-bold text-base-content/65">
                              ค่าเบี้ยประมาณการ ({selectedGenderLabel} • {selectedAgeLabel})
                            </div>
                            <div className="text-lg sm:text-xl font-black text-primary leading-tight mt-0.5">
                              ฿{fmt(estimate.monthlyMin)} – ฿{fmt(estimate.monthlyMax)}
                              <span className="text-xs font-bold text-base-content/65"> /เดือน</span>
                            </div>
                          </div>

                          <div className="text-left sm:text-right">
                            <div className="text-xs font-bold text-secondary">
                              ≈ ฿{fmt(estimate.yearlyMin)} – ฿{fmt(estimate.yearlyMax)} /ปี
                            </div>
                            <div className="text-[11px] text-base-content/65">
                              คิดเป็นประมาณ {incomeSharePct}% ของรายได้
                            </div>
                          </div>
                        </div>

                        {/* Coverage + Why It Fits Chips */}
                        <div className="space-y-1.5">
                          {plan.coverageAmount && (
                            <div className="text-xs font-bold text-base-content/80">
                              วงเงินคุ้มครอง:{' '}
                              <span className="text-primary">{plan.coverageAmount}</span>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1.5">
                            {reasons.map((r, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/8 text-primary text-[11px] font-bold"
                              >
                                <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                                <span>{r}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleQuotePlan(item)}
                            className="btn btn-primary btn-sm rounded-xl font-bold gap-1.5 px-4 shadow-xs"
                          >
                            <span>ขอใบเสนอราคาจริงแผนนี้</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </button>

                          <Link
                            to={`/wealth/plan/${plan.slug || plan.id}`}
                            className="btn btn-outline btn-sm rounded-xl border-base-300 font-bold gap-1.5 px-3.5"
                          >
                            <Eye className="w-3.5 h-3.5 shrink-0" />
                            <span>ดูรายละเอียดแผน</span>
                          </Link>

                          {plan.brochureUrl && (
                            <a
                              href={plan.brochureUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost btn-sm rounded-xl text-secondary font-bold gap-1 px-3"
                            >
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span>PDF</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Combined Portfolio Consultation CTA */}
          <div className="rounded-3xl bg-primary text-primary-content p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-secondary">
                1-ON-1 TAILORED QUOTATION BY ADMIN A
              </div>
              <h3 className="text-lg sm:text-xl font-black leading-snug">
                อยากได้ตารางเบี้ยจริง AIA แบบรวมหลายแผนในงบเดียว?
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                ส่งสรุปความต้องการนี้ให้ Admin A ช่วยคำนวณเบี้ยประกันรายปีและเปรียบเทียบแผนที่เหมาะสมที่สุด
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuotePortfolio}
              className="btn btn-secondary text-secondary-content rounded-2xl font-black px-5 gap-2 shrink-0 shadow-sm"
            >
              <span>ส่งตัวเลือกขอใบเสนอราคา</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Actuarial Disclaimer */}
          <div className="rounded-2xl bg-base-200/70 border border-base-300/60 p-4 flex items-start gap-2.5 text-xs text-base-content/75 leading-relaxed">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p>
              <strong>หมายเหตุ:</strong> ตัวเลขค่าเบี้ยที่แสดงเป็นการประมาณการเบื้องต้นตามช่วงอายุ เพศ และระดับความคุ้มครองเพื่อช่วยวางแผนงบประมาณเท่านั้น
              เบี้ยประกันภัยจริงของ AIA ขึ้นอยู่กับอายุจริงรายปี ทุนประกันที่เลือก ประวัติสุขภาพ และขั้นอาชีพ (โดยเฉพาะประกันอุบัติเหตุ AIA PA)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
