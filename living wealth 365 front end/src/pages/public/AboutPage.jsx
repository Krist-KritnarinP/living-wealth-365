import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Info,
  Heart,
  Feather,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#talk') {
      const el = document.getElementById('talk');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Info className="w-4 h-4" />
              <span>PILLAR 7: ABOUT US & PHILOSOPHY • ปรัชญาและเพื่อนร่วมทาง</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              ไม่ใช่ผู้รู้ที่มาสั่งสอน <br />
              <span className="text-secondary">แต่คือ "เพื่อนร่วมทาง" ของคุณ</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              Living Wealth 365 ถือกำเนิดขึ้นจากความตั้งใจของ <strong>Top & Joy</strong> สองผู้ร่วมก่อตั้ง
              ที่มองเห็นว่าผู้คนในปัจจุบันมักแยกเรื่อง "การเงิน" ออกจาก "สุขภาพจิตใจ" เราจึงสร้างแพลตฟอร์มนี้
              ขึ้นมาเพื่อเป็นสะพานเชื่อมความมั่นคงในโลกกายภาพเข้ากับความสงบในโลกภายใน
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#talk"
                className="btn btn-secondary btn-md rounded-2xl text-white font-bold px-6 shadow-xs gap-2"
              >
                <span>นัดหมายพูดคุยกับเรา (Let's Talk)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#founders"
                className="btn btn-outline btn-md rounded-2xl font-bold px-6 gap-2"
              >
                <span>รู้จัก Top & Joy</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE STORY OF TOP & JOY */}
      <section id="founders" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-primary">
            สองมุมมองที่หลอมรวมเป็นหนึ่ง
          </h2>
          <p className="text-sm sm:text-base zen-muted">
            การผสานระหว่างความรอบคอบทางสถาปัตยกรรมการเงิน กับสุนทรียศาสตร์และพลังงานธรรมชาติ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Top's Profile Card */}
          <div className="p-6 sm:p-8 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="aspect-square w-32 h-32 rounded-3xl overflow-hidden bg-base-200 border-2 border-secondary/40 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                  alt="Top - Life & Wealth Planner"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Life & Wealth Planner
                </span>
                <h3 className="text-2xl font-black text-primary mt-0.5">Top (ท็อป)</h3>
              </div>

              <p className="text-sm text-base-content/80 leading-relaxed">
                "ผมเชื่อว่าการวางแผนการเงินไม่ใช่เรื่องของการขายผลิตภัณฑ์ แต่คือการช่วยให้ผู้คนคลายความกังวล
                และมองเห็นภาพชัดเจนว่าชีวิตที่พวกเขาอยากรักษาไว้ สามารถเกิดขึ้นได้จริงผ่านสถาปัตยกรรมการเงินที่ถูกต้อง"
              </p>

              <div className="space-y-1.5 text-xs text-base-content/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>ที่ปรึกษาการเงินและตัวแทนประกันชีวิต AIA ได้รับอนุญาต</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>ผู้เชี่ยวชาญการวางแผนภาษีบุคคลธรรมดาและมรดก</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-base-200/50 border border-base-300/40 text-xs italic zen-muted">
              "ความมั่งคั่งที่แท้จริง คือการไม่ต้องกังวลเรื่องเงินอีกต่อไป"
            </div>
          </div>

          {/* Joy's Profile Card */}
          <div className="p-6 sm:p-8 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="aspect-square w-32 h-32 rounded-3xl overflow-hidden bg-base-200 border-2 border-secondary/40 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                  alt="Joy - Natural Energy & Wellbeing Curator"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Natural Energy & Wellbeing Curator
                </span>
                <h3 className="text-2xl font-black text-primary mt-0.5">Joy (จอย)</h3>
              </div>

              <p className="text-sm text-base-content/80 leading-relaxed">
                "ธรรมชาติใช้เวลาเป็นร้อยล้านปีเพื่อตกผลึกเป็นแร่ธาตุที่งดงาม เช่นเดียวกับชีวิตคนเราที่ต้องการเวลาในการเติบโตอย่างมั่นคง
                จอยหลงใหลในพลังงานธรรมชาติ วิทยาศาสตร์แร่ธาตุ และการฟื้นฟูสุขภาพองค์รวมให้กายและใจสอดประสานกัน"
              </p>

              <div className="space-y-1.5 text-xs text-base-content/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>ผู้ศึกษาและคัดสรรแร่ธาตุธรรมชาติจากแหล่งกำเนิดทั่วโลก</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>ผู้ให้คำปรึกษาด้าน Longevity, การนอนหลับ และ Health Sanctuary</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-base-200/50 border border-base-300/40 text-xs italic zen-muted">
              "สิ่งที่ล้ำค่าและมั่นคงที่สุด ต้องใช้เวลาในการตกผลึก"
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="p-8 sm:p-12 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              3 คุณค่าหลักที่เรายึดถือ (Core Values)
            </h2>
            <p className="text-sm zen-muted">
              หลักยึดเหนี่ยวในทุกบทสนทนาและคำแนะนำที่เราส่งมอบให้คุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-secondary font-black text-2xl">01.</span>
              <h4 className="text-lg font-bold text-primary">Deep Listening (การรับฟังอย่างลึกซึ้ง)</h4>
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                เราเริ่มต้นด้วยการรับฟังเรื่องราวชีวิต ความฝัน และความกังวลของคุณโดยไม่ด่วนตัดสิน
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <span className="text-secondary font-black text-2xl">02.</span>
              <h4 className="text-lg font-bold text-primary">Scientific Rigor (ความชัดเจนทางวิชาการ)</h4>
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                ทุกคำแนะนำด้านการเงินถูกต้องตามกฎหมาย และทุกข้อมูลแร่ธาตุอ้างอิงหลักวิทยาศาสตร์และธรณีวิทยาจริง
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <span className="text-secondary font-black text-2xl">03.</span>
              <h4 className="text-lg font-bold text-primary">Holistic Balance (ความสมดุลองค์รวม)</h4>
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                ความมั่งคั่งต้องเดินเคียงข้างสุขภาพที่ดี และจิตใจที่สงบสุข เพื่อชีวิตที่สมบูรณ์แบบ 365 วัน
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LET'S TALK CONSULTATION FORM */}
      <section id="talk" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <div className="p-6 sm:p-10 lg:p-14 rounded-3xl zen-surface border border-secondary/40 shadow-lg max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide">
              <Heart className="w-3.5 h-3.5" />
              <span>LET'S TALK • นัดหมายสนทนา (ฟรี)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              มีเรื่องชีวิตหรือการเงินที่อยากพูดคุยกับเราไหม?
            </h2>
            <p className="text-sm text-base-content/75 max-w-lg mx-auto leading-relaxed">
              ไม่ว่าจะเรื่องภาษี การปกป้องสุขภาพ พอร์ตเกษียณ หรือแร่ธาตุธรรมชาติ
              กรอกข้อมูลด้านล่าง แล้ว Top หรือ Joy จะติดต่อกลับตามเวลาที่คุณสะดวก
            </p>
          </div>

          <LeadCaptureForm
            defaultInterest="Let's Talk กับ Top & Joy (การวางแผนชีวิตและสมดุล 6 มิติ)"
            onSuccess={() => {}}
          />
        </div>
      </section>
    </div>
  );
}
