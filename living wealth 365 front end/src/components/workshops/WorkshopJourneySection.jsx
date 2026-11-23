import { AlertCircle, Compass, CheckCircle2 } from 'lucide-react';

/**
 * Reusable 3-stage Workshop Journey section:
 * 1. Pain Point (ปัญหาที่พบ)
 * 2. What & How (ทำอะไร & ทำยังไง)
 * 3. Outcomes (ผลลัพธ์ที่ได้)
 */
export default function WorkshopJourneySection({
  eyebrow = 'ภาพรวมกระบวนการเวิร์กชอป',
  heading = 'จากปัญหาจริง สู่วิธีลงมือทำ และผลลัพธ์ที่จับต้องได้',
  painPoints = [],
  whatAndHow = [],
  outcomes = [],
}) {
  const safePainPoints = Array.isArray(painPoints) ? painPoints : [];
  const safeWhatAndHow = Array.isArray(whatAndHow) ? whatAndHow : [];
  const safeOutcomes = Array.isArray(outcomes) ? outcomes : [];

  if (
    safePainPoints.length === 0 &&
    safeWhatAndHow.length === 0 &&
    safeOutcomes.length === 0
  ) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-secondary">
            {eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. PAIN POINTS */}
          <div className="rounded-3xl zen-surface border border-error/25 p-6 sm:p-7 flex flex-col gap-5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-error/10 text-error flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-error/90">
                  01 • Pain Point
                </p>
                <h3 className="text-lg sm:text-xl font-black text-primary">
                  ปัญหาที่มักพบก่อนเข้าเรียน
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-base text-base-content/85 leading-relaxed">
              {safePainPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-error mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. WHAT & HOW */}
          <div className="rounded-3xl zen-surface border border-primary/25 p-6 sm:p-7 flex flex-col gap-5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary/80">
                  02 • What &amp; How
                </p>
                <h3 className="text-lg sm:text-xl font-black text-primary">
                  เราทำอะไร และทำยังไง
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {safeWhatAndHow.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-base-200/50 border border-base-300/60 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-secondary bg-secondary/15 px-2 py-0.5 rounded-lg">
                      {item.step || `0${idx + 1}`}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-primary">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-base-content/80 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. OUTCOMES */}
          <div className="rounded-3xl zen-surface border border-success/30 p-6 sm:p-7 flex flex-col gap-5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-success/15 text-success flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-success">
                  03 • Outcomes
                </p>
                <h3 className="text-lg sm:text-xl font-black text-primary">
                  ผลลัพธ์ที่ได้หลังจบเวิร์กชอป
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-base text-base-content/85 leading-relaxed">
              {safeOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
