import { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Droplets,
  Wind,
  Crown,
  Gem,
  CheckCircle2,
  Coins,
  ShieldCheck,
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
      primaryGlow: 'rgba(239, 68, 68, 0.4)',
      backdropGradient: 'from-red-500/25 via-amber-500/20 to-transparent',
      cardBgGradient:
        'bg-gradient-to-br from-red-500/15 via-amber-500/10 to-rose-950/10 dark:from-red-950/50 dark:via-amber-950/30 dark:to-stone-950',
      btnActive:
        'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-white shadow-lg shadow-red-500/40 ring-2 ring-amber-300 scale-105',
      btnInactive: 'hover:border-red-400 hover:text-red-500 hover:shadow-md hover:shadow-red-500/20',
      cardBorder: 'border-red-500/40 shadow-2xl shadow-red-500/20',
      badgeClass:
        'bg-gradient-to-r from-red-500/20 to-amber-500/20 text-red-600 dark:text-red-300 border-red-500/30',
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
      primaryGlow: 'rgba(245, 158, 11, 0.4)',
      backdropGradient: 'from-amber-400/25 via-yellow-300/20 to-transparent',
      cardBgGradient:
        'bg-gradient-to-br from-amber-400/15 via-yellow-300/10 to-amber-950/10 dark:from-amber-950/50 dark:via-yellow-950/30 dark:to-stone-950',
      btnActive:
        'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-900 font-black shadow-lg shadow-amber-500/40 ring-2 ring-yellow-300 scale-105',
      btnInactive: 'hover:border-amber-400 hover:text-amber-600 hover:shadow-md hover:shadow-amber-500/20',
      cardBorder: 'border-amber-500/40 shadow-2xl shadow-amber-500/20',
      badgeClass:
        'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
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
      primaryGlow: 'rgba(236, 72, 153, 0.4)',
      backdropGradient: 'from-pink-500/25 via-rose-400/20 to-transparent',
      cardBgGradient:
        'bg-gradient-to-br from-pink-500/15 via-rose-400/10 to-fuchsia-950/10 dark:from-pink-950/50 dark:via-rose-950/30 dark:to-stone-950',
      btnActive:
        'bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 text-white shadow-lg shadow-pink-500/40 ring-2 ring-pink-300 scale-105',
      btnInactive: 'hover:border-pink-400 hover:text-pink-500 hover:shadow-md hover:shadow-pink-500/20',
      cardBorder: 'border-pink-500/40 shadow-2xl shadow-pink-500/20',
      badgeClass:
        'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30',
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
      primaryGlow: 'rgba(16, 185, 129, 0.4)',
      backdropGradient: 'from-emerald-500/25 via-teal-400/20 to-transparent',
      cardBgGradient:
        'bg-gradient-to-br from-emerald-500/15 via-teal-400/10 to-emerald-950/10 dark:from-emerald-950/50 dark:via-teal-950/30 dark:to-stone-950',
      btnActive:
        'bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300 scale-105',
      btnInactive: 'hover:border-emerald-400 hover:text-emerald-500 hover:shadow-md hover:shadow-emerald-500/20',
      cardBorder: 'border-emerald-500/40 shadow-2xl shadow-emerald-500/20',
      badgeClass:
        'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
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
      primaryGlow: 'rgba(249, 115, 22, 0.4)',
      backdropGradient: 'from-orange-500/25 via-amber-400/20 to-transparent',
      cardBgGradient:
        'bg-gradient-to-br from-orange-500/15 via-amber-400/10 to-amber-950/10 dark:from-orange-950/50 dark:via-amber-950/30 dark:to-stone-950',
      btnActive:
        'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg shadow-orange-500/40 ring-2 ring-orange-300 scale-105',
      btnInactive: 'hover:border-orange-400 hover:text-orange-500 hover:shadow-md hover:shadow-orange-500/20',
      cardBorder: 'border-orange-500/40 shadow-2xl shadow-orange-500/20',
      badgeClass:
        'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30',
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
      primaryGlow: 'rgba(14, 165, 233, 0.4)',
      backdropGradient: 'from-sky-400/25 via-blue-500/20 to-transparent',
      cardBgGradient:
        'bg-gradient-to-br from-sky-500/15 via-blue-400/10 to-indigo-950/10 dark:from-sky-950/50 dark:via-blue-950/30 dark:to-stone-950',
      btnActive:
        'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-sky-500/40 ring-2 ring-sky-300 scale-105',
      btnInactive: 'hover:border-sky-400 hover:text-sky-500 hover:shadow-md hover:shadow-sky-500/20',
      cardBorder: 'border-sky-500/40 shadow-2xl shadow-sky-500/20',
      badgeClass:
        'bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30',
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
      primaryGlow: 'rgba(147, 51, 234, 0.4)',
      backdropGradient: 'from-purple-600/25 via-violet-500/20 to-transparent',
      cardBgGradient:
        'bg-gradient-to-br from-purple-600/15 via-violet-500/10 to-indigo-950/10 dark:from-purple-950/50 dark:via-violet-950/30 dark:to-stone-950',
      btnActive:
        'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white shadow-lg shadow-purple-500/40 ring-2 ring-purple-300 scale-105',
      btnInactive: 'hover:border-purple-400 hover:text-purple-500 hover:shadow-md hover:shadow-purple-500/20',
      cardBorder: 'border-purple-500/40 shadow-2xl shadow-purple-500/20',
      badgeClass:
        'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30',
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
  const [selectedDay, setSelectedDay] = useState('วันพฤหัสบดี');

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
    <div className="w-full relative py-4 sm:py-6">
      {/* 🔮 1. DYNAMIC AMBIENT BACKDROP GLOW (ปรับสีเรืองแสงตามวันแบบ Real-Time) */}
      <div
        className={`absolute -inset-2 sm:-inset-6 rounded-3xl bg-gradient-to-br ${currentResult.auraTheme.backdropGradient} filter blur-3xl opacity-70 transition-all duration-1000 -z-10 animate-pulse-glow pointer-events-none`}
      />

      {/* 🌟 2. COMPACT & BALANCED ZEN GLASS CONTAINER */}
      <div
        className={`w-full max-w-4xl mx-auto rounded-3xl p-5 sm:p-7 lg:p-8 border ${currentResult.auraTheme.cardBorder} ${currentResult.auraTheme.cardBgGradient} transition-all duration-700 relative overflow-hidden backdrop-blur-xl shadow-xl`}
      >
        {/* Subtle decorative sparkles firmly contained within bounds */}
        <div className="absolute top-3 right-4 opacity-25 pointer-events-none">
          <Sparkles className={`w-8 h-8 ${currentResult.auraTheme.textAccent} animate-twinkle`} />
        </div>
        <div className="absolute bottom-3 left-4 opacity-20 pointer-events-none">
          <Sparkles className={`w-6 h-6 ${currentResult.auraTheme.textAccent} animate-twinkle delay-500`} />
        </div>

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ระบบคำนวณหินมงคลเฉพาะบุคคล 365 วัน • เสริมดวงดึงดูดทรัพย์</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-primary tracking-tight">
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

          <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
            ผสานศาสตร์อัญมณีเข้ากับดวงชะตา เพื่อเสริมพลังกระแสเงินสด ความสุข และความคุ้มครองตลอด 365 วัน
          </p>
        </div>

        {/* 🌈 3. CELESTIAL DAY SELECTOR TABS (คลิกแล้วเปลี่ยนสี + มีแสง Glow นีออน) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-3xl mx-auto mb-6">
          {DAYS_DATA.map((item) => {
            const isSelected = selectedDay === item.day;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                type="button"
                className={`group relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
                  isSelected
                    ? `${item.auraTheme.btnActive} z-10`
                    : `bg-base-100/70 dark:bg-base-200/60 text-base-content/80 border-base-300/60 ${item.auraTheme.btnInactive}`
                }`}
              >
                {/* Solar / Planet Symbol */}
                <span className="text-sm sm:text-base transition-transform group-hover:scale-125">
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
              </button>
            );
          })}
        </div>

        {/* 💎 4. CALCULATION RESULT CARD (กระชับพอดีตา + พื้นหลังไล่สีตามธีม) */}
        <div
          className={`rounded-2xl p-4 sm:p-6 border border-white/30 dark:border-white/10 bg-base-100/60 dark:bg-base-900/40 backdrop-blur-md shadow-lg relative overflow-hidden transition-all duration-700`}
        >
          {/* Subtle interior ambient glow */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none filter blur-2xl opacity-20 -z-10 transition-all duration-700"
            style={{ backgroundColor: currentResult.colorDots[0] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="md:col-span-7 space-y-3.5">
              {/* Top Meta info */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-300/50 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-base-content/60 uppercase tracking-wider">
                    ผลวิเคราะห์ดวงชะตา:
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-primary flex items-center gap-1">
                    <span>{currentResult.day}</span>
                    <span className="text-sm">{currentResult.solarSymbol}</span>
                  </h4>
                </div>

                {/* Element Badge */}
                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentResult.auraTheme.badgeClass}`}
                >
                  <ElementIcon className="w-3 h-3 shrink-0" />
                  <span>{currentResult.element}</span>
                </div>
              </div>

              {/* Sacred Stone Name & Subtitle */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-base-content/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-secondary" />
                  หินมงคลคู่บารมีที่แนะนำเป็นพิเศษ:
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-primary leading-snug break-words">
                  {currentResult.recommendedStone}
                </h3>
                <p className="text-xs font-semibold text-secondary">
                  {currentResult.stoneSubtitle}
                </p>
              </div>

              {/* Sacred Colors Display */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-base-100/80 dark:bg-base-200/60 border border-base-300/40">
                <span className="text-xs font-bold text-base-content/70 shrink-0">โทนสีมงคลประจำวัน:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentResult.colorDots.map((dot, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-white shadow-xs shrink-0"
                      style={{ backgroundColor: dot }}
                    />
                  ))}
                  <span className="text-xs font-bold text-primary">{currentResult.color}</span>
                </div>
              </div>

              {/* Power and Benefits */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-base-content/60">พลังมงคล & พุทธคุณ:</span>
                <p className="text-xs sm:text-sm text-base-content/85 leading-relaxed bg-base-100/80 dark:bg-base-200/60 p-3 rounded-xl border border-base-300/40 break-words">
                  {currentResult.power}
                </p>
              </div>

              {/* Features bullets */}
              <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[11px] font-semibold text-base-content/75">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>หินธรรมชาติแท้ 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>ผ่านพิธีเบิกเนตรเสริมสิริมงคล</span>
                </div>
              </div>
            </div>

            {/* Right Column: 🔮 3D GEMSTONE CRYSTAL ORB & PHOTO PREVIEW (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3 pt-2 md:pt-0">
              {/* 3D Orb Display Container */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                {/* Rotating Dashed Outer Halo Ring */}
                <div
                  className={`absolute inset-0 rounded-full border border-dashed ${currentResult.auraTheme.haloRing} animate-aura-spin-slow pointer-events-none`}
                />

                {/* Secondary Counter-rotating glow circle */}
                <div className="absolute inset-3 rounded-full border border-white/20 animate-spin-reverse-slow pointer-events-none" />

                {/* Pulsing Colored Aura Flare behind Sphere */}
                <div
                  className="absolute inset-4 rounded-full filter blur-xl opacity-75 animate-pulse-glow transition-all duration-700 -z-10"
                  style={{ backgroundColor: currentResult.auraTheme.primaryGlow }}
                />

                {/* 🌟 3D CRYSTAL GEMSTONE SPHERE */}
                <div
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-xl relative overflow-hidden transition-all duration-700 animate-float-gem border border-white/50 cursor-pointer group"
                  style={{ background: currentResult.auraTheme.gemOrbGradient }}
                  onClick={() => onSelectStone && onSelectStone(currentResult.recommendedStone)}
                  title={`คลิกเพื่อบูชา ${currentResult.recommendedStone}`}
                >
                  {/* High-Gloss Specular Highlight Arc on Top Left */}
                  <div className="absolute top-1.5 left-2 w-16 h-8 rounded-[50%] bg-gradient-to-b from-white/80 via-white/30 to-transparent -rotate-30 filter blur-[0.5px] pointer-events-none" />

                  {/* Secondary Bottom Reflection */}
                  <div className="absolute bottom-1.5 right-3 w-10 h-5 rounded-[50%] bg-white/25 rotate-20 filter blur-[1px] pointer-events-none" />

                  {/* Center Sparkling Star Accent */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Sparkles className="w-7 h-7 text-white/40 animate-spin-slow group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Shimmer light sweep across sphere */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20 animate-shimmer-sweep pointer-events-none" />
                </div>

                {/* Floating Twinkling Stars around the orb */}
                <div className="absolute 0 left-6 animate-sparkle-twinkle">
                  <Sparkles className="w-4 h-4 text-amber-300 drop-shadow-xs" />
                </div>
                <div className="absolute bottom-1 left-4 animate-sparkle-twinkle delay-300">
                  <Sparkles className="w-3 h-3 text-white drop-shadow-xs" />
                </div>
                <div className="absolute top-4 right-1 animate-sparkle-twinkle delay-700">
                  <Sparkles className="w-4 h-4 text-amber-200 drop-shadow-xs" />
                </div>
                <div className="absolute bottom-1 right-8 animate-sparkle-twinkle delay-500">
                  <Sparkles className="w-3.5 h-3.5 text-secondary drop-shadow-xs" />
                </div>
              </div>

              {/* Genuine product thumbnail badge (ถ้ามีภาพสินค้าจริง) */}
              {matchedProduct && (
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-base-100/90 dark:bg-base-200/80 border border-base-300/50 shadow-xs max-w-xs">
                  {matchedProduct.imageUrl && (
                    <img
                      src={resolveAssetUrl(matchedProduct.imageUrl)}
                      alt={matchedProduct.name}
                      className="w-9 h-9 rounded-lg object-cover border border-base-300 shrink-0"
                    />
                  )}
                  <div className="text-left leading-tight truncate">
                    <div className="text-[11px] font-bold text-base-content/85 truncate">
                      {matchedProduct.name}
                    </div>
                    <div className="text-[11px] font-black text-secondary">
                      ราคาบูชา ฿{matchedProduct.price || currentResult.price}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ⚡ 5. THE EPIC SHIMMER CTA BUTTON (ไม่มีข้อความล้นขอบ + แสงวิ่งตลอดเวลา) */}
          <div className="pt-4 border-t border-base-300/50 mt-4">
            <button
              onClick={() => onSelectStone && onSelectStone(currentResult.recommendedStone)}
              type="button"
              className={`relative overflow-hidden group btn btn-md sm:btn-lg w-full rounded-xl font-black text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border-none px-4 py-3 ${currentResult.auraTheme.ctaGradient}`}
            >
              {/* Continuous Light Streak Shimmer Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 animate-shimmer-sweep pointer-events-none" />

              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform group-hover:rotate-45" />
              <span className="truncate max-w-[85%] text-center">
                ปรึกษาและบูชาหินมงคลสำหรับคนเกิด{selectedDay}
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
