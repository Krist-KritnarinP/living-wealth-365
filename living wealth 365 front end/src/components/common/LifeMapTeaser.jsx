import { useState } from 'react';
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
} from 'lucide-react';

const DIMENSIONS = [
  {
    id: 'health',
    name: 'Health (สุขภาพกาย)',
    short: 'สุขภาพ',
    icon: Heart,
    color: '#10B981', // Emerald
    desc: 'พลังงาน พลานามัย การนอนหลับ และการดูแลร่างกายระดับเซลล์',
    tips: 'เริ่มจากการนอนหลับให้มีคุณภาพ 7-8 ชม. และออกกำลังกายสม่ำเสมอ',
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

export default function LifeMapTeaser({ standalone = false }) {
  const [scores, setScores] = useState({
    health: 7,
    wealth: 6,
    time: 5,
    relationship: 8,
    inner: 6,
    purpose: 7,
  });

  const handleScoreChange = (dimId, val) => {
    setScores((prev) => ({ ...prev, [dimId]: Number(val) }));
  };

  const resetScores = () => {
    setScores({
      health: 7,
      wealth: 6,
      time: 5,
      relationship: 8,
      inner: 6,
      purpose: 7,
    });
  };

  // Calculate Average Balance
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const average = (total / DIMENSIONS.length).toFixed(1);

  // Find lowest dimension
  const sorted = [...DIMENSIONS].sort((a, b) => scores[a.id] - scores[b.id]);
  const lowest = sorted[0];
  const highest = sorted[sorted.length - 1];

  // SVG Radar Chart Coordinates (Center: 150, 150, Radius: 100)
  const center = 150;
  const radius = 100;
  const numPoints = DIMENSIONS.length;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / numPoints) * index - Math.PI / 2;
    const r = (radius * (value / 10));
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = DIMENSIONS.map((dim, i) => {
    const coord = getCoordinates(i, scores[dim.id]);
    return `${coord.x},${coord.y}`;
  }).join(' ');

  return (
    <div className={`w-full rounded-3xl zen-surface border border-base-300/70 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden ${standalone ? 'my-8' : ''}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-base-300/60">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVING WEALTH LIFE MAP • ประเมินสมดุล 6 มิติ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
            สำรวจ "วงล้อชีวิต" ของคุณในวันนี้
          </h2>
          <p className="text-sm text-base-content/75 mt-1">
            ปรับคะแนนความพึงพอใจในแต่ละมิติ (1-10) เพื่อค้นหาจุดที่สมบูรณ์และจุดที่ต้องการการดูแล
          </p>
        </div>

        <button
          onClick={resetScores}
          className="btn btn-ghost btn-sm rounded-xl gap-1.5 self-start md:self-auto text-xs font-bold text-base-content/70 hover:text-primary"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีเซ็ตค่าเริ่มต้น</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Radar Wheel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
        {/* Left: Sliders */}
        <div className="lg:col-span-7 space-y-5">
          {DIMENSIONS.map((dim) => {
            const Icon = dim.icon;
            const val = scores[dim.id];
            return (
              <div key={dim.id} className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/40 transition-all hover:bg-base-200/70">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: dim.color }}
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
                  <span className="text-base font-black px-2.5 py-0.5 rounded-lg bg-base-100 border border-base-300 shadow-xs" style={{ color: dim.color }}>
                    {val}/10
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={val}
                  onChange={(e) => handleScoreChange(dim.id, e.target.value)}
                  className="range range-xs w-full accent-secondary"
                  style={{ accentColor: dim.color }}
                  aria-label={dim.name}
                />
              </div>
            );
          })}
        </div>

        {/* Right: Radar Chart & Life Reflection Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
          {/* SVG Radar Wheel */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full overflow-visible drop-shadow-md"
            >
              {/* Background Concentric Rings (20%, 40%, 60%, 80%, 100%) */}
              {[0.2, 0.4, 0.6, 0.8, 1].map((scale, idx) => (
                <circle
                  key={idx}
                  cx={center}
                  cy={center}
                  r={radius * scale}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-base-300/60"
                  strokeDasharray={idx < 4 ? '3,3' : 'none'}
                />
              ))}

              {/* Axis lines from center to perimeter */}
              {DIMENSIONS.map((_, i) => {
                const coord = getCoordinates(i, 10);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={coord.x}
                    y2={coord.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-base-300/60"
                  />
                );
              })}

              {/* Dynamic Filled Polygon */}
              <polygon
                points={polygonPoints}
                fill="rgba(197, 160, 89, 0.28)" // Secondary gold tint
                stroke="#C5A059"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Dynamic Points */}
              {DIMENSIONS.map((dim, i) => {
                const coord = getCoordinates(i, scores[dim.id]);
                return (
                  <circle
                    key={dim.id}
                    cx={coord.x}
                    cy={coord.y}
                    r="5"
                    fill={dim.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-300 drop-shadow-sm"
                  />
                );
              })}

              {/* Axis Labels */}
              {DIMENSIONS.map((dim, i) => {
                const labelCoord = getCoordinates(i, 12.2);
                return (
                  <text
                    key={dim.id}
                    x={labelCoord.x}
                    y={labelCoord.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[11px] font-bold fill-current opacity-85"
                  >
                    {dim.short}
                  </text>
                );
              })}
            </svg>

            {/* Center Score Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-base-100/90 backdrop-blur-sm border border-secondary/40 shadow-md flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-secondary">คะแนนเฉลี่ย</span>
                <span className="text-lg font-black text-primary leading-none">{average}</span>
              </div>
            </div>
          </div>

          {/* Life Reflection Insight */}
          <div className="w-full p-4 sm:p-5 rounded-2xl bg-base-100 border border-base-300/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>บทวิเคราะห์ภาพสะท้อนชีวิต</span>
            </div>

            <p className="text-xs sm:text-sm text-base-content/85 leading-relaxed">
              มิติที่แข็งแกร่งที่สุดของคุณคือ <strong style={{ color: highest.color }}>{highest.name}</strong> ({scores[highest.id]}/10) ซึ่งเป็นพลังขับเคลื่อนที่ดีเยี่ยม
            </p>

            <div className="p-3 rounded-xl bg-base-200/60 border border-base-300/40 text-xs text-base-content/80">
              <span className="font-bold text-primary block mb-1">
                💡 ข้อสังเกตจาก Top & Joy สำหรับมิติ {lowest.name} ({scores[lowest.id]}/10):
              </span>
              <span>{lowest.tips}</span>
            </div>

            <a
              href="/about#talk"
              className="btn btn-secondary btn-sm text-white w-full rounded-xl font-bold gap-2 mt-2 shadow-xs"
            >
              <span>สนทนาออกแบบสมดุลชีวิตกับ Top & Joy</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
