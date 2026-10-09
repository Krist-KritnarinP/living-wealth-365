import { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  UserPlus,
  User,
  AtSign,
  Mail,
  Phone,
  Calendar,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import {
  evaluatePasswordStrength,
  validateRegistration,
  normalizePhone,
  safeRedirect,
} from '../../utils/validation';

export default function RegisterPage() {
  const { loginAsCustomer } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = safeRedirect(searchParams.get('redirect'), ROUTES.ACCOUNT);

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});

  // Real-time evaluation ของความแข็งแกร่งของรหัสผ่าน
  const passwordStrength = useMemo(() => {
    return evaluatePasswordStrength(formData.password);
  }, [formData.password]);

  // Real-time evaluation ของการตรงกันของรหัสผ่าน
  const isPasswordMatch =
    Boolean(formData.confirmPassword) && formData.password === formData.confirmPassword;
  const isPasswordMismatch =
    Boolean(formData.confirmPassword) && formData.password !== formData.confirmPassword;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. ตรวจสอบข้อมูลทั้งหมดด้วยระบบ Validation
    const errors = validateRegistration(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstError = Object.values(errors)[0];
      showToast(firstError, 'error');
      return;
    }

    // 2. ตรวจสอบเกณฑ์รหัสผ่านขั้นต่ำ (ต้องอย่างน้อย 8 ตัวอักษร)
    if (!passwordStrength.isPassMin) {
      showToast('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษรตามมาตรฐานความปลอดภัย', 'warning');
      return;
    }

    // 3. ทำการสมัครและเข้าสู่ระบบใน Mock Session
    loginAsCustomer({
      username: formData.username.trim().toLowerCase(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: normalizePhone(formData.phone),
      birthDate: formData.birthDate || null,
    });

    showToast(
      `ยินดีต้อนรับคุณ ${formData.name.trim()} (@${formData.username.trim()}) สมัครสมาชิกสำเร็จ!`,
      'success'
    );
    navigate(redirectTarget);
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-xl zen-surface rounded-3xl p-6 sm:p-10 border border-base-300 shadow-xl space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary mx-auto flex items-center justify-center mb-2 shadow-sm">
            <UserPlus className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            สมัครสมาชิก Living Wealth 365
          </h1>
          <p className="text-sm text-base-content/70 max-w-md mx-auto">
            สร้างบัญชีส่วนตัวเพื่อติดตามสถานะคำปรึกษา บันทึกสินค้ามงคล และคำนวณหินเสริมดวงชะตา
          </p>
        </div>

        {/* Form Section - แถวเดี่ยวเรียงลงมา 100% */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* ช่องที่ 1: ชื่อผู้ใช้ (Username) */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5 text-base-content">
                <AtSign className="w-3.5 h-3.5 text-primary" />
                ชื่อผู้ใช้ (Username) <span className="text-error">*</span>
              </span>
              <span className="label-text-alt text-[11px] text-base-content/60">
                ภาษาอังกฤษ ตัวเลข หรือ _ (3-30 ตัวอักษร)
              </span>
            </label>
            <input
              type="text"
              name="username"
              required
              autoCapitalize="none"
              spellCheck={false}
              placeholder="เช่น somchai_lw"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className={`input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary ${
                fieldErrors.username ? 'input-error' : ''
              }`}
            />
            {fieldErrors.username && (
              <span className="text-[11px] text-error font-medium mt-1">
                {fieldErrors.username}
              </span>
            )}
          </div>

          {/* ช่องที่ 2: ชื่อ-นามสกุล (Full Name) */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5 text-base-content">
                <User className="w-3.5 h-3.5 text-primary" />
                ชื่อ-นามสกุล <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="เช่น สมชาย ใจดี"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary ${
                fieldErrors.name ? 'input-error' : ''
              }`}
            />
            {fieldErrors.name && (
              <span className="text-[11px] text-error font-medium mt-1">
                {fieldErrors.name}
              </span>
            )}
          </div>

          {/* ช่องที่ 3: อีเมล (Email) */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5 text-base-content">
                <Mail className="w-3.5 h-3.5 text-primary" />
                อีเมล <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="somchai@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary ${
                fieldErrors.email ? 'input-error' : ''
              }`}
            />
            {fieldErrors.email && (
              <span className="text-[11px] text-error font-medium mt-1">
                {fieldErrors.email}
              </span>
            )}
          </div>

          {/* ช่องที่ 4: เบอร์โทรศัพท์ (Phone Number) */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5 text-base-content">
                <Phone className="w-3.5 h-3.5 text-primary" />
                เบอร์โทรศัพท์ <span className="text-error">*</span>
              </span>
              <span className="label-text-alt text-[11px] text-base-content/60">
                เบอร์โทรไทย 9–10 หลัก
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="081-234-5678"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary ${
                fieldErrors.phone ? 'input-error' : ''
              }`}
            />
            {fieldErrors.phone && (
              <span className="text-[11px] text-error font-medium mt-1">
                {fieldErrors.phone}
              </span>
            )}
          </div>

          {/* ช่องที่ 5: วันเกิด (Birthdate) สำหรับสายมู */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5 text-base-content">
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                วันเกิด (ไม่บังคับ - ใช้คำนวณหินมงคล)
              </span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className={`input input-bordered w-full rounded-xl bg-base-100 text-sm ${
                fieldErrors.birthDate ? 'input-error' : ''
              }`}
            />
            {fieldErrors.birthDate && (
              <span className="text-[11px] text-error font-medium mt-1">
                {fieldErrors.birthDate}
              </span>
            )}
          </div>

          {/* ช่องที่ 6: รหัสผ่าน (Password) พร้อมเกจวัดความยาก */}
          <div className="form-control space-y-2">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center gap-1.5 text-base-content">
                <Lock className="w-3.5 h-3.5 text-primary" />
                รหัสผ่าน <span className="text-error">*</span>
              </span>
              {formData.password && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    passwordStrength.level === 'strong'
                      ? 'bg-success/15 text-success'
                      : passwordStrength.level === 'medium'
                      ? 'bg-info/15 text-info'
                      : passwordStrength.level === 'weak'
                      ? 'bg-warning/15 text-warning'
                      : 'bg-error/15 text-error'
                  }`}
                >
                  ระดับ: {passwordStrength.labelTh}
                </span>
              )}
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="เริ่มต้นมาตรฐานอย่างน้อย 8 ตัวอักษร"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className={`input input-bordered w-full rounded-xl bg-base-100 text-sm focus:input-primary ${
                fieldErrors.password ? 'input-error' : ''
              }`}
            />
            {fieldErrors.password && (
              <span className="text-[11px] text-error font-medium mt-1">
                {fieldErrors.password}
              </span>
            )}

            {/* เกจวัดความยากของรหัสผ่าน (Password Strength Meter) */}
            <div className="p-3 rounded-2xl bg-base-200/60 border border-base-300 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-base-content/80 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  เกจวัดความยากของรหัสผ่าน
                </span>
                <span className="text-[11px] text-base-content/60">
                  {passwordStrength.percent}%
                </span>
              </div>

              {/* Progress Bar แสดงระดับ */}
              <div className="w-full h-2 rounded-full bg-base-300 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.percent}%` }}
                />
              </div>

              {/* เงื่อนไขแสดงให้ผู้ใช้ทราบว่าต้องทำอย่างไรถึงจะผ่านแต่ละเกณฑ์ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                {/* เกณฑ์ 1: อย่างน้อย 8 ตัวอักษร (เกณฑ์ขั้นต่ำ) */}
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordStrength.rules.hasMinLength
                      ? 'text-success font-semibold'
                      : 'text-base-content/60'
                  }`}
                >
                  {passwordStrength.rules.hasMinLength ? (
                    <Check className="w-3.5 h-3.5 text-success shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                  )}
                  <span>อย่างน้อย 8 ตัวอักษร (ง่าย)</span>
                </div>

                {/* เกณฑ์ 2: ตัวพิมพ์ใหญ่และพิมพ์เล็ก */}
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordStrength.rules.hasLower && passwordStrength.rules.hasUpper
                      ? 'text-success font-semibold'
                      : 'text-base-content/60'
                  }`}
                >
                  {passwordStrength.rules.hasLower && passwordStrength.rules.hasUpper ? (
                    <Check className="w-3.5 h-3.5 text-success shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                  )}
                  <span>มีตัวพิมพ์ใหญ่ (A-Z) และเล็ก (a-z)</span>
                </div>

                {/* เกณฑ์ 3: ตัวเลข */}
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordStrength.rules.hasNumber
                      ? 'text-success font-semibold'
                      : 'text-base-content/60'
                  }`}
                >
                  {passwordStrength.rules.hasNumber ? (
                    <Check className="w-3.5 h-3.5 text-success shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                  )}
                  <span>มีตัวเลข 0-9 (ปานกลาง)</span>
                </div>

                {/* เกณฑ์ 4: อักขระพิเศษ */}
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordStrength.rules.hasSpecial
                      ? 'text-success font-semibold'
                      : 'text-base-content/60'
                  }`}
                >
                  {passwordStrength.rules.hasSpecial ? (
                    <Check className="w-3.5 h-3.5 text-success shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                  )}
                  <span>มีอักขระพิเศษ (@$!%*?#&) (ยาก)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ช่องที่ 7: ยืนยันรหัสผ่าน (Confirm Password) */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold flex items-center justify-between w-full">
                <span className="flex items-center gap-1.5 text-base-content">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  ยืนยันรหัสผ่าน <span className="text-error">*</span>
                </span>
                {isPasswordMatch && (
                  <span className="text-[11px] text-success font-bold flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> ตรงกัน
                  </span>
                )}
                {isPasswordMismatch && (
                  <span className="text-[11px] text-error font-bold flex items-center gap-1 bg-error/10 px-2 py-0.5 rounded-full">
                    <XCircle className="w-3 h-3" /> ไม่ตรงกัน
                  </span>
                )}
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={`input input-bordered w-full rounded-xl bg-base-100 text-sm ${
                isPasswordMatch
                  ? 'input-success'
                  : isPasswordMismatch || fieldErrors.confirmPassword
                  ? 'input-error'
                  : 'focus:input-primary'
              }`}
            />
            {fieldErrors.confirmPassword && (
              <span className="text-[11px] text-error font-medium mt-1">
                {fieldErrors.confirmPassword}
              </span>
            )}
          </div>

          {/* Mu-Tae-Lu Helper Badge */}
          <div className="p-3 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center gap-2.5 text-xs text-secondary font-semibold">
            <Sparkles className="w-4 h-4 shrink-0 text-secondary" />
            <span>
              วันเกิดจะถูกนำไปใช้ในระบบคำนวณหินมงคลประจำตัว 365 วันโดยอัตโนมัติ
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl font-bold gap-2 mt-4 shadow-lg text-base min-h-[48px]"
          >
            <span>สมัครสมาชิกและเริ่มใช้งาน</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Login Link */}
        <div className="text-center text-xs text-base-content/70 pt-3 border-t border-base-300">
          มีบัญชีอยู่แล้ว?{' '}
          <Link
            to={`${ROUTES.LOGIN}?redirect=${encodeURIComponent(redirectTarget)}`}
            className="font-bold text-primary hover:underline ml-1"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
