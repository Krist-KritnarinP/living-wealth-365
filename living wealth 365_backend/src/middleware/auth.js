import { verifyToken } from '../lib/jwt.js';
import { prisma } from '../lib/prisma.js';

/**
 * Middleware สำหรับตรวจสอบ JWT Token ของผู้ใช้ที่ล็อกอิน
 */
export async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบก่อนดำเนินการ' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        phone: true,
        birthDate: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'ไม่พบบัญชีผู้ใช้งานในระบบ' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง' });
    }
    return res.status(401).json({ error: 'Token ไม่ถูกต้องหรือหมดอายุ' });
  }
}

/**
 * Middleware ตรวจสอบสิทธิ์ Admin
 */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'ปฏิเสธการเข้าถึง: สำหรับผู้ดูแลระบบเท่านั้น' });
  }
  next();
}

/**
 * Middleware Optional User สำหรับ endpoint ที่เปิดให้ Guest ใช้ได้ แต่ถ้าล็อกอินจะดึงข้อมูลมาด้วย
 */
export async function optionalUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, username: true, email: true, name: true, role: true },
      });
      if (user) req.user = user;
    }
  } catch {
    // ไม่บล็อกหาก token ผิดพลาด เพราะเป็น optional
  }
  next();
}
