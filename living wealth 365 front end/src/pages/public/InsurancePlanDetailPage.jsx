import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  Users,
  Calendar,
  Landmark,
  Activity,
  HeartPulse,
  TrendingUp,
  Eye,
  EyeOff,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';
import { getPlanInfographic } from '../../utils/insuranceInfographic';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function InsurancePlanDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { insurancePlans } = useAuth();
  const [showInlinePdf, setShowInlinePdf] = useState(false);

  const plan = useMemo(
    () => insurancePlans.find((p) => p.slug === slug || p.id === slug),
    [insurancePlans, slug]
  );

  const featuresList = useMemo(() => {
    if (!plan?.features) return [];
    try {
      const parsed = JSON.parse(plan.features);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // plain newline text
    }
    return String(plan.features).split('\n').filter(Boolean);
  }, [plan]);

  const infographic = useMemo(() => getPlanInfographic(plan), [plan]);

  if (!plan) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-primary">
          ไม่พบข้อมูลแผนประกันที่คุณต้องการ
        </h1>
        <p className="text-sm text-base-content/75 max-w-md mx-auto">
          แผนประกันนี้อาจถูกอัปเดตหรือปรับเปลี่ยนชื่อ ลองกลับไปเลือกชมจากคลังแผนประกัน AIA ทั้งหมดของเราได้เลยครับ
        </p>
        <Link to={ROUTES.WEALTH} className="btn btn-primary rounded-full font-bold gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าแผนประกันทั้งหมด</span>
        </Link>
      </div>
    );
  }

  const scoreBars = [
    {
      label: 'เกราะป้องกันค่ารักษาพยาบาล (Medical Shield)',
      value: infographic?.scores?.medicalShield ?? 70,
      icon: HeartPulse,
      barClass: 'from-sky-500 to-blue-600',
    },
    {
      label: 'คุ้มครองโรคร้ายแรง & รายได้ (Critical Care)',
      value: infographic?.scores?.criticalIllness ?? 60,
      icon: Activity,
      barClass: 'from-rose-500 to-amber-500',
    },
    {
      label: 'ความมั่นคงครอบครัว & ส่งต่อมรดก (Legacy)',
      value: infographic?.scores?.legacyProtection ?? 65,
      icon: Landmark,
      barClass: 'from-indigo-500 to-violet-600',
    },
    {
      label: 'สิทธิลดหย่อนภาษี & มูลค่าการเงิน (Tax & Return)',
      value: infographic?.scores?.wealthTaxReturn ?? 75,
      icon: TrendingUp,
      barClass: 'from-emerald-500 to-teal-600',
    },
  ];

  const resolvedPdfUrl = plan.brochureUrl ? resolveAssetUrl(plan.brochureUrl) : null;

  return (
    <div className="w-full space-y-12 lg:space-y-16 py-6 sm:py-10">
      {/* 1. TOP BREADCRUMB + QUICK ACTIONS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/wealth?tab=protection')}
            className="btn btn-ghost btn-sm rounded-full font-bold gap-2 text-primary hover:bg-primary/10 px-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปหน้าแผนประกัน & หมวดหมู่ทั้งหมด</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {resolvedPdfUrl && (
              <a
                href={resolvedPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-secondary btn-sm rounded-full font-bold gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>เปิดโบรชัวร์ AIA (PDF)</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href="#consult-plan"
              className="btn btn-primary btn-sm rounded-full font-bold gap-1.5 text-white shadow-sm"
            >
              <span>ขอใบเสนอราคาแผนนี้</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. HERO PRESENTATION BANNER WITH RELATABLE COVER PHOTO */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="zen-surface rounded-4xl overflow-hidden border border-base-300/60 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Cover Photo Side */}
            <div className="lg:col-span-5 relative min-h-65 sm:min-h-85 lg:min-h-105 bg-base-200 overflow-hidden">
              {plan.imageUrl && (
                <img
                  src={resolveAssetUrl(plan.imageUrl)}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-900/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-2 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{infographic?.planBadge || plan.categoryName}</span>
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md">
                  {infographic?.entryAge}
                </span>
              </div>
            </div>

            {/* Presentation Copy Side */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-primary font-bold text-xs px-3 py-2.5">
                    {plan.categoryName}
                  </span>
                  <span className="badge badge-outline font-bold text-xs px-3 py-2.5">
                    {plan.type === 'NON_LIFE' ? 'ประกันวินาศภัย' : 'AIA Life & Health'}
                  </span>
                  {infographic?.coverageDuration && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>{infographic.coverageDuration}</span>
                    </span>
                  )}
                </div>

                <h1 className="editorial-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
                  {plan.name}
                </h1>

                {plan.tagline && (
                  <p className="text-base sm:text-lg text-base-content/85 leading-relaxed font-medium">
                    {plan.tagline}
                  </p>
                )}

                {plan.description && (
                  <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Hero Bottom Highlight Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-base-300/60">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <span className="text-xs font-bold text-primary/80 block">
                    วงเงินความคุ้มครองหลัก
                  </span>
                  <span className="text-base sm:text-lg font-black text-primary leading-snug block">
                    {plan.coverageAmount || 'ตามเงื่อนไขกรมธรรม์'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/35">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                    ประมาณการเบี้ยประกันเริ่มต้น
                  </span>
                  <span className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-300 leading-snug block">
                    {plan.startingPrice || 'คำนวณตามช่วงอายุ'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INFOGRAPHIC SECTION A — 4 KEY NUMBERS AT A GLANCE */}
      {infographic && (
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>PLAN OVERVIEW • สรุปจุดเด่นแบบเข้าใจง่ายใน 30 วินาที</span>
              </span>
              <h2 className="editorial-display text-2xl sm:text-3xl font-black text-primary mt-1">
                ตัวเลขสำคัญของแผน {plan.name}
              </h2>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-base-content/70">
              {infographic.keyMechanism}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {infographic.kpis.map((kpi, index) => (
              <div
                key={kpi.label}
                className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs space-y-2 relative overflow-hidden"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block">
                  0{index + 1} • {kpi.label}
                </span>
                <div className="text-xl sm:text-2xl font-black text-primary leading-snug">
                  {kpi.value}
                </div>
                <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                  {kpi.hint}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. INFOGRAPHIC SECTION B — HOW THE PLAN WORKS STEP-BY-STEP */}
      {infographic?.flowSteps && (
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
              HOW IT PROTECTS YOU • กลไกการทำงานของความคุ้มครอง
            </span>
            <h2 className="editorial-display text-2xl sm:text-3xl font-black text-primary">
              ลำดับสิทธิประโยชน์และการดูแลทีละขั้นตอน
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {infographic.flowSteps.map((node, idx) => (
              <div
                key={node.step}
                className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs flex flex-col justify-between space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-2xl bg-primary text-white font-black text-base flex items-center justify-center shadow-sm">
                    {node.step}
                  </span>
                  {idx < infographic.flowSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-secondary hidden lg:block" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-primary leading-snug">
                    {node.title}
                  </h3>
                  <p className="text-sm text-base-content/75 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. INFOGRAPHIC SECTION C — COVERAGE STRUCTURE CHART + COMPLETE FEATURES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Visual Protection Radar/Score Bars + Personas */}
          <div className="lg:col-span-6 zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
                PROTECTION SPECTRUM
              </span>
              <h2 className="editorial-display text-xl sm:text-2xl font-black text-primary">
                สัดส่วนจุดแข็งของแผนใน 4 มิติการเงิน
              </h2>
            </div>

            <div className="space-y-4">
              {scoreBars.map((bar) => {
                const IconComp = bar.icon;
                return (
                  <div key={bar.label} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-primary">
                      <span className="flex items-center gap-2">
                        <IconComp className="w-4 h-4 text-secondary shrink-0" />
                        <span>{bar.label}</span>
                      </span>
                      <span className="font-black text-secondary shrink-0">{bar.value}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-base-200 overflow-hidden border border-base-300/40">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${bar.barClass}`}
                        style={{ width: `${Math.min(100, Math.max(0, bar.value))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {infographic?.personaTags?.length > 0 && (
              <div className="pt-4 border-t border-base-300/60 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Users className="w-4 h-4 text-secondary" />
                  <span>กลุ่มผู้เอาประกันที่เหมาะกับแผนนี้:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {infographic.personaTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {plan.recommendedFor && (
                  <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                    {plan.recommendedFor}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right: Complete Benefits + Official PDF Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <h2 className="editorial-display text-xl sm:text-2xl font-black text-primary">
                  สรุปสิทธิประโยชน์และความคุ้มครองทั้งหมด
                </h2>
              </div>

              <ul className="space-y-3">
                {featuresList.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-base-200/50 border border-base-300/40 text-sm text-base-content/85"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official AIA PDF Card */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-secondary/35 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
                    OFFICIAL AIA BROCHURE (PDF)
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-primary">
                    เอกสารรายละเอียดแผนประกันอย่างเป็นทางการ
                  </h3>
                  <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                    {resolvedPdfUrl
                      ? 'สามารถดาวน์โหลดหรือเปิดอ่านตารางผลประโยชน์และเงื่อนไขฉบับเต็มจากเอไอเอ ประเทศไทย ได้โดยตรง'
                      : 'สอบถาม Admin A เพื่อรับตารางเบี้ยและโบรชัวร์ฉบับอัปเดตล่าสุดเฉพาะช่วงอายุของคุณ'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              {resolvedPdfUrl && (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={resolvedPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-white rounded-full font-bold gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>เปิดอ่าน & ดาวน์โหลดโบรชัวร์ AIA (PDF)</span>
                  </a>
                  {!resolvedPdfUrl.includes('aia.co.th') && (
                    <button
                      type="button"
                      onClick={() => setShowInlinePdf((prev) => !prev)}
                      className="btn btn-outline btn-primary rounded-full font-bold gap-2"
                    >
                      {showInlinePdf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{showInlinePdf ? 'ซ่อนตัวอย่าง PDF' : 'เปิดอ่านตัวอย่างในหน้านี้'}</span>
                    </button>
                  )}
                </div>
              )}

              {resolvedPdfUrl && !resolvedPdfUrl.includes('aia.co.th') && showInlinePdf && (
                <div className="pt-3">
                  <div className="w-full h-130 rounded-2xl overflow-hidden border border-base-300 bg-base-100">
                    <iframe
                      title={`AIA Brochure - ${plan.name}`}
                      src={resolvedPdfUrl}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION & QUOTE REQUEST FORM */}
      <section id="consult-plan" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <div className="zen-surface rounded-3xl p-6 sm:p-10 lg:p-12 border border-primary/20 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-black shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>CUSTOMIZE YOUR COVERAGE • ออกแบบเฉพาะช่วงอายุ</span>
            </span>
            <h2 className="editorial-display text-2xl sm:text-3xl font-black text-primary">
              ขอใบเสนอราคาและปรึกษาแผน {plan.name}
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              กรอกข้อมูลด้านล่าง เพื่อให้ <strong>Admin A</strong> หรือทีมที่ปรึกษาคำนวณเบี้ยประกันเฉพาะอายุและออกแบบพอร์ตคุ้มครองให้เหมาะสมที่สุด (ฟรี ไม่มีค่าใช้จ่าย)
            </p>
          </div>

          <LeadCaptureForm
            defaultInterest={`แผนประกัน AIA: ${plan.name}`}
            onSuccess={() => {}}
          />
        </div>
      </section>
    </div>
  );
}
