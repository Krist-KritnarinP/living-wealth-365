import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  DollarSign,
  Users,
  Sparkles,
  X,
  FileText,
} from 'lucide-react';

export default function PlanCard({ plan, onSelectPlan }) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Parse features (JSON array or newline string)
  const featuresList = (() => {
    if (!plan.features) return [];
    try {
      const parsed = JSON.parse(plan.features);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Not JSON, split by newline
    }
    return plan.features.split('\n').filter(Boolean);
  })();

  return (
    <>
      <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 hover:border-primary/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
        {/* Subtle decorative accent */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors"></div>

        <div className="space-y-5">
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-2">
            <span className="badge badge-primary badge-outline text-xs font-bold py-1 px-3">
              {plan.categoryName || 'แผนประกัน'}
            </span>
            {plan.startingPrice && (
              <span className="text-xs font-black text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                {plan.startingPrice}
              </span>
            )}
          </div>

          {/* Plan Title & Tagline */}
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-primary group-hover:text-primary transition-colors leading-snug">
              {plan.name}
            </h3>
            {plan.tagline && (
              <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed line-clamp-2">
                {plan.tagline}
              </p>
            )}
          </div>

          {/* Coverage Amount Box */}
          {plan.coverageAmount && (
            <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/60">
              <span className="text-[11px] font-semibold text-base-content/60 block">
                วงเงินความคุ้มครอง:
              </span>
              <span className="text-base sm:text-lg font-black text-primary">
                {plan.coverageAmount}
              </span>
            </div>
          )}

          {/* Key Features List */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-base-content/80 block">
              สิทธิประโยชน์และจุดเด่นหลัก:
            </span>
            <ul className="space-y-1.5 text-xs text-base-content/80">
              {featuresList.slice(0, 4).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended for */}
          {plan.recommendedFor && (
            <div className="flex items-center gap-1.5 text-xs text-base-content/60 pt-2 border-t border-base-300/40">
              <Users className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="line-clamp-1">เหมาะสำหรับ: {plan.recommendedFor}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 mt-4 border-t border-base-300/60 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setShowDetailModal(true)}
            className="btn btn-outline btn-sm rounded-xl font-bold gap-1 text-xs"
          >
            <Info className="w-3.5 h-3.5" />
            <span>ดูรายละเอียด</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectPlan && onSelectPlan(plan)}
            className="btn btn-primary btn-sm rounded-xl font-bold gap-1 shadow-sm text-xs text-white"
          >
            <span>ขอใบเสนอราคา</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Plan Details Comparison Modal */}
      {showDetailModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal modal-open z-50 animate-fadeIn"
        >
          <div className="modal-box rounded-3xl zen-surface border border-base-300 shadow-2xl max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-base-300 pb-4">
              <div>
                <span className="badge badge-primary text-xs font-bold mb-1">
                  {plan.categoryName}
                </span>
                <h3 className="text-2xl font-black text-primary leading-tight">
                  {plan.name}
                </h3>
                {plan.tagline && (
                  <p className="text-sm text-base-content/70 mt-1">{plan.tagline}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="btn btn-circle btn-ghost btn-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <span className="text-xs font-semibold text-primary block">
                  วงเงินคุ้มครองสูงสุด
                </span>
                <span className="text-lg font-black text-primary">
                  {plan.coverageAmount || 'ตามเงื่อนไขกรมธรรม์'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary/25">
                <span className="text-xs font-semibold text-secondary block">
                  ประมาณการเบี้ยประกัน
                </span>
                <span className="text-lg font-black text-secondary">
                  {plan.startingPrice || 'ติดต่อเจ้าหน้าที่'}
                </span>
              </div>
            </div>

            {/* Features Detail */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                จุดเด่นและความคุ้มครองทั้งหมด:
              </h4>
              <ul className="space-y-2 text-sm text-base-content/85 bg-base-200/50 p-4 rounded-2xl border border-base-300/50">
                {featuresList.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-depth Description */}
            {plan.description && (
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" />
                  คำอธิบายแผนประกัน:
                </h4>
                <p className="text-sm text-base-content/75 leading-relaxed bg-base-100 p-4 rounded-2xl border border-base-300/40">
                  {plan.description}
                </p>
              </div>
            )}

            {plan.recommendedFor && (
              <div className="text-xs text-base-content/70 flex items-center gap-2 p-3 bg-base-200/40 rounded-xl">
                <Users className="w-4 h-4 text-secondary shrink-0" />
                <span>กลุ่มผู้เอาประกันที่เหมาะสม: {plan.recommendedFor}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="modal-action pt-4 border-t border-base-300 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="btn btn-ghost rounded-xl font-bold"
              >
                ปิดหน้าต่าง
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDetailModal(false);
                  if (onSelectPlan) onSelectPlan(plan);
                }}
                className="btn btn-primary rounded-xl font-bold gap-2 text-white shadow-md"
              >
                <span>เลือกแผนนี้ & ขอใบเสนอราคา</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/50 backdrop-blur-xs"
            onClick={() => setShowDetailModal(false)}
          />
        </div>
      )}
    </>
  );
}
