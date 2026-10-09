import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, User, Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function LoginPage() {
  const { loginAsCustomer, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    // Default to customer login if general credentials entered
    if (email.includes('admin')) {
      loginAsAdmin();
      navigate(redirectUrl || ROUTES.ADMIN_DASHBOARD);
    } else {
      loginAsCustomer();
      navigate(redirectUrl || ROUTES.ACCOUNT);
    }
  };

  const handleQuickCustomer = () => {
    loginAsCustomer();
    navigate(redirectUrl || ROUTES.ACCOUNT);
  };

  const handleQuickAdmin = () => {
    loginAsAdmin();
    navigate(redirectUrl || ROUTES.ADMIN_DASHBOARD);
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 sm:px-8 py-12">
      <div className="w-full max-w-md zen-surface rounded-3xl p-6 sm:p-8 border border-base-300 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            เข้าสู่ระบบ
          </h1>
          <p className="text-sm text-base-content/70">
            ยินดีต้อนรับสู่ Living Wealth 365 Platform
          </p>
        </div>

        {/* Quick Demo Switcher Presets */}
        <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300 space-y-2">
          <span className="text-xs font-bold text-primary block text-center">
            ⚡ ทดสอบเข้าสู่ระบบแบบรวดเร็ว (1-Click Login):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="btn btn-outline btn-primary btn-sm rounded-xl font-bold gap-1 text-xs"
            >
              <User className="w-3.5 h-3.5" />
              ลูกค้าสมาชิก
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="btn btn-secondary btn-sm text-white rounded-xl font-bold gap-1 text-xs"
            >
              <Shield className="w-3.5 h-3.5" />
              แอดมินที่ปรึกษา
            </button>
          </div>
        </div>

        <form onSubmit={handleCustomSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                อีเมล
              </span>
            </label>
            <input
              type="email"
              required
              placeholder="เช่น somchai@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-base-100 text-sm"
            />
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" />
                รหัสผ่าน
              </span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-base-100 text-sm"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl font-bold gap-2 mt-2 shadow-md"
          >
            <span>เข้าสู่ระบบ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-base-content/70 pt-2 border-t border-base-300">
          ยังไม่มีบัญชีสมาชิก?{' '}
          <Link
            to={ROUTES.REGISTER}
            className="font-bold text-primary hover:underline"
          >
            สมัครสมาชิกใหม่
          </Link>
        </div>
      </div>
    </div>
  );
}
