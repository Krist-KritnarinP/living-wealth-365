import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-base-300/40 zen-surface">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <span className="text-xl font-black text-primary notranslate" translate="no">
                Living Wealth <span className="text-secondary notranslate" translate="no">365</span>
              </span>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              ที่ปรึกษาการเงินและประกันชีวิตครบวงจร ผสานศาสตร์ความมั่นคงเข้ากับพลังใจ
              เพื่อชีวิตที่มั่งคั่ง สุขภาพดี และยั่งยืนตลอด 365 วัน
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>ตัวแทนประกันชีวิตและที่ปรึกษาการเงินที่ได้รับอนุญาต</span>
            </div>
          </div>

          {/* Col 2: Services Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-primary tracking-wide">
              บริการและการวางแผน
            </h4>
            <ul className="space-y-2 text-sm text-base-content/80">
              <li>
                <Link
                  to={ROUTES.INSURANCE_LIFE}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  ประกันชีวิตและสุขภาพ AIA
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.INSURANCE_LIFE}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  วางแผนเกษียณสำราญ & บำนาญ
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.INSURANCE_NON_LIFE}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  ประกันวินาศภัย รถยนต์ & อัคคีภัย
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.TAX_CALCULATOR}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  คำนวณและวางแผนภาษีบุคคลธรรมดา
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Wisdom & Products */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-primary tracking-wide">
              ศาสตร์พลังใจ & ความรู้
            </h4>
            <ul className="space-y-2 text-sm text-base-content/80">
              <li>
                <Link
                  to={ROUTES.MUTELU}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  แคตตาล็อกหินมงคล 365 วัน
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.MUTELU}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  คำนวณหินมงคลตามวันเกิด
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.BLOG}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  คลังความรู้การเงินและการคุ้มครอง
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.ACCOUNT_WISHLIST}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary"></span>
                  รายการหินมงคลที่สนใจ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Consultation */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-primary tracking-wide">
              ติดต่อและนัดหมายปรึกษา
            </h4>
            <div className="space-y-2.5 text-sm text-base-content/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>089-999-9999 / 081-234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>contact@livingwealth365.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>สำนักงานตัวแทนบริการลูกค้า กรุงเทพมหานคร</span>
              </div>
              <div className="pt-2">
                <Link
                  to={ROUTES.INSURANCE_LIFE}
                  className="btn btn-secondary btn-sm text-white w-full rounded-xl font-bold gap-2"
                >
                  <HeartHandshake className="w-4 h-4" />
                  นัดหมายรับคำปรึกษาฟรี
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-base-300/60 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-4">
          <p>© {new Date().getFullYear()} Living Wealth 365. สงวนลิขสิทธิ์ทุกประการ.</p>
          <div className="flex items-center gap-6">
            <span>นโยบายความเป็นส่วนตัว</span>
            <span>ข้อกำหนดการให้บริการ</span>
            <span>AIA Authorized Agent</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
