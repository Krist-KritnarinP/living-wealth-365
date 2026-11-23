import { useState } from 'react';
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
  ChevronDown,
  ChevronUp,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import FramedImage from '../../components/common/FramedImage';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';
import WorkshopPresentationModal from '../../components/workshops/WorkshopPresentationModal';
import {
  WORKSHOP_AUDIENCES,
  WORKSHOP_TRACKS,
  WORKSHOPS_CATALOG,
} from '../../constants/workshopsData';

const TRACK_ICONS = {
  CRYSTAL: Gem,
  LIFE_WEALTH: Compass,
  WELLBEING_THERAPY: HeartHandshake,
};

export default function WorkshopsPage() {
  const [selectedAudience, setSelectedAudience] = useState('ALL');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [expandedAgendaId, setExpandedAgendaId] = useState(null);

  // Presentation Modal state
  const [deckOpen, setDeckOpen] = useState(false);
  const [focusedWorkshop, setFocusedWorkshop] = useState(null);

  // Selected workshop for callback form
  const [selectedForContact, setSelectedForContact] = useState(null);

  const filteredWorkshops = WORKSHOPS_CATALOG.filter((ws) => {
    const matchAudience =
      selectedAudience === 'ALL' || ws.audiences.includes(selectedAudience);
    const matchTrack = selectedTrack === 'ALL' || ws.track === selectedTrack;
    return matchAudience && matchTrack;
  });

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

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-black tracking-wide shadow-xs">
              <Presentation className="w-4 h-4 text-secondary shrink-0" />
              <span>WORKSHOPS & EXPERIENCES • เวิร์กชอปองค์กรและกลุ่มเล็ก</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              เวิร์กชอปออกแบบชีวิต <br />
              <span className="text-secondary">แร่ธาตุธรรมชาติ และการเงิน</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              กิจกรรมเชิงปฏิบัติการสำหรับองค์กรและกลุ่มเล็ก ครอบคลุมตั้งแต่การทำชิ้นงานหินมงคลตามหลักวิทยาศาสตร์แร่ธาตุ
              การออกแบบสมดุลชีวิตและเตรียมเกษียณ ไปจนถึงการฟื้นฟูความล้าและวงสนทนาให้คำปรึกษาโดย Admin A & Admin B
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

      {/* 2. TWO FORMATS: CORPORATE vs SMALL GROUP */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Corporate Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl zen-surface border transition-all space-y-4 ${
              selectedAudience === 'CORPORATE'
                ? 'border-primary ring-1 ring-primary/30 shadow-md'
                : 'border-base-300/60 hover:border-primary/40'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/12 text-primary flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="badge badge-primary font-bold text-xs px-3 py-1">
                20 – 150+ คน
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-primary">
                สำหรับองค์กร (Corporate & HR Wellbeing)
              </h2>
              <p className="text-sm text-base-content/75 leading-relaxed">
                เหมาะสำหรับกิจกรรม Employee Wellbeing Day, โปรแกรมเตรียมความพร้อมก่อนเกษียณ,
                คลินิกภาษีพนักงาน หรือกิจกรรม Team Bonding ทำชิ้นงานแร่ธาตุร่วมกัน
              </p>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-base-content/85 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>ปรับเนื้อหาและระยะเวลาให้เข้ากับวัฒนธรรมและช่วงวัยของพนักงาน</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>จัดได้ที่ออฟฟิศลูกค้า, ห้องสัมมนา หรือรูปแบบ Online Webinar</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>พร้อมเอกสารประกอบการเรียน อุปกรณ์หินแท้ และออกใบเสนอราคาองค์กร</span>
              </li>
            </ul>

            <div className="pt-2 print:hidden">
              <button
                type="button"
                onClick={() => {
                  setSelectedAudience(selectedAudience === 'CORPORATE' ? 'ALL' : 'CORPORATE');
                  document.getElementById('workshop-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline btn-primary btn-sm rounded-xl font-bold gap-1.5"
              >
                <span>
                  {selectedAudience === 'CORPORATE' ? 'แสดงทุกรูปแบบ' : 'ดูหลักสูตรสำหรับองค์กร'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Small Group / Private Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl zen-surface border transition-all space-y-4 ${
              selectedAudience === 'SMALL_GROUP'
                ? 'border-secondary ring-1 ring-secondary/40 shadow-md'
                : 'border-base-300/60 hover:border-secondary/50'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/18 text-primary flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <span className="badge badge-secondary font-bold text-xs px-3 py-1">
                4 – 12 คน
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-primary">
                กลุ่มเล็ก & ส่วนตัว (Small Group & Private Circle)
              </h2>
              <p className="text-sm text-base-content/75 leading-relaxed">
                บรรยากาศผ่อนคลาย เป็นกันเอง และดูแลใกล้ชิดรายบุคคล เหมาะสำหรับกลุ่มเพื่อน ครอบครัว
                ผู้บริหาร หรือผู้ที่อยากลงมือทำชิ้นงานหินและพูดคุยเรื่องชีวิตอย่างลึกซึ้ง
              </p>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-base-content/85 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>จำกัดจำนวนผู้เข้าร่วมเพื่อให้วิทยากรให้คำแนะนำได้ครบทุกคน</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>เลือกหัวข้อผสมกันได้ เช่น ทำกำไลหินธรรมชาติ + คุยแผนชีวิต 6 มิติ</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>เลือกวันและเวลาที่สะดวกสำหรับกลุ่มส่วนตัวได้ที่ Studio หรือ Online</span>
              </li>
            </ul>

            <div className="pt-2 print:hidden">
              <button
                type="button"
                onClick={() => {
                  setSelectedAudience(selectedAudience === 'SMALL_GROUP' ? 'ALL' : 'SMALL_GROUP');
                  document.getElementById('workshop-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline btn-secondary btn-sm rounded-xl font-bold gap-1.5"
              >
                <span>
                  {selectedAudience === 'SMALL_GROUP' ? 'แสดงทุกรูปแบบ' : 'ดูหลักสูตรสำหรับกลุ่มเล็ก'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKSHOP CATALOG */}
      <section id="workshop-catalog" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-base-300/60">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              หลักสูตรเวิร์กชอปทั้งหมด ({filteredWorkshops.length} หลักสูตร)
            </h2>
            <p className="text-sm text-base-content/75">
              กด &ldquo;พรีเซ้นต์หลักสูตรนี้&rdquo; เพื่อเปิดสไลด์นำเสนอรายวิชา หรือกดนัดคุยเพื่อปรับเนื้อหาให้ตรงกับกลุ่มของคุณ
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-base-200/80 border border-base-300/50">
              {WORKSHOP_TRACKS.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setSelectedTrack(track.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedTrack === track.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-base-content/75 hover:bg-base-100 hover:text-primary'
                  }`}
                >
                  {track.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-base-200/80 border border-base-300/50">
              {WORKSHOP_AUDIENCES.map((aud) => (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => setSelectedAudience(aud.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedAudience === aud.id
                      ? 'bg-secondary text-secondary-content shadow-xs'
                      : 'text-base-content/75 hover:bg-base-100 hover:text-primary'
                  }`}
                >
                  {aud.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredWorkshops.map((ws) => {
            const TrackIcon = TRACK_ICONS[ws.track] || Sparkles;
            const isExpanded = expandedAgendaId === ws.id;

            return (
              <article
                key={ws.id}
                className="zen-surface rounded-3xl border border-base-300/60 overflow-hidden shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  {/* Cover Image */}
                  <div className="aspect-16/9 w-full bg-base-200 relative overflow-hidden">
                    <FramedImage
                      src={ws.imageUrl}
                      alt={ws.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="badge badge-primary font-bold text-xs px-2.5 py-1 gap-1 shadow-xs">
                        <TrackIcon className="w-3.5 h-3.5 shrink-0" />
                        {ws.trackLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {ws.audiences.includes('CORPORATE') && (
                        <span className="badge badge-outline badge-primary text-xs font-bold px-2.5 py-0.5">
                          องค์กร (Corporate)
                        </span>
                      )}
                      {ws.audiences.includes('SMALL_GROUP') && (
                        <span className="badge badge-secondary text-xs font-bold px-2.5 py-0.5">
                          กลุ่มเล็ก & ส่วนตัว
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-black text-primary leading-snug">
                        {ws.title}
                      </h3>
                      <p className="text-sm text-base-content/75 leading-relaxed">
                        {ws.subtitle}
                      </p>
                    </div>

                    {/* Meta Chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-base-content/80 bg-base-200/55 p-3.5 rounded-2xl border border-base-300/50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>{ws.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-primary shrink-0" />
                        <span>วิทยากร: {ws.facilitator}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <Users className="w-4 h-4 text-secondary shrink-0" />
                        <span>{ws.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="w-4 h-4 text-secondary shrink-0" />
                        <span>{ws.format}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 text-xs sm:text-sm text-base-content/85">
                      {ws.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Takeaways */}
                    <div className="p-3 rounded-xl bg-secondary/12 border border-secondary/30 text-xs sm:text-sm text-base-content/85">
                      <strong className="text-primary">สิ่งที่ได้รับกลับบ้าน:</strong> {ws.takeaways}
                    </div>

                    {/* Expandable Agenda */}
                    <div className="border-t border-base-300/50 pt-3">
                      <button
                        type="button"
                        onClick={() => setExpandedAgendaId(isExpanded ? null : ws.id)}
                        className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1 cursor-pointer print:hidden"
                      >
                        <span>{isExpanded ? 'ซ่อนโครงสร้างเวลา' : 'ดูโครงสร้างเวลา (Agenda)'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {isExpanded && (
                        <ol className="mt-3 space-y-2 text-xs sm:text-sm bg-base-100/90 p-3.5 rounded-2xl border border-base-300/60">
                          {ws.agenda.map((step, i) => (
                            <li key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                              <span className="font-black text-secondary shrink-0">{step.time}</span>
                              <span className="text-base-content/85">{step.topic}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 flex flex-wrap items-center gap-2 print:hidden">
                  <button
                    type="button"
                    onClick={() => handleOpenWorkshopDeck(ws)}
                    className="btn btn-outline btn-primary btn-sm rounded-xl font-bold gap-1.5 flex-1 sm:flex-initial"
                  >
                    <Presentation className="w-4 h-4 shrink-0" />
                    <span>พรีเซ้นต์หลักสูตรนี้</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectForContact(ws)}
                    className="btn btn-primary btn-sm rounded-xl font-bold gap-1.5 flex-1 sm:flex-initial"
                  >
                    <span>ขอรายละเอียด / นัดคุย</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. 4-STEP COLLABORATION PROCESS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="zen-surface rounded-3xl p-6 sm:p-10 border border-base-300/60 space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-secondary block">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              4 ขั้นตอนการทำงานร่วมกัน
            </h2>
            <p className="text-sm text-base-content/75">
              ปรับเนื้อหาและรูปแบบกิจกรรมให้เหมาะกับเป้าหมายขององค์กรหรือกลุ่มของคุณตั้งแต่ต้นจนจบ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'รับฟังโจทย์และเป้าหมาย',
                desc: 'พูดคุยจำนวนผู้เข้าร่วม ช่วงวัย ระยะเวลา และสิ่งที่อยากให้ผู้เข้าอบรมได้รับ',
              },
              {
                step: '02',
                title: 'ออกแบบหลักสูตรและใบเสนอราคา',
                desc: 'เสนอโครงสร้างเนื้อหา กำหนดการ และรายการอุปกรณ์ที่เหมาะสมกับงบประมาณ',
              },
              {
                step: '03',
                title: 'จัดเวิร์กชอปจริง',
                desc: 'ดำเนินกิจกรรมโดย Admin A & Admin B พร้อมอุปกรณ์หินแท้และเวิร์กชีตครบชุด',
              },
              {
                step: '04',
                title: 'สรุปผลและดูแลต่อเนื่อง',
                desc: 'ส่งมอบเอกสารสรุปและเปิดช่องทางให้คำปรึกษาส่วนตัวสำหรับผู้ที่ต้องการต่อยอด',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-base-100/85 border border-base-300/60 space-y-2"
              >
                <span className="text-2xl font-black text-secondary">{item.step}</span>
                <h3 className="text-base font-black text-primary">{item.title}</h3>
                <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALLBACK & CUSTOM WORKSHOP INQUIRY FORM */}
      <section
        id="workshop-contact"
        className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24 print:hidden"
      >
        <LeadCaptureForm
          selection={selectedForContact}
          defaultInterest={
            selectedForContact?.name ||
            'สอบถามจัดเวิร์กชอป (องค์กร / กลุ่มเล็ก)'
          }
          title="นัดคุยเพื่อออกแบบเวิร์กชอปสำหรับองค์กรหรือกลุ่มของคุณ"
          subtitle="ทิ้งข้อมูลติดต่อและระบุคร่าวๆ ว่าเป็นรูปแบบองค์กรหรือกลุ่มเล็ก แล้ว Admin A & Admin B จะติดต่อกลับเพื่อเสนอโครงร่างหลักสูตรและรายละเอียด"
        />
      </section>

      {/* 6. NATIVE <dialog> PRESENTATION MODE */}
      <WorkshopPresentationModal
        isOpen={deckOpen}
        onClose={() => setDeckOpen(false)}
        focusedWorkshop={focusedWorkshop}
        onRequestCallback={(ws) => handleSelectForContact(ws)}
      />
    </div>
  );
}
