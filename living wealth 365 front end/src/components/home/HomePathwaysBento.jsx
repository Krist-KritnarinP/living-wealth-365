import { Link } from 'react-router-dom';
import {
  Presentation,
  ShieldCheck,
  Gem,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import EditableText from '../common/EditableText';

const PATHWAYS = [
  {
    id: 'workshops',
    num: '01',
    icon: Presentation,
    iconBg: 'bg-secondary/15 text-secondary',
    badge: 'องค์กร & กลุ่มเล็ก',
    title: 'Workshops & Experiences',
    desc: 'เวิร์กชอปทำหินมงคล ศาสตร์ชีวิต-การเงิน และบำบัดความล้า พร้อมโหมดพรีเซ้นต์และรีวิวผู้เข้าร่วมจริง',
    cta: 'ดูหลักสูตรเวิร์กชอป',
    to: ROUTES.WORKSHOPS,
    highlight: true,
  },
  {
    id: 'wealth',
    num: '02',
    icon: ShieldCheck,
    iconBg: 'bg-primary/12 text-primary',
    badge: 'การเงิน & ประกัน AIA',
    title: 'Wealth & Protection',
    desc: 'เปรียบเทียบแผนประกัน AIA ครบ 6 หมวด วางแผนภาษี 2568 และเตรียมงบเกษียณอย่างเป็นระบบ',
    cta: 'สำรวจแผนการเงิน',
    to: ROUTES.WEALTH,
  },
  {
    id: 'energy',
    num: '03',
    icon: Gem,
    iconBg: 'bg-emerald-500/12 text-emerald-600',
    badge: 'แร่ธาตุ & สุขภาพ',
    title: 'Earth, Energy & Wellbeing',
    desc: 'คัดสรรแร่ธรรมชาติแท้ตามหลักโครงสร้างผลึก SiO₂ ควบคู่แนวทางดูแลการนอนและสุขภาพระยะยาว',
    cta: 'ชมคลังแร่ธาตุ',
    to: ROUTES.EARTH_ENERGY,
  },
  {
    id: 'journal',
    num: '04',
    icon: BookOpen,
    iconBg: 'bg-amber-500/12 text-amber-600',
    badge: 'คลังความรู้',
    title: "Journal & Admin A's Notes",
    desc: 'อ่านซีรีส์วางแผนชีวิตก่อนเกษียณ บทความภาษี และบันทึกประสบการณ์ตรงจาก Admin A & Admin B',
    cta: 'อ่านบทความทั้งหมด',
    to: ROUTES.JOURNAL,
  },
];

export default function HomePathwaysBento({ onGlassMove }) {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-base-300/60 pb-5 mb-7">
        <div className="space-y-1 max-w-2xl">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary block">
            <EditableText
              fieldKey="gateways.sectionBadge"
              label="หัวข้อหมวด Gateways (Badge)"
              fallback="4 เส้นทางหลักของ Living Wealth 365"
            />
          </span>
          <h2 className="editorial-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
            <EditableText
              fieldKey="gateways.sectionTitle"
              label="หัวข้อหลักเส้นทางบริการ"
              fallback="เลือกเรื่องที่คุณต้องการดูแลวันนี้"
            />
          </h2>
        </div>
        <p className="text-sm sm:text-base text-base-content/75 max-w-md">
          <EditableText
            fieldKey="gateways.sectionSubtitle"
            label="คำบรรยายย่อยเส้นทางบริการ"
            fallback="จัดหมวดหมู่ชัดเจนเพื่อให้คุณเข้าถึงข้อมูลและบริการที่ตรงใจได้ทันที"
          />
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {PATHWAYS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.to}
              onMouseMove={onGlassMove}
              className={`zen-surface liquid-glass-interactive hover-card-elevate rounded-3xl p-6 flex flex-col justify-between gap-5 group min-w-0 border transition-colors ${
                item.highlight
                  ? 'border-secondary/45 shadow-sm'
                  : 'border-base-300/60 hover:border-primary/35'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="editorial-display text-2xl font-bold text-base-content/15 select-none">
                    {item.num}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-secondary block">
                    {item.badge}
                  </span>
                  <h3 className="editorial-display text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-base-content/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-base-300/40 flex items-center justify-between text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                <span>{item.cta}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
