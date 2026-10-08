import { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  ShieldCheck,
  HeartPulse,
  Coins,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Compass,
  Umbrella,
  Users
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('zen-light');
  const [selectedPillar, setSelectedPillar] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'zen-light' ? 'zen-dark' : 'zen-light'));
  };

  const PILLARS = [
    {
      title: 'วางแผนคุ้มครองชีวิต & สุขภาพ',
      english: 'Life & Health Protection',
      desc: 'สร้างเกราะป้องกันค่ารักษาพยาบาลและโรคร้ายแรง ปกป้องความมั่นคงของคนที่คุณรัก ไม่กระทบเงินเก็บสะสมทั้งชีวิต',
      icon: ShieldCheck,
      badge: 'LIFE & HEALTH',
      points: [
        'ประกันสุขภาพเหมาจ่ายระดับพรีเมียม',
        'เงินชดเชยรายได้ & คุ้มครองโรคร้ายแรงทุกระยะ',
        'ส่งต่อมรดกเป็นเงินสดส่งตรงถึงมือครอบครัว'
      ],
    },
    {
      title: 'วางแผนเกษียณสุขใจ 365 วัน',
      english: 'Retirement & Wealth Flow',
      desc: 'ออกแบบกระแสเงินสดบำนาญตลอดชีพ ให้คุณใช้ชีวิตอย่างอิสระ สบายใจ มีรายได้ต่อเนื่องในทุกวันของชีวิต',
      icon: HeartPulse,
      badge: 'RETIREMENT',
      points: [
        'คำนวณเงินกองทุนเกษียณตามไลฟ์สไตล์จริง',
        'แผนบำนาญการันตีเงินคืนแน่นอนตลอดชีพ',
        'ใช้สิทธิลดหย่อนภาษีสูงสุดตามกฎหมาย'
      ],
    },
    {
      title: 'บริหารภาษี & ส่งต่อมรดก',
      english: 'Tax & Legacy Succession',
      desc: 'จัดการสิทธิประโยชน์ทางภาษีบุคคลอย่างคุ้มค่า พร้อมส่งต่อทรัพย์สินและความมั่งคั่งอย่างปลอดภัย ไร้ข้อพิพาท',
      icon: Coins,
      badge: 'LEGACY',
      points: [
        'วางแผนประหยัดภาษีบุคคลธรรมดาอย่างถูกต้อง',
        'ส่งมอบทรัพย์สินปลอดภัยและราบรื่น',
        'วางแผนมรดกเพื่อความสงบสุขของทายาท'
      ],
    },
  ];

  const CORE_VALUES = [
    { label: 'LIFE', text: 'ชีวิตที่มีคุณค่า', icon: Sparkles },
    { label: 'WEALTH', text: 'ความมั่งคั่งยั่งยืน', icon: TrendingUp },
    { label: 'HEALTH', text: 'สุขภาพที่แข็งแรง', icon: Umbrella },
    { label: 'FREEDOM', text: 'อิสรภาพการเงิน', icon: Compass },
    { label: 'HAPPINESS', text: 'ความสุขในทุกวัน', icon: Award },
    { label: 'FOREVER', text: 'มั่นคงตลอดไป', icon: Clock },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-between font-sans transition-colors duration-200 bg-base-100">
      {/* ========================================================
          FULL SCREEN & FULL WIDTH NAVBAR (Edge-to-Edge)
          ======================================================== */}
      <header className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sticky top-0 z-50">
        <nav className="navbar zen-surface w-full px-4 sm:px-8 py-3 rounded-2xl shadow-xs flex items-center justify-between border border-base-300/50">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Living Wealth 365 Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-primary leading-tight">
                Living Wealth <span className="text-secondary">365</span>
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide zen-muted">
                FINANCIAL & INSURANCE ADVISOR • มั่นคง มั่งคั่ง ยั่งยืน
              </span>
            </div>
          </div>

          {/* Action Items & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
              title="สลับโหมดสว่าง / มืด"
              aria-label="Toggle Theme"
            >
              {theme === 'zen-light' ? (
                <Moon className="w-5 h-5 text-neutral" />
              ) : (
                <Sun className="w-5 h-5 text-secondary" />
              )}
            </button>

            {/* Direct Primary Action */}
            <a
              href="#contact"
              className="btn btn-primary btn-sm sm:btn-md px-4 sm:px-6 text-sm sm:text-base font-bold shadow-xs"
            >
              ติดต่อที่ปรึกษา
            </a>
          </div>
        </nav>
      </header>

      {/* ========================================================
          FULL SCREEN MAIN CONTENT (100% Width Edge-to-Edge)
          ======================================================== */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 flex flex-col justify-center space-y-10 sm:space-y-12">
        
        {/* Full-Width Hero Section */}
        <section className="w-full card zen-surface p-6 sm:p-10 lg:p-14 rounded-3xl shadow-xs border border-base-300/50 relative overflow-hidden">
          <div className="w-full space-y-4 sm:space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 font-bold text-xs sm:text-sm text-primary">
              <Sparkles className="w-4 h-4 text-secondary shrink-0" />
              <span>มากกว่าการเงิน คือการวางแผนชีวิตที่ดีขึ้นในทุกวัน</span>
            </div>

            {/* Main Headline (Reduced ~30%) */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tight">
              ชีวิตที่มั่นคง เริ่มได้... <br />
              <span className="text-secondary underline decoration-secondary/30 decoration-wavy underline-offset-8">
                จากแผนที่ใช่ วันนี้
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="zen-muted text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-4xl">
              บริการที่ปรึกษาการเงินและประกันชีวิตครบวงจร ออกแบบเฉพาะบุคคลให้เข้าใจง่าย
              โปร่งใส เหมาะสำหรับผู้รับบริการทุกเพศ ทุกวัย เพื่อความอุ่นใจของคุณและครอบครัวตลอด 365 วัน
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#services"
                className="btn btn-primary btn-md sm:btn-lg px-6 sm:px-8 text-sm sm:text-base font-bold shadow-sm flex items-center gap-2"
              >
                <span>สำรวจแผนการเงิน</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="btn btn-outline border-base-300 btn-md sm:btn-lg px-5 sm:px-7 text-sm sm:text-base font-bold"
              >
                นัดหมายปรึกษาฟรี
              </a>

              <span className="badge badge-secondary text-xs sm:text-sm font-bold px-3.5 py-2">
                มั่นคง • มั่งคั่ง • ยั่งยืน
              </span>
            </div>
          </div>
        </section>

        {/* 6 Core Brand Values Bar (100% Full-Width Grid) */}
        <section className="w-full">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.label}
                  className="card zen-surface p-4 sm:p-5 text-center flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-base-300/50 hover:scale-102 transition-transform duration-200"
                >
                  <Icon className="w-6 h-6 text-secondary mb-0.5" />
                  <span className="font-extrabold text-xs sm:text-sm lg:text-base tracking-wider text-primary">
                    {val.label}
                  </span>
                  <span className="text-xs sm:text-sm zen-muted font-medium">
                    {val.text}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            CORE SERVICES SECTION (Full-Width Edge-to-Edge Grid)
            ======================================================== */}
        <section id="services" className="w-full space-y-6 sm:space-y-8">
          <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-3">
            <div>
              <span className="badge badge-secondary font-bold text-xs sm:text-sm mb-2 px-3 py-1">
                TAILORED SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary">
                3 เสาหลักเพื่อความมั่นคงทางการเงิน
              </h2>
            </div>
            <p className="zen-muted text-sm sm:text-base font-medium max-w-xl">
              เลือกหัวข้อที่ตรงกับเป้าหมายชีวิตของคุณในปัจจุบัน (คลิกเพื่อดูรายละเอียด)
            </p>
          </div>

          {/* Cards Grid across 100% width */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === idx;
              return (
                <div
                  key={pillar.title}
                  onClick={() => setSelectedPillar(idx)}
                  className={`card zen-surface p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                    isSelected
                      ? 'ring-2 ring-primary border-primary shadow-md'
                      : 'border-base-300/60 hover:border-primary/50 shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-base-200 text-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="badge badge-outline text-xs font-bold text-primary px-2.5 py-1">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-primary">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm zen-muted font-semibold">
                      {pillar.english}
                    </p>
                    <p className="zen-muted leading-relaxed text-sm sm:text-base font-normal">
                      {pillar.desc}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 pt-3 border-t border-base-200">
                      {pillar.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-4 border-t border-base-200 flex items-center justify-between">
                    <span className="text-xs font-bold zen-muted">
                      LIVING WEALTH 365
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-secondary flex items-center gap-1.5">
                      <span>{isSelected ? 'เลือกอยู่' : 'คลิกเลือกแผนนี้'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            FULL-WIDTH CONTACT & CONSULTATION SECTION
            ======================================================== */}
        <section id="contact" className="w-full">
          <div className="w-full card zen-surface p-6 sm:p-10 lg:p-14 rounded-3xl border border-base-300/60 shadow-sm">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
              
              <div className="space-y-4">
                <span className="badge badge-secondary font-bold text-xs sm:text-sm px-3 py-1">
                  READY TO ASSIST YOU
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
                  พร้อมเริ่มต้นวางแผนการเงินกับเราแล้วหรือยัง?
                </h2>
                <p className="zen-muted leading-relaxed text-sm sm:text-base">
                  เรายินดีให้คำปรึกษาเบื้องต้นโดยไม่มีข้อผูกมัด เพื่อให้คุณและครอบครัวมั่นใจในทุกก้าวสำคัญของชีวิต
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-base-200/80 flex-1">
                    <Phone className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <div className="text-xs zen-muted font-bold">ติดต่อด่วนทางโทรศัพท์</div>
                      <div className="text-base sm:text-lg font-bold text-primary">02-xxx-xxxx</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-base-200/80 flex-1">
                    <Mail className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <div className="text-xs zen-muted font-bold">อีเมลติดต่อ</div>
                      <div className="text-sm sm:text-base font-bold text-primary break-all">contact@livingwealth365.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Promise Checklist */}
              <div className="card bg-base-200 p-6 sm:p-8 rounded-2xl space-y-4 border border-base-300/50">
                <h3 className="font-bold text-base sm:text-lg text-primary flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>คำมั่นสัญญาจากทีมงาน</span>
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm zen-muted font-medium">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>ข้อมูลทุกอย่างของท่านจะถูกเก็บรักษาเป็นความลับสูงสุด</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>แนะนำเฉพาะแผนที่เหมาะสมกับงบประมาณและเป้าหมายจริงเท่านั้น</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>อธิบายเงื่อนไขความคุ้มครองอย่างชัดเจน ตรงไปตรงมา ภาษาเข้าใจง่าย</span>
                  </div>
                </div>
                <div className="pt-2">
                  <button className="btn btn-primary w-full btn-md sm:btn-lg text-sm sm:text-base font-bold shadow-xs">
                    นัดหมายพูดคุยกับที่ปรึกษา
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ========================================================
          FULL-WIDTH FOOTER (Edge-to-Edge)
          ======================================================== */}
      <footer className="w-full mt-10 border-t border-base-300/60 py-6 px-4 sm:px-8 lg:px-12 xl:px-16 bg-base-100">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-bold text-primary text-base sm:text-lg">
              Living Wealth <span className="text-secondary">365</span>
            </span>
            <span className="text-xs zen-muted hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm zen-muted font-medium">
              Financial & Insurance Advisor (มั่นคง • มั่งคั่ง • ยั่งยืน)
            </span>
          </div>
          <div className="text-xs zen-muted">
            © {new Date().getFullYear()} Living Wealth 365. แสดงผลเต็มหน้าจอ 100% ทุกอุปกรณ์.
          </div>
        </div>
      </footer>
    </div>
  );
}
