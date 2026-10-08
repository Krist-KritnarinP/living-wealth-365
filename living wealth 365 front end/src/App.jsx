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
      <header className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sticky top-0 z-50">
        <nav className="navbar zen-surface w-full px-6 sm:px-10 py-4 rounded-3xl shadow-sm flex items-center justify-between border border-base-300/60">
          {/* Logo & Brand Identity (A++ Scale) */}
          <div className="flex items-center gap-4">
            <img
              src="/logo.jpg"
              alt="Living Wealth 365 Logo"
              className="h-12 sm:h-16 w-auto object-contain rounded-xl shadow-xs"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-primary leading-tight">
                Living Wealth <span className="text-secondary">365</span>
              </span>
              <span className="text-sm sm:text-base lg:text-lg font-bold tracking-wide zen-muted">
                FINANCIAL & INSURANCE ADVISOR • มั่นคง มั่งคั่ง ยั่งยืน
              </span>
            </div>
          </div>

          {/* Action Items & Theme Toggle (A++ Size) */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="badge badge-secondary text-sm sm:text-base font-extrabold px-4 py-2 hidden md:inline-flex">
              ขนาดตัวอักษร A++ (อ่านง่ายทุกวัย)
            </span>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-md sm:btn-lg"
              title="สลับโหมดสว่าง / มืด"
              aria-label="Toggle Theme"
            >
              {theme === 'zen-light' ? (
                <Moon className="w-6 h-6 text-neutral" />
              ) : (
                <Sun className="w-6 h-6 text-secondary" />
              )}
            </button>

            {/* Direct Primary Action */}
            <a
              href="#contact"
              className="btn btn-primary btn-md sm:btn-lg px-6 sm:px-8 text-base sm:text-xl font-bold shadow-md"
            >
              ติดต่อที่ปรึกษา
            </a>
          </div>
        </nav>
      </header>

      {/* ========================================================
          FULL SCREEN MAIN CONTENT (100% Width Edge-to-Edge)
          ======================================================== */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-10 flex flex-col justify-center space-y-12 sm:space-y-16">
        
        {/* Full-Width Hero Section */}
        <section className="w-full card zen-surface p-8 sm:p-14 lg:p-20 rounded-3xl shadow-md border border-base-300/60 relative overflow-hidden">
          <div className="w-full space-y-6 sm:space-y-8">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-base-200 border border-base-300 font-extrabold text-base sm:text-xl text-primary">
              <Sparkles className="w-5 h-5 text-secondary shrink-0" />
              <span>มากกว่าการเงิน คือการวางแผนชีวิตที่ดีขึ้นในทุกวัน</span>
            </div>

            {/* Main Headline (A++ Font Scale) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary leading-tight tracking-tight">
              ชีวิตที่มั่นคง เริ่มได้... <br />
              <span className="text-secondary underline decoration-secondary/30 decoration-wavy underline-offset-8">
                จากแผนที่ใช่ วันนี้
              </span>
            </h1>

            {/* Subtitle / Value Proposition (A++ Font Scale) */}
            <p className="zen-muted text-xl sm:text-2xl lg:text-3xl leading-relaxed font-normal max-w-5xl">
              บริการที่ปรึกษาการเงินและประกันชีวิตครบวงจร ออกแบบเฉพาะบุคคลให้เข้าใจง่าย
              โปร่งใส เหมาะสำหรับผู้รับบริการทุกเพศ ทุกวัย เพื่อความอุ่นใจของคุณและครอบครัวตลอด 365 วัน
            </p>

            {/* Action Buttons (Full Large Tap Targets) */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#services"
                className="btn btn-primary btn-lg sm:btn-xl px-8 sm:px-12 text-lg sm:text-2xl font-black shadow-lg flex items-center gap-3"
              >
                <span>สำรวจแผนการเงิน</span>
                <ArrowRight className="w-6 h-6" />
              </a>

              <a
                href="#contact"
                className="btn btn-outline border-base-300 btn-lg sm:btn-xl px-8 sm:px-10 text-lg sm:text-2xl font-black"
              >
                นัดหมายปรึกษาฟรี
              </a>

              <span className="badge badge-secondary badge-lg text-base sm:text-xl font-black px-6 py-4">
                มั่นคง • มั่งคั่ง • ยั่งยืน
              </span>
            </div>
          </div>
        </section>

        {/* 6 Core Brand Values Bar (100% Full-Width Grid) */}
        <section className="w-full">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.label}
                  className="card zen-surface p-6 sm:p-8 text-center flex flex-col items-center justify-center gap-2 rounded-3xl border border-base-300/60 hover:scale-105 transition-transform duration-200"
                >
                  <Icon className="w-8 h-8 text-secondary mb-1" />
                  <span className="font-black text-base sm:text-xl lg:text-2xl tracking-wider text-primary">
                    {val.label}
                  </span>
                  <span className="text-sm sm:text-base lg:text-lg zen-muted font-bold">
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
        <section id="services" className="w-full space-y-8 sm:space-y-10">
          <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span className="badge badge-secondary font-black text-sm sm:text-lg mb-3 px-4 py-2">
                TAILORED SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-primary">
                3 เสาหลักเพื่อความมั่นคงทางการเงิน
              </h2>
            </div>
            <p className="zen-muted text-lg sm:text-2xl font-medium max-w-2xl">
              เลือกหัวข้อที่ตรงกับเป้าหมายชีวิตของคุณในปัจจุบัน (คลิกเพื่อดูรายละเอียด)
            </p>
          </div>

          {/* Cards Grid across 100% width */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === idx;
              return (
                <div
                  key={pillar.title}
                  onClick={() => setSelectedPillar(idx)}
                  className={`card zen-surface p-8 sm:p-10 lg:p-12 rounded-3xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                    isSelected
                      ? 'ring-4 ring-primary border-primary shadow-2xl'
                      : 'border-base-300/80 hover:border-primary shadow-sm'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-16 rounded-2xl bg-base-200 text-primary flex items-center justify-center">
                        <Icon className="w-9 h-9" />
                      </div>
                      <span className="badge badge-outline text-sm sm:text-base font-black text-primary px-3 py-2">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
                      {pillar.title}
                    </h3>
                    <p className="text-base sm:text-lg zen-muted font-bold">
                      {pillar.english}
                    </p>
                    <p className="zen-muted leading-relaxed text-lg sm:text-xl font-normal">
                      {pillar.desc}
                    </p>

                    {/* Bullet Points (A++ Scale) */}
                    <ul className="space-y-4 pt-4 border-t border-base-200">
                      {pillar.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-base sm:text-xl font-medium">
                          <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 mt-6 border-t border-base-200 flex items-center justify-between">
                    <span className="text-sm sm:text-base font-extrabold zen-muted">
                      LIVING WEALTH 365
                    </span>
                    <span className="font-black text-base sm:text-xl text-secondary flex items-center gap-2">
                      <span>{isSelected ? 'เลือกอยู่' : 'คลิกเลือกแผนนี้'}</span>
                      <ArrowRight className="w-5 h-5" />
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
          <div className="w-full card zen-surface p-8 sm:p-14 lg:p-20 rounded-3xl border border-base-300/80 shadow-lg">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
              
              <div className="space-y-6">
                <span className="badge badge-secondary font-black text-sm sm:text-lg px-4 py-2">
                  READY TO ASSIST YOU
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-primary leading-tight">
                  พร้อมเริ่มต้นวางแผนการเงินกับเราแล้วหรือยัง?
                </h2>
                <p className="zen-muted leading-relaxed text-lg sm:text-2xl">
                  เรายินดีให้คำปรึกษาเบื้องต้นโดยไม่มีข้อผูกมัด เพื่อให้คุณและครอบครัวมั่นใจในทุกก้าวสำคัญของชีวิต
                </p>

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-base-200/90 flex-1">
                    <Phone className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <div className="text-sm sm:text-base zen-muted font-black">ติดต่อด่วนทางโทรศัพท์</div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black text-primary">02-xxx-xxxx</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-base-200/90 flex-1">
                    <Mail className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <div className="text-sm sm:text-base zen-muted font-black">อีเมลติดต่อ</div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-black text-primary break-all">contact@livingwealth365.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Promise Checklist */}
              <div className="card bg-base-200 p-8 sm:p-12 rounded-3xl space-y-6 border border-base-300/60">
                <h3 className="font-black text-xl sm:text-3xl text-primary flex items-center gap-3">
                  <Users className="w-7 h-7 text-secondary" />
                  <span>คำมั่นสัญญาจากทีมงาน</span>
                </h3>
                <div className="space-y-4 text-base sm:text-xl zen-muted font-medium">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                    <span>ข้อมูลทุกอย่างของท่านจะถูกเก็บรักษาเป็นความลับสูงสุด</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                    <span>แนะนำเฉพาะแผนที่เหมาะสมกับงบประมาณและเป้าหมายจริงเท่านั้น</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                    <span>อธิบายเงื่อนไขความคุ้มครองอย่างชัดเจน ตรงไปตรงมา ภาษาเข้าใจง่าย</span>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="btn btn-primary w-full btn-lg sm:btn-xl text-lg sm:text-2xl font-black shadow-md">
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
      <footer className="w-full mt-16 border-t border-base-300/80 py-10 px-4 sm:px-8 lg:px-12 xl:px-16 bg-base-100">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span className="font-black text-primary text-xl sm:text-3xl">
              Living Wealth <span className="text-secondary">365</span>
            </span>
            <span className="text-base zen-muted hidden sm:inline">•</span>
            <span className="text-base sm:text-xl zen-muted font-bold">
              Financial & Insurance Advisor (มั่นคง • มั่งคั่ง • ยั่งยืน)
            </span>
          </div>
          <div className="text-sm sm:text-lg zen-muted font-medium">
            © {new Date().getFullYear()} Living Wealth 365. แสดงผลเต็มหน้าจอ (Full Screen 100%) ทุกอุปกรณ์.
          </div>
        </div>
      </footer>
    </div>
  );
}
