import jwt from 'jsonwebtoken';

// ตรวจสอบ JWT Secret ให้มีความยาวอย่างน้อย 10 ตัวอักษรตามมาตรฐานความปลอดภัย
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || 'livingwealth365_default_secret_key_2026';
  if (secret.length < 10) {
    console.warn('[Security Warning] JWT_SECRET ควรมีความยาวอย่างน้อย 10 ตัวอักษรเพื่อความปลอดภัย');
  }
  return secret;
};

const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * สร้าง JWT Token สำหรับผู้ใช้งาน
 * @param {object} payload ข้อมูลที่จะบันทึกใน Token (เช่น { id, username, role })
 * @returns {string} Signed JWT Token
 */
export function signToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: EXPIRES_IN });
}

/**
 * ตรวจสอบและถอดรหัส JWT Token
 * @param {string} token JWT Token
 * @returns {object} Decoded payload
 */
export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}
