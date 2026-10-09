import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Clock, ShieldCheck, FileText, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('leadId') || 'LEAD-999';
  const interest = searchParams.get('interest') || 'บริการและการวางแผน';
  const { currentUser } = useAuth();

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 sm:px-8 py-16">
      <div className="w-full max-w-2xl zen-surface rounded-3xl p-8 sm:p-12 border border-success/30 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-success/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-success/20 text-success mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Meta Pixel simulation tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span>Conversion Tracking Pixel: Event 'Lead' Logged (Ref: {leadId})</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
            เราได้รับข้อมูลของท่านเรียบร้อยแล้ว!
          </h1>
          <p className="text-sm sm:text-base text-base-content/75 max-w-lg mx-auto leading-relaxed">
            ขอบพระคุณที่ไว้วางใจให้ <span className="font-bold text-primary">Living Wealth 365</span> เป็นผู้ดูแลความมั่นคงทางการเงินและพลังใจของท่าน
          </p>
        </div>

        {/* Lead Reference Card */}
        <div className="bg-base-100/80 rounded-2xl p-5 border border-base-300 text-left space-y-2.5 max-w-lg mx-auto">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-base-content/60">รหัสอ้างอิงคำขอ (Reference ID):</span>
            <span className="font-mono font-bold text-primary">{leadId}</span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-base-content/60">หัวข้อที่สนใจ:</span>
            <span className="font-semibold text-secondary">{interest}</span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-base-content/60">ขั้นตอนถัดไป:</span>
            <span className="font-medium text-success flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> ที่ปรึกษาจะติดต่อกลับภายใน 24 ชม.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            to={ROUTES.HOME}
            className="btn btn-primary rounded-xl font-bold px-6 shadow-md"
          >
            กลับสู่หน้าหลัก
          </Link>

          {currentUser && currentUser.role === 'CUSTOMER' ? (
            <Link
              to={ROUTES.ACCOUNT_HISTORY}
              className="btn btn-outline rounded-xl font-bold gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>ติดตามสถานะที่ My History</span>
            </Link>
          ) : (
            <Link
              to={ROUTES.MUTELU}
              className="btn btn-outline rounded-xl font-bold gap-2"
            >
              <Heart className="w-4 h-4 text-error" />
              <span>ชมวัตถุมงคลต่อ</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
