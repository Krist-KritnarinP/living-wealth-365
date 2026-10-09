import { useState } from 'react';
import { ShieldCheck, Award, Filter, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PlanCard from '../../components/insurance/PlanCard';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function LifeInsurancePage() {
  const { insurancePlans } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Filter plans by type: LIFE
  const lifePlans = insurancePlans.filter((p) => p.type === 'LIFE');

  const categories = [
    { id: 'ALL', label: 'ทั้งหมด' },
    { id: 'HEALTH', label: 'ประกันสุขภาพเหมาจ่าย' },
    { id: 'CRITICAL_ILLNESS', label: 'คุ้มครองโรคร้ายแรง' },
    { id: 'RETIREMENT', label: 'วางแผนเกษียณ & บำนาญ' },
    { id: 'TAX', label: 'วางแผนมรดก & ภาษี' },
  ];

  const filteredPlans = lifePlans.filter((plan) => {
    if (selectedCategory === 'ALL') return true;
    return plan.category === selectedCategory;
  });

  const handleSelectPlan = (plan) => {
    setSelectedPlan({
      id: plan.id,
      name: `${plan.name} (${plan.coverageAmount || 'คุ้มครองมาตรฐาน'})`,
      price: plan.startingPrice,
    });
    const formEl = document.getElementById('consult-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>AIA LIFE, HEALTH & WEALTH ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
            ประกันชีวิต สุขภาพเหมาจ่าย & วางแผนเกษียณ
          </h1>
          <p className="text-base sm:text-lg text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            เลือกเปรียบเทียบแผนความคุ้มครองที่ออกแบบให้เหมาะสมกับช่วงวัยและเป้าหมายทางการเงินของคุณ
            เพื่อให้คุณและครอบครัวใช้ชีวิตได้อย่างมั่นใจในทุกย่างก้าว
          </p>
        </div>
      </section>

      {/* Plans Comparison Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-base-300 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Compare & Select Your Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-primary mt-1">
              แผนความคุ้มครอง AIA ที่คัดสรรสำหรับคุณ ({filteredPlans.length})
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              คลิกเพื่อดูเงื่อนไขเปรียบเทียบ หรือกดขอใบเสนอราคาแผนที่สนใจเพื่อให้เจ้าหน้าที่คำนวณเบี้ยประกันจริง
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-base-content/60 hidden sm:inline" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-xs sm:btn-sm rounded-xl font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'btn-primary text-white shadow-xs'
                    : 'btn-ghost text-base-content/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="consult-form" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LeadCaptureForm
          selection={selectedPlan}
          defaultInterest={selectedPlan ? selectedPlan.name : 'ประกันสุขภาพเหมาจ่าย AIA'}
          title="ขอคำปรึกษา & ประเมินเบี้ยประกันภัยเฉพาะบุคคล"
          subtitle="แจ้งแผนที่สนใจและช่วงเวลาที่สะดวกรับสาย ที่ปรึกษาจะติดต่อกลับพร้อมตารางความคุ้มครองอย่างละเอียด"
        />
      </section>
    </div>
  );
}
