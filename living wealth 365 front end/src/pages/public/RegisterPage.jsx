import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Phone, Calendar, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';

export default function RegisterPage() {
  const { loginAsCustomer } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validate password length
    if (formData.password.length < 6) {
      showToast('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร', 'warning');
      return;
    }

    // 2. Validate password match
    if (formData.password !== formData.confirmPassword) {
      showToast('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง', 'error');
      return;
    }

    // Register & Login customer
    loginAsCustomer();
    showToast('สมัครสมาชิกและเข้าสู่ระบบเรียบร้อยแล้ว ยินดีต้อนรับครับ!', 'success');
    navigate(ROUTES.ACCOUNT);
  };

  const isPasswordMatch =
    formData.confirmPassword && formData.password === formData.confirmPassword;
  const isPasswordMismatch =
    formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 sm:px-8 py-12">
      <div className="w-full max-w-lg zen-surface rounded-3xl p-6 sm:p-10 border border-base-300 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary mx-auto flex items-center justify-center mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            สมัครสมาชิก Living Wealth 365
          </h1>
          <p className="text-sm text-base-content/70">
            เพื่อรับสิทธิประโยชน์ ติดตามสถานะคำปรึกษา และคำนวณหินมงคลประจำตัว
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  ชื่อ-นามสกุล <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                required
                placeholder="สมชาย ใจดี"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary"
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  เบอร์โทรศัพท์ <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="tel"
                required
                placeholder="081-234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary"
              />
            </div>
          </div>

          {/* Row 2: Email & Birthdate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  อีเมล <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="email"
                required
                placeholder="somchai@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary"
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  วันเกิด (คำนวณสายมู)
                </span>
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm"
              />
            </div>
          </div>

          {/* Row 3: Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  รหัสผ่าน <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="password"
                required
                placeholder="อย่างน้อย 6 ตัวอักษร"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary"
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    ยืนยันรหัสผ่าน <span className="text-error">*</span>
                  </span>
                  {isPasswordMatch && (
                    <span className="text-[11px] text-success font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> ตรงกัน
                    </span>
                  )}
                  {isPasswordMismatch && (
                    <span className="text-[11px] text-error font-bold">
                      ไม่ตรงกัน
                    </span>
                  )}
                </span>
              </label>
              <input
                type="password"
                required
                placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`input input-bordered w-full rounded-xl bg-base-100 text-sm ${
                  isPasswordMatch
                    ? 'input-success'
                    : isPasswordMismatch
                    ? 'input-error'
                    : 'focus:input-primary'
                }`}
              />
            </div>
          </div>

          {/* Mu-Tae-Lu helper tip */}
          <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-2 text-xs text-secondary font-semibold">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>ใส่วันเกิดเพื่อให้ระบบช่วยคำนวณหินเสริมดวงชะตาประจำตัวให้อัตโนมัติ</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl font-bold gap-2 mt-2 shadow-md text-base"
          >
            <span>สมัครสมาชิกและเริ่มใช้งาน</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-base-content/70 pt-2 border-t border-base-300">
          มีบัญชีอยู่แล้ว?{' '}
          <Link to={ROUTES.LOGIN} className="font-bold text-primary hover:underline">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
