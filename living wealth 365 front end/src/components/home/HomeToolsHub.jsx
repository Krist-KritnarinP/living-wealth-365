import { useState } from 'react';
import { Compass, Calculator, ShieldCheck } from 'lucide-react';
import LifeMapTeaser from '../common/LifeMapTeaser';
import TaxTeaser from '../tax/TaxTeaser';
import InsurancePlanFinder from '../insurance/InsurancePlanFinder';

const TOOL_TABS = [
  {
    id: 'lifemap',
    label: 'Life Map 6 มิติ',
    shortDesc: 'ประเมินสมดุลชีวิตทั้ง 6 ด้าน',
    icon: Compass,
  },
  {
    id: 'tax',
    label: 'คำนวณภาษี 2568',
    shortDesc: 'ประเมินฐานภาษีและสิทธิลดหย่อนเบื้องต้น',
    icon: Calculator,
  },
  {
    id: 'finder',
    label: 'ค้นหาแผนประกัน AIA',
    shortDesc: 'แตะเลือกเพื่อดูแผนที่เหมาะกับงบ',
    icon: ShieldCheck,
  },
];

export default function HomeToolsHub({ plans = [], onRequestQuote }) {
  const [activeTool, setActiveTool] = useState('lifemap');

  return (
    <section
      id="lifemap"
      className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24 space-y-6"
    >
      {/* Header + Semantic Tab Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary block">
            เครื่องมือประเมินและวางแผนเบื้องต้น
          </span>
          <h2 className="editorial-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
            เครื่องมือช่วยวางแผนชีวิตและการเงิน
          </h2>
          <p className="text-sm sm:text-base text-base-content/75">
            เลือกเครื่องมือที่ต้องการเพื่อประเมินสมดุลชีวิต คำนวณภาษี หรือค้นหาแผนประกันที่เหมาะสม
          </p>
        </div>

        <div
          role="tablist"
          aria-label="เลือกเครื่องมือวางแผน"
          className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-base-200/75 border border-base-300/60 self-start lg:self-auto"
        >
          {TOOL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTool === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tool-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tool-panel-${tab.id}`}
                onClick={() => setActiveTool(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-xs'
                    : 'text-base-content/80 hover:text-primary hover:bg-base-100/70'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tool Panel */}
      <div
        role="tabpanel"
        id={`tool-panel-${activeTool}`}
        aria-labelledby={`tool-tab-${activeTool}`}
      >
        {activeTool === 'lifemap' && <LifeMapTeaser standalone={false} />}
        {activeTool === 'tax' && <TaxTeaser />}
        {activeTool === 'finder' && (
          <InsurancePlanFinder plans={plans} onRequestQuote={onRequestQuote} />
        )}
      </div>
    </section>
  );
}
