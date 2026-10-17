import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Compass, HeartHandshake, Sparkles, Feather } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-base-300/40 zen-surface">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div className="flex flex-col">
                <span className="text-xl font-black text-primary notranslate" translate="no">
                  Living Wealth <span className="text-secondary notranslate" translate="no">365</span>
                </span>
                <span className="text-[10px] font-semibold text-secondary tracking-wider uppercase">
                  A Life Well Planned. A Life Well Lived.
                </span>
              </div>
            </div>
            <p className="text-sm text-base-content/75 leading-relaxed">
              แพลตฟอร์มการวางแผนชีวิต สุขภาพองค์รวม และความมั่นคงทางการเงิน ผสานศาสตร์โลกกายภาพเข้ากับโลกภายใน คัดสรรโดย <strong>Admin A & Admin B</strong>
            </p>
            <div className="p-3 rounded-xl bg-base-200/50 border border-base-300/40 text-xs text-base-content/70 italic flex items-start gap-2">
              <Feather className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>"พวกเราไม่ใช่ผู้รู้ที่คอยสั่ง แต่คือเพื่อนร่วมทางที่พร้อมรับฟังและร่วมค้นหาชีวิตที่ใช่"</span>
            </div>
          </div>

          {/* Col 2: Living Gateway (วิถีชีวิต) */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-primary tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>วิถีชีวิต (Living)</span>
            </h4>
            <ul className="space-y-2 text-sm text-base-content/80">
              <li>
                <Link
                  to={ROUTES.LIFE}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Life: สมดุลชีวิต 6 มิติ (Life Map)
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.WELLBEING}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Wellbeing: วิทยาศาสตร์ Longevity & สุขภาพ
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.EARTH_ENERGY}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Earth & Energy: แร่ธาตุธรรมชาติ & พลังจักระ
                </Link>
              </li>
              <li>
                <Link
                  to="/earth-energy"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  3D Gemstone Visualizer (ผลึกแร่ธาตุเสมือนจริง)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Learning Gateway (ความรู้ & การเงิน) */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-primary tracking-wide flex items-center gap-2">
              <Compass className="w-4 h-4 text-secondary" />
              <span>การเรียนรู้ (Learning)</span>
            </h4>
            <ul className="space-y-2 text-sm text-base-content/80">
              <li>
                <Link
                  to={ROUTES.WEALTH}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Wealth: สถาปัตยกรรมการเงิน 4 เสา
                </Link>
              </li>
              <li>
                <Link
                  to="/wealth?tab=calculator"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  เครื่องคำนวณและวางแผนภาษี 2568
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.INNER_LIFE}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Inner Life: ศิลปะแห่งความเงียบสงบ
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.JOURNAL}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Journal & Admin A's Notes: วารสารความคิด
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connecting & Let's Talk */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-primary tracking-wide flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-secondary" />
              <span>เพื่อนร่วมทาง (Connecting)</span>
            </h4>
            <div className="space-y-2.5 text-sm text-base-content/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>082-111-2222 (Top) / 083-333-4444 (Joy)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>hello@livingwealth365.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>Living Wealth Studio & Advisory, Bangkok</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/about#talk"
                  className="btn btn-secondary btn-sm text-white w-full rounded-xl font-bold gap-2 shadow-xs"
                >
                  <HeartHandshake className="w-4 h-4" />
                  นัดหมายพูดคุยกับ Admin A & Admin B (ฟรี)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-base-300/60 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-4">
          <p>© {new Date().getFullYear()} Living Wealth 365 by Admin A & Admin B. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to={ROUTES.ABOUT} className="hover:text-primary transition-colors">เกี่ยวกับเรา</Link>
            <Link to={ROUTES.LIFE} className="hover:text-primary transition-colors">Life Map 6 มิติ</Link>
            <Link to={ROUTES.WEALTH} className="hover:text-primary transition-colors">วางแผนภาษี & เกษียณ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
