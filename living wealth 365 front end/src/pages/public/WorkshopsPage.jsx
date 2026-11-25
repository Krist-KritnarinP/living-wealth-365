import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Presentation,
  Building2,
  Users,
  Gem,
  Compass,
  HeartHandshake,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Printer,
  UserCheck,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { workshopsApi } from '../../api';
import { ROUTES } from '../../constants/routes';
import FramedImage from '../../components/common/FramedImage';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';
import WorkshopPresentationModal from '../../components/workshops/WorkshopPresentationModal';
import WorkshopJourneySection from '../../components/workshops/WorkshopJourneySection';
import WorkshopCreditsSection from '../../components/workshops/WorkshopCreditsSection';
import WorkshopFeedbackSection from '../../components/workshops/WorkshopFeedbackSection';
import {
  WORKSHOP_AUDIENCES,
  WORKSHOP_TRACKS,
  WORKSHOP_OVERVIEW_JOURNEY,
  WORKSHOPS_CATALOG,
} from '../../constants/workshopsData';

const TRACK_ICONS = {
  CRYSTAL: Gem,
  LIFE_WEALTH: Compass,
  WELLBEING_THERAPY: HeartHandshake,
};

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState(WORKSHOPS_CATALOG);
  const [feedbacks, setFeedbacks] = useState(() =>
    WORKSHOPS_CATALOG.flatMap((ws) =>
      (ws.feedbacks || []).map((fb) => ({
        ...fb,
        workshop: { id: ws.id, slug: ws.slug, title: ws.title },
      }))
    )
  );
  const [selectedAudience, setSelectedAudience] = useState('ALL');
  const [selectedTrack, setSelectedTrack] = useState('ALL');

  // Presentation Modal state
  const [deckOpen, setDeckOpen] = useState(false);
  const [focusedWorkshop, setFocusedWorkshop] = useState(null);

  // Selected workshop for callback form
  const [selectedForContact, setSelectedForContact] = useState(null);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [wsData, fbData] = await Promise.all([
          workshopsApi.getAll(),
          workshopsApi.getFeedbacks(),
        ]);
        if (!active) return;
        if (Array.isArray(wsData) && wsData.length > 0) {
          setWorkshops(wsData);
        }
        if (Array.isArray(fbData)) {
          setFeedbacks(fbData);
        }
      } catch (err) {
        console.warn('[WorkshopsPage] Using fallback catalog:', err.message);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const filteredWorkshops = useMemo(
    () =>
      workshops.filter((ws) => {
        const audiences = Array.isArray(ws.audiences) ? ws.audiences : [];
        const matchAudience =
          selectedAudience === 'ALL' || audiences.includes(selectedAudience);
        const matchTrack = selectedTrack === 'ALL' || ws.track === selectedTrack;
        return matchAudience && matchTrack;
      }),
    [workshops, selectedAudience, selectedTrack]
  );

  // Aggregate unique credits across all active workshops for Overview
  const overviewCredits = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const ws of workshops) {
      const credits = Array.isArray(ws.credits) ? ws.credits : [];
      for (const c of credits) {
        const key = `${c.name}-${c.note || ''}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push(c);
        }
      }
    }
    return list;
  }, [workshops]);

  const handleOpenOverviewDeck = () => {
    setFocusedWorkshop(null);
    setDeckOpen(true);
  };

  const handleOpenWorkshopDeck = (workshop) => {
    setFocusedWorkshop(workshop);
    setDeckOpen(true);
  };

  const handleSelectForContact = (workshop) => {
    if (workshop) {
      setSelectedForContact({
        name: `เวิร์กชอป: ${workshop.title}`,
      });
    }
    const el = document.getElementById('workshop-contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeedbackCreated = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-black tracking-wide shadow-xs">
              <Presentation className="w-4 h-4 text-secondary shrink-0" />
              <span>WORKSHOPS &amp; EXPERIENCES</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              เวิร์กชอปออกแบบชีวิต <br />
              <span className="text-secondary">แร่ธาตุธรรมชาติ และการเงิน</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              กิจกรรมเชิงปฏิบัติการสำหรับองค์กรและกลุ่มเล็ก ครอบคลุมตั้งแต่การทำชิ้นงานหินมงคลตามหลักวิทยาศาสตร์แร่ธาตุ
              การออกแบบสมดุลชีวิตและเตรียมเกษียณ ไปจนถึงการฟื้นฟูความล้าและวงสนทนาให้คำปรึกษาโดย Admin A &amp; Admin B
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 print:hidden">
              <button
                type="button"
                onClick={handleOpenOverviewDeck}
                className="btn btn-primary btn-md rounded-2xl font-bold px-6 shadow-xs gap-2"
              >
                <Presentation className="w-4 h-4 shrink-0" />
                <span>เปิดโหมดพรีเซ้นต์</span>
              </button>

              <a
                href="#workshop-contact"
                className="btn btn-secondary text-secondary-content btn-md rounded-2xl font-bold px-6 shadow-xs gap-2"
              >
                <span>นัดคุยออกแบบหลักสูตร</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-outline border-base-300 btn-md rounded-2xl font-bold px-5 gap-2"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>พิมพ์ / บันทึก PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW JOURNEY: PAIN POINT -> WHAT & HOW -> OUTCOMES */}
      <WorkshopJourneySection
        eyebrow="ภาพรวมเวิร์กชอป"
        heading="ปัญหาที่เจอ วิธีจัดกิจกรรม และผลลัพธ์ที่ได้จริง"
        painPoints={WORKSHOP_OVERVIEW_JOURNEY.painPoints}
        whatAndHow={WORKSHOP_OVERVIEW_JOURNEY.whatAndHow}
        outcomes={WORKSHOP_OVERVIEW_JOURNEY.outcomes}
      />

      {/* 3. FILTER & WORKSHOP CATALOG */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8" id="workshop-catalog">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-secondary">
              หลักสูตรเวิร์กชอป
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
              เลือกดูรายละเอียดแต่ละหลักสูตร
            </h2>
            <p className="text-sm sm:text-base text-base-content/75">
              กดเข้าไปดูรายละเอียดเชิงลึก (Pain Point, กระบวนการ, เครดิตองค์กร และรีวิว) หรือเปิดโหมดพรีเซ้นต์ได้ทันที
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 print:hidden">
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-base-200/70 border border-base-300/60">
              {WORKSHOP_AUDIENCES.map((aud) => (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => setSelectedAudience(aud.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedAudience === aud.id
                      ? 'bg-primary text-primary-content shadow-xs'
                      : 'text-base-content/75 hover:text-primary'
                  }`}
                >
                  {aud.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-base-200/70 border border-base-300/60">
              {WORKSHOP_TRACKS.map((tr) => (
                <button
                  key={tr.id}
                  type="button"
                  onClick={() => setSelectedTrack(tr.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedTrack === tr.id
                      ? 'bg-secondary text-secondary-content shadow-xs'
                      : 'text-base-content/75 hover:text-primary'
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredWorkshops.length === 0 ? (
          <div className="rounded-3xl zen-surface border border-base-300/60 p-10 text-center space-y-3">
            <p className="text-lg font-bold text-primary">
              ไม่พบหลักสูตรที่ตรงกับตัวกรองที่เลือก
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedAudience('ALL');
                setSelectedTrack('ALL');
              }}
              className="btn btn-primary btn-sm rounded-xl"
            >
              แสดงทุกหลักสูตร
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredWorkshops.map((ws) => {
              const TrackIcon = TRACK_ICONS[ws.track] || Sparkles;
              const audiences = Array.isArray(ws.audiences) ? ws.audiences : [];
              const highlights = Array.isArray(ws.highlights) ? ws.highlights : [];
              const detailPath = ROUTES.WORKSHOP_DETAIL(ws.slug || ws.id);

              return (
                <article
                  key={ws.id}
                  className="rounded-3xl zen-surface border border-base-300/60 overflow-hidden flex flex-col justify-between shadow-xs hover:border-primary/35 transition-colors"
                >
                  <div>
                    {/* Cover Image */}
                    <Link to={detailPath} className="block relative h-56 sm:h-64 w-full overflow-hidden group">
                      <FramedImage
                        src={ws.imageUrl}
                        alt={ws.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-100/90 text-primary text-xs font-black shadow-xs">
                          <TrackIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
                          {ws.trackLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                        {audiences.includes('CORPORATE') && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 text-primary-content text-xs font-bold">
                            <Building2 className="w-3 h-3" />
                            องค์กร
                          </span>
                        )}
                        {audiences.includes('SMALL_GROUP') && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/95 text-secondary-content text-xs font-bold">
                            <Users className="w-3 h-3" />
                            กลุ่มเล็ก &amp; ส่วนตัว
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Body */}
                    <div className="p-6 sm:p-7 space-y-5">
                      <div className="space-y-2">
                        <Link to={detailPath} className="hover:underline">
                          <h3 className="text-xl sm:text-2xl font-black text-primary leading-snug">
                            {ws.title}
                          </h3>
                        </Link>
                        <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                          {ws.subtitle}
                        </p>
                      </div>

                      {/* Quick Meta */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-base-content/80 bg-base-200/45 rounded-2xl p-4 border border-base-300/50">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary shrink-0" />
                          <span>{ws.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-secondary shrink-0" />
                          <span>{ws.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-secondary shrink-0" />
                          <span>{ws.format}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-secondary shrink-0" />
                          <span>นำโดย {ws.facilitator}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      {highlights.length > 0 && (
                        <ul className="space-y-2 text-sm text-base-content/85">
                          {highlights.slice(0, 3).map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 flex flex-wrap items-center gap-2.5 print:hidden">
                    <Link
                      to={detailPath}
                      className="btn btn-primary btn-sm sm:btn-md rounded-2xl font-bold flex-1 gap-2"
                    >
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span>ดูรายละเอียดหลักสูตร</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenWorkshopDeck(ws)}
                      className="btn btn-outline border-primary/30 text-primary btn-sm sm:btn-md rounded-2xl font-bold gap-1.5"
                    >
                      <Presentation className="w-4 h-4 shrink-0" />
                      <span>พรีเซ้นต์</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectForContact(ws)}
                      className="btn btn-ghost btn-sm sm:btn-md rounded-2xl font-bold text-secondary"
                    >
                      นัดคุย
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. CORPORATE & INDIVIDUAL CREDITS */}
      <WorkshopCreditsSection
        eyebrow="องค์กรที่เคยร่วมโครงการ"
        heading="เครดิตองค์กรและกลุ่มผู้เข้าร่วมโครงการ"
        subtitle="องค์กร ทีมงาน และกลุ่มผู้เข้าร่วมที่ไว้วางใจออกแบบกิจกรรมร่วมกับ Admin A & Admin B"
        credits={overviewCredits}
      />

      {/* 5. PARTICIPANT REVIEWS & FEEDBACK SUBMISSION */}
      <WorkshopFeedbackSection
        eyebrow="ความคิดเห็นผู้เข้าร่วม"
        heading="รีวิวและความคิดเห็นจากผู้เคยเข้าร่วม"
        feedbacks={feedbacks}
        workshopsList={workshops}
        onFeedbackCreated={handleFeedbackCreated}
      />

      {/* 6. CALLBACK / DESIGN YOUR WORKSHOP FORM */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pb-8 print:hidden" id="workshop-contact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-secondary">
              ออกแบบหลักสูตรสำหรับองค์กรและกลุ่มเล็ก
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
              สนใจจัดเวิร์กชอปสำหรับองค์กรหรือกลุ่มเล็ก?
            </h2>
            <p className="text-base text-base-content/80 leading-relaxed">
              ฝากชื่อและเบอร์ติดต่อไว้ได้เลยครับ ทีมงาน Admin A &amp; Admin B จะติดต่อกลับเพื่อช่วยออกแบบหัวข้อ
              ระยะเวลา และจัดเตรียมอุปกรณ์ให้เหมาะกับจำนวนผู้เข้าร่วมของคุณ
            </p>
            <div className="p-5 rounded-2xl zen-surface border border-base-300/60 space-y-2 text-sm text-base-content/80">
              <p className="font-bold text-primary">รองรับทั้ง 3 รูปแบบ:</p>
              <p>• On-site ที่ออฟฟิศองค์กร / ห้องประชุม / งาน Outing</p>
              <p>• Private Studio สำหรับกลุ่มเล็ก 4–15 ท่าน</p>
              <p>• Online Workshop (Zoom) สำหรับทีม Hybrid</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadCaptureForm
              defaultInterest={
                selectedForContact?.name || 'ออกแบบและจัดเวิร์กชอป (องค์กร / กลุ่มเล็ก)'
              }
              defaultNotes={
                selectedForContact
                  ? `สนใจหลักสูตร ${selectedForContact.name} — รบกวนติดต่อกลับเพื่อคุยรายละเอียดจำนวนคนและช่วงเวลา`
                  : ''
              }
            />
          </div>
        </div>
      </section>

      {/* NATIVE DIALOG PRESENTATION MODAL */}
      <WorkshopPresentationModal
        isOpen={deckOpen}
        onClose={() => setDeckOpen(false)}
        focusedWorkshop={focusedWorkshop}
        allWorkshops={workshops}
      />
    </div>
  );
}
