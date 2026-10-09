import {
  ShieldCheck,
  HeartPulse,
  Coins,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Compass,
  Umbrella,
} from 'lucide-react';

export const PILLARS = [
  {
    id: 'protection',
    title: 'วางแผนคุ้มครองชีวิต & สุขภาพ',
    english: 'Life & Health Protection',
    desc: 'สร้างเกราะป้องกันค่ารักษาพยาบาลและโรคร้ายแรง ปกป้องความมั่นคงของคนที่คุณรัก ไม่กระทบเงินเก็บสะสมทั้งชีวิต',
    icon: ShieldCheck,
    badge: 'LIFE & HEALTH',
    points: [
      'ประกันสุขภาพเหมาจ่ายระดับพรีเมียม',
      'เงินชดเชยรายได้ & คุ้มครองโรคร้ายแรงทุกระยะ',
      'ส่งต่อมรดกเป็นเงินสดส่งตรงถึงมือครอบครัว',
    ],
  },
  {
    id: 'retirement',
    title: 'วางแผนเกษียณสุขใจ 365 วัน',
    english: 'Retirement & Wealth Flow',
    desc: 'ออกแบบกระแสเงินสดบำนาญตลอดชีพ ให้คุณใช้ชีวิตอย่างอิสระ สบายใจ มีรายได้ต่อเนื่องในทุกวันของชีวิต',
    icon: HeartPulse,
    badge: 'RETIREMENT',
    points: [
      'คำนวณเงินกองทุนเกษียณตามไลฟ์สไตล์จริง',
      'แผนบำนาญการันตีเงินคืนแน่นอนตลอดชีพ',
      'ใช้สิทธิลดหย่อนภาษีสูงสุดตามกฎหมาย',
    ],
  },
  {
    id: 'legacy',
    title: 'บริหารภาษี & ส่งต่อมรดก',
    english: 'Tax & Legacy Succession',
    desc: 'จัดการสิทธิประโยชน์ทางภาษีบุคคลอย่างคุ้มค่า พร้อมส่งต่อทรัพย์สินและความมั่งคั่งอย่างปลอดภัย ไร้ข้อพิพาท',
    icon: Coins,
    badge: 'LEGACY',
    points: [
      'วางแผนประหยัดภาษีบุคคลธรรมดาอย่างถูกต้อง',
      'ส่งมอบทรัพย์สินปลอดภัยและราบรื่น',
      'วางแผนมรดกเพื่อความสงบสุขของทายาท',
    ],
  },
];

export const CORE_VALUES = [
  { label: 'LIFE', text: 'ชีวิตที่มีคุณค่า', icon: Sparkles },
  { label: 'WEALTH', text: 'ความมั่งคั่งยั่งยืน', icon: TrendingUp },
  { label: 'HEALTH', text: 'สุขภาพที่แข็งแรง', icon: Umbrella },
  { label: 'FREEDOM', text: 'อิสรภาพการเงิน', icon: Compass },
  { label: 'HAPPINESS', text: 'ความสุขในทุกวัน', icon: Award },
  { label: 'FOREVER', text: 'มั่นคงตลอดไป', icon: Clock },
];
