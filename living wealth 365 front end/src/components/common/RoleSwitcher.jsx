import { useAuth } from '../../context/AuthContext';
import { UserCheck, Shield, Eye, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function RoleSwitcher() {
  const { currentUser, loginAsCustomer, loginAsAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      aria-label="Demo Role Simulator"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] right-3 sm:right-4 z-50 max-w-[calc(100vw-1.5rem)] zen-surface p-1.5 sm:p-2 rounded-2xl border border-primary/20 shadow-xl flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-md"
    >
      <div className="flex items-center gap-1.5 px-1.5 sm:px-2 py-1 text-xs font-bold text-primary shrink-0">
        <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
        <span className="hidden sm:inline">สลับมุมมองทดสอบ:</span>
        <span className="sm:hidden">โหมด:</span>
      </div>

      <button
        onClick={() => {
          logout();
          navigate(ROUTES.HOME);
        }}
        className={`btn btn-xs rounded-xl ${
          !currentUser ? 'btn-primary' : 'btn-ghost'
        }`}
        title="สลับเป็นมุมมอง USER ทั่วไป"
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="notranslate" translate="no">USER</span>
      </button>

      <button
        onClick={async () => {
          await loginAsCustomer();
          navigate(ROUTES.ACCOUNT);
        }}
        className={`btn btn-xs rounded-xl ${
          currentUser?.role === 'CUSTOMER' ? 'btn-primary' : 'btn-ghost'
        }`}
        title="สลับเป็นมุมมองสมาชิกลูกค้า"
      >
        <UserCheck className="w-3.5 h-3.5" />
        ลูกค้า
      </button>

      <button
        onClick={async () => {
          await loginAsAdmin();
          navigate(ROUTES.ADMIN_DASHBOARD);
        }}
        className={`btn btn-xs rounded-xl ${
          currentUser?.role === 'ADMIN' ? 'btn-secondary text-white' : 'btn-ghost'
        }`}
        title="สลับเป็นมุมมองแอดมิน/ที่ปรึกษา"
      >
        <Shield className="w-3.5 h-3.5" />
        แอดมิน
      </button>

      {currentUser && (
        <button
          onClick={() => {
            logout();
            navigate(ROUTES.HOME);
          }}
          className="btn btn-xs btn-circle btn-ghost text-error"
          title="ออกจากระบบ"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      )}
    </aside>
  );
}
