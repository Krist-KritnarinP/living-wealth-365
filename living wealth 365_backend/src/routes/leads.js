import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { optionalUser, authenticateUser, requireAdmin } from '../middleware/auth.js';

export const leadsRouter = Router();

/**
 * 1. POST /api/leads
 * ส่งแบบฟอร์มขอคำปรึกษา / ขอติดต่อกลับ (สาธารณะ หรือสมาชิกล็อกอิน)
 */
leadsRouter.post('/', optionalUser, async (req, res) => {
  try {
    const { name, phone, interest, preferredTime, notes } = req.body;

    if (!name || !phone || !interest) {
      return res.status(400).json({ error: 'กรุณากรอกชื่อ, เบอร์โทรศัพท์ และบริการที่สนใจ' });
    }

    const newLead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        interest: interest.trim(),
        preferredTime: preferredTime ? preferredTime.trim() : null,
        notes: notes ? notes.trim() : null,
        userId: req.user?.id || null,
        status: 'NEW',
      },
    });

    res.status(201).json({
      message: 'ส่งคำขอคำปรึกษาเรียบร้อยแล้ว ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง',
      lead: newLead,
    });
  } catch (error) {
    console.error('[Create Lead Error]:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง' });
  }
});

/**
 * 2. GET /api/leads
 * ดึงรายการ Leads
 * - ถ้าเป็น Admin: ดูได้ทั้งหมด พร้อม filter status
 * - ถ้าเป็น Customer: ดูเฉพาะของตนเอง
 */
leadsRouter.get('/', authenticateUser, async (req, res) => {
  try {
    const { status } = req.query;

    if (req.user.role === 'ADMIN') {
      const whereClause = status ? { status: status.toUpperCase() } : {};
      const leads = await prisma.lead.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, username: true, email: true, name: true },
          },
        },
      });
      return res.json({ leads });
    }

    // สำหรับ Customer: ดูเฉพาะของตนเอง
    const customerLeads = await prisma.lead.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ leads: customerLeads });
  } catch (error) {
    console.error('[Get Leads Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลคำขอได้' });
  }
});

/**
 * 3. PATCH /api/leads/:id
 * อัปเดตสถานะ Lead หรือโน้ตของที่ปรึกษา (สำหรับ Admin เท่านั้น)
 */
leadsRouter.patch('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: status ? status.toUpperCase() : undefined,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    res.json({ message: 'อัปเดตสถานะสำเร็จ', lead: updatedLead });
  } catch (error) {
    console.error('[Update Lead Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถอัปเดตสถานะได้' });
  }
});
