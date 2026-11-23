import { Clock, Users, MapPin, UserCheck, Building2, CheckCircle2, AlertCircle, Compass } from 'lucide-react';
import FramedImage from '../../common/FramedImage';

/**
 * Audience-faithful Live Preview of a Workshop inside Admin CMS modal
 */
export default function WorkshopLivePreview({ data }) {
  const audiences = Array.isArray(data.audiences) ? data.audiences : [];
  const painPoints = Array.isArray(data.painPoints) ? data.painPoints : [];
  const whatAndHow = Array.isArray(data.whatAndHow) ? data.whatAndHow : [];
  const outcomes = Array.isArray(data.outcomes) ? data.outcomes : [];
  const credits = Array.isArray(data.credits) ? data.credits : [];

  return (
    <div className="space-y-6 bg-base-100 rounded-3xl border border-base-300/60 p-5 sm:p-6">
      <div className="text-xs font-bold uppercase tracking-wider text-secondary">
        ตัวอย่างการแสดงผลหน้าเว็บจริง (Live Preview)
      </div>

      {/* Hero Preview */}
      <div className="rounded-2xl border border-base-300/60 overflow-hidden bg-base-200/30">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 h-48 md:h-auto relative">
            <FramedImage
              src={data.imageUrl}
              alt={data.title || 'Workshop preview'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-7 p-5 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              <span className="badge badge-primary text-xs font-bold">
                {data.trackLabel || data.track}
              </span>
              {audiences.includes('CORPORATE') && (
                <span className="badge badge-outline text-xs">องค์กร</span>
              )}
              {audiences.includes('SMALL_GROUP') && (
                <span className="badge badge-outline text-xs">กลุ่มเล็ก</span>
              )}
            </div>
            <h3 className="text-xl font-black text-primary">
              {data.title || 'ชื่อหลักสูตรเวิร์กชอป'}
            </h3>
            <p className="text-sm text-base-content/80">
              {data.subtitle || 'คำอธิบายสั้นๆ ของหลักสูตร'}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-base-content/75 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                {data.duration || '-'}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-secondary shrink-0" />
                {data.groupSize || '-'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                {data.format || '-'}
              </span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-secondary shrink-0" />
                {data.facilitator || 'Admin A & Admin B'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Stage Journey Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
        <div className="p-4 rounded-2xl border border-error/25 bg-error/5 space-y-2">
          <div className="font-black text-error flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Pain Point ({painPoints.length})</span>
          </div>
          <ul className="space-y-1.5 text-base-content/80">
            {painPoints.slice(0, 3).map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl border border-primary/25 bg-primary/5 space-y-2">
          <div className="font-black text-primary flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            <span>ทำอะไร &amp; ยังไง ({whatAndHow.length})</span>
          </div>
          <ul className="space-y-1.5 text-base-content/80">
            {whatAndHow.slice(0, 3).map((w, i) => (
              <li key={i}>
                <strong>{w.title}:</strong> {w.detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl border border-success/30 bg-success/5 space-y-2">
          <div className="font-black text-success flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>ผลลัพธ์ที่ได้ ({outcomes.length})</span>
          </div>
          <ul className="space-y-1.5 text-base-content/80">
            {outcomes.slice(0, 3).map((o, i) => (
              <li key={i}>• {o}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Credits Preview */}
      {credits.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-primary flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-secondary" />
            เครดิตองค์กร/ผู้เข้าร่วม ({credits.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {credits.map((c, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-base-200/50 border border-base-300/60 text-xs space-y-0.5"
              >
                <p className="font-bold text-primary">{c.name}</p>
                <p className="text-base-content/70">
                  {[c.orgType, c.participants].filter(Boolean).join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
