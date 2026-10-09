import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PILLARS } from '../constants/content';

export default function PillarsSection({ selectedIndex, onSelectPillar }) {
  return (
    <section id="services" className="w-full space-y-6 sm:space-y-8">
      <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-3">
        <div>
          <span className="badge badge-secondary font-bold text-xs sm:text-sm mb-2 px-3 py-1">
            TAILORED SOLUTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary">
            3 เสาหลักเพื่อความมั่นคงทางการเงิน
          </h2>
        </div>
        <p className="zen-muted text-sm sm:text-base font-medium max-w-xl">
          เลือกหัวข้อที่ตรงกับเป้าหมายชีวิตของคุณในปัจจุบัน (คลิกเพื่อดูรายละเอียด)
        </p>
      </div>

      {/* Cards Grid across 100% width */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isSelected = selectedIndex === idx;

          return (
            <div
              key={pillar.id}
              onClick={() => onSelectPillar(idx)}
              className={`card zen-surface p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                isSelected
                  ? 'ring-2 ring-primary border-primary shadow-md'
                  : 'border-base-300/60 hover:border-primary/50 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-base-200 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="badge badge-outline text-xs font-bold text-primary px-2.5 py-1">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-primary">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm zen-muted font-semibold">
                  {pillar.english}
                </p>
                <p className="zen-muted leading-relaxed text-sm sm:text-base font-normal">
                  {pillar.desc}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-3 border-t border-base-200">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-base-200 flex items-center justify-between">
                <span className="text-xs font-bold zen-muted">
                  LIVING WEALTH 365
                </span>
                <span className="font-bold text-xs sm:text-sm text-secondary flex items-center gap-1.5">
                  <span>{isSelected ? 'เลือกอยู่' : 'คลิกเลือกแผนนี้'}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
