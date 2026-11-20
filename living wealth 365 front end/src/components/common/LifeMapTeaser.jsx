import { useState, useId } from 'react';
import {
  Heart,
  Coins,
  Clock,
  Users,
  Brain,
  Compass,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
  Flame,
  Home,
  Zap,
} from 'lucide-react';

const DIMENSIONS = [
  {
    id: 'health',
    name: 'Health (สุขภาพกาย)',
    short: 'สุขภาพ',
    icon: Heart,
    color: '#10B981', // Emerald
    desc: 'พลังงาน พลานามัย การนอนหลับ และการดูแลร่างกายระดับเซลล์',
    tips: 'เริ่มจากการนอนหลับให้มีคุณภาพ 7-8 ชม. และออกกำลังกายสม่ำเสมอในโซน 2',
  },
  {
    id: 'wealth',
    name: 'Wealth (ความมั่นคง)',
    short: 'การเงิน',
    icon: Coins,
    color: '#F59E0B', // Amber
    desc: 'สถาปัตยกรรมการเงิน การปกป้องความเสี่ยง ภาษี และพอร์ตเกษียณ',
    tips: 'จัดสรรเงินสำรองฉุกเฉิน 6 เดือน และมีประกันสุขภาพเหมาจ่ายปกป้องเงินเก็บ',
  },
  {
    id: 'time',
    name: 'Time (อิสรภาพของเวลา)',
    short: 'เวลา',
    icon: Clock,
    color: '#3B82F6', // Blue
    desc: 'การได้ใช้เวลาที่มีจำกัดกับสิ่งที่มีความหมายและคนที่เรารัก',
    tips: 'จัดตารางเวลาโดยเว้นพื้นที่ว่าง (White Space) สำหรับตนเองในแต่ละสัปดาห์',
  },
  {
    id: 'relationship',
    name: 'Relationship (ความสัมพันธ์)',
    short: 'ความสัมพันธ์',
    icon: Users,
    color: '#EC4899', // Pink
    desc: 'ความอบอุ่นในครอบครัว มิตรภาพที่แท้จริง และพื้นที่ปลอดภัยทางใจ',
    tips: 'มีบทสนทนาที่มีคุณภาพ (Deep Listening) กับคนสำคัญอย่างน้อยสัปดาห์ละครั้ง',
  },
  {
    id: 'inner',
    name: 'Inner Life (โลกภายใน)',
    short: 'โลกภายใน',
    icon: Brain,
    color: '#8B5CF6', // Purple
    desc: 'ความเงียบสงบ สติ ปัญญาญาณ และการไม่ถูกอารมณ์ครอบงำ',
    tips: 'ฝึกอยู่กับความเงียบ (The Art of Stillness) วันละ 10 นาทีโดยไม่จับโทรศัพท์',
  },
  {
    id: 'purpose',
    name: 'Purpose (เป้าหมายชีวิต)',
    short: 'เป้าหมาย',
    icon: Compass,
    color: '#14B8A6', // Teal
    desc: 'การรู้ว่าตื่นขึ้นมาเพื่ออะไร และการส่งมอบคุณค่าดีๆ ให้ผู้อื่น',
    tips: 'ทบทวนคุณค่าหลักของตนเอง (Core Values) และทำสิ่งที่มีความหมายเล็กๆ ทุกวัน',
  },
];

const PRESETS = [
  {
    id: 'zen',
    name: 'สมดุลในอุดมคติ',
    icon: Sparkles,
    scores: { health: 9, wealth: 8, time: 8, relationship: 9, inner: 9, purpose: 9 },
    desc: 'สมดุลรอบด้านอย่างสงบสุข',
  },
  {
    id: 'hustle',
    name: 'วัยสร้างตัว & การเงิน',
    icon: Flame,
    scores: { health: 5, wealth: 9, time: 4, relationship: 6, inner: 5, purpose: 9 },
    desc: 'มุ่งเน้นการเติบโตของสินทรัพย์',
  },
  {
    id: 'family',
    name: 'ครอบครัว & เวลาสุขสันต์',
    icon: Home,
    scores: { health: 8, wealth: 6, time: 9, relationship: 9, inner: 7, purpose: 8 },
    desc: 'อบอุ่นและมีเวลาให้คนสำคัญ',
  },
  {
    id: 'recovery',
    name: 'ฟื้นฟูกาย & ใจ',
    icon: Zap,
    scores: { health: 9, wealth: 6, time: 8, relationship: 7, inner: 9, purpose: 7 },
    desc: 'เน้นสุขภาพและการเจริญสติ',
  },
];

export default function LifeMapTeaser({ standalone = false }) {
  const filterId = useId();
  const [scores, setScores] = useState({
    health: 7,
    wealth: 6,
    time: 5,
    relationship: 8,
    inner: 6,
    purpose: 7,
  });

  const [activeDimId, setActiveDimId] = useState(null);
  const [activePreset, setActivePreset] = useState(null);

  const handleScoreChange = (dimId, val) => {
    setActiveDimId(dimId);
    setActivePreset(null);
    setScores((prev) => ({ ...prev, [dimId]: Math.max(1, Math.min(10, Number(val))) }));
  };

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setActiveDimId(null);
    setScores(preset.scores);
  };

  const resetScores = () => {
    setActivePreset(null);
    setActiveDimId(null);
    setScores({
      health: 7,
      wealth: 6,
      time: 5,
      relationship: 8,
      inner: 6,
      purpose: 7,
    });
  };

  // Helper for score grade badge
  const getScoreGrade = (val) => {
    if (val >= 9) return { label: 'ยอดเยี่ยม ✨', bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };
    if (val >= 7) return { label: 'มั่นคงดี', bg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' };
    if (val >= 5) return { label: 'ปานกลาง', bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' };
    return { label: 'ต้องฟื้นฟู', bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30' };
  };

  // Calculate Average Balance
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const average = (total / DIMENSIONS.length).toFixed(1);

  // Center gauge calculation (circumference = 2 * PI * 34 ≈ 213.6)
  const ringRadius = 34;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference - (ringCircumference * (total / 60));

  // Find lowest and highest dimensions
  const sorted = [...DIMENSIONS].sort((a, b) => scores[a.id] - scores[b.id]);
  const lowest = sorted[0];
  const highest = sorted[sorted.length - 1];

  // SVG Radar Chart Coordinates (Center: 150, 150, Radius: 100)
  const center = 150;
  const radius = 100;
  const numPoints = DIMENSIONS.length;

  const getCoordinates = (index, value) => {
    const angle = ((Math.PI * 2) / numPoints) * index - Math.PI / 2;
    const r = radius * (value / 10);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = DIMENSIONS.map((dim, i) => {
    const coord = getCoordinates(i, scores[dim.id]);
    return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
  }).join(' ');

  const activeIndex = activeDimId ? DIMENSIONS.findIndex((d) => d.id === activeDimId) : -1;
  const activeCoord = activeIndex >= 0 ? getCoordinates(activeIndex, scores[activeDimId]) : null;
  const activeDim = DIMENSIONS.find((d) => d.id === activeDimId);

  return (
    <div
      className={`w-full rounded-3xl zen-surface border border-base-300/70 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden transition-all duration-300 ${
        standalone ? 'my-8' : ''
      }`}
    >
      {/* Background Zen Glow Aura */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
        style={{
          backgroundColor: activeDim ? activeDim.color : '#C5A059',
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-base-300/60 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVING WEALTH LIFE MAP • ประเมินสมดุล 6 มิติ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
            สำรวจ "วงล้อชีวิต" ของคุณในวันนี้
          </h2>
          <p className="text-sm text-base-content/75 mt-1">
            เลื่อนเกจวัด (1-10) เพื่อจำลองภาพสะท้อนชีวิตและสังเกตการเคลื่อนไหวของวงล้อแบบเรียลไทม์
          </p>
        </div>

        <button
          onClick={resetScores}
          className="btn btn-ghost btn-sm rounded-xl gap-1.5 self-start md:self-auto text-xs font-bold text-base-content/70 hover:text-primary transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีเซ็ตค่าเริ่มต้น</span>
        </button>
      </div>

      {/* ⚡ Quick Life Scenario Presets */}
      <div className="pt-6 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>ลองกดเลือก "สูตรสมดุลจำลอง" เพื่อดู Animation วงล้อ:</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`flex items-center gap-2 p-2.5 rounded-2xl border text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-md scale-[1.02]'
                    : 'bg-base-200/50 hover:bg-base-200 border-base-300/60 text-base-content/85 hover:border-secondary'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-secondary/15 text-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate font-bold leading-tight">{preset.name}</span>
                  <span
                    className={`text-[10px] block truncate font-normal ${
                      isSelected ? 'text-white/80' : 'zen-muted'
                    }`}
                  >
                    {preset.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Gauge Sliders vs Animated Radar Wheel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 relative z-10">
        {/* Left: Dynamic Animated Gauge Sliders */}
        <div className="lg:col-span-7 space-y-4">
          {DIMENSIONS.map((dim) => {
            const Icon = dim.icon;
            const val = scores[dim.id];
            const isHovered = activeDimId === dim.id;
            const grade = getScoreGrade(val);

            return (
              <div
                key={dim.id}
                onMouseEnter={() => setActiveDimId(dim.id)}
                onMouseLeave={() => setActiveDimId(null)}
                className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  isHovered
                    ? 'bg-base-100 shadow-md scale-[1.01]'
                    : 'bg-base-200/40 border-base-300/50 hover:bg-base-200/70'
                }`}
                style={{
                  borderColor: isHovered ? dim.color : undefined,
                  boxShadow: isHovered ? `0 8px 24px -4px ${dim.color}25` : undefined,
                }}
              >
                {/* Active Indicator Bar Accent */}
                {isHovered && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl animate-pulse"
                    style={{ backgroundColor: dim.color }}
                  />
                )}

                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs transition-transform duration-300"
                      style={{
                        backgroundColor: dim.color,
                        transform: isHovered ? 'scale(1.1) rotate(6deg)' : 'scale(1)',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-base-content block leading-tight">
                        {dim.name}
                      </span>
                      <span className="text-xs zen-muted hidden sm:block">
                        {dim.desc}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Grade Chip */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${grade.bg}`}
                    >
                      {grade.label}
                    </span>

                    {/* Numerical Badge with Bounce */}
                    <span
                      className="text-sm sm:text-base font-black px-2.5 py-0.5 rounded-lg bg-base-100 border border-base-300 shadow-xs transition-all duration-200"
                      style={{
                        color: dim.color,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {val}/10
                    </span>
                  </div>
                </div>

                {/* Animated Dual-Layer Gauge Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="relative h-2 w-full bg-base-300/40 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-300 ease-out relative"
                      style={{
                        width: `${(val / 10) * 100}%`,
                        background: `linear-gradient(90deg, ${dim.color}88, ${dim.color})`,
                        boxShadow: `0 0 10px ${dim.color}66`,
                      }}
                    >
                      {/* Flowing animated light tip */}
                      <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/90 rounded-full animate-pulse shadow-xs" />
                    </div>
                  </div>

                  {/* Range Slider + Steppers for Ultimate Precision & Delight */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleScoreChange(dim.id, val - 1)}
                      disabled={val <= 1}
                      className="btn btn-circle btn-ghost btn-xs text-base-content/60 hover:text-primary disabled:opacity-30 active:scale-90 transition-transform"
                      title="ลดคะแนน"
                      aria-label={`ลดคะแนน ${dim.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={val}
                      onFocus={() => setActiveDimId(dim.id)}
                      onBlur={() => setActiveDimId(null)}
                      onChange={(e) => handleScoreChange(dim.id, e.target.value)}
                      className="range range-xs w-full cursor-pointer transition-all"
                      style={{ accentColor: dim.color }}
                      aria-label={dim.name}
                    />

                    <button
                      type="button"
                      onClick={() => handleScoreChange(dim.id, val + 1)}
                      disabled={val >= 10}
                      className="btn btn-circle btn-ghost btn-xs text-base-content/60 hover:text-primary disabled:opacity-30 active:scale-90 transition-transform"
                      title="เพิ่มคะแนน"
                      aria-label={`เพิ่มคะแนน ${dim.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Breathtaking Animated Radar Chart & Center Life Meter */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
            {/* Ambient Aura Spin behind chart */}
            <div
              className="absolute inset-4 rounded-full blur-2xl pointer-events-none opacity-25 animate-aura-spin-slow transition-colors duration-500"
              style={{
                background: `radial-gradient(circle, ${activeDim ? activeDim.color : '#C5A059'} 0%, transparent 70%)`,
              }}
            />

            <svg
              viewBox="0 0 300 300"
              className="w-full h-full overflow-visible drop-shadow-lg relative z-10"
            >
              <defs>
                {/* SVG Glow Filter */}
                <filter id={`radar-glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Radar Fill Gradient */}
                <radialGradient id={`radar-grad-${filterId}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0.65" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                </radialGradient>
              </defs>

              {/* Background Concentric Rings (20%, 40%, 60%, 80%, 100%) */}
              {[0.2, 0.4, 0.6, 0.8, 1].map((scale, idx) => (
                <circle
                  key={idx}
                  cx={center}
                  cy={center}
                  r={radius * scale}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={idx === 4 ? '1.5' : '1'}
                  className="text-base-300/60"
                  strokeDasharray={idx < 4 ? '3,3' : 'none'}
                />
              ))}

              {/* Axis lines from center to perimeter */}
              {DIMENSIONS.map((dim, i) => {
                const coord = getCoordinates(i, 10);
                const isActive = activeDimId === dim.id;

                return (
                  <g key={dim.id}>
                    <line
                      x1={center}
                      y1={center}
                      x2={coord.x}
                      y2={coord.y}
                      stroke={isActive ? dim.color : 'currentColor'}
                      strokeWidth={isActive ? '2.5' : '1'}
                      className={isActive ? 'transition-all duration-300 drop-shadow-sm' : 'text-base-300/60 transition-all duration-300'}
                    />
                    {/* Active Laser Pulse along axis */}
                    {isActive && (
                      <line
                        x1={center}
                        y1={center}
                        x2={coord.x}
                        y2={coord.y}
                        stroke={dim.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}

              {/* Dynamic Filled Polygon with Glowing Filter & Smooth Morph */}
              <polygon
                points={polygonPoints}
                fill={`url(#radar-grad-${filterId})`}
                stroke={activeDim ? activeDim.color : '#C5A059'}
                strokeWidth="2.5"
                strokeLinejoin="round"
                filter={`url(#radar-glow-${filterId})`}
                style={{
                  transition: 'points 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease',
                }}
              />

              {/* Dynamic Radar Vertex Points with Ripple Animation */}
              {DIMENSIONS.map((dim, i) => {
                const coord = getCoordinates(i, scores[dim.id]);
                const isActive = activeDimId === dim.id;

                return (
                  <g key={dim.id}>
                    {/* Animated Ping Ripple Ring when active */}
                    {isActive && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="12"
                        fill="none"
                        stroke={dim.color}
                        strokeWidth="2"
                        className="animate-ping origin-center"
                      />
                    )}

                    {/* Outer glow ring */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isActive ? '8' : '5'}
                      fill={dim.color}
                      stroke="#ffffff"
                      strokeWidth="2"
                      style={{
                        transition: 'cx 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), r 0.2s ease',
                      }}
                      className="cursor-pointer drop-shadow-sm"
                      onClick={() => setActiveDimId(dim.id)}
                    />
                  </g>
                );
              })}

              {/* Axis Labels */}
              {DIMENSIONS.map((dim, i) => {
                const labelCoord = getCoordinates(i, 12.4);
                const isActive = activeDimId === dim.id;

                return (
                  <text
                    key={dim.id}
                    x={labelCoord.x}
                    y={labelCoord.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isActive ? dim.color : 'currentColor'}
                    className={`text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-[12px] opacity-100 font-black' : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => setActiveDimId(dim.id)}
                  >
                    {dim.short}
                  </text>
                );
              })}
            </svg>

            {/* Center Speedometer / Circular Meter Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="relative w-20 h-20 rounded-full bg-base-100/95 backdrop-blur-md border border-base-300/80 shadow-xl flex flex-col items-center justify-center p-1">
                {/* Circular SVG Progress Meter Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="40"
                    cy="40"
                    r={ringRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-base-300/40"
                  />
                  {/* Animated Progress Ring */}
                  <circle
                    cx="40"
                    cy="40"
                    r={ringRadius}
                    fill="none"
                    stroke={activeDim ? activeDim.color : '#C5A059'}
                    strokeWidth="3.5"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dashoffset 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease',
                    }}
                  />
                </svg>

                <span className="text-[9px] uppercase font-bold text-secondary tracking-tight">
                  เฉลี่ย
                </span>
                <span
                  className="text-xl font-black text-primary leading-none transition-transform duration-200"
                  style={{
                    transform: activeDimId ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {average}
                </span>
                <span className="text-[8px] text-base-content/60 font-semibold mt-0.5">
                  /10
                </span>
              </div>
            </div>
          </div>

          {/* Life Reflection Insight Card */}
          <div className="w-full p-4 sm:p-5 rounded-2xl bg-base-100 border border-base-300/80 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-secondary uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>บทวิเคราะห์ภาพสะท้อนชีวิต</span>
              </div>
              <span className="text-[10px] zen-muted font-normal">เรียลไทม์</span>
            </div>

            <p className="text-xs sm:text-sm text-base-content/85 leading-relaxed">
              มิติที่แข็งแกร่งที่สุดของคุณคือ{' '}
              <strong style={{ color: highest.color }}>{highest.name}</strong> ({scores[highest.id]}/10){' '}
              ซึ่งเป็นพลังขับเคลื่อนที่ดีเยี่ยม
            </p>

            <div className="p-3.5 rounded-xl bg-base-200/60 border border-base-300/40 text-xs text-base-content/80 transition-all duration-300">
              <span className="font-bold text-primary block mb-1">
                💡 ข้อสังเกตจาก Admin A & Admin B สำหรับมิติ {lowest.name} ({scores[lowest.id]}/10):
              </span>
              <span>{lowest.tips}</span>
            </div>

            <a
              href="/about#talk"
              className="btn btn-secondary btn-sm text-white w-full rounded-xl font-bold gap-2 mt-2 shadow-xs hover:shadow-md transition-all active:scale-98"
            >
              <span>สนทนาออกแบบสมดุลชีวิตกับ Admin A & Admin B</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
