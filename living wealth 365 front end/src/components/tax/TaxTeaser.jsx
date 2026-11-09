import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Coins,
  Percent,
} from 'lucide-react';
import { calculatePersonalTax } from '../../utils/taxCalculator';
import { ROUTES } from '../../constants/routes';

export default function TaxTeaser() {
  // Monthly salary preset or custom
  const [monthlySalary, setMonthlySalary] = useState(50000);
  const [bonusMonths, setBonusMonths] = useState(2);

  // Quick preset options
  const salaryPresets = [35000, 50000, 75000, 100000, 150000];

  // Real-time calculation without extra deductions (baseline vs potential)
  const taxResult = useMemo(() => {
    const annualIncome = monthlySalary * 12 + monthlySalary * bonusMonths;
    // Calculate baseline with default standard deductions (self 60k + standard expenses 100k + social security 9k)
    return calculatePersonalTax({
      annualIncome,
      socialSecurity: 9000,
      lifeInsurance: 0,
      annuityInsurance: 0,
      providentFundAndRmf: 0,
    });
  }, [monthlySalary, bonusMonths]);

  // Format currency helper
  const fmt = (num) => (Math.round(num) || 0).toLocaleString('th-TH');

  return (
    <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-xs">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Context & Interactive Input */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Calculator className="w-4 h-4" />
              <span>TAX PLANNING ENGINE • โปรแกรมจำลองภาษี 2568</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
              รู้ฐานภาษีของคุณใน 10 วินาที <br />
              <span className="text-secondary">เปลี่ยนภาษีจ่ายทิ้ง เป็นเงินออมและความคุ้มครอง</span>
            </h2>

            <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
              ภาษีเงินได้บุคคลธรรมดาเป็นแบบขั้นบันได (0% - 35%) ยิ่งมีรายได้สูง อัตราภาษียิ่งเพิ่มขึ้น
              ทดลองเลือกระดับเงินเดือนเพื่อดูฐานภาษีและโอกาสประหยัดภาษีของคุณได้ทันที
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="space-y-4 p-5 rounded-2xl bg-base-200/50 border border-base-300/40">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-primary">
                  เงินเดือนเฉลี่ย (บาท/เดือน):
                </label>
                <span className="text-base font-black text-primary">
                  ฿{fmt(monthlySalary)} <span className="text-xs font-normal text-base-content/60">/เดือน</span>
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="20000"
                max="250000"
                step="5000"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="range range-secondary range-sm w-full"
                aria-label="เลือกเงินเดือนเฉลี่ย"
              />

              {/* Preset Quick Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-2.5">
                {salaryPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonthlySalary(preset)}
                    className={`btn btn-xs rounded-xl transition-all ${
                      monthlySalary === preset
                        ? 'btn-secondary text-white font-bold'
                        : 'btn-ghost text-base-content/70'
                    }`}
                  >
                    ฿{preset >= 100000 ? `${preset / 1000}k` : `${preset / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Bonus Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-base-300/40 text-xs">
              <span className="font-semibold text-base-content/80">
                โบนัสประมาณการ (เดือน):
              </span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setBonusMonths(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      bonusMonths === m
                        ? 'bg-primary text-white'
                        : 'bg-base-100 text-base-content/70 hover:bg-base-300/50'
                    }`}
                  >
                    {m} เดือน
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Tax Calculation Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-base-100/90 border border-base-300/80 shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-base-300/60">
              <span className="text-xs font-bold text-base-content/70 uppercase tracking-wider">
                ผลการวิเคราะห์ภาษีเบื้องต้น
              </span>
              <span className="badge badge-sm badge-outline font-semibold">
                ปีภาษี 2568
              </span>
            </div>

            {/* Metric 1: Marginal Tax Rate */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-base-content/70 block">ฐานภาษีสูงสุดของคุณ</span>
                <span className="text-xs text-base-content/50">Marginal Tax Bracket</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-secondary">
                  {taxResult.marginalTaxRate}%
                </span>
              </div>
            </div>

            {/* Metric 2: Estimated Tax Payable */}
            <div className="flex items-center justify-between pt-2 border-t border-base-300/40">
              <div>
                <span className="text-xs text-base-content/70 block">ภาษีประมาณการ (ก่อนวางแผน)</span>
                <span className="text-xs text-base-content/50">Estimated Annual Tax</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-primary">
                  ฿{fmt(taxResult.taxPayable)}
                </span>
                <span className="text-[11px] text-base-content/60 block">
                  ({taxResult.effectiveTaxRate}% ของรายได้)
                </span>
              </div>
            </div>

            {/* Metric 3: Tax Savings Opportunity with AIA */}
            <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-1">
              <div className="flex items-center gap-1.5 text-secondary text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>โอกาสประหยัดภาษีคืนสูงสุด</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-secondary">
                  ฿{fmt(taxResult.taxSavingsOpportunity?.potentialSavings || 0)}
                </span>
                <span className="text-xs text-secondary/80 font-medium">
                  ต่อปี
                </span>
              </div>
              <p className="text-[11px] text-base-content/70 leading-relaxed pt-1">
                หากใช้สิทธิลดหย่อนประกันชีวิต สุขภาพ และบำนาญ AIA ครบสิทธิ
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <Link
                to={ROUTES.TAX}
                className="btn btn-secondary btn-md w-full rounded-2xl font-bold gap-2 text-white shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>เปิดเครื่องคำนวณภาษีฉบับเต็ม</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#talk-form"
                className="btn btn-ghost btn-sm w-full rounded-xl text-xs font-semibold text-base-content/70 hover:text-primary"
              >
                ปรึกษาการจัดพอร์ตลดหย่อนภาษีกับเรา (ไม่มีค่าใช้จ่าย)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
