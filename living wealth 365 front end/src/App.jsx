import { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  ShieldCheck,
  HeartPulse,
  TrendingUp,
  Coins,
  Umbrella,
  Award,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Compass,
  Clock
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('zen-light');
  // Accessibility Font Scaling: 'normal' (base) | 'large' (comfort) | 'xlarge' (senior/extra legible)
  const [fontScale, setFontScale] = useState('large');
  const [selectedPillar, setSelectedPillar] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'zen-light' ? 'zen-dark' : 'zen-light'));
  };

  const cycleFontScale = () => {
    if (fontScale === 'normal') setFontScale('large');
    else if (fontScale === 'large') setFontScale('xlarge');
    else setFontScale('normal');
  };

  const getFontScaleLabel = () => {
    if (fontScale === 'normal') return 'ตัวอักษร: ปกติ (A)';
    if (fontScale === 'large') return 'ตัวอักษร: สบายตา (A+)';
    return 'ตัวอักษร: ขนาดใหญ่ (A++)';
  };

  const getContainerTextClass = () => {
    if (fontScale === 'normal') return 'text-base';
    if (fontScale === 'large') return 'text-lg sm:text-xl';
    return 'text-xl sm:text-2xl';
  };

  const PILLARS = [
    {
      title: 'วางแผนคุ้มครองชีวิต & สุขภาพ',
      english: 'Life & Health Protection',
      desc: 'สร้างเกราะป้องกันค่ารักษาพยาบาลและโรคร้ายแรง ปกป้องความมั่นคงของคนที่คุณรัก',
      icon: ShieldCheck,
      badge: 'LIFE & HEALTH',
      points: ['ประกันสุขภาพเหมาจ่ายพรีเมียม', 'ชดเชยรายได้ & โรคร้ายแรง', 'ส่งต่อมรดกไร้ภาระ'],
    },
    {
      title: 'วางแผนเกษียณสุขใจ 365 วัน',
      english: 'Retirement & Wealth Flow',
      desc: 'ออกแบบกระแสเงินสดบำนาญตลอดชีพ ให้คุณใช้ชีวิตอย่างอิสระและมีความสุขทุกวัน',
      icon: HeartPulse,
      badge: 'RETIREMENT',
      points: ['คำนวณเงินกองทุนเกษียณตามเป้าหมาย', 'วางแผนเงินออมบำนาญการันตี', 'สิทธิลดหย่อนภาษีสูงสุด'],
    },
    {
      title: 'บริหารภาษี & ส่งต่อมรดก',
      english: 'Tax & Legacy Succession',
      desc: 'จัดการสิทธิประโยชน์ทางภาษีบุคคลอย่างถูกต้อง พร้อมวางแผนส่งต่อทรัพย์สินอย่างราบรื่น',
      icon: Coins,
      badge: 'LEGACY',
      points: ['วางแผนภาษีถูกต้องตามกฎหมาย', 'ส่งมอบทรัพย์สินปลอดภัย', 'ลดความขัดแย้งในครอบครัว'],
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
    <div
      className={`min-h-screen w-full flex flex-col justify-between font-sans transition-all duration-200 ${getContainerTextClass()}`}
    >
      {/* ========================================================
          FULL SCREEN HEADER & NAVIGATION (Mobile, iPad, Desktop)
          ======================================================== */}
      <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 py-3">
        <nav className="navbar zen-surface w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 rounded-2xl shadow-sm flex items-center justify-between">
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

          {/* Accessibility & Theme Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-time Font Size Adjuster for All Ages & Elderly Accessibility */}
            <button
              onClick={cycleFontScale}
              className="btn btn-outline border-base-300 btn-sm sm:btn-md flex items-center gap-1.5 px-3 font-semibold text-xs sm:text-sm"
              title="ปรับขนาดตัวอักษรเพื่อให้อ่านง่ายขึ้น"
              aria-label="Toggle Font Size"
            >
              <span>{getFontScaleLabel()}</span>
            </button>

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

            {/* Direct Quick Action Button */}
            <a
              href="#contact"
              className="btn btn-primary btn-sm sm:btn-md px-4 sm:px-6 font-bold shadow-sm"
            >
              ติดต่อที่ปรึกษา
            </a>
          </div>
        </nav>
      </header>

      {/* ========================================================
          FULL SCREEN HERO SECTION
          ======================================================== */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col justify-center space-y-10 sm:space-y-16">
        {/* Hero Banner */}
        <section className="w-full card zen-surface p-6 sm:p-10 lg:p-14 shadow-md rounded-3xl relative overflow-hidden">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-base-200 border border-base-300 font-bold text-sm sm:text-base text-primary">
              <Sparkles className="w-4 h-4 text-secondary shrink-0" />
              <span>มากกว่าการเงิน คือการวางแผนชีวิตที่ดีขึ้นในทุกวัน</span>
            </div>

            {/* Main Headline (Scaled for Maximum Readability across Devices) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tight">
              ชีวิตที่มั่นคง เริ่มได้... <br />
              <span className="text-secondary underline decoration-secondary/30 decoration-wavy underline-offset-8">
                จากแผนที่ใช่ วันนี้
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="zen-muted leading-relaxed font-normal max-w-3xl">
              บริการที่ปรึกษาการเงินและประกันชีวิตครบวงจร ออกแบบเฉพาะบุคคลให้เข้าใจง่าย
              โปร่งใส เหมาะสำหรับทุกช่วงวัยของชีวิต เพื่อความอุ่นใจของคุณและครอบครัวตลอด 365 วัน
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#services"
                className="btn btn-primary btn-md sm:btn-lg px-6 sm:px-8 font-bold shadow-md flex items-center gap-2"
              >
                <span>สำรวจแผนการเงิน</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#contact"
                className="btn btn-outline border-base-300 btn-md sm:btn-lg px-6 font-bold"
              >
                นัดหมายปรึกษาฟรี
              </a>

              <div className="badge badge-secondary badge-lg font-bold px-4 py-3">
                มั่นคง • มั่งคั่ง • ยั่งยืน
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Brand Values Bar (Responsive Grid for Smartphone, iPad, and Desktop) */}
        <section className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.label}
                  className="card zen-surface p-4 text-center flex flex-col items-center justify-center gap-1.5 rounded-2xl hover:scale-105 transition-transform duration-200 border border-base-300/50"
                >
                  <Icon className="w-5 h-5 text-secondary" />
                  <span className="font-extrabold text-xs sm:text-sm tracking-wider text-primary">
                    {val.label}
                  </span>
                  <span className="text-xs zen-muted font-medium">{val.text}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            CORE SERVICES SECTION (Zen Glass Cards, High Readability)
            ======================================================== */}
        <section id="services" className="w-full space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="badge badge-secondary font-bold text-xs sm:text-sm mb-2">
                TAILORED SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-primary">
                3 เสาหลักเพื่อความมั่นคงทางการเงิน
              </h2>
            </div>
            <p className="zen-muted text-sm sm:text-base max-w-md">
              เลือกหัวข้อที่ตรงกับเป้าหมายชีวิตของคุณในปัจจุบัน
            </p>
          </div>

          {/* Cards Grid: 1 col on mobile, 3 cols on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === idx;
              return (
                <div
                  key={pillar.title}
                  onClick={() => setSelectedPillar(idx)}
                  className={`card zen-surface p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                    isSelected
                      ? 'ring-2 ring-primary border-primary shadow-lg'
                      : 'border-base-300 hover:border-primary/50 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-base-200 text-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="badge badge-outline text-xs font-bold text-primary">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-primary">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm zen-muted font-medium">
                      {pillar.english}
                    </p>
                    <p className="zen-muted leading-relaxed text-sm sm:text-base">
                      {pillar.desc}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2 pt-2 border-t border-base-200">
                      {pillar.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 text-sm sm:text-base">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-4 border-t border-base-200 flex items-center justify-between">
                    <span className="text-xs font-bold zen-muted">LIVING WEALTH 365</span>
                    <span className="font-bold text-sm text-secondary flex items-center gap-1">
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
            FULL-WIDTH CONTACT & CONSULTATION CARD (Clear Tap Targets)
            ======================================================== */}
        <section id="contact" className="w-full">
          <div className="card zen-surface p-6 sm:p-10 lg:p-12 rounded-3xl border border-base-300 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="badge badge-secondary font-bold text-xs sm:text-sm">
                  READY TO ASSIST YOU
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-primary leading-tight">
                  พร้อมเริ่มต้นวางแผนการเงินกับเราแล้วหรือยัง?
                </h2>
                <p className="zen-muted leading-relaxed text-sm sm:text-base">
                  เรายินดีให้คำปรึกษาเบื้องต้นโดยไม่มีข้อผูกมัด เพื่อให้คุณและครอบครัวมั่นใจในทุกก้าวสำคัญของชีวิต
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-base-200/80">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <div className="text-xs zen-muted font-bold">ติดต่อด่วนทางโทรศัพท์</div>
                      <div className="text-base sm:text-lg font-extrabold text-primary">02-xxx-xxxx</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-base-200/80">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <div className="text-xs zen-muted font-bold">อีเมลติดต่อ</div>
                      <div className="text-base sm:text-lg font-extrabold text-primary">contact@livingwealth365.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Promise Checklist */}
              <div className="card bg-base-200 p-6 sm:p-8 rounded-2xl space-y-3">
                <h3 className="font-extrabold text-base sm:text-lg text-primary flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>คำมั่นสัญญาจากทีมงาน Living Wealth 365</span>
                </h3>
                <div className="space-y-2 text-sm sm:text-base zen-muted">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>ข้อมูลทุกอย่างของท่านจะถูกเก็บรักษาเป็นความลับสูงสุด</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>แนะนำเฉพาะแผนที่เหมาะสมกับงบประมาณและเป้าหมายจริงเท่านั้น</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>อธิบายเงื่อนไขความคุ้มครองอย่างชัดเจน ตรงไปตรงมา ภาษาเข้าใจง่าย</span>
                  </div>
                </div>
                <div className="pt-3">
                  <button className="btn btn-primary w-full btn-md sm:btn-lg font-bold shadow-sm">
                    นัดหมายพูดคุยกับที่ปรึกษา
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          FULL SCREEN ACCESSIBLE FOOTER
          ======================================================== */}
      <footer className="w-full mt-12 border-t border-base-300/80 py-8 px-4 sm:px-6 lg:px-8 bg-base-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-extrabold text-primary text-base sm:text-lg">
              Living Wealth <span className="text-secondary">365</span>
            </span>
            <span className="text-xs zen-muted hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm zen-muted">
              Financial & Insurance Advisor (มั่นคง • มั่งคั่ง • ยั่งยืน)
            </span>
          </div>
          <div className="text-xs sm:text-sm zen-muted">
            © {new Date().getFullYear()} Living Wealth 365. รองรับหน้าจอทุกขนาด (Smartphone, iPad, Desktop).
          </div>
        </div>
      </footer>
    </div>
  );
}
