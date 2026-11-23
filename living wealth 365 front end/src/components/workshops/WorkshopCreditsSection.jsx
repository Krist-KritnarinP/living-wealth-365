import { Building2, Users, Award } from 'lucide-react';

/**
 * Reusable Corporate & Individual Credits section for Workshops
 */
export default function WorkshopCreditsSection({
  eyebrow = 'องค์กรและผู้เคยเข้าร่วมโครงการ',
  heading = 'เครดิตองค์กร ทีมงาน และกลุ่มผู้เข้าร่วม',
  subtitle = 'ตัวอย่างองค์กรและกลุ่มผู้เข้าร่วมที่ไว้วางใจออกแบบกิจกรรมร่วมกับ Admin A & Admin B',
  credits = [],
}) {
  const safeCredits = Array.isArray(credits) ? credits : [];
  if (safeCredits.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-secondary">
              <Award className="w-4 h-4 shrink-0" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary leading-tight">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              {subtitle}
            </p>
          </div>
          <span className="badge badge-outline border-base-300 text-xs font-semibold px-3 py-1.5 self-start md:self-auto">
            {safeCredits.length} องค์กรและกลุ่มผู้เข้าร่วม
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {safeCredits.map((credit, idx) => (
            <div
              key={`${credit.name}-${idx}`}
              className="rounded-2xl bg-base-200/45 border border-base-300/60 p-5 flex flex-col justify-between gap-3 hover:border-primary/30 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  {credit.participants && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-secondary/15 text-primary shrink-0">
                      <Users className="w-3.5 h-3.5 text-secondary" />
                      {credit.participants}
                    </span>
                  )}
                </div>

                <h3 className="font-black text-base sm:text-lg text-primary leading-snug">
                  {credit.name}
                </h3>

                {credit.orgType && (
                  <p className="text-xs font-bold text-secondary">
                    {credit.orgType}
                  </p>
                )}
              </div>

              {credit.note && (
                <p className="text-sm text-base-content/75 leading-relaxed pt-2 border-t border-base-300/50">
                  {credit.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
