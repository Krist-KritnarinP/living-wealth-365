import { useState, useEffect } from 'react';
import { Calendar, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DAYS_DATA = [
  {
    day: 'วันอาทิตย์',
    color: 'สีแดง / สีทอง',
    element: 'ธาตุไฟ / ธาตุทอง',
    recommendedStone: 'หินไหมทอง (Rutilated Quartz)',
    stoneId: 'prod-4',
    power: 'เสริมอำนาจวาสนา โชคลาภเงินทองไหลมาเทมาตลอด 365 วัน',
  },
  {
    day: 'วันจันทร์',
    color: 'สีเหลือง / สีขาว',
    element: 'ธาตุดิน',
    recommendedStone: 'หินไทเกอร์อาย (Tiger Eye)',
    stoneId: 'prod-1',
    power: 'เสริมความมั่นคงทางใจ การตัดสินใจทางการเงิน และการงานราบรื่น',
  },
  {
    day: 'วันอังคาร',
    color: 'สีชมพู',
    element: 'ธาตุน้ำ',
    recommendedStone: 'หินโรสควอตซ์ (Rose Quartz)',
    stoneId: 'prod-2',
    power: 'เสริมเสน่ห์เมตตามหานิยม ผู้ใหญ่เอ็นดู เจรจาธุรกิจง่ายดาย',
  },
  {
    day: 'วันพุธ (กลางวัน/กลางคืน)',
    color: 'สีเขียว / สีน้ำเงิน',
    element: 'ธาตุลม / ธาตุดิน',
    recommendedStone: 'หินมาลาไคต์ (Malachite)',
    stoneId: 'prod-6',
    power: 'เสริมการค้าขาย ปิดการขายสำเร็จ ป้องกันการถูกเอารัดเอาเปรียบ',
  },
  {
    day: 'วันพฤหัสบดี',
    color: 'สีส้ม / สีทอง',
    element: 'ธาตุดิน / ธาตุทอง',
    recommendedStone: 'หินไหมทอง (Rutilated Quartz)',
    stoneId: 'prod-4',
    power: 'เสริมสติปัญญา บารมีครูบาอาจารย์ และความมั่งคั่งยั่งยืน',
  },
  {
    day: 'วันศุกร์',
    color: 'สีฟ้า / สีชมพู',
    element: 'ธาตุน้ำ',
    recommendedStone: 'หินโรสควอตซ์ & ลาพิส ลาซูลี',
    stoneId: 'prod-2',
    power: 'เสริมความคิดสร้างสรรค์ ความสุข ความรัก และทรัพย์สินงอกเงย',
  },
  {
    day: 'วันเสาร์',
    color: 'สีม่วง / สีดำ',
    element: 'ธาตุไฟ / ธาตุลม',
    recommendedStone: 'หินอเมทิสต์ (Amethyst)',
    stoneId: 'prod-5',
    power: 'เสริมพลังปกป้องคุ้มครอง จิตใจสงบนิ่ง ปัดเป่าอุปสรรคและโรคภัย',
  },
];

export default function StoneCalculator({ onSelectStone }) {
  const { currentUser } = useAuth();
  const [selectedDay, setSelectedDay] = useState('วันพฤหัสบดี');

  // If user has birthDate, auto-detect day of week
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
        // keep default
      }
    }
  }, [currentUser]);

  const currentResult = DAYS_DATA.find((d) => d.day === selectedDay) || DAYS_DATA[0];

  return (
    <div className="w-full zen-surface rounded-3xl p-6 sm:p-8 lg:p-10 border border-secondary/30 shadow-xl space-y-8 relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ระบบคำนวณหินมงคลเฉพาะบุคคล 365 วัน</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-primary">
          เลือกวันเกิดของคุณ เพื่อค้นพบหินนำโชคคู่บารมี
        </h3>
        <p className="text-sm sm:text-base text-base-content/70">
          ผสานศาสตร์อัญมณีเข้ากับดวงชะตา เพื่อเสริมพลังกระแสเงินสด ความสุข และความคุ้มครอง
        </p>
      </div>

      {/* Day Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {DAYS_DATA.map((item) => (
          <button
            key={item.day}
            onClick={() => setSelectedDay(item.day)}
            className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
              selectedDay === item.day
                ? 'bg-secondary text-white shadow-md scale-105'
                : 'bg-base-200/80 text-base-content/80 hover:bg-base-300'
            }`}
          >
            {item.day}
          </button>
        ))}
      </div>

      {/* Calculation Result Card */}
      <div className="max-w-2xl mx-auto bg-base-100/90 rounded-2xl p-6 sm:p-8 border border-secondary/20 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
          <div>
            <span className="text-xs font-semibold text-base-content/60">ผลการวิเคราะห์ชะตา:</span>
            <h4 className="text-xl sm:text-2xl font-black text-primary flex items-center gap-2">
              <span>คนเกิด{selectedDay}</span>
              <span className="badge badge-secondary text-white text-xs font-bold">
                {currentResult.element}
              </span>
            </h4>
          </div>
          <div className="text-sm font-semibold text-secondary">
            โทนสีมงคล: {currentResult.color}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-primary tracking-wide">
            หินมงคลที่แนะนำเป็นพิเศษ:
          </span>
          <div className="text-lg sm:text-xl font-black text-secondary flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary shrink-0" />
            <span>{currentResult.recommendedStone}</span>
          </div>
          <p className="text-sm text-base-content/80 leading-relaxed pt-1">
            {currentResult.power}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onSelectStone && onSelectStone(currentResult.recommendedStone)}
            className="btn btn-secondary btn-sm sm:btn-md text-white w-full rounded-xl font-bold gap-2"
          >
            <span>ปรึกษาและบูชาหินสำหรับคนเกิด{selectedDay}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
