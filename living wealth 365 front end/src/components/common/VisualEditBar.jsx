import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sliders,
  Edit3,
  RotateCcw,
  Sparkles,
  ChevronUp,
  ChevronDown,
  LayoutTemplate,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteCustomizer } from '../../context/SiteCustomizerContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';

export default function VisualEditBar() {
  const { currentUser } = useAuth();
  const { isVisualEditMode, toggleVisualEditMode, resetDefaults } = useSiteCustomizer();
  const { showToast } = useToast();
  const location = useLocation();

  const [minimized, setMinimized] = useState(false);

  // Only display for Admin and only on public-facing pages (not inside CRM/admin layout)
  const isDashboard =
    location.pathname.startsWith('/account') ||
    location.pathname.startsWith('/admin');

  if (currentUser?.role !== 'ADMIN' || isDashboard) {
    return null;
  }

  const handleReset = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อความและการตั้งค่าหน้าเว็บทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่?')) {
      resetDefaults();
      showToast('คืนค่าเริ่มต้นหน้าเว็บทั้งหมดเรียบร้อยแล้ว', 'info');
    }
  };

  return (
    <aside
      aria-label="แถบเครื่องมือปรับแต่งหน้าเว็บสำหรับผู้ดูแลระบบ"
      className="fixed bottom-4 left-4 z-40 max-w-xl transition-all duration-300 font-sans"
    >
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="btn btn-secondary btn-sm rounded-full shadow-2xl text-white font-bold gap-2 px-3.5 border-2 border-base-100 animate-bounce"
          title="ขยายแถบเครื่องมือ Admin Visual Customizer"
        >
          <Sliders className="w-4 h-4" />
          <span className="text-xs">Admin Customizer</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="zen-surface rounded-2xl border-2 border-secondary/50 shadow-2xl p-3 sm:p-4 backdrop-blur-md space-y-3">
          {/* Top Bar Info */}
          <div className="flex items-center justify-between gap-3 border-b border-base-300/60 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-ping"></span>
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-secondary" />
                <span>Admin Site Customizer</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Link
                to={ROUTES.ADMIN_CUSTOMIZER}
                className="btn btn-ghost btn-xs rounded-lg text-[11px] gap-1 text-secondary font-bold hover:bg-secondary/15"
                title="เปิดแผงควบคุมหลักใน Dashboard"
              >
                <LayoutTemplate className="w-3 h-3" />
                <span className="hidden sm:inline">เปิดแผงปรับแต่งเต็มระบบ</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
              <button
                onClick={() => setMinimized(true)}
                className="btn btn-ghost btn-circle btn-xs text-base-content/60 hover:text-base-content"
                title="ย่อแถบเครื่องมือ"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-0.5">
            {/* Visual Edit Toggle */}
            <label className="cursor-pointer inline-flex items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={isVisualEditMode}
                onChange={toggleVisualEditMode}
                className="toggle toggle-secondary toggle-sm"
              />
              <span className="text-xs font-bold text-base-content flex items-center gap-1">
                <Edit3 className={`w-3.5 h-3.5 ${isVisualEditMode ? 'text-amber-500' : 'text-base-content/50'}`} />
                <span>
                  โหมดคลิกแก้ไขหน้าเว็บ:{' '}
                  <strong className={isVisualEditMode ? 'text-amber-600' : 'text-base-content/60'}>
                    {isVisualEditMode ? 'เปิด (ON)' : 'ปิด (OFF)'}
                  </strong>
                </span>
              </span>
            </label>

            {/* Reset Defaults button */}
            <button
              onClick={handleReset}
              className="btn btn-ghost btn-xs rounded-lg text-[11px] text-base-content/60 hover:text-error gap-1"
              title="คืนค่าข้อความทั้งหมดเป็นค่าเริ่มต้น"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">คืนค่าเริ่มต้น</span>
            </button>
          </div>

          {isVisualEditMode && (
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-1.5 animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                เลื่อนเมาส์ไปชี้ข้อความที่มีเส้นประสีส้ม แล้วคลิกเพื่อแก้ไขข้อความได้ทันที!
              </span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
