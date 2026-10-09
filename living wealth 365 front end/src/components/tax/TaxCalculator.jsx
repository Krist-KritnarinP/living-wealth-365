import { useState, useMemo } from 'react';
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
  ChevronDown,
  Percent,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';
import { calculatePersonalTax, TAX_BRACKETS } from '../../utils/taxCalculator';
import LeadCaptureForm from '../forms/LeadCaptureForm';

export default function TaxCalculator({ hideHeader = false }) {
  // Input State (Default: Realistic Thai salary earner 45,000 THB/mo)
  const [monthlySalary, setMonthlySalary] = useState(45000);
  const [bonus, setBonus] = useState(90000);
  const [otherIncome, setOtherIncome] = useState(0);

  // Family Deductions
  const [hasSpouse, setHasSpouse] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);

  // Savings & Insurance Deductions
  const [socialSecurity, setSocialSecurity] = useState(9000);
  const [lifeInsurance, setLifeInsurance] = useState(30000);
  const [annuityInsurance, setAnnuityInsurance] = useState(0);
  const [providentFundAndRmf, setProvidentFundAndRmf] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);

  // Modal State for Consultation Request
  const [showConsultModal, setShowConsultModal] = useState(false);

  // Calculate tax in real-time
  const taxResult = useMemo(() => {
    return calculatePersonalTax({
      monthlySalary,
      bonus,
      otherIncome,
      hasSpouse,
      childrenCount,
      parentsCount,
      socialSecurity,
      lifeInsurance,
      annuityInsurance,
      providentFundAndRmf,
      homeLoanInterest,
    });
  }, [
    monthlySalary,
    bonus,
    otherIncome,
    hasSpouse,
    childrenCount,
    parentsCount,
    socialSecurity,
    lifeInsurance,
    annuityInsurance,
    providentFundAndRmf,
    homeLoanInterest,
  ]);

  const formatNumber = (num) => {
    return Math.round(num).toLocaleString('th-TH');
  };

  return (
    <div className="w-full space-y-8">
      {/* 🌟 Optional Header Hero Banner */}
      {!hideHeader && (
        <div className="zen-surface rounded-3xl p-6 sm:p-10 border border-base-300 relative overflow-hidden shadow-xs">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>TAX PLANNING & WEALTH ADVISORY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
              โปรแกรมคำนวณภาษีบุคคลธรรมดา 2568 (ภ.ง.ด. 90/91)
            </h2>

            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              คำนวณภาษีเงินได้เบื้องต้น วางแผนสิทธิลดหย่อนตามกฎหมายอย่างถูกต้อง
              และค้นหาโอกาสประหยัดภาษีได้สูงสุดถึงหลักหมื่นต่อปีด้วยแผนประกันชีวิตและสุขภาพ AIA
            </p>
          </div>
        </div>
      )}

      {/* 🧮 Interactive Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Input Forms (7 Cols on desktop) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* หมวดที่ 1: รายได้ทั้งปี */}
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  1
                </span>
                <span>ข้อมูลรายได้ทั้งปี</span>
              </h3>
              <span className="text-xs font-semibold text-base-content/60">
                หักค่าใช้จ่าย 50% สูงสุด 100,000 บ.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-base-content/85">
                  เงินเดือนต่อเดือน (บาท)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(Number(e.target.value))}
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                  />
                </div>
                <span className="text-[11px] text-base-content/60">
                  รวม 12 เดือน: ฿{formatNumber(monthlySalary * 12)}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-base-content/85">
                  โบนัสตลอดปี (บาท)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={bonus}
                    onChange={(e) => setBonus(Number(e.target.value))}
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                  />
                </div>
                <span className="text-[11px] text-base-content/60">โบนัสหรือเงินรางวัลประจำปี</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-base-content/85">
                เงินได้อื่นๆ ทั้งปี เช่น ค่าคอมมิชชัน, ฟรีแลนซ์ (บาท)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                  ฿
                </span>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(Number(e.target.value))}
                  className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                />
              </div>
            </div>

            {/* Quick Monthly Presets */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-base-content/60">ตัวเลือกรวดเร็ว:</span>
              {[30000, 50000, 70000, 100000, 150000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMonthlySalary(preset)}
                  className={`btn btn-xs rounded-lg font-bold ${
                    monthlySalary === preset
                      ? 'btn-primary text-white'
                      : 'btn-ghost border border-base-300'
                  }`}
                >
                  {preset / 1000}k/ด.
                </button>
              ))}
            </div>
          </div>

          {/* หมวดที่ 2: ค่าลดหย่อนครอบครัว */}
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  2
                </span>
                <span>ค่าลดหย่อนส่วนตัวและครอบครัว</span>
              </h3>
              <span className="text-xs font-semibold text-success flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ลดหย่อนส่วนตัว 60,000 บ. (อัตโนมัติ)
              </span>
            </div>

            <div className="space-y-4">
              {/* คู่สมรส */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-base-100 border border-base-300/60">
                <div>
                  <div className="text-xs font-bold text-primary">คู่สมรส (ไม่มีเงินได้)</div>
                  <div className="text-[11px] text-base-content/60">
                    จดทะเบียนสมรสและไม่มีรายได้ ลดหย่อนได้ 60,000 บ.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasSpouse}
                  onChange={(e) => setHasSpouse(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>

              {/* บุตร */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-base-100 border border-base-300/60">
                <div>
                  <div className="text-xs font-bold text-primary">จำนวนบุตร (คนละ 30,000 บ.)</div>
                  <div className="text-[11px] text-base-content/60">
                    บุตรชอบด้วยกฎหมาย อายุไม่เกิน 25 ปีและกำลังศึกษา
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="btn btn-xs btn-circle btn-ghost border border-base-300 font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-black text-primary">
                    {childrenCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount(childrenCount + 1)}
                    className="btn btn-xs btn-circle btn-primary font-bold text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* บิดา-มารดา */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-base-100 border border-base-300/60">
                <div>
                  <div className="text-xs font-bold text-primary">
                    บิดา-มารดา อายุ 60 ปีขึ้นไป (คนละ 30,000 บ.)
                  </div>
                  <div className="text-[11px] text-base-content/60">
                    มีรายได้ไม่เกิน 30,000 บ./ปี (สูงสุด 4 คน รวมฝ่ายคู่สมรส)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setParentsCount(Math.max(0, parentsCount - 1))}
                    className="btn btn-xs btn-circle btn-ghost border border-base-300 font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-black text-primary">
                    {parentsCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setParentsCount(Math.min(4, parentsCount + 1))}
                    className="btn btn-xs btn-circle btn-primary font-bold text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* หมวดที่ 3: ประกันและการออม */}
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary text-primary font-black text-xs flex items-center justify-center">
                  3
                </span>
                <span>ค่าลดหย่อนประกันและการวางแผนการเงิน</span>
              </h3>
              <span className="text-xs font-semibold text-secondary">AIA Tax Advantage</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ประกันสังคม */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-base-content/85">
                  ประกันสังคม (สูงสุด 9,000 บ.)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="9000"
                    step="500"
                    value={socialSecurity}
                    onChange={(e) => setSocialSecurity(Number(e.target.value))}
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                  />
                </div>
              </div>

              {/* ประกันชีวิตและสุขภาพทั่วไป */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-primary">
                    เบี้ยประกันชีวิต & สุขภาพ (สูงสุด 100,000 บ.)
                  </label>
                  <span className="text-[10px] text-secondary font-bold">ยอดนิยม ⭐</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    step="5000"
                    value={lifeInsurance}
                    onChange={(e) => setLifeInsurance(Number(e.target.value))}
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                  />
                </div>
                <span className="text-[11px] text-base-content/60">
                  ประกันสุขภาพเหมาจ่าย AIA, ประกันชีวิตคุ้มครองรายได้
                </span>
              </div>

              {/* ประกันชีวิตแบบบำนาญ */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary">
                  เบี้ยประกันชีวิตบำนาญ (สูงสุด 200,000 บ.)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="200000"
                    step="5000"
                    value={annuityInsurance}
                    onChange={(e) => setAnnuityInsurance(Number(e.target.value))}
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                  />
                </div>
                <span className="text-[11px] text-base-content/60">
                  ไม่เกิน 15% ของเงินได้ และอยู่ในเพดานเกษียณ 500,000 บ.
                </span>
              </div>

              {/* กองทุนสำรองเลี้ยงชีพ / RMF / SSF / Thai ESG */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-base-content/85">
                  กองทุน PVD / RMF / Thai ESG (บาท)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={providentFundAndRmf}
                    onChange={(e) => setProvidentFundAndRmf(Number(e.target.value))}
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                  />
                </div>
              </div>

              {/* ดอกเบี้ยบ้าน */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-base-content/85">
                  ดอกเบี้ยเงินกู้ยืมเพื่อที่อยู่อาศัย (สูงสุด 100,000 บ.)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/50">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    step="5000"
                    value={homeLoanInterest}
                    onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 font-bold text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Real-Time Results Summary (5 Cols on desktop) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Main Calculation Card */}
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-xl space-y-6 relative overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-transparent">
            <div className="space-y-1">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                สรุปผลภาษีเงินได้สุทธิ 2568
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-primary">
                ภาษีที่คุณต้องชำระ
              </h3>
            </div>

            {/* Total Tax Display Hero */}
            <div className="p-6 rounded-2xl bg-primary text-white shadow-lg space-y-2 relative overflow-hidden">
              <div className="text-xs font-medium text-white/80">ภาษีเงินได้บุคคลธรรมดาสุทธิ:</div>
              <div className="text-3xl sm:text-4xl font-black text-secondary tracking-tight">
                ฿{formatNumber(taxResult.netTaxPayable)}{' '}
                <span className="text-sm font-normal text-white/70">บาท/ปี</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs text-white/80 border-t border-white/10">
                <span>ฐานภาษีสูงสุด (Marginal Rate):</span>
                <span className="font-bold text-secondary text-sm">
                  {taxResult.marginalTaxRate}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/80">
                <span>อัตราภาษีที่แท้จริง (Effective Rate):</span>
                <span className="font-bold">{taxResult.effectiveTaxRate}%</span>
              </div>
            </div>

            {/* Income & Deductions Breakdown */}
            <div className="space-y-3 text-sm border-t border-base-300 pt-4">
              <div className="flex items-center justify-between text-base-content/70">
                <span>รายได้รวมทั้งปี (พึงประเมิน):</span>
                <span className="font-bold text-base-content">
                  ฿{formatNumber(taxResult.annualIncome)}
                </span>
              </div>

              <div className="flex items-center justify-between text-base-content/70">
                <span>หักค่าใช้จ่ายตามกฎหมาย (50%):</span>
                <span className="font-bold text-error">
                  - ฿{formatNumber(taxResult.expensesDeduction)}
                </span>
              </div>

              <div className="flex items-center justify-between text-base-content/70">
                <span>หักค่าลดหย่อนรวมทั้งหมด:</span>
                <span className="font-bold text-error">
                  - ฿{formatNumber(taxResult.totalDeductions)}
                </span>
              </div>

              <div className="flex items-center justify-between text-base-content font-bold border-t border-base-300/60 pt-2 text-base">
                <span className="text-primary font-black">เงินได้สุทธิ (นำไปคิดภาษี):</span>
                <span className="text-primary font-black">
                  ฿{formatNumber(taxResult.netTaxableIncome)}
                </span>
              </div>
            </div>

            {/* 💡 Living Wealth 365 Tax-Saving Opportunity Box */}
            {taxResult.taxSavingsOpportunity.potentialSavings > 0 && (
              <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-secondary uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span>โอกาสประหยัดภาษีเพิ่ม (Tax Saving)</span>
                </div>
                <p className="text-xs text-base-content/85 leading-relaxed">
                  คุณยังมีโควตาลดหย่อนประกันชีวิต/บำนาญเหลืออีก{' '}
                  <span className="font-bold text-primary">
                    ฿{formatNumber(taxResult.taxSavingsOpportunity.remainingLifeInsuranceRoom + taxResult.taxSavingsOpportunity.remainingAnnuityRoom)}
                  </span>{' '}
                  บาท ซึ่งหากวางแผนเพิ่มจะช่วยคุณประหยัดเงินภาษีได้ทันทีสูงถึง:
                </p>
                <div className="text-xl font-black text-primary">
                  ประหยัดเงินได้{' '}
                  <span className="text-secondary underline decoration-2">
                    ฿{formatNumber(taxResult.taxSavingsOpportunity.potentialSavings)}
                  </span>{' '}
                  บาท/ปี
                </div>
              </div>
            )}

            {/* CTA Button to Request Consultation */}
            <button
              type="button"
              onClick={() => setShowConsultModal(true)}
              className="btn btn-primary btn-md sm:btn-lg w-full rounded-2xl font-bold shadow-lg shadow-primary/20 gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span>ปรึกษาแผนลดหย่อนภาษีเฉพาะคุณ (ฟรี)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ตารางขั้นบันไดภาษี (Progressive Bracket Breakdown) */}
          <div className="zen-surface rounded-3xl p-6 border border-base-300 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-primary" />
              <span>ตารางอัตราภาษีแบบขั้นบันได 2568</span>
            </h3>

            <div className="space-y-1.5 text-xs">
              {taxResult.bracketBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                    item.isActive
                      ? 'bg-primary/10 border border-primary/20 font-bold text-primary'
                      : 'text-base-content/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-12">{item.rateLabel}</span>
                    <span className="text-[11px] truncate max-w-[140px] sm:max-w-none">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-right whitespace-nowrap">
                    {item.isActive ? `฿${formatNumber(item.taxInBracket)}` : '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🤝 Consultation Lead Capture Modal */}
      {showConsultModal && (
        <div role="dialog" aria-modal="true" className="modal modal-open z-50 animate-fadeIn">
          <div className="modal-box rounded-3xl zen-surface border border-base-300 shadow-2xl max-w-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <div className="flex items-center gap-2 text-primary font-black text-lg">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span>ขอรับคำปรึกษาแผนลดหย่อนภาษีส่วนบุคคล</span>
              </div>
              <button
                type="button"
                onClick={() => setShowConsultModal(false)}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-primary space-y-1">
              <p className="font-bold">สรุปผลการคำนวณเบื้องต้นของคุณ:</p>
              <p>
                เงินได้รวม ฿{formatNumber(taxResult.annualIncome)} | เงินได้สุทธิ ฿{formatNumber(taxResult.netTaxableIncome)} | ฐานภาษี {taxResult.marginalTaxRate}%
              </p>
              {taxResult.taxSavingsOpportunity.potentialSavings > 0 && (
                <p className="text-secondary font-black">
                  สามารถประหยัดภาษีเพิ่มได้อีกถึง ฿{formatNumber(taxResult.taxSavingsOpportunity.potentialSavings)} บาท
                </p>
              )}
            </div>

            <LeadCaptureForm
              defaultInterest="วางแผนภาษีและลดหย่อนภาษีบุคคลธรรมดา"
              title=""
              subtitle="กรอกชื่อและเบอร์โทรศัพท์ เพื่อให้ที่ปรึกษาจัดทำตารางเปรียบเทียบแผนภาษีส่งให้ทาง LINE หรือติดต่อกลับ"
            />
          </div>
          <div
            className="modal-backdrop bg-black/50 backdrop-blur-xs"
            onClick={() => setShowConsultModal(false)}
          />
        </div>
      )}
    </div>
  );
}
