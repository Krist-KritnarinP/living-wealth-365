import { Link } from 'react-router-dom';
import { FileText, Clock, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import StatusBadge from '../../components/common/StatusBadge';

export default function AccountHistoryPage() {
  const { currentUser, leads, wishlist } = useAuth();
  const myLeads = leads.filter(
    (l) => l.userId === currentUser?.id || l.phone === currentUser?.phone
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Consultation Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            ประวัติการขอรับคำปรึกษา
          </h1>
          <p className="text-sm text-base-content/70">
            ติดตามสถานะคำขอรับคำปรึกษาและการติดต่อกลับจากที่ปรึกษา Living Wealth 365
          </p>
        </div>

        {/* Account Tabs */}
        <div className="flex items-center gap-2">
          <Link
            to={ROUTES.ACCOUNT}
            className="btn btn-sm btn-ghost rounded-xl font-bold"
          >
            โปรไฟล์
          </Link>
          <Link
            to={ROUTES.ACCOUNT_HISTORY}
            className="btn btn-sm btn-primary text-white rounded-xl font-bold"
          >
            ประวัติการปรึกษา ({myLeads.length})
          </Link>
          <Link
            to={ROUTES.ACCOUNT_WISHLIST}
            className="btn btn-sm btn-ghost rounded-xl font-bold"
          >
            ของมงคล ({wishlist.length})
          </Link>
        </div>
      </div>

      {/* Leads List */}
      {myLeads.length === 0 ? (
        <div className="zen-surface rounded-3xl p-12 text-center border border-base-300 max-w-2xl mx-auto space-y-4">
          <FileText className="w-12 h-12 text-base-content/40 mx-auto" />
          <h3 className="text-lg font-bold text-primary">
            ยังไม่มีประวัติการส่งคำขอคำปรึกษา
          </h3>
          <p className="text-sm text-base-content/70">
            คุณสามารถเลือกแผนประกันชีวิต สุขภาพ หรือบูชาหินมงคล เพื่อส่งคำขอให้ที่ปรึกษาติดต่อกลับได้ทันที
          </p>
          <Link to={ROUTES.INSURANCE_LIFE} className="btn btn-primary btn-sm rounded-xl font-bold">
            ดูแผนประกัน AIA
          </Link>
        </div>
      ) : (
        <div className="space-y-4 max-w-4xl">
          {myLeads.map((item) => (
            <div
              key={item.id}
              className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs hover:border-primary/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-base-300/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-base-content/60">
                    #{item.id}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
                <div className="text-xs text-base-content/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ส่งคำขอเมื่อ: {item.createdAt}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-base-content/60">หัวข้อที่สนใจ:</span>
                  <p className="text-base font-bold text-primary">{item.interest}</p>
                </div>

                <div>
                  <span className="text-xs text-base-content/60">ช่วงเวลาที่สะดวกรับสาย:</span>
                  <p className="font-semibold text-base-content/80">{item.preferredTime}</p>
                </div>
              </div>

              {item.notes && (
                <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 text-xs sm:text-sm text-base-content/80 flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary">บันทึกจากที่ปรึกษา: </span>
                    <span>{item.notes}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
