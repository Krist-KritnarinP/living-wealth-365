import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

export const planRouter = Router();

const createPlanSchema = z.object({
  title: z.string().min(2),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  targetGoal: z.string().min(2),
  targetAmount: z.number().positive(),
  targetYears: z.number().int().positive(),
  monthlySavings: z.number().positive(),
  riskLevel: z.string().default('MODERATE'),
});

planRouter.get('/', async (_req, res, next) => {
  try {
    const plans = await prisma.financialPlan.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
});

planRouter.post('/', async (req, res, next) => {
  try {
    const body = createPlanSchema.parse(req.body);
    const plan = await prisma.financialPlan.create({
      data: body,
    });
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
});
