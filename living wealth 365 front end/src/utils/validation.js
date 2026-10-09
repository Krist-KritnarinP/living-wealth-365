/**
 * Utilities สำหรับ Form Validation และ Password Strength Evaluation
 * Living Wealth 365
 */

/**
 * ตัดอักขระพิเศษในเบอร์โทร และแปลง +66 เป็น 0
 * @param {string} value เบอร์โทรศัพท์
 * @returns {string} เบอร์โทรศัพท์ตัวเลขล้วน
 */
export const normalizePhone = (value = '') => {
  return value.replace(/[\s()-]/g, '').replace(/^\+66/, '0');
};

/**
 * ตรวจสอบความถูกต้องของเบอร์โทรศัพท์ไทย (9-10 หลัก เริ่มต้นด้วย 0)
 * @param {string} value เบอร์โทรศัพท์
 * @returns {boolean}
 */
export const validPhone = (value = '') => {
  const normalized = normalizePhone(value);
  return /^0[1-9]\d{7,8}$/.test(normalized);
};

/**
 * ตรวจสอบความถูกต้องของ Username (ภาษาอังกฤษ ตัวเลข หรือ _ ความยาว 3-30 ตัวอักษร)
 * @param {string} value
 * @returns {boolean}
 */
export const validUsername = (value = '') => {
  return /^[a-zA-Z0-9_]{3,30}$/.test(value.trim());
};

/**
 * ตรวจสอบความถูกต้องของอีเมล
 * @param {string} value
 * @returns {boolean}
 */
export const validEmail = (value = '') => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

/**
 * ตรวจสอบวันเกิด (ไม่เกินวันปัจจุบัน และเป็นวันที่จริง)
 * @param {string} value รูปแบบ YYYY-MM-DD
 * @returns {boolean}
 */
export const validBirthDate = (value = '') => {
  if (!value) return true; // วันเกิดไม่บังคับกรอก (Optional)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return false;
  const d = new Date(value);
  if (d.toISOString().slice(0, 10) !== value) return false;
  const today = new Date().toISOString().slice(0, 10);
  return value <= today;
};

/**
 * ป้องกัน Open Redirect Vulnerability
 * @param {string} value
 * @param {string} fallback
 * @returns {string}
 */
export function safeRedirect(value, fallback = '/account') {
  if (typeof value === 'string' && /^\/(?!\/)/.test(value) && !/[\\\r\n]/.test(value) && !/^\/(login|register)([/?#]|$)/.test(value)) {
    return value;
  }
  return fallback;
}

/**
 * เกจวัดความยากของรหัสผ่าน (Password Strength Meter)
 * มาตรฐานเริ่มต้นที่ 8 ตัวอักษร
 * 
 * เกณฑ์:
 * 1. ความยาวอย่างน้อย 8 ตัวอักษร (เกณฑ์บังคับขั้นต่ำ)
 * 2. มีตัวอักษรพิมพ์เล็ก (a-z)
 * 3. มีตัวอักษรพิมพ์ใหญ่ (A-Z)
 * 4. มีตัวเลข (0-9)
 * 5. มีอักขระพิเศษ (@$!%*?&#^~_-)
 * 
 * ระดับ:
 * - 0: ไม่ผ่านเกณฑ์ขั้นต่ำ (< 8 ตัว)
 * - 1: ง่าย (Weak) - ความยาว >= 8 ตัว แต่ขาดองค์ประกอบอื่น
 * - 2-3: ปานกลาง (Medium) - มีตัวพิมพ์เล็ก/ใหญ่ และตัวเลข
 * - 4-5: ยาก/ปลอดภัยสูง (Strong) - มีตัวพิมพ์เล็ก/ใหญ่ ตัวเลข และอักขระพิเศษครบ
 */
export function evaluatePasswordStrength(password = '') {
  const rules = {
    hasMinLength: password.length >= 8,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[@$!%*?&#^~_\-+=<>{}[\]|:;.,]/.test(password),
  };

  if (!rules.hasMinLength) {
    return {
      score: 0,
      percent: Math.min((password.length / 8) * 20, 20),
      level: 'too_short',
      labelTh: 'สั้นเกินไป (ต้องอย่างน้อย 8 ตัวอักษร)',
      labelEn: 'Too Short (Min 8 chars)',
      color: 'bg-error',
      textColor: 'text-error',
      rules,
      isPassMin: false,
    };
  }

  // คำนวณคะแนนตามเงื่อนไข (1 ถึง 4 คะแนน)
  let bonus = 0;
  if (rules.hasLower && rules.hasUpper) bonus += 1;
  if (rules.hasNumber) bonus += 1;
  if (rules.hasSpecial) bonus += 1;
  if (password.length >= 12) bonus += 1;

  if (bonus <= 1) {
    return {
      score: 1,
      percent: 40,
      level: 'weak',
      labelTh: 'ง่าย (Weak)',
      labelEn: 'Weak',
      color: 'bg-warning',
      textColor: 'text-warning',
      rules,
      isPassMin: true,
    };
  } else if (bonus <= 2) {
    return {
      score: 2,
      percent: 75,
      level: 'medium',
      labelTh: 'ปานกลาง (Medium)',
      labelEn: 'Medium',
      color: 'bg-info',
      textColor: 'text-info',
      rules,
      isPassMin: true,
    };
  } else {
    return {
      score: 3,
      percent: 100,
      level: 'strong',
      labelTh: 'ยาก / ปลอดภัยสูง (Strong)',
      labelEn: 'Strong',
      color: 'bg-success',
      textColor: 'text-success',
      rules,
      isPassMin: true,
    };
  }
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลสมัครสมาชิก
 */
export function validateRegistration(data) {
  const errors = {};
  if (!data.username?.trim()) {
    errors.username = 'กรุณากรอกชื่อผู้ใช้ (Username)';
  } else if (!validUsername(data.username)) {
    errors.username = 'Username ต้องเป็นภาษาอังกฤษ ตัวเลข หรือ _ (3–30 ตัวอักษร)';
  }

  if (!data.name?.trim()) {
    errors.name = 'กรุณากรอกชื่อ-นามสกุล';
  }

  if (!data.email?.trim()) {
    errors.email = 'กรุณากรอกอีเมล';
  } else if (!validEmail(data.email)) {
    errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
  } else if (!validPhone(data.phone)) {
    errors.phone = 'กรุณากรอกเบอร์โทรศัพท์ไทย 9–10 หลัก เช่น 0812345678';
  }

  if (data.birthDate && !validBirthDate(data.birthDate)) {
    errors.birthDate = 'วันเกิดต้องไม่ใช่วันในอนาคต';
  }

  if (!data.password || data.password.length < 8) {
    errors.password = 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'รหัสผ่านทั้งสองช่องไม่ตรงกัน';
  }

  return errors;
}
