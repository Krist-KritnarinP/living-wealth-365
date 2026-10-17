import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Coins,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Sparkles,
  PieChart,
  FileCheck2,
  HeartHandshake,
  Building2,
  Umbrella,
  Landmark,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import PlanCard from '../../components/insurance/PlanCard';
import TaxCalculator from '../../components/tax/TaxCalculator';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function WealthPage() {
  const location = useLocation();
  const { posts, insurancePlans } = useAuth();

  // Query parameter tab support (?tab=calculator or ?tab=protection or ?tab=architecture)
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'protection';
  const [activeTab, setActiveTab] = useState(initialTab === 'calculator' ? 'calculator' : 'protection');

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState(null);

  useEffect(() => {
    const tabParam = new URLSearchParams(location.search).get('tab');
    if (tabParam === 'calculator') {
      setActiveTab('calculator');
    } else if (tabParam === 'protection') {
      setActiveTab('protection');
    } else if (tabParam === 'architecture') {
      setActiveTab('architecture');
    }
  }, [location.search]);

  // Filter plans
  const filteredPlans = insurancePlans.filter((plan) => {
    if (categoryFilter === 'ALL') return true;
    if (categoryFilter === 'HEALTH') return plan.category === 'HEALTH';
    if (categoryFilter === 'CRITICAL_ILLNESS') return plan.category === 'CRITICAL_ILLNESS';
    if (categoryFilter === 'RETIREMENT') return plan.category === 'RETIREMENT';
    if (categoryFilter === 'TAX') return plan.category === 'TAX';
    if (categoryFilter === 'NON_LIFE') return plan.type === 'NON_LIFE';
    return true;
  });

  const wealthPosts = posts.filter((p) => p.pillar === 'WEALTH' || p.category?.includes('การเงิน') || p.category?.includes('ภาษี'));

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Coins className="w-4 h-4" />
              <span>PILLAR 2: WEALTH ARCHITECTURE • สถาปัตยกรรมการเงิน</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              สร้างรากฐานความมั่งคั่ง <br />
              <span className="text-secondary">ปกป้อง เติบโต และส่งต่อ</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              การเงินที่ดีไม่ใช่การเสี่ยงเพื่อผลตอบแทนระยะสั้น แต่คือการสร้างสถาปัตยกรรมที่มั่นคง:
              คุ้มครองความเสี่ยงด้วยประกันสุขภาพเหมาจ่าย วางแผนภาษีบุคคลธรรมดาเชิงรุก
              และสร้างบำนาญตลอดชีพให้คุณใช้ชีวิตได้อย่างไร้กังวล
            </p>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('protection')}
                className={`btn btn-md rounded-2xl font-bold px-5 gap-2 transition-all ${
                  activeTab === 'protection'
                    ? 'btn-primary shadow-xs'
                    : 'btn-outline border-base-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>แผนความคุ้มครอง & ประกัน</span>
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className={`btn btn-md rounded-2xl font-bold px-5 gap-2 transition-all ${
                  activeTab === 'calculator'
                    ? 'btn-secondary text-white shadow-xs'
                    : 'btn-outline border-base-300'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>เครื่องคำนวณภาษี 2568</span>
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`btn btn-md rounded-2xl font-bold px-5 gap-2 transition-all ${
                  activeTab === 'architecture'
                    ? 'btn-primary shadow-xs'
                    : 'btn-outline border-base-300'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>สถาปัตยกรรม 4 เสาหลัก</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TAB CONTENT */}
      {/* --- TAB A: PROTECTION & SOLUTIONS --- */}
      {activeTab === 'protection' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 animate-fadeIn">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-base-300/60">
            <div>
              <h2 className="text-2xl font-black text-primary">
                โซลูชันการปกป้องและความคุ้มครอง (Protection Solutions)
              </h2>
              <p className="text-sm zen-muted mt-0.5">
                คัดสรรแผนประกันชีวิต สุขภาพ โรคร้ายแรง บำนาญ และวินาศภัยที่ตอบโจทย์ชีวิตจริง
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-base-200/80 border border-base-300/40">
              {[
                { id: 'ALL', label: 'ทั้งหมด' },
                { id: 'HEALTH', label: 'สุขภาพเหมาจ่าย' },
                { id: 'CRITICAL_ILLNESS', label: 'โรคร้ายแรง' },
                { id: 'RETIREMENT', label: 'เกษียณ & บำนาญ' },
                { id: 'TAX', label: 'มรดก & ภาษี' },
                { id: 'NON_LIFE', label: 'วินาศภัย' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    categoryFilter === tab.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-base-content/75 hover:bg-base-100 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id || plan.slug}
                plan={plan}
                onSelectPlan={(p) => setSelectedPlanForModal(p)}
              />
            ))}
          </div>
        </section>
      )}

      {/* --- TAB B: EMBEDDED TAX CALCULATOR --- */}
      {activeTab === 'calculator' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 animate-fadeIn">
          <TaxCalculator hideHeader={false} />
        </section>
      )}

      {/* --- TAB C: 4 PILLARS OF WEALTH ARCHITECTURE --- */}
      {activeTab === 'architecture' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              สถาปัตยกรรมการเงิน 4 เสาหลัก (Financial Architecture)
            </h2>
            <p className="text-sm sm:text-base zen-muted">
              สร้างความมั่นคงที่แท้จริง ไม่ให้พายุเศรษฐกิจหรือปัญหาสุขภาพมาสั่นคลอนครอบครัวของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center">
                <Umbrella className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary">1. การปกป้องความเสี่ยง</h3>
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                เกราะป้องกันแรก โอนย้ายค่ารักษาพยาบาลหลักล้าน และคุ้มครองรายได้ของครอบครัวด้วยประกันสุขภาพเหมาจ่ายและโรคร้ายแรง
              </p>
            </div>

            <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-warning/15 text-warning flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary">2. สภาพคล่องฉุกเฉิน</h3>
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                สำรองเงินสด 6-12 เดือนของค่าใช้จ่ายในสินทรัพย์ความเสี่ยงต่ำ เพื่อความอุ่นใจเมื่อเกิดเหตุไม่คาดคิด
              </p>
            </div>

            <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-success/15 text-success flex items-center justify-center">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary">3. การสะสม & เติบโต</h3>
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                กระจายการลงทุนระยะยาวในสินทรัพย์คุณภาพ พร้อมบริหารสิทธิประโยชน์ภาษีผ่าน Thai ESG และประกันบำนาญ
              </p>
            </div>

            <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary">4. การส่งต่อมรดก</h3>
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                วางแผนส่งต่อสินทรัพย์สู่ทายาทโดยไร้รอยต่อ ปลอดข้อพิพาท และได้รับสิทธิประโยชน์ทางภาษีมรดกสูงสุด
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. CURATED WEALTH ARTICLES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              บทวิเคราะห์และการวางแผนการเงิน
            </h2>
            <p className="text-sm zen-muted mt-1">
              เจาะลึกกลยุทธ์ภาษี การคุ้มครอง และความมั่งคั่งระยะยาว
            </p>
          </div>
          <Link
            to={ROUTES.JOURNAL}
            className="btn btn-ghost btn-sm rounded-xl font-bold gap-1 self-start sm:self-auto text-secondary hover:text-primary"
          >
            <span>ดูบทความทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wealthPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id || post.slug}
              to={`/journal/${post.slug}`}
              className="p-5 rounded-3xl zen-surface border border-base-300/60 shadow-xs flex flex-col justify-between group hover:border-secondary transition-all"
            >
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-base-200">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="badge badge-sm badge-primary font-bold">
                    {post.category || 'การวางแผนภาษี'}
                  </span>
                  <span className="zen-muted">• {post.readTime || '6 นาที'}</span>
                </div>
                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/75 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-base-300/40 flex items-center justify-between text-xs font-semibold text-secondary">
                <span>โดย {post.authorName || post.author}</span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  อ่านต่อ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. PLAN SELECTION MODAL */}
      {selectedPlanForModal && (
        <div className="modal modal-open z-50">
          <div className="modal-box rounded-3xl zen-surface border border-base-300 max-w-lg p-6 sm:p-8">
            <h3 className="font-black text-xl text-primary">
              สนใจปรึกษาแผน {selectedPlanForModal.name}
            </h3>
            <p className="py-2 text-sm text-base-content/80">
              กรอกข้อมูลเพื่อให้ Admin A & Admin B หรือทีมที่ปรึกษาติดต่อกลับเพื่อวางแผนเฉพาะบุคคล (ฟรี ไม่มีข้อผูกมัด)
            </p>

            <div className="mt-4">
              <LeadCaptureForm
                defaultInterest={selectedPlanForModal.name}
                onSuccess={() => setSelectedPlanForModal(null)}
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedPlanForModal(null)}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setSelectedPlanForModal(null)}></div>
        </div>
      )}
    </div>
  );
}
