import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Users,
  FileText,
  Download,
} from 'lucide-react';
import { resolveAssetUrl } from '../../api';

export default function PlanCard({ plan, onSelectPlan }) {
  const detailPath = `/wealth/plan/${plan.slug || plan.id}`;

  const featuresList = (() => {
    if (!plan.features) return [];
    try {
      const parsed = JSON.parse(plan.features);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Not JSON, split by newline
    }
    return String(plan.features).split('\n').filter(Boolean);
  })();

  return (
    <div className="zen-surface rounded-3xl p-6 sm:p-7 border border-base-300 hover:border-primary/50 shadow-xs hover:shadow-xl transition-[border-color,box-shadow] duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Clickable Cover Image */}
      {plan.imageUrl && (
        <Link
          to={detailPath}
          className="block aspect-16/9 -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-5 overflow-hidden bg-base-200 border-b border-base-300/60 relative"
        >
          <img
            src={resolveAssetUrl(plan.imageUrl)}
            alt={plan.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
          {plan.brochureUrl && (
            <div className="absolute bottom-3 right-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-primary shadow-xs text-xs font-bold">
                <FileText className="w-3.5 h-3.5 text-secondary" />
                <span>PDF</span>
              </span>
            </div>
          )}
        </Link>
      )}

      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="badge badge-primary badge-outline text-xs font-bold py-1 px-3">
            {plan.categoryName || 'แผนประกัน AIA'}
          </span>
          {plan.startingPrice && (
            <span className="text-xs font-black text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
              {plan.startingPrice}
            </span>
          )}
        </div>

        {/* Plan Title & Tagline */}
        <div className="space-y-1.5">
          <Link to={detailPath} className="block">
            <h3 className="text-xl sm:text-2xl font-black text-primary group-hover:text-secondary transition-colors leading-snug">
              {plan.name}
            </h3>
          </Link>
          {plan.tagline && (
            <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed line-clamp-2">
              {plan.tagline}
            </p>
          )}
        </div>

        {/* Coverage Amount Box */}
        {plan.coverageAmount && (
          <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/60">
            <span className="text-[11px] font-semibold text-base-content/65 block">
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
            จุดเด่นสำคัญ:
          </span>
          <ul className="space-y-1.5 text-xs text-base-content/80">
            {featuresList.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended for */}
        {plan.recommendedFor && (
          <div className="flex items-center gap-1.5 text-xs text-base-content/65 pt-2 border-t border-base-300/40">
            <Users className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="line-clamp-1">เหมาะสำหรับ: {plan.recommendedFor}</span>
          </div>
        )}
      </div>

      {/* Action Buttons & Brochure Download */}
      <div className="pt-5 mt-4 border-t border-base-300/60 space-y-2.5">
        {plan.brochureUrl && (
          <a
            href={resolveAssetUrl(plan.brochureUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-primary btn-sm w-full rounded-xl font-bold gap-1.5 text-xs shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ดาวน์โหลดโบรชัวร์ AIA (PDF)</span>
            <Download className="w-3.5 h-3.5 ml-auto opacity-70" />
          </a>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            to={detailPath}
            className="btn btn-outline btn-sm rounded-xl font-bold gap-1 text-xs"
          >
            <span>ดูรายละเอียด</span>
          </Link>
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
    </div>
  );
}
