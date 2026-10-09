import { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Flame,
  Droplets,
  Wind,
  Crown,
  Gem,
  CheckCircle2,
  Coins,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { resolveAssetUrl } from '../../api';

// 🌟 ข้อมูลมงคล 7 วัน พร้อมชุดสีออร่า, เอฟเฟกต์แสง, และคริสตัลอัญมณีคู่บารมี
const DAYS_DATA = [
  {
    day: 'วันอาทิตย์',
    shortName: 'อาทิตย์',
    solarSymbol: '☀️',
    color: 'สีแดงทับทิม / สีทองคำ',
    colorDots: ['#EF4444', '#F59E0B'],
    element: 'ธาตุไฟ & ธาตุทอง',
    elementIcon: Flame,
    recommendedStone: 'หินไหมทอง & ทับทิม (Golden Rutilated Quartz)',
    stoneSubtitle: 'ราชาแห่งความมั่งคั่ง & สุริยะบารมี',
    stoneId: 'prod-4',
    power: 'เสริมอำนาจวาสนา ดึงดูดกระแสโชคลาภเงินทองไหลมาเทมาตลอด 365 วัน เหมาะกับเจ้าของกิจการและผู้นำ',
    auraTheme: {
      name: 'ruby-gold',
      primaryGlow: 'rgba(239, 68, 68, 0.35)',
      secondaryGlow: 'rgba(245, 158, 11, 0.25)',
      backdropGradient: 'from-red-500/20 via-amber-500/15 to-transparent',
      btnActive:
        'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-white shadow-xl shadow-red-500/40 ring-2 ring-amber-300 scale-105',
      btnInactive: 'hover:border-red-400 hover:text-red-500 hover:shadow-md hover:shadow-red-500/20',
      cardBorder: 'border-red-500/40 shadow-2xl shadow-red-500/15',
      badgeClass:
        'bg-gradient-to-r from-red-500/15 to-amber-500/15 text-red-600 dark:text-red-300 border-red-500/30',
      gemOrbGradient:
        'radial-gradient(circle at 35% 35%, #FEF08A 0%, #F59E0B 35%, #DC2626 75%, #7F1D1D 100%)',
      gemInnerLight: '#FEF08A',
      ctaGradient:
        'bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 shadow-xl shadow-red-500/40 text-white hover:shadow-red-500/60',
      textAccent: 'text-red-500',
      haloRing: 'border-amber-400/50',
    },
  },
  {
    day: 'วันจันทร์',
    shortName: 'จันทร์',
    solarSymbol: '🌙',
    color: 'สีเหลืองนวลมุก / สีแชมเปญโกลด์',
    colorDots: ['#FDE047', '#D97706'],
    element: 'ธาตุดิน & ธาตุทองอ่อน',
    elementIcon: Coins,
    recommendedStone: 'หินไทเกอร์อาย (Tiger Eye) & ซิทริน',
    stoneSubtitle: 'หินแห่งความกล้าหาญ & ความมั่นคงทางการเงิน',
    stoneId: 'prod-1',
    power: 'เสริมความมั่นคงทางใจ การตัดสินใจทางการเงินแม่นยำเด็ดขาด การงานราบรื่น และขจัดความลังเลสงสัย',
    auraTheme: {
      name: 'moon-amber',
      primaryGlow: 'rgba(245, 158, 11, 0.35)',
      secondaryGlow: 'rgba(253, 224, 71, 0.25)',
      backdropGradient: 'from-amber-400/20 via-yellow-300/15 to-transparent',
      btnActive:
        'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-900 font-black shadow-xl shadow-amber-500/40 ring-2 ring-yellow-300 scale-105',
      btnInactive: 'hover:border-amber-400 hover:text-amber-600 hover:shadow-md hover:shadow-amber-500/20',
      cardBorder: 'border-amber-500/40 shadow-2xl shadow-amber-500/15',
      badgeClass:
        'bg-gradient-to-r from-amber-500/15 to-yellow-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      gemOrbGradient:
        'radial-gradient(circle at 35% 35%, #FFFBEB 0%, #F59E0B 40%, #B45309 75%, #451A03 100%)',
      gemInnerLight: '#FFFBEB',
      ctaGradient:
        'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 shadow-xl shadow-amber-500/40 text-stone-950 font-black hover:shadow-amber-500/60',
      textAccent: 'text-amber-500',
      haloRing: 'border-yellow-300/60',
    },
  },
  {
    day: 'วันอังคาร',
    shortName: 'อังคาร',
    solarSymbol: '🌸',
    color: 'สีชมพูกุหลาบ / สีบานเย็นประกายเพชร',
    colorDots: ['#EC4899', '#DB2777'],
    element: 'ธาตุน้ำ & ธาตุทอง',
    elementIcon: Droplets,
    recommendedStone: 'หินโรสควอตซ์ (Rose Quartz) & มอร์แกไนต์',
    stoneSubtitle: 'อัญมณีแห่งเมตตามหานิยม & เสน่ห์เจรจาค้าขาย',
    stoneId: 'prod-2',
    power: 'เสริมเสน่ห์เมตตามหานิยม ผู้ใหญ่และลูกค้าเอ็นดู เจรจาปิดดีลธุรกิจราบรื่น ความสัมพันธ์มั่นคงเปี่ยมสุข',
    auraTheme: {
      name: 'rose-quartz',
      primaryGlow: 'rgba(236, 72, 153, 0.35)',
      secondaryGlow: 'rgba(219, 39, 119, 0.25)',
      backdropGradient: 'from-pink-500/20 via-rose-400/15 to-transparent',
      btnActive:
        'bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 text-white shadow-xl shadow-pink-500/40 ring-2 ring-pink-300 scale-105',
      btnInactive: 'hover:border-pink-400 hover:text-pink-500 hover:shadow-md hover:shadow-pink-500/20',
      cardBorder: 'border-pink-500/40 shadow-2xl shadow-pink-500/15',
      badgeClass:
        'bg-gradient-to-r from-pink-500/15 to-rose-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30',
      gemOrbGradient:
        'radial-gradient(circle at 35% 35%, #FDF2F8 0%, #F472B6 40%, #DB2777 75%, #831843 100%)',
      gemInnerLight: '#FDF2F8',
      ctaGradient:
        'bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 shadow-xl shadow-pink-500/40 text-white hover:shadow-pink-500/60',
      textAccent: 'text-pink-500',
      haloRing: 'border-pink-300/60',
    },
  },
  {
    day: 'วันพุธ (กลางวัน/กลางคืน)',
    shortName: 'พุธ',
    solarSymbol: '🌿',
    color: 'สีเขียวมรกตเหนี่ยวทรัพย์ / สีน้ำเงินหยก',
    colorDots: ['#10B981', '#059669'],
    element: 'ธาตุลม & ธาตุดิน',
    elementIcon: Wind,
    recommendedStone: 'หินมาลาไคต์ (Malachite) ลายมรกต',
    stoneSubtitle: 'หินคุ้มครองพ่อค้าแม่ค้า & ปิดการขายมหาศาล',
    stoneId: 'prod-6',
    power: 'เสริมการเจรจาค้าขาย ปิดการขายสำเร็จ ป้องกันการถูกเอารัดเอาเปรียบ ขจัดอุปสรรคและดูดทรัพย์สินไม่ขาดสาย',
    auraTheme: {
      name: 'emerald-jade',
      primaryGlow: 'rgba(16, 185, 129, 0.35)',
      secondaryGlow: 'rgba(5, 150, 105, 0.25)',
      backdropGradient: 'from-emerald-500/20 via-teal-400/15 to-transparent',
      btnActive:
        'bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 text-white shadow-xl shadow-emerald-500/40 ring-2 ring-emerald-300 scale-105',
      btnInactive: 'hover:border-emerald-400 hover:text-emerald-500 hover:shadow-md hover:shadow-emerald-500/20',
      cardBorder: 'border-emerald-500/40 shadow-2xl shadow-emerald-500/15',
      badgeClass:
        'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      gemOrbGradient:
        'radial-gradient(circle at 35% 35%, #ECFDF5 0%, #10B981 40%, #065F46 75%, #022C22 100%)',
      gemInnerLight: '#ECFDF5',
      ctaGradient:
        'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 shadow-xl shadow-emerald-500/40 text-white hover:shadow-emerald-500/60',
      textAccent: 'text-emerald-500',
      haloRing: 'border-emerald-300/60',
    },
  },
  {
    day: 'วันพฤหัสบดี',
    shortName: 'พฤหัสบดี',
    solarSymbol: '👑',
    color: 'สีส้มแสดทองอำพัน / สีบุษราคัม',
    colorDots: ['#F97316', '#F59E0B'],
    element: 'ธาตุดิน & ธาตุทอง',
    elementIcon: Crown,
    recommendedStone: 'หินไหมทองจักรพรรดิ (Imperial Golden Quartz)',
    stoneSubtitle: 'ราชาโชค & สติปัญญาบารมีครูบาอาจารย์',
    stoneId: 'prod-4',
    power: 'เสริมสติปัญญา บารมีครูบาอาจารย์ ความมั่งคั่งยั่งยืน การเงินมั่นคง และความเจริญรุ่งเรืองในหน้าที่การงาน',
    auraTheme: {
      name: 'amber-imperial',
      primaryGlow: 'rgba(249, 115, 22, 0.35)',
      secondaryGlow: 'rgba(245, 158, 11, 0.25)',
      backdropGradient: 'from-orange-500/20 via-amber-400/15 to-transparent',
      btnActive:
        'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-xl shadow-orange-500/40 ring-2 ring-orange-300 scale-105',
      btnInactive: 'hover:border-orange-400 hover:text-orange-500 hover:shadow-md hover:shadow-orange-500/20',
      cardBorder: 'border-orange-500/40 shadow-2xl shadow-orange-500/15',
      badgeClass:
        'bg-gradient-to-r from-orange-500/15 to-amber-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30',
      gemOrbGradient:
        'radial-gradient(circle at 35% 35%, #FFF7ED 0%, #F97316 40%, #C2410C 75%, #7C2D12 100%)',
      gemInnerLight: '#FFF7ED',
      ctaGradient:
        'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-xl shadow-orange-500/40 text-white hover:shadow-orange-500/60',
      textAccent: 'text-orange-500',
      haloRing: 'border-orange-300/60',
    },
  },
  {
    day: 'วันศุกร์',
    shortName: 'ศุกร์',
    solarSymbol: '💎',
    color: 'สีฟ้าครามไพลิน / สีน้ำทะเลสดใส',
    colorDots: ['#0EA5E9', '#3B82F6'],
    element: 'ธาตุน้ำบริสุทธิ์',
    elementIcon: Droplets,
    recommendedStone: 'หินลาพิส ลาซูลี & อความารีน (Lapis & Aquamarine)',
    stoneSubtitle: 'ไพลินเรียกทรัพย์ & จินตนาการสร้างความรวย',
    stoneId: 'prod-3',
    power: 'เสริมความคิดสร้างสรรค์ ความสุข ความรัก ทรัพย์สินงอกเงย ดึงดูดมิตรสหายที่ดีและโอกาสทางธุรกิจใหม่ๆ',
    auraTheme: {
      name: 'sapphire-ocean',
      primaryGlow: 'rgba(14, 165, 233, 0.35)',
      secondaryGlow: 'rgba(59, 130, 246, 0.25)',
      backdropGradient: 'from-sky-400/20 via-blue-500/15 to-transparent',
      btnActive:
        'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-sky-500/40 ring-2 ring-sky-300 scale-105',
      btnInactive: 'hover:border-sky-400 hover:text-sky-500 hover:shadow-md hover:shadow-sky-500/20',
      cardBorder: 'border-sky-500/40 shadow-2xl shadow-sky-500/15',
      badgeClass:
        'bg-gradient-to-r from-sky-500/15 to-blue-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
      gemOrbGradient:
        'radial-gradient(circle at 35% 35%, #F0F9FF 0%, #0284C7 40%, #1E40AF 75%, #0F172A 100%)',
      gemInnerLight: '#F0F9FF',
      ctaGradient:
        'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 shadow-xl shadow-sky-500/40 text-white hover:shadow-sky-500/60',
      textAccent: 'text-sky-500',
      haloRing: 'border-sky-300/60',
    },
  },
  {
    day: 'วันเสาร์',
    shortName: 'เสาร์',
    solarSymbol: '🪐',
    color: 'สีม่วงอเมทิสต์ราชวงศ์ / สีดำประกายดาว',
    colorDots: ['#9333EA', '#6B21A8'],
    element: 'ธาตุไฟ & ธาตุลม',
    elementIcon: Gem,
    recommendedStone: 'หินอเมทิสต์ (Royal Amethyst Geode)',
    stoneSubtitle: 'พลังปกป้องคุ้มภัย & จิตวิญญาณแห่งความสงบสุข',
    stoneId: 'prod-5',
    power: 'เสริมพลังปกป้องคุ้มครอง จิตใจสงบนิ่ง ปัดเป่าอุปสรรค พลังลบ และโรคภัย เสริมสมาธิในการบริหารทรัพย์สินก้อนใหญ่',
    auraTheme: {
      name: 'amethyst-cosmic',
      primaryGlow: 'rgba(147, 51, 234, 0.35)',
      secondaryGlow: 'rgba(107, 33, 168, 0.25)',
      backdropGradient: 'from-purple-600/20 via-violet-500/15 to-transparent',
      btnActive:
        'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white shadow-xl shadow-purple-500/40 ring-2 ring-purple-300 scale-105',
      btnInactive: 'hover:border-purple-400 hover:text-purple-500 hover:shadow-md hover:shadow-purple-500/20',
      cardBorder: 'border-purple-500/40 shadow-2xl shadow-purple-500/15',
      badgeClass:
        'bg-gradient-to-r from-purple-500/15 to-violet-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
      gemOrbGradient:
        'radial-gradient(circle at 35% 35%, #FAF5FF 0%, #9333EA 40%, #581C87 75%, #2E1065 100%)',
      gemInnerLight: '#FAF5FF',
      ctaGradient:
        'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 shadow-xl shadow-purple-500/40 text-white hover:shadow-purple-500/60',
      textAccent: 'text-purple-500',
      haloRing: 'border-purple-300/60',
    },
  },
];

export default function StoneCalculator({ onSelectStone }) {
  const { currentUser, products } = useAuth();
  const [selectedDay, setSelectedDay] = useState('วันพุธ (กลางวัน/กลางคืน)');

  // Auto-detect day of week if user has registered birthDate
  useEffect(() => {
    if (currentUser?.birthDate) {
      try {
        const date = new Date(currentUser.birthDate);
        const dayIndex = date.getDay(); // 0 is Sunday
        const dayNames = [
          'วันอาทิตย์',
          'วันจันทร์',
          'วันอังคาร',
          'วันพุธ (กลางวัน/กลางคืน)',
          'วันพฤหัสบดี',
          'วันศุกร์',
          'วันเสาร์',
        ];
        setSelectedDay(dayNames[dayIndex]);
      } catch (err) {
        // keep current default
      }
    }
  }, [currentUser]);

  const currentResult = useMemo(() => {
    return DAYS_DATA.find((d) => d.day === selectedDay) || DAYS_DATA[0];
  }, [selectedDay]);

  // Find genuine product matching the stoneId or name
  const matchedProduct = useMemo(() => {
    if (!products || products.length === 0) return null;
    return (
      products.find((p) => p.id === currentResult.stoneId) ||
      products.find((p) => p.name?.includes(currentResult.recommendedStone.split(' ')[0]))
    );
  }, [products, currentResult]);

  const ElementIcon = currentResult.elementIcon;

  return (
    <div className="w-full relative py-6">
      {/* 🔮 1. DYNAMIC AMBIENT BACKDROP GLOW (ปรับสีเรืองแสงตามวันแบบ Real-Time) */}
      <div
        className={`absolute -inset-4 sm:-inset-8 rounded-[3rem] bg-gradient-to-br ${currentResult.auraTheme.backdropGradient} filter blur-3xl opacity-75 transition-all duration-1000 -z-10 animate-pulse-glow pointer-events-none`}
      />

      {/* 🌟 2. MAIN ZEN GLASS CONTAINER */}
      <div
        className={`w-full zen-surface rounded-3xl p-6 sm:p-10 lg:p-12 border ${currentResult.auraTheme.cardBorder} transition-all duration-700 relative overflow-hidden backdrop-blur-xl`}
      >
        {/* Floating background celestial starlight accents */}
        <div className="absolute top-4 right-6 opacity-20 pointer-events-none animate-twinkle">
          <Sparkles className={`w-16 h-16 ${currentResult.auraTheme.textAccent}`} />
        </div>
        <div className="absolute bottom-6 left-8 opacity-15 pointer-events-none animate-twinkle delay-500">
          <Sparkles className={`w-12 h-12 ${currentResult.auraTheme.textAccent}`} />
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs sm:text-sm font-black tracking-wide shadow-xs">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>ระบบคำนวณหินมงคลเฉพาะบุคคล 365 วัน • เสริมดวงดึงดูดทรัพย์</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight">
            เลือกวันเกิดของคุณ เพื่อค้นพบ{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${currentResult.auraTheme.textAccent.replace(
                'text-',
                'from-'
              )} to-amber-500 transition-colors duration-700`}
            >
              หินนำโชคคู่บารมี
            </span>
          </h3>

          <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
            ผสานศาสตร์อัญมณีเข้ากับดวงชะตา เพื่อเสริมพลังกระแสเงินสด ความสุข และความคุ้มครองตลอด 365 วัน
          </p>
        </div>

        {/* 🌈 3. CELESTIAL DAY SELECTOR TABS (คลิกแล้วเปลี่ยนสี + มีแสง Glow นีออน) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto mb-10">
          {DAYS_DATA.map((item) => {
            const isSelected = selectedDay === item.day;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                type="button"
                className={`group relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? `${item.auraTheme.btnActive} z-10`
                    : `bg-base-200/80 text-base-content/80 border-base-300/60 ${item.auraTheme.btnInactive}`
                }`}
              >
                {/* Solar / Planet Symbol */}
                <span className="text-base sm:text-lg transition-transform group-hover:scale-125">
                  {item.solarSymbol}
                </span>

                {/* Day label */}
                <span>{item.day}</span>

                {/* Color Dot Indicator */}
                <span className="flex items-center gap-0.5 ml-0.5">
                  {item.colorDots.map((dot, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full inline-block shadow-xs border border-white/40"
                      style={{ backgroundColor: dot }}
                    />
                  ))}
                </span>

                {/* Active Light Glow Ring */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-2xl bg-white/20 animate-pulse pointer-events-none -z-10" />
                )}
              </button>
            );
          })}
        </div>

        {/* 💎 4. CALCULATION RESULT CARD (เอฟเฟกต์เว่อร์ๆ อัญมณี 3D + แสงรัศมี) */}
        <div
          className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 lg:p-10 border ${currentResult.auraTheme.cardBorder} bg-base-100/90 shadow-2xl relative overflow-hidden transition-all duration-700`}
        >
          {/* Subtle background radial flare inside card */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none filter blur-3xl opacity-20 -z-10 transition-all duration-1000"
            style={{ backgroundColor: currentResult.colorDots[0] }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Top Meta info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300/60 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
                    ผลวิเคราะห์ดวงชะตา:
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-primary flex items-center gap-1.5">
                    <span>{currentResult.day}</span>
                    <span className="text-base">{currentResult.solarSymbol}</span>
                  </h4>
                </div>

                {/* Element Badge */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentResult.auraTheme.badgeClass}`}
                >
                  <ElementIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{currentResult.element}</span>
                </div>
              </div>

              {/* Sacred Stone Name & Subtitle */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-base-content/60 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-secondary" />
                  หินมงคลคู่บารมีที่แนะนำเป็นพิเศษ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-primary leading-tight">
                  {currentResult.recommendedStone}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-secondary">
                  {currentResult.stoneSubtitle}
                </p>
              </div>

              {/* Sacred Colors Display */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/60 border border-base-300/50">
                <span className="text-xs font-bold text-base-content/70">โทนสีมงคลประจำวัน:</span>
                <div className="flex items-center gap-2">
                  {currentResult.colorDots.map((dot, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: dot }}
                      />
                    </div>
                  ))}
                  <span className="text-xs font-bold text-primary">{currentResult.color}</span>
                </div>
              </div>

              {/* Power and Benefits */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-base-content/60">พลังมงคล & พุทธคุณ:</span>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed bg-base-200/40 p-3.5 rounded-2xl border border-base-300/40">
                  {currentResult.power}
                </p>
              </div>

              {/* Features bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-semibold text-base-content/75">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  <span>หินธรรมชาติแท้ 100% คัดเกรดพรีเมียม</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                  <span>ผ่านพิธีเบิกเนตรเสริมสิริมงคล</span>
                </div>
              </div>
            </div>

            {/* Right Column: 🔮 3D GEMSTONE CRYSTAL ORB & PHOTO PREVIEW (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
              {/* 3D Orb Display Container */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
                {/* Rotating Dashed Outer Halo Ring */}
                <div
                  className={`absolute inset-0 rounded-full border-2 border-dashed ${currentResult.auraTheme.haloRing} animate-aura-spin-slow pointer-events-none`}
                />

                {/* Secondary Counter-rotating glow circle */}
                <div className="absolute inset-4 rounded-full border border-white/20 animate-spin-reverse-slow pointer-events-none" />

                {/* Pulsing Colored Aura Flare behind Sphere */}
                <div
                  className="absolute inset-6 rounded-full filter blur-xl opacity-80 animate-pulse-glow transition-all duration-700 -z-10"
                  style={{ backgroundColor: currentResult.auraTheme.primaryGlow }}
                />

                {/* 🌟 3D CRYSTAL GEMSTONE SPHERE (ผลึกคริสตัลอัญมณีฉ่ำวาว) */}
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-2xl relative overflow-hidden transition-all duration-700 animate-float-gem border-2 border-white/40 cursor-pointer group"
                  style={{ background: currentResult.auraTheme.gemOrbGradient }}
                  onClick={() => onSelectStone && onSelectStone(currentResult.recommendedStone)}
                  title={`คลิกเพื่อบูชา ${currentResult.recommendedStone}`}
                >
                  {/* High-Gloss Specular Highlight Arc on Top Left */}
                  <div className="absolute top-2 left-3 w-20 h-10 rounded-[50%] bg-gradient-to-b from-white/80 via-white/30 to-transparent -rotate-30 filter blur-[0.5px] pointer-events-none" />

                  {/* Secondary Bottom Reflection */}
                  <div className="absolute bottom-2 right-4 w-12 h-6 rounded-[50%] bg-white/25 rotate-20 filter blur-[1px] pointer-events-none" />

                  {/* Center Sparkling Star Accent */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Sparkles className="w-10 h-10 text-white/40 animate-spin-slow group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Shimmer light sweep across sphere */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20 animate-shimmer-sweep pointer-events-none" />
                </div>

                {/* Floating Twinkling Stars around the orb */}
                <div className="absolute -top-1 left-8 animate-sparkle-twinkle">
                  <Sparkles className="w-5 h-5 text-amber-300 drop-shadow-md" />
                </div>
                <div className="absolute bottom-2 left-6 animate-sparkle-twinkle delay-300">
                  <Sparkles className="w-4 h-4 text-white drop-shadow-md" />
                </div>
                <div className="absolute top-6 -right-1 animate-sparkle-twinkle delay-700">
                  <Sparkles className="w-6 h-6 text-amber-200 drop-shadow-md" />
                </div>
                <div className="absolute -bottom-1 right-12 animate-sparkle-twinkle delay-500">
                  <Sparkles className="w-4 h-4 text-secondary drop-shadow-md" />
                </div>
              </div>

              {/* Genuine product thumbnail badge (ถ้ามีภาพสินค้าจริง) */}
              {matchedProduct && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-base-200/70 border border-base-300/60 shadow-xs max-w-xs">
                  {matchedProduct.imageUrl && (
                    <img
                      src={resolveAssetUrl(matchedProduct.imageUrl)}
                      alt={matchedProduct.name}
                      className="w-12 h-12 rounded-xl object-cover border border-base-300 shrink-0"
                    />
                  )}
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-base-content/80 truncate">
                      {matchedProduct.name}
                    </div>
                    <div className="text-xs font-black text-secondary">
                      ราคาบูชา ฿{matchedProduct.price || currentResult.price}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ⚡ 5. THE EPIC SHIMMER CTA BUTTON (ปุ่มบูชาหินเรืองแสงตามวัน มีแสงวิ่งผ่านตลอดเวลา) */}
          <div className="pt-6 sm:pt-8 border-t border-base-300/60 mt-6">
            <button
              onClick={() => onSelectStone && onSelectStone(currentResult.recommendedStone)}
              type="button"
              className={`relative overflow-hidden group btn btn-md sm:btn-lg w-full rounded-2xl font-black text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border-none ${currentResult.auraTheme.ctaGradient}`}
            >
              {/* Continuous Light Streak Shimmer Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 animate-shimmer-sweep pointer-events-none" />

              <Sparkles className="w-5 h-5 shrink-0 transition-transform group-hover:rotate-45" />
              <span>
                ปรึกษาและบูชา {currentResult.recommendedStone} สำหรับคนเกิด{selectedDay}
              </span>
              <ArrowRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
