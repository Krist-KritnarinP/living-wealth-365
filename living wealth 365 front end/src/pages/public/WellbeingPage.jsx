import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Heart,
  Moon,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Wind,
  Coffee,
  Check,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function WellbeingPage() {
  const { posts } = useAuth();
  const wellbeingPosts = posts.filter(
    (p) => p.pillar === 'WELLBEING' || p.category?.includes('สุขภาพ') || p.tags?.includes('Longevity')
  );

  // Interactive Health Sanctuary Checklist State
  const [checklist, setChecklist] = useState({
    air: true,
    light: false,
    sleep: true,
    hydration: true,
    screen: false,
  });

  const toggleCheck = (id) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Activity className="w-4 h-4" />
              <span>PILLAR 3: WELLBEING & LONGEVITY • สุขภาพระดับเซลล์</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              ศาสตร์แห่งอายุวัฒนะ <br />
              <span className="text-secondary">Healthspan เหนือ Lifespan</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              เป้าหมายไม่ใช่เพียงแค่อยู่ให้นานขึ้น แต่คือการอยู่ด้วยความกระปรี้กระเปร่า มีพลังงานเต็มเปี่ยม
              และปลอดจากโรคเรื้อรัง เราผสานวิทยาศาสตร์การชะลอวัย การฟื้นฟูเซลล์ และการสร้างบ้านให้เป็น
              <em> Health Sanctuary </em> เพื่อคืนความอ่อนเยาว์ให้กายและใจ
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#sanctuary"
                className="btn btn-primary btn-md rounded-2xl font-bold px-6 shadow-xs gap-2"
              >
                <span>เช็กลิสต์ Health Sanctuary</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/about#talk"
                className="btn btn-secondary btn-outline btn-md rounded-2xl font-bold px-6 gap-2"
              >
                <span>ปรึกษาแนวทาง Longevity กับ Admin B</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 PILLARS OF LONGEVITY */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-primary">
            4 เสาหลักของการชะลอวัยระดับเซลล์
          </h2>
          <p className="text-sm sm:text-base zen-muted">
            การปรับเปลี่ยนเล็กๆ ในชีวิตประจำวันที่มีผลลัพธ์มหาศาลต่อการฟื้นฟูร่างกาย
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-600 flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary">1. Sleep Architecture</h3>
            <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
              การนอนหลับลึก (Deep Sleep) ช่วยกระตุ้นระบบขับของเสียในสมอง (Glymphatic System) ซ่อมแซม DNA และปรับสมดุลฮอร์โมนเจริญเติบโต
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary">2. Circadian Rhythm</h3>
            <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
              สัมผัสแสงแดดเช้า 10-15 นาที เพื่อรีเซ็ตนาฬิกาชีวภาพ ปลุกความกระปรี้กระเปร่า และส่งสัญญาณให้ร่างกายผลิตเมลาโทนินในยามค่ำคืน
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary">3. Cellular Autophagy</h3>
            <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
              การจัดการช่วงเวลาทานอาหาร (Time-Restricted Eating) เพื่อกระตุ้นกระบวนการทำความสะอาดเซลล์ที่เสื่อมสภาพ และลดการอักเสบเรื้อรัง
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 flex items-center justify-center">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary">4. Vagus Nerve Reset</h3>
            <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
              การฝึกหายใจลึก (Box Breathing) และการอาบน้ำเย็น ช่วยกระตุ้นเส้นประสาทเวกัส ลดระดับคอร์ติซอล และคืนความสงบให้ระบบประสาทอัตโนมัติ
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE HOME HEALTH SANCTUARY CHECKLIST */}
      <section id="sanctuary" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl zen-surface border border-base-300 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-base-300/60">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTERACTIVE TOOL • สำรวจพื้นที่สุขภาพที่บ้าน</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-primary">
                Home Health Sanctuary: เช็กลิสต์ 5 นิสัยเปลี่ยนบ้านให้เป็นที่ฟื้นฟู
              </h2>
              <p className="text-sm text-base-content/75 mt-1">
                คลิกเพื่อสำรวจว่าบ้านของคุณพร้อมเป็นแหล่งชาร์จพลังงานระดับเซลล์แล้วหรือยัง ({checkedCount}/5 ผ่านเกณฑ์)
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-base-100 border border-base-300">
              <span className="text-xs font-bold zen-muted">ระดับ Sanctuary:</span>
              <span className={`text-sm font-black ${checkedCount >= 4 ? 'text-success' : 'text-secondary'}`}>
                {checkedCount === 5 ? '🌟 สมบูรณ์แบบ' : checkedCount >= 3 ? '🌿 ดีเยี่ยม' : '🌱 เริ่มต้นสร้าง'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'air',
                title: 'อากาศบริสุทธิ์ & การระบายถ่ายเท (Air Quality)',
                desc: 'เปิดหน้าต่างรับลมเช้าอย่างน้อย 15 นาที และใช้เครื่องฟอกอากาศ HEPA ในห้องนอนเพื่อลด PM 2.5',
              },
              {
                id: 'light',
                title: 'แสงไฟ Warm White ยามค่ำคืน (Circadian Lighting)',
                desc: 'หรี่ไฟและใช้โทนสีอุ่น 2 ชั่วโมงก่อนนอน เพื่อส่งสัญญาณให้ต่อมไพเนียลหลั่งเมลาโทนินตามธรรมชาติ',
              },
              {
                id: 'sleep',
                title: 'ห้องนอนมืดสนิทและอุณหภูมิ 20-23°C (Deep Sleep Sanctuary)',
                desc: 'ใช้ผ้าม่านทึบแสง (Blackout) และควบคุมอุณหภูมิห้องนอนให้เย็นพอดี เพื่อส่งเสริมการหลับลึก',
              },
              {
                id: 'hydration',
                title: 'พิธีกรรมดื่มน้ำอุ่นตอนเช้า (Morning Hydration)',
                desc: 'ดื่มน้ำสะอาด 1-2 แก้วทันทีหลังตื่นนอน เพื่อกระตุ้นระบบไหลเวียนโลหิตและการกำจัดของเสีย',
              },
              {
                id: 'screen',
                title: 'พื้นที่ปลอดจอมือถือก่อนนอน (Digital Sunset)',
                desc: 'หยุดใช้สมาร์ตโฟนหรือแท็บเล็ต 45 นาทีก่อนนอน เพื่อป้องกันแสงสีฟ้าทำลายคุณภาพการนอน',
              },
            ].map((item) => {
              const isChecked = checklist[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-secondary/10 border-secondary/50 shadow-xs'
                      : 'bg-base-200/40 border-base-300 hover:bg-base-200/70'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                      isChecked
                        ? 'bg-secondary text-white'
                        : 'border-2 border-base-300 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-3" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-base-content leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-base-content/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CURATED WELLBEING ARTICLES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              บทความและวิทยาศาสตร์ในหมวด Wellbeing
            </h2>
            <p className="text-sm zen-muted mt-1">
              คำแนะนำด้านการนอน การชะลอวัย และสุขภาพองค์รวมโดย Admin B
            </p>
          </div>
          <Link
            to={ROUTES.JOURNAL}
            className="btn btn-ghost btn-sm rounded-xl font-bold gap-1 self-start sm:self-auto text-secondary hover:text-primary"
          >
            <span>ดูวารสารทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wellbeingPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id || post.slug}
              to={`/journal/${post.slug}`}
              className="p-5 rounded-3xl zen-surface border border-base-300/60 shadow-xs flex flex-col justify-between group hover:border-secondary transition-all"
            >
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-base-200">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="badge badge-sm badge-secondary font-bold">
                    {post.category || 'ศาสตร์แห่งอายุวัฒนะ'}
                  </span>
                  <span className="zen-muted">• {post.readTime || '6 นาที'}</span>
                </div>
                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/75 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-base-300/40 flex items-center justify-between text-xs font-semibold text-secondary">
                <span>โดย {post.authorName || post.author}</span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  อ่านต่อ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
