import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Info,
  ChevronDown,
  Percent,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';
import { calculatePersonalTax, TAX_BRACKETS } from '../../utils/taxCalculator';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';
import { ROUTES } from '../../constants/routes';

export default function TaxCalculatorPage() {
  // Input State (Default: Realistic Thai salary earner 45,000 THB/mo)
  const [monthlySalary, setMonthlySalary] = useState(45000);
  const [bonus, setBonus] = useState(90000); // 2 months bonus
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
    <div className="w-full space-y-10 py-6 sm:py-10">
      {/* 🌟 1. Header Hero Banner (Edge-to-Edge 100%) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="zen-surface rounded-3xl p-6 sm:p-10 border border-base-300 relative overflow-hidden shadow-xs">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>TAX PLANNING & WEALTH ADVISORY</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
              โปรแกรมคำนวณภาษีบุคคลธรรมดา 2568
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-base-content/75 leading-relaxed">
              คำนวณภาษีเงินได้เบื้องต้น วางแผนสิทธิลดหย่อนตามกฎหมายอย่างถูกต้อง
              และค้นหาโอกาสประหยัดภาษีได้สูงสุดถึงหลักหมื่นต่อปีด้วยแผนประกันและการออม
            </p>
          </div>
        </div>
      </section>

      {/* 🧮 2. Interactive Calculator Grid */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Input Forms (7 Cols on desktop) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* หมวดที่ 1: รายได้ทั้งปี */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-base-300 pb-3">
                <h2 className="text-lg font-black text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  <span>ข้อมูลรายได้ทั้งปี</span>
                </h2>
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
                    className="input input-bordered w-full pl-8 rounded-xl bg-base-100 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* หมวดที่ 2: ค่าลดหย่อนส่วนตัว & ครอบครัว */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-base-300 pb-3">
                <h2 className="text-lg font-black text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  <span>ค่าลดหย่อนส่วนตัว & ครอบครัว</span>
                </h2>
                <span className="badge badge-primary badge-outline text-xs font-bold">
                  ลดหย่อนตนเอง 60,000 บ. (อัตโนมัติ)
                </span>
              </div>

              <div className="space-y-4">
                {/* Spouse Checkbox */}
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-base-200/50 border border-base-300/50 cursor-pointer select-none hover:bg-base-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasSpouse}
                    onChange={(e) => setHasSpouse(e.target.checked)}
                    className="checkbox checkbox-primary rounded-lg"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-base-content">
                      มีคู่สมรสที่จดทะเบียนและไม่มีเงินได้ (ลดหย่อนเพิ่ม 60,000 บาท)
                    </span>
                    <p className="text-[11px] text-base-content/60">
                      คู่สมรสต้องไม่มีเงินได้ตลอดปีภาษีที่นำมาหักลดหย่อน
                    </p>
                  </div>
                </label>

                {/* Children & Parents Steppers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/50 space-y-2">
                    <label className="text-xs font-bold text-base-content/85 block">
                      จำนวนบุตร (คนละ 30,000 บาท)
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="btn btn-circle btn-sm btn-ghost border border-base-300"
                      >
                        -
                      </button>
                      <span className="text-base font-black text-primary w-8 text-center">
                        {childrenCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                        className="btn btn-circle btn-sm btn-ghost border border-base-300"
                      >
                        +
                      </button>
                      <span className="text-xs text-base-content/60 ml-auto">
                        = ฿{formatNumber(childrenCount * 30000)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/50 space-y-2">
                    <label className="text-xs font-bold text-base-content/85 block">
                      บิดา-มารดา อายุ 60+ (คนละ 30,000 บาท)
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setParentsCount(Math.max(0, parentsCount - 1))}
                        className="btn btn-circle btn-sm btn-ghost border border-base-300"
                      >
                        -
                      </button>
                      <span className="text-base font-black text-primary w-8 text-center">
                        {parentsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setParentsCount(Math.min(4, parentsCount + 1))}
                        className="btn btn-circle btn-sm btn-ghost border border-base-300"
                      >
                        +
                      </button>
                      <span className="text-xs text-base-content/60 ml-auto">
                        = ฿{formatNumber(parentsCount * 30000)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* หมวดที่ 3: สิทธิลดหย่อนประกัน & การลงทุน */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-base-300 pb-3">
                <h2 className="text-lg font-black text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  <span>สิทธิลดหย่อนประกัน & การออมเงิน</span>
                </h2>
                <span className="text-xs font-bold text-secondary">
                  Living Wealth 365 แนะนำ
                </span>
              </div>

              <div className="space-y-4">
                {/* Social Security */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-base-content/85">
                      ประกันสังคม (ตามจริง สูงสุด 9,000 บาท)
                    </label>
                    <span className="text-xs font-bold text-primary">฿{formatNumber(socialSecurity)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="9000"
                    step="750"
                    value={socialSecurity}
                    onChange={(e) => setSocialSecurity(Number(e.target.value))}
                    className="range range-primary range-xs"
                  />
                </div>

                {/* General Life & Health Insurance (100k) */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-primary block">
                        เบี้ยประกันชีวิตทั่วไป & สุขภาพ
                      </label>
                      <span className="text-[11px] text-base-content/60">
                        สิทธิตามกฎหมายสูงสุด 100,000 บาท/ปี
                      </span>
                    </div>
                    <span className="text-sm font-black text-primary">
                      ฿{formatNumber(lifeInsurance)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={lifeInsurance}
                    onChange={(e) => setLifeInsurance(Number(e.target.value))}
                    className="range range-primary range-xs"
                  />
                  {lifeInsurance < 100000 && (
                    <div className="text-[11px] text-secondary font-bold flex items-center gap-1 pt-1">
                      <Sparkles className="w-3 h-3" />
                      <span>ยังเหลือสิทธิลดหย่อนได้อีก ฿{formatNumber(100000 - lifeInsurance)} บาท</span>
                    </div>
                  )}
                </div>

                {/* Annuity Pension Insurance (200k) */}
                <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-secondary block">
                        เบี้ยประกันชีวิตแบบบำนาญ (Annuity)
                      </label>
                      <span className="text-[11px] text-base-content/60">
                        สูงสุด 15% ของเงินได้ แต่ไม่เกิน 200,000 บาท/ปี
                      </span>
                    </div>
                    <span className="text-sm font-black text-secondary">
                      ฿{formatNumber(annuityInsurance)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.min(200000, taxResult.annualIncome * 0.15 || 200000)}
                    step="5000"
                    value={annuityInsurance}
                    onChange={(e) => setAnnuityInsurance(Number(e.target.value))}
                    className="range range-secondary range-xs"
                  />
                </div>

                {/* Funds & Mortgage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-base-content/85">
                      กองทุนสำรองเลี้ยงชีพ / RMF / SSF
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="5000"
                      value={providentFundAndRmf}
                      onChange={(e) => setProvidentFundAndRmf(Number(e.target.value))}
                      className="input input-bordered w-full rounded-xl bg-base-100 text-sm"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-base-content/85">
                      ดอกเบี้ยกู้ยืมเพื่อซื้อบ้าน (สูงสุด 100k)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100000"
                      step="5000"
                      value={homeLoanInterest}
                      onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                      className="input input-bordered w-full rounded-xl bg-base-100 text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Interactive Summary & Tax Ladder (5 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* ภาษีสุทธิและมาตรวัด Card */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                  ประมาณการภาษีที่คุณต้องจ่าย
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary">
                    ฿{formatNumber(taxResult.taxPayable)}
                  </span>
                  <span className="text-sm font-semibold text-base-content/60">บาท/ปี</span>
                </div>
                {taxResult.taxPayable === 0 && (
                  <div className="mt-2 text-xs font-bold text-success flex items-center gap-1.5 bg-success/10 px-3 py-1.5 rounded-xl border border-success/20">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>ยินดีด้วย! เงินได้สุทธิของคุณได้รับการยกเว้นภาษี (0%)</span>
                  </div>
                )}
              </div>

              {/* Key Quick Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/50">
                  <span className="text-[11px] font-semibold text-base-content/60 block">
                    ฐานภาษีสูงสุด
                  </span>
                  <span className="text-lg font-black text-primary">
                    {taxResult.marginalTaxRate}%
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/50">
                  <span className="text-[11px] font-semibold text-base-content/60 block">
                    อัตราภาษีเฉลี่ยจริง
                  </span>
                  <span className="text-lg font-black text-secondary">
                    {taxResult.effectiveTaxRate}%
                  </span>
                </div>
              </div>

              {/* Breakdown Line Items */}
              <div className="space-y-2.5 text-xs text-base-content/80 border-t border-base-300 pt-4">
                <div className="flex justify-between items-center">
                  <span>รายได้รวมทั้งปี:</span>
                  <span className="font-bold text-base-content">
                    ฿{formatNumber(taxResult.annualIncome)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-error">
                  <span>หักค่าใช้จ่ายตามกฎหมาย:</span>
                  <span className="font-bold">- ฿{formatNumber(taxResult.expenses)}</span>
                </div>
                <div className="flex justify-between items-center text-error">
                  <span>หักค่าลดหย่อนรวมทั้งหมด:</span>
                  <span className="font-bold">- ฿{formatNumber(taxResult.totalDeductions)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-base-300/60 pt-2 font-black text-primary text-sm">
                  <span>เงินได้สุทธิคำนวณภาษี:</span>
                  <span>฿{formatNumber(taxResult.netTaxableIncome)}</span>
                </div>
              </div>

              {/* 💡 Tax Saving Opportunity Banner */}
              {taxResult.marginalTaxRate > 0 && taxResult.taxSavingsOpportunity.potentialSavings > 0 && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-secondary/15 via-secondary/10 to-transparent border border-secondary/30 space-y-2">
                  <div className="flex items-center gap-2 text-secondary font-black text-xs sm:text-sm">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>โอกาสประหยัดภาษีเพิ่มจาก Living Wealth 365</span>
                  </div>
                  <p className="text-xs text-base-content/80 leading-relaxed">
                    หากคุณใช้สิทธิประกันชีวิต/บำนาญที่ยังเหลืออยู่เต็มเพดาน คุณจะได้รับเงินคืนภาษีเพิ่มอีกสูงสุดถึง{' '}
                    <strong className="text-secondary font-black text-sm">
                      ฿{formatNumber(taxResult.taxSavingsOpportunity.potentialSavings)} บาท
                    </strong>
                  </p>
                </div>
              )}

              {/* CTA Consultation Button */}
              <button
                type="button"
                onClick={() => setShowConsultModal(true)}
                className="btn btn-primary w-full rounded-2xl font-black text-white shadow-md gap-2"
              >
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
      </section>

      {/* 🤝 3. Consultation Lead Capture Modal */}
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
