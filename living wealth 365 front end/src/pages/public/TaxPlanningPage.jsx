import { Link } from 'react-router-dom';
import {
  Calculator,
  ShieldCheck,
  Coins,
  ArrowRight,
  TrendingDown,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Award,
} from 'lucide-react';
import TaxCalculator from '../../components/tax/TaxCalculator';
import { ROUTES } from '../../constants/routes';

export default function TaxPlanningPage() {
  return (
    <div className="w-full space-y-12 sm:space-y-16 lg:space-y-20 py-6 sm:py-8">
      {/* 🧭 Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-base-content/70">
          <li>
            <Link to={ROUTES.HOME} className="hover:text-primary transition-colors">
              หน้าแรก
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
          <li>
            <Link to={ROUTES.WEALTH} className="hover:text-primary transition-colors">
              สถาปัตยกรรมการเงิน (Wealth)
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
          <li className="font-bold text-primary" aria-current="page">
            วางแผนและคำนวณภาษี 2568
          </li>
        </ol>
      </nav>

      {/* 🌟 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Calculator className="w-4 h-4" />
              <span>PILLAR 2: WEALTH & TAX STRATEGY • การวางแผนภาษี 2568</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-[1.18] tracking-tight">
              AIA Tax Strategy & Planning <br />
              <span className="text-secondary">เปลี่ยนภาษีเป็นเงินออมและความคุ้มครอง</span>
            </h1>

            <p className="text-base sm:text-lg text-base-content/80 leading-relaxed">
              ภาษีเงินได้บุคคลธรรมดาไม่ใช่เพียงสิ่งที่คุณต้องจ่าย แต่คือโอกาสในการจัดระเบียบสถาปัตยกรรมการเงินส่วนบุคคล
              เครื่องคำนวณนี้ช่วยให้คุณเห็นฐานภาษีที่แท้จริง (Marginal Tax Rate)
              พร้อมวางแผนใช้สิทธิลดหย่อนอย่างคุ้มค่าสูงสุดตามเกณฑ์กรมสรรพากร
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-1">
                <span className="text-[11px] font-bold text-secondary uppercase block">ประกันชีวิต/สุขภาพ</span>
                <span className="text-sm sm:text-base font-black text-primary">ลดหย่อน 1 แสน</span>
                <span className="text-[10px] text-base-content/65 block">คุ้มครองชีวิต & สุขภาพ</span>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-1">
                <span className="text-[11px] font-bold text-secondary uppercase block">ประกันบำนาญ (Annuity)</span>
                <span className="text-sm sm:text-base font-black text-primary">ลดหย่อน 2 แสน</span>
                <span className="text-[10px] text-base-content/65 block">กระแสเงินสดหลังเกษียณ</span>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-1">
                <span className="text-[11px] font-bold text-secondary uppercase block">ฐานภาษีขั้นบันได</span>
                <span className="text-sm sm:text-base font-black text-primary">0% ถึง 35%</span>
                <span className="text-[10px] text-base-content/65 block">ตามเกณฑ์ ภ.ง.ด. 90/91</span>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-1">
                <span className="text-[11px] font-bold text-secondary uppercase block">คำปรึกษาส่วนตัว</span>
                <span className="text-sm sm:text-base font-black text-primary">ฟรี ไม่มีข้อผูกมัด</span>
                <span className="text-[10px] text-base-content/65 block">โดย Admin A & Admin B</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧮 2. CORE INTERACTIVE TAX CALCULATOR ENGINE */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <TaxCalculator hideHeader={false} />
      </section>

      {/* 💡 3. GUIDANCE & RELATED WEALTH PLANNING */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="zen-surface p-6 sm:p-8 rounded-3xl border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary">
              สำรวจแผนประกันที่ช่วยลดหย่อนภาษี
            </h3>
            <p className="text-sm text-base-content/75 leading-relaxed">
              เปรียบเทียบแผนประกันสุขภาพเหมาจ่าย โรคร้ายแรงเจอจ่ายหลายรอบ และประกันบำนาญที่ออกแบบมาเพื่อลดหย่อนภาษีสูงสุด
            </p>
            <Link
              to={ROUTES.WEALTH}
              className="btn btn-outline btn-primary btn-sm rounded-xl font-bold gap-2 inline-flex"
            >
              <span>ดูแผนประกันทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="zen-surface p-6 sm:p-8 rounded-3xl border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary">
              ต้องการที่ปรึกษาจัดโครงสร้างภาษีเฉพาะบุคคล?
            </h3>
            <p className="text-sm text-base-content/75 leading-relaxed">
              ไม่ว่าจะเป็นภาษีเงินเดือน ภาษีฟรีแลนซ์ หรือการวางแผน Keyman Protection สำหรับนิติบุคคล เรายินดีร่วมพูดคุยอย่างเป็นกันเอง
            </p>
            <Link
              to="/about#talk"
              className="btn btn-secondary btn-sm rounded-xl font-bold gap-2 text-white inline-flex"
            >
              <span>นัดหมายพูดคุยกับเรา (Let's Talk)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
