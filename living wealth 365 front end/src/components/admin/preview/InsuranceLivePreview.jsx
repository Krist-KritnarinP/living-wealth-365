import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
  Sparkles,
  TrendingUp,
  HeartPulse,
  Clock,
  ArrowRight,
  Download,
} from 'lucide-react';
import FramedImage from '../../common/FramedImage';
import { getPlanInfographic } from '../../../utils/insuranceInfographic';

/**
 * InsuranceLivePreview — Renders an insurance plan exactly as viewers see it on InsurancePlanDetailPage.
 */
export default function InsuranceLivePreview({ plan = {} }) {
  const name = plan.name || 'ชื่อแผนประกัน AIA';
  const tagline = plan.tagline || 'คำโปรยจุดเด่นแผนประกัน...';
  const categoryName = plan.categoryName || 'ประกันชีวิต & สุขภาพ AIA';
  const coverageAmount = plan.coverageAmount || 'ตามเงื่อนไขกรมธรรม์';
  const startingPrice = plan.startingPrice || 'คำนวณตามช่วงอายุ';
  const recommendedFor = plan.recommendedFor || 'ผู้บริหาร, เจ้าของธุรกิจ และครอบครัว';
  const imageUrl = plan.imageUrl || '';
  const brochureUrl = plan.brochureUrl || '';

  const featuresList = (() => {
    if (!plan.features) return ['ความคุ้มครองครบวงจร', 'ดูแลครอบคลุมทั่วโลก', 'ค่ารักษาพยาบาลเหมาจ่าย'];
    try {
      const parsed = JSON.parse(plan.features);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return String(plan.features).split('\n').filter(Boolean);
  })();

  const infographic = getPlanInfographic(plan);

  return (
    <div className="w-full space-y-8 bg-base-100 p-4 sm:p-8 rounded-3xl border border-base-300">
      {/* Mode Callout */}
      <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-black text-primary">
          <Sparkles className="w-4 h-4 text-secondary shrink-0" />
          <span>มุมมองเสมือนจริงของแผนประกัน (Public Audience View)</span>
        </div>
        <span className="badge badge-primary badge-outline text-[11px] font-bold">
          {categoryName}
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Mock */}
        <div className="text-xs text-base-content/60 flex items-center gap-2">
          <span>หน้าหลัก</span>
          <span>/</span>
          <span>สถาปัตยกรรมการเงิน (Wealth)</span>
          <span>/</span>
          <span className="text-primary font-bold truncate max-w-xs">{name}</span>
        </div>

        {/* Hero Banner Showcase */}
        <div className="zen-surface rounded-4xl overflow-hidden border border-base-300/60 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Cover Side */}
            <div className="lg:col-span-5 relative min-h-65 bg-base-200 overflow-hidden">
              {imageUrl ? (
                <FramedImage
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                  fallback="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-base-content/50">
                  ไม่มีรูปภาพปก
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  {categoryName}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md">
                  AIA Authorized
                </span>
              </div>
            </div>

            {/* Copy Side */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-primary font-bold text-xs">
                    {categoryName}
                  </span>
                  <span className="badge badge-outline font-bold text-xs">
                    AIA Thailand
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-primary leading-snug wrap-anywhere">
                  {name}
                </h1>

                {tagline && (
                  <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed wrap-anywhere">
                    {tagline}
                  </p>
                )}
              </div>

              {/* Coverage & Price Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/60">
                  <span className="text-[11px] font-semibold text-base-content/65 block">
                    วงเงินความคุ้มครอง:
                  </span>
                  <span className="text-base font-black text-primary block wrap-break-word">
                    {coverageAmount}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/35">
                  <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 block">
                    เบี้ยเริ่มต้นโดยประมาณ:
                  </span>
                  <span className="text-base font-black text-amber-900 dark:text-amber-300 block wrap-break-word">
                    {startingPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 space-y-4">
          <h3 className="text-lg font-black text-primary flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span>จุดเด่นสำคัญของแผนประกัน</span>
          </h3>

          <ul className="space-y-2.5">
            {featuresList.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span className="flex-1 wrap-break-word leading-relaxed text-base-content/85">
                  {feat}
                </span>
              </li>
            ))}
          </ul>

          {recommendedFor && (
            <div className="pt-3 border-t border-base-300/40 text-xs text-base-content/70">
              <strong>เหมาะสำหรับ:</strong> {recommendedFor}
            </div>
          )}
        </div>

        {/* Brochure Mock Button */}
        {brochureUrl && (
          <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-primary">
              <FileText className="w-4 h-4 text-secondary" />
              <span>เอกสารโบรชัวร์ทางการ AIA (PDF พร้อมดาวน์โหลด)</span>
            </div>
            <span className="btn btn-outline btn-primary btn-xs rounded-xl font-bold gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
