import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticateUser, requireAdmin, optionalUser } from '../middleware/auth.js';
import { leadLimiter } from '../middleware/rateLimiter.js';

export const workshopsRouter = Router();

const TRACK_LABELS = {
  CRYSTAL: 'ทำหินมงคล & แร่ธาตุ',
  LIFE_WEALTH: 'ศาสตร์ชีวิต & การเงิน',
  WELLBEING_THERAPY: 'บำบัด สมาธิ & คำปรึกษา',
};

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const feedbackSchema = z.object({
  workshopId: z.string().max(120).nullable().optional(),
  workshopSlug: z.string().max(120).optional(),
  authorName: z.string().trim().min(2, 'กรุณาระบุชื่ออย่างน้อย 2 ตัวอักษร').max(80),
  authorRole: z.string().trim().max(100).optional().default(''),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  comment: z.string().trim().min(5, 'กรุณาเขียนความคิดเห็นอย่างน้อย 5 ตัวอักษร').max(1000),
});

const toSlug = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ก-๙]+/g, '-')
    .replace(/^-+|-+$/g, '') || `workshop-${Date.now()}`;

const ensureArray = (val) => (Array.isArray(val) ? val : []);

/**
 * 1. GET /api/workshops
 * ดึงรายการเวิร์กชอปทั้งหมด (Public เห็นเฉพาะที่ isActive: true, Admin เห็นทั้งหมด)
 */
workshopsRouter.get('/', optionalUser, async (req, res) => {
  try {
    const { track, audience } = req.query;
    const isAdmin = req.user?.role === 'ADMIN';

    const workshops = await prisma.workshop.findMany({
      where: {
        ...(isAdmin ? {} : { isActive: true }),
        ...(track && track !== 'ALL' ? { track: String(track).toUpperCase() } : {}),
      },
      include: {
        feedbacks: {
          where: isAdmin ? {} : { isApproved: true },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    const filtered =
      audience && audience !== 'ALL'
        ? workshops.filter((w) => ensureArray(w.audiences).includes(String(audience).toUpperCase()))
        : workshops;

    res.json({ workshops: filtered });
  } catch (error) {
    console.error('[Get Workshops Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลเวิร์กชอปได้' });
  }
});

/**
 * 2. GET /api/workshops/feedbacks
 * ดึงรายการรีวิว/ความคิดเห็น (Public เห็นเฉพาะ isApproved: true, Admin เห็นทั้งหมด)
 */
workshopsRouter.get('/feedbacks', optionalUser, async (req, res) => {
  try {
    const { workshopId } = req.query;
    const isAdmin = req.user?.role === 'ADMIN';

    const feedbacks = await prisma.workshopFeedback.findMany({
      where: {
        ...(isAdmin ? {} : { isApproved: true }),
        ...(workshopId ? { workshopId: String(workshopId) } : {}),
      },
      include: {
        workshop: {
          select: { id: true, slug: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ feedbacks });
  } catch (error) {
    console.error('[Get Workshop Feedbacks Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลรีวิวเวิร์กชอปได้' });
  }
});

/**
 * 3. POST /api/workshops/feedbacks
 * ส่งรีวิว/ความคิดเห็นจากผู้เข้าร่วม (ขึ้นแสดงทันที แอดมินสามารถซ่อน/ลบได้ใน CMS)
 */
workshopsRouter.post('/feedbacks', leadLimiter, async (req, res) => {
  try {
    const parsed = feedbackSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'ข้อมูลรีวิวไม่ถูกต้อง';
      return res.status(400).json({ error: firstError });
    }

    const { workshopId, workshopSlug, authorName, authorRole, rating, comment } = parsed.data;
    let resolvedWorkshopId =
      workshopId && UUID_REGEX.test(workshopId) ? workshopId : null;

    if (!resolvedWorkshopId && workshopSlug) {
      const ws = await prisma.workshop.findUnique({
        where: { slug: workshopSlug },
        select: { id: true },
      });
      if (ws) resolvedWorkshopId = ws.id;
    }

    const feedback = await prisma.workshopFeedback.create({
      data: {
        workshopId: resolvedWorkshopId,
        authorName,
        authorRole: authorRole || 'ผู้เข้าร่วมเวิร์กชอป',
        rating,
        comment,
        isApproved: true,
      },
      include: {
        workshop: {
          select: { id: true, slug: true, title: true },
        },
      },
    });

    res.status(201).json({
      message: 'ขอบคุณสำหรับความคิดเห็น รีวิวของคุณแสดงบนหน้าเว็บเรียบร้อยแล้ว',
      feedback,
    });
  } catch (error) {
    console.error('[Create Workshop Feedback Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถส่งความคิดเห็นได้ กรุณาลองใหม่อีกครั้ง' });
  }
});

/**
 * 4. PATCH /api/workshops/feedbacks/:id
 * ซ่อนหรือแสดงรีวิว (สำหรับ Admin)
 */
workshopsRouter.patch('/feedbacks/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const updated = await prisma.workshopFeedback.update({
      where: { id },
      data: { isApproved: Boolean(isApproved) },
      include: {
        workshop: { select: { id: true, slug: true, title: true } },
      },
    });

    res.json({ message: 'อัปเดตสถานะรีวิวเรียบร้อยแล้ว', feedback: updated });
  } catch (error) {
    console.error('[Update Workshop Feedback Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถอัปเดตสถานะรีวิวได้' });
  }
});

/**
 * 5. DELETE /api/workshops/feedbacks/:id
 * ลบรีวิว (สำหรับ Admin)
 */
workshopsRouter.delete('/feedbacks/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.workshopFeedback.delete({ where: { id } });
    res.json({ message: 'ลบความคิดเห็นเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('[Delete Workshop Feedback Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถลบความคิดเห็นได้' });
  }
});

/**
 * 6. GET /api/workshops/:slug
 * ดึงรายละเอียดเวิร์กชอปเดี่ยวตาม slug หรือ id
 */
workshopsRouter.get('/:slug', optionalUser, async (req, res) => {
  try {
    const { slug } = req.params;
    const isAdmin = req.user?.role === 'ADMIN';

    const workshop = await prisma.workshop.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: {
        feedbacks: {
          where: isAdmin ? {} : { isApproved: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!workshop) {
      return res.status(404).json({ error: 'ไม่พบหลักสูตรเวิร์กชอปที่ต้องการ' });
    }

    if (!workshop.isActive && !isAdmin) {
      return res.status(403).json({ error: 'หลักสูตรนี้ยังไม่เปิดเผยแพร่' });
    }

    res.json({ workshop });
  } catch (error) {
    console.error('[Get Workshop Detail Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงรายละเอียดเวิร์กชอปได้' });
  }
});

/**
 * 7. POST /api/workshops
 * สร้างเวิร์กชอปใหม่ (สำหรับ Admin)
 */
workshopsRouter.post('/', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const {
      slug,
      track = 'CRYSTAL',
      trackLabel,
      audiences = ['CORPORATE', 'SMALL_GROUP'],
      title,
      subtitle = '',
      duration = '2.5 – 3 ชั่วโมง',
      groupSize = '6–12 คน (กลุ่มเล็ก) / 20–60 คน (องค์กร)',
      format = 'On-site / Studio / ออฟฟิศองค์กร',
      facilitator = 'Admin A & Admin B',
      imageUrl = null,
      painPoints = [],
      whatAndHow = [],
      outcomes = [],
      highlights = [],
      agenda = [],
      takeaways = '',
      credits = [],
      slides = [],
      isActive = true,
      sortOrder = 0,
    } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: 'กรุณาระบุชื่อหลักสูตรเวิร์กชอป' });
    }

    const normalizedTrack = String(track).toUpperCase();
    const workshop = await prisma.workshop.create({
      data: {
        slug: slug ? toSlug(slug) : toSlug(title),
        track: normalizedTrack,
        trackLabel: trackLabel || TRACK_LABELS[normalizedTrack] || 'เวิร์กชอปพิเศษ',
        audiences: ensureArray(audiences),
        title: String(title).trim(),
        subtitle: String(subtitle).trim(),
        duration: String(duration).trim(),
        groupSize: String(groupSize).trim(),
        format: String(format).trim(),
        facilitator: String(facilitator).trim() || 'Admin A & Admin B',
        imageUrl: imageUrl ? String(imageUrl).trim() : null,
        painPoints: ensureArray(painPoints),
        whatAndHow: ensureArray(whatAndHow),
        outcomes: ensureArray(outcomes),
        highlights: ensureArray(highlights),
        agenda: ensureArray(agenda),
        takeaways: takeaways ? String(takeaways).trim() : null,
        credits: ensureArray(credits),
        slides: ensureArray(slides),
        isActive: Boolean(isActive),
        sortOrder: Number.isFinite(Number(sortOrder)) ? parseInt(sortOrder, 10) : 0,
      },
      include: { feedbacks: true },
    });

    res.status(201).json({ message: 'สร้างหลักสูตรเวิร์กชอปสำเร็จ', workshop });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'URL Slug นี้ถูกใช้งานแล้ว กรุณาเปลี่ยน Slug ใหม่' });
    }
    console.error('[Create Workshop Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถสร้างหลักสูตรเวิร์กชอปได้' });
  }
});

/**
 * 8. PATCH /api/workshops/:id
 * แก้ไขข้อมูลเวิร์กชอป (สำหรับ Admin)
 */
workshopsRouter.patch('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const data = {};
    if (body.slug !== undefined) data.slug = toSlug(body.slug);
    if (body.track !== undefined) {
      data.track = String(body.track).toUpperCase();
      if (body.trackLabel === undefined) {
        data.trackLabel = TRACK_LABELS[data.track] || 'เวิร์กชอปพิเศษ';
      }
    }
    if (body.trackLabel !== undefined) data.trackLabel = String(body.trackLabel).trim();
    if (body.audiences !== undefined) data.audiences = ensureArray(body.audiences);
    if (body.title !== undefined) data.title = String(body.title).trim();
    if (body.subtitle !== undefined) data.subtitle = String(body.subtitle).trim();
    if (body.duration !== undefined) data.duration = String(body.duration).trim();
    if (body.groupSize !== undefined) data.groupSize = String(body.groupSize).trim();
    if (body.format !== undefined) data.format = String(body.format).trim();
    if (body.facilitator !== undefined) data.facilitator = String(body.facilitator).trim();
    if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl ? String(body.imageUrl).trim() : null;
    if (body.painPoints !== undefined) data.painPoints = ensureArray(body.painPoints);
    if (body.whatAndHow !== undefined) data.whatAndHow = ensureArray(body.whatAndHow);
    if (body.outcomes !== undefined) data.outcomes = ensureArray(body.outcomes);
    if (body.highlights !== undefined) data.highlights = ensureArray(body.highlights);
    if (body.agenda !== undefined) data.agenda = ensureArray(body.agenda);
    if (body.takeaways !== undefined) data.takeaways = body.takeaways ? String(body.takeaways).trim() : null;
    if (body.credits !== undefined) data.credits = ensureArray(body.credits);
    if (body.slides !== undefined) data.slides = ensureArray(body.slides);
    if (body.isActive !== undefined) data.isActive = Boolean(body.isActive);
    if (body.sortOrder !== undefined) data.sortOrder = parseInt(body.sortOrder, 10) || 0;

    const workshop = await prisma.workshop.update({
      where: { id },
      data,
      include: { feedbacks: { orderBy: { createdAt: 'desc' } } },
    });

    res.json({ message: 'อัปเดตหลักสูตรเวิร์กชอปเรียบร้อยแล้ว', workshop });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'URL Slug นี้ถูกใช้งานแล้ว กรุณาเปลี่ยน Slug ใหม่' });
    }
    console.error('[Update Workshop Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถอัปเดตหลักสูตรเวิร์กชอปได้' });
  }
});

/**
 * 9. DELETE /api/workshops/:id
 * ลบเวิร์กชอป (สำหรับ Admin)
 */
workshopsRouter.delete('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.workshop.delete({ where: { id } });
    res.json({ message: 'ลบหลักสูตรเวิร์กชอปเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('[Delete Workshop Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถลบหลักสูตรเวิร์กชอปได้' });
  }
});
