import rateLimit from 'express-rate-limit';

// 🛑 จำกัดการส่งฟอร์มขอคำปรึกษา (Leads): สูงสุด 10 ครั้ง ต่อ 15 นาที ต่อ IP
export const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'คุณส่งคำขอคำปรึกษาบ่อยเกินไป กรุณารอ 15 นาทีแล้วลองใหม่อีกครั้งเพื่อความปลอดภัย',
  },
});

// 🛑 จำกัดการพยายามเข้าสู่ระบบหรือสมัครสมาชิก (Auth): สูงสุด 20 ครั้ง ต่อ 15 นาที ต่อ IP
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'มีการพยายามเข้าสู่ระบบบ่อยเกินไป กรุณารอ 15 นาทีแล้วลองใหม่อีกครั้ง',
  },
});
