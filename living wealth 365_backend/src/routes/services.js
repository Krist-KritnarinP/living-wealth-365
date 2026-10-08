import { Router } from 'express';

export const servicesRouter = Router();

// Living Wealth 365 Financial & Insurance Services
const DEFAULT_SERVICES = [
  {
    id: 'srv-life',
    category: 'LIFE_INSURANCE',
    title: 'ประกันชีวิตและการคุ้มครองครอบครัว (Life Protection)',
    description: 'วางแผนสร้างความมั่นคง ส่งต่อความรักและความอุ่นใจให้ครอบครัวที่คุณรัก',
    icon: 'ShieldCheck',
  },
  {
    id: 'srv-health',
    category: 'HEALTH_INSURANCE',
    title: 'ประกันสุขภาพและโรคร้ายแรง (Health & Critical Illness)',
    description: 'ยกระดับการรักษาพยาบาล จัดการค่ารักษาพยาบาลไม่ให้กระทบเงินเก็บสะสม',
    icon: 'HeartPulse',
  },
  {
    id: 'srv-retirement',
    category: 'RETIREMENT_PLANNING',
    title: 'วางแผนเกษียณสุขใจ (Retirement Planning)',
    description: 'สร้างกระแสเงินสดต่อเนื่องหลังเกษียณ มีชีวิตอิสระ มั่นคงในทุกวัน',
    icon: 'Sun',
  },
  {
    id: 'srv-tax',
    category: 'TAX_PLANNING',
    title: 'วางแผนภาษีบุคคลธรรมดา (Tax Optimization)',
    description: 'บริหารสิทธิประโยชน์ทางภาษีอย่างถูกต้อง เพิ่มพูนเงินออมสุทธิ',
    icon: 'Receipt',
  },
  {
    id: 'srv-investment',
    category: 'INVESTMENT_ADVISORY',
    title: 'วางแผนการเงินและการลงทุน (Wealth Accumulation)',
    description: 'จัดพอร์ตการลงทุนตามเป้าหมายชีวิตและระดับความเสี่ยงที่เหมาะสม',
    icon: 'TrendingUp',
  },
  {
    id: 'srv-transfer',
    category: 'WEALTH_TRANSFER',
    title: 'การส่งต่อมรดกและความมั่งคั่ง (Wealth Transfer & Legacy)',
    description: 'วางแผนส่งต่อทรัพย์สินอย่างราบรื่น ปลอดภัย ไร้ข้อพิพาท',
    icon: 'Coins',
  },
];

servicesRouter.get('/', (_req, res) => {
  res.json({
    success: true,
    data: DEFAULT_SERVICES,
  });
});
