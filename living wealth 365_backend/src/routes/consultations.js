import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

export const consultationRouter = Router();

const createConsultationSchema = z.object({
  clientName: z.string().min(2, 'ชื่อ-นามสกุลต้องมีความยาวอย่างน้อย 2 ตัวอักษร'),
  clientPhone: z.string().min(9, 'เบอร์โทรศัพท์ต้องถูกต้อง'),
  clientEmail: z.string().email('กรุณาระบุอีเมลที่ถูกต้อง'),
  serviceCategory: z.string().min(1, 'กรุณาเลือกประเภทบริการ'),
  monthlyBudget: z.number().positive().optional(),
  notes: z.string().max(1000).optional(),
});

// GET /api/consultations - Fetch consultation leads
consultationRouter.get('/', async (_req, res, next) => {
  try {
    const consultations = await prisma.consultationRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json({ success: true, data: consultations });
  } catch (error) {
    next(error);
  }
});

// POST /api/consultations - Submit consultation lead
consultationRouter.post('/', async (req, res, next) => {
  try {
    const validated = createConsultationSchema.parse(req.body);

    const record = await prisma.consultationRequest.create({
      data: {
        clientName: validated.clientName,
        clientPhone: validated.clientPhone,
        clientEmail: validated.clientEmail,
        serviceCategory: validated.serviceCategory,
        monthlyBudget: validated.monthlyBudget,
        notes: validated.notes,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully',
      data: record,
    });
  } catch (error) {
    next(error);
  }
});
