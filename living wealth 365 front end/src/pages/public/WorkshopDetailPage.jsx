import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Presentation,
  Building2,
  Users,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle2,
  CalendarClock,
  Gift,
  Printer,
  ArrowRight,
} from 'lucide-react';
import { workshopsApi } from '../../api';
import { ROUTES } from '../../constants/routes';
import { WORKSHOPS_CATALOG } from '../../constants/workshopsData';
import FramedImage from '../../components/common/FramedImage';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';
import WorkshopJourneySection from '../../components/workshops/WorkshopJourneySection';
import WorkshopCreditsSection from '../../components/workshops/WorkshopCreditsSection';
import WorkshopFeedbackSection from '../../components/workshops/WorkshopFeedbackSection';
import WorkshopPresentationModal from '../../components/workshops/WorkshopPresentationModal';

export default function WorkshopDetailPage() {
  const { slug } = useParams();
  const fallbackWorkshop =
    WORKSHOPS_CATALOG.find((w) => w.slug === slug || w.id === slug) || null;

  const [workshop, setWorkshop] = useState(fallbackWorkshop);
  const [loading, setLoading] = useState(!fallbackWorkshop);
  const [notFound, setNotFound] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const loadWorkshop = async () => {
      try {
        const data = await workshopsApi.getBySlug(slug);
        if (!active) return;
        if (data) {
          setWorkshop(data);
          setNotFound(false);
        }
      } catch (err) {
        if (!active) return;
        if (!fallbackWorkshop) {
          setNotFound(true);
        }
        console.warn('[WorkshopDetailPage] API notice:', err.message);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadWorkshop();
    return () => {
      active = false;
    };
  }, [slug]);

  const handleFeedbackCreated = (newFeedback) => {
    setWorkshop((prev) =>
      prev
        ? { ...prev, feedbacks: [newFeedback, ...(prev.feedbacks || [])] }
        : prev
    );
  };

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-20 text-center">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="mt-4 text-base-content/70 font-medium">
          กำลังโหลดรายละเอียดหลักสูตรเวิร์กชอป...
        </p>
      </div>
    );
  }

  if (notFound || !workshop) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-20 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black text-primary">
          ไม่พบหลักสูตรเวิร์กชอปที่ต้องการ
        </h1>
        <p className="text-base-content/75">
          หลักสูตรนี้อาจถูกย้ายหรือยังไม่เปิดเผยแพร่ กรุณาเลือกดูหลักสูตรอื่นในหน้าภาพรวมครับ
        </p>
        <Link to={ROUTES.WORKSHOPS} className="btn btn-primary rounded-2xl gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้า Workshops</span>
        </Link>
      </div>
    );
  }

  const audiences = Array.isArray(workshop.audiences) ? workshop.audiences : [];
  const highlights = Array.isArray(workshop.highlights) ? workshop.highlights : [];
  const agenda = Array.isArray(workshop.agenda) ? workshop.agenda : [];
  const credits = Array.isArray(workshop.credits) ? workshop.credits : [];
  const feedbacks = Array.isArray(workshop.feedbacks) ? workshop.feedbacks : [];

  return (
    <div className="w-full space-y-16 lg:space-y-20 py-8">
      {/* 1. BREADCRUMB & HERO */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
        <Link
          to={ROUTES.WORKSHOPS}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors print:hidden"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าภาพรวม Workshops</span>
        </Link>

        <div className="rounded-3xl zen-surface border border-base-300/60 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Cover Image */}
            <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full">
              <FramedImage
                src={workshop.imageUrl}
                alt={workshop.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hero Info */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 space-y-6 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-primary font-bold px-3 py-1.5 text-xs">
                  {workshop.trackLabel}
                </span>
                {audiences.includes('CORPORATE') && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-base-200 text-primary text-xs font-bold">
                    <Building2 className="w-3.5 h-3.5 text-secondary" />
                    สำหรับองค์กร
                  </span>
                )}
                {audiences.includes('SMALL_GROUP') && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-base-200 text-primary text-xs font-bold">
                    <Users className="w-3.5 h-3.5 text-secondary" />
                    กลุ่มเล็ก &amp; ส่วนตัว
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-primary leading-tight">
                  {workshop.title}
                </h1>
                <p className="text-base sm:text-lg text-base-content/80 leading-relaxed">
                  {workshop.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-base-200/50 rounded-2xl p-4 border border-base-300/60 text-sm">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span>{workshop.duration}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-secondary shrink-0" />
                  <span>{workshop.groupSize}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-secondary shrink-0" />
                  <span>{workshop.format}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-secondary shrink-0" />
                  <span>นำโดย {workshop.facilitator}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 print:hidden">
                <button
                  type="button"
                  onClick={() => setDeckOpen(true)}
                  className="btn btn-primary rounded-2xl font-bold px-6 gap-2"
                >
                  <Presentation className="w-4 h-4 shrink-0" />
                  <span>พรีเซ้นต์หลักสูตรนี้</span>
                </button>
                <a
                  href="#detail-contact"
                  className="btn btn-secondary text-secondary-content rounded-2xl font-bold px-6 gap-2"
                >
                  <span>นัดออกแบบหลักสูตรนี้</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-outline border-base-300 rounded-2xl font-bold px-5 gap-2"
                >
                  <Printer className="w-4 h-4 shrink-0" />
                  <span>พิมพ์ / PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEEP-DIVE JOURNEY: PAIN POINT -> WHAT & HOW -> OUTCOMES */}
      <WorkshopJourneySection
        eyebrow="เจาะลึกโครงสร้างหลักสูตร"
        heading="Pain Point วิธีลงมือทำ และผลลัพธ์ของหลักสูตรนี้"
        painPoints={workshop.painPoints}
        whatAndHow={workshop.whatAndHow}
        outcomes={workshop.outcomes}
      />

      {/* 3. HIGHLIGHTS, AGENDA & TAKEAWAYS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Agenda */}
          <div className="lg:col-span-7 rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                  SESSION FLOW
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-primary">
                  กำหนดการและลำดับกิจกรรม (Agenda)
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {agenda.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-2xl bg-base-200/50 border border-base-300/60"
                >
                  <span className="text-xs sm:text-sm font-black text-secondary shrink-0 sm:w-32">
                    {item.time}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-base-content/90">
                    {item.topic}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Takeaways */}
          <div className="lg:col-span-5 space-y-6">
            {highlights.length > 0 && (
              <div className="rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-lg sm:text-xl font-black text-primary">
                  ไฮไลต์สำคัญในห้องเรียน
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-base-content/85 leading-relaxed">
                  {highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workshop.takeaways && (
              <div className="rounded-3xl bg-primary/5 border border-primary/20 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2.5 text-primary font-black text-lg">
                  <Gift className="w-5 h-5 text-secondary shrink-0" />
                  <span>สิ่งที่ผู้เข้าร่วมได้รับกลับบ้าน</span>
                </div>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed">
                  {workshop.takeaways}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. CREDITS FOR THIS WORKSHOP */}
      <WorkshopCreditsSection
        eyebrow="CREDITS & PAST SESSIONS"
        heading="องค์กรและกลุ่มที่เคยจัดหลักสูตรนี้"
        subtitle={`ตัวอย่างองค์กรและกลุ่มผู้เข้าร่วมหลักสูตร ${workshop.title}`}
        credits={credits}
      />

      {/* 5. FEEDBACK & REVIEWS FOR THIS WORKSHOP */}
      <WorkshopFeedbackSection
        eyebrow="COURSE FEEDBACK"
        heading="รีวิวและความคิดเห็นของหลักสูตรนี้"
        feedbacks={feedbacks}
        workshopId={workshop.id}
        workshopSlug={workshop.slug}
        onFeedbackCreated={handleFeedbackCreated}
      />

      {/* 6. CONTACT FORM */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pb-8 print:hidden" id="detail-contact">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-secondary">
              INQUIRE THIS WORKSHOP
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              สนใจจัดหลักสูตร {workshop.title}
            </h2>
            <p className="text-sm sm:text-base text-base-content/75">
              ฝากข้อมูลติดต่อเพื่อให้ Admin A &amp; Admin B ติดต่อกลับและปรับเนื้อหาให้ตรงกับกลุ่มของคุณ
            </p>
          </div>
          <LeadCaptureForm
            defaultInterest={`เวิร์กชอป: ${workshop.title}`}
            defaultNotes={`สนใจจัดเวิร์กชอป "${workshop.title}" รบกวนติดต่อกลับเพื่อสอบถามจำนวนผู้เข้าร่วมและวันที่สะดวก`}
          />
        </div>
      </section>

      <WorkshopPresentationModal
        isOpen={deckOpen}
        onClose={() => setDeckOpen(false)}
        focusedWorkshop={workshop}
        allWorkshops={[workshop]}
      />
    </div>
  );
}
