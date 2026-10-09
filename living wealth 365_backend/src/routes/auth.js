import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';
import { authenticateUser } from '../middleware/auth.js';

export const authRouter = Router();

/**
 * 1. POST /api/auth/register
 * สมัครสมาชิกใหม่ (รองรับ Username, Full Name, Email, Phone, BirthDate, Password >= 8 chars)
 */
authRouter.post('/register', async (req, res) => {
  try {
    const { username, name, email, phone, birthDate, password } = req.body;

    // ตรวจสอบความครบถ้วนของข้อมูล
    if (!username || !name || !email || !password) {
      return res.status(400).json({ error: 'กรุณากรอก Username, ชื่อ-นามสกุล, อีเมล และรหัสผ่านให้ครบถ้วน' });
    }

    // ตรวจสอบความถูกต้องของ Username (ภาษาอังกฤษ/ตัวเลข/_ 3-30 ตัวอักษร)
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(username.trim())) {
      return res.status(400).json({ error: 'Username ต้องเป็นภาษาอังกฤษ ตัวเลข หรือ _ ความยาว 3-30 ตัวอักษร' });
    }

    // ตรวจสอบความยาวรหัสผ่านตามมาตรฐานเริ่มต้น 8 ตัวอักษร
    if (password.length < 8) {
      return res.status(400).json({ error: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษรตามมาตรฐานความปลอดภัย' });
    }

    // ตรวจสอบว่า Username ซ้ำหรือไม่
    const existingUsername = await prisma.user.findUnique({
      where: { username: username.trim().toLowerCase() },
    });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username นี้ถูกใช้งานแล้ว กรุณาเลือกชื่ออื่น' });
    }

    // ตรวจสอบว่า Email ซ้ำหรือไม่
    const existingEmail = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (existingEmail) {
      return res.status(409).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น หรือเข้าสู่ระบบ' });
    }

    // แฮชรหัสผ่านด้วย bcryptjs (salt rounds: 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // กำหนด Role: หากอีเมลหรือ username มีคำว่า admin ให้เป็น ADMIN สำหรับทดสอบ (หรือ CUSTOMER เริ่มต้น)
    const role = (email.toLowerCase().includes('admin') || username.toLowerCase().includes('admin')) 
      ? 'ADMIN' 
      : 'CUSTOMER';

    // บันทึกลงฐานข้อมูล MySQL
    const newUser = await prisma.user.create({
      data: {
        username: username.trim().toLowerCase(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        birthDate: birthDate ? new Date(birthDate) : null,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        birthDate: true,
        role: true,
        createdAt: true,
      },
    });

    // สร้าง JWT Token
    const token = signToken({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    });

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ ยินดีต้อนรับสู่ Living Wealth 365',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('[Register Error]:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง' });
  }
});

/**
 * 2. POST /api/auth/login
 * เข้าสู่ระบบ (รองรับทั้งการใช้ Username หรือ Email)
 */
authRouter.post('/login', async (req, res) => {
  try {
    const { identifier, email, username, password } = req.body;
    const loginKey = (identifier || email || username || '').trim().toLowerCase();

    if (!loginKey || !password) {
      return res.status(400).json({ error: 'กรุณากรอก Username/อีเมล และรหัสผ่าน' });
    }

    // ค้นหาผู้ใช้จาก Username หรือ Email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: loginKey },
          { username: loginKey },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Username/อีเมล หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Username/อีเมล หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // สร้าง JWT Token
    const token = signToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง' });
  }
});

/**
 * 3. GET /api/auth/me
 * ดึงข้อมูลผู้ใช้งานปัจจุบันผ่าน JWT Token
 */
authRouter.get('/me', authenticateUser, async (req, res) => {
  res.json({ user: req.user });
});

/**
 * 4. PATCH /api/auth/profile
 * อัปเดตข้อมูลส่วนตัว (ชื่อ, เบอร์โทร, วันเกิด)
 */
authRouter.patch('/profile', authenticateUser, async (req, res) => {
  try {
    const { name, phone, birthDate } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        phone: phone !== undefined ? phone.trim() : undefined,
        birthDate: birthDate !== undefined ? (birthDate ? new Date(birthDate) : null) : undefined,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        birthDate: true,
        role: true,
      },
    });

    res.json({ message: 'บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว', user: updatedUser });
  } catch (error) {
    console.error('[Update Profile Error]:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});

/**
 * 5. POST /api/auth/logout
 * ออกจากระบบ (ยืนยันฝั่งเซิร์ฟเวอร์)
 */
authRouter.post('/logout', (req, res) => {
  res.json({ message: 'ออกจากระบบเรียบร้อยแล้ว' });
});
