import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticateUser, requireAdmin, optionalUser } from '../middleware/auth.js';

export const insurancePlansRouter = Router();

/**
 * 1. GET /api/insurance-plans
 * ดึงรายการแผนประกันภัย (Public เห็นเฉพาะที่ isActive: true, Admin เห็นทั้งหมด)
 */
insurancePlansRouter.get('/', optionalUser, async (req, res) => {
  try {
    const { type, category } = req.query;
    const isAdmin = req.user?.role === 'ADMIN';

    const whereClause = {
      ...(isAdmin ? {} : { isActive: true }),
      ...(type ? { type: type.toUpperCase() } : {}),
      ...(category ? { category: category.toUpperCase() } : {}),
    };

    const plans = await prisma.insurancePlan.findMany({
      where: whereClause,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    res.json({ plans });
  } catch (error) {
    console.error('[Get Insurance Plans Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลแผนประกันได้' });
  }
});

/**
 * 2. GET /api/insurance-plans/:slug
 * ดึงข้อมูลแผนประกันเดี่ยวตาม Slug หรือ ID
 */
insurancePlansRouter.get('/:slug', optionalUser, async (req, res) => {
  try {
    const { slug } = req.params;
    const plan = await prisma.insurancePlan.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    });

    if (!plan) {
      return res.status(404).json({ error: 'ไม่พบแผนประกันที่ต้องการ' });
    }

    if (!plan.isActive && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'แผนประกันนี้ยังไม่เปิดให้บริการ' });
    }

    res.json({ plan });
  } catch (error) {
    console.error('[Get Insurance Plan Detail Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลแผนประกันได้' });
  }
});

/**
 * 3. POST /api/insurance-plans
 * สร้างแผนประกันใหม่ (สำหรับ Admin)
 */
insurancePlansRouter.post('/', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const {
      type,
      category,
      categoryName,
      name,
      slug,
      tagline,
      coverageAmount,
      startingPrice,
      features,
      recommendedFor,
      description,
      imageUrl,
      brochureUrl,
      isActive,
      sortOrder,
    } = req.body;

    if (!type || !category || !name) {
      return res.status(400).json({ error: 'กรุณาระบุประเภท, หมวดหมู่ และชื่อแผนประกัน' });
    }

    const planSlug = slug || name.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-');

    const newPlan = await prisma.insurancePlan.create({
      data: {
        type: type.toUpperCase(),
        category: category.toUpperCase(),
        categoryName: categoryName || 'ประกันภัยและการเงิน',
        name: name.trim(),
        slug: planSlug,
        tagline: tagline ? tagline.trim() : null,
        coverageAmount: coverageAmount ? coverageAmount.trim() : null,
        startingPrice: startingPrice ? startingPrice.trim() : null,
        features: typeof features === 'string' ? features : JSON.stringify(features || []),
        recommendedFor: recommendedFor ? recommendedFor.trim() : null,
        description: description ? description.trim() : '',
        imageUrl: imageUrl ? imageUrl.trim() : null,
        brochureUrl: brochureUrl ? brochureUrl.trim() : null,
        isActive: isActive ?? true,
        sortOrder: sortOrder ? parseInt(sortOrder, 10) : 0,
      },
    });

    res.status(201).json({ message: 'สร้างแผนประกันสำเร็จ', plan: newPlan });
  } catch (error) {
    console.error('[Create Insurance Plan Error]:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างแผนประกัน' });
  }
});

/**
 * 4. PATCH /api/insurance-plans/:id
 * อัปเดตแผนประกัน (สำหรับ Admin)
 */
insurancePlansRouter.patch('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      category,
      categoryName,
      name,
      slug,
      tagline,
      coverageAmount,
      startingPrice,
      features,
      recommendedFor,
      description,
      imageUrl,
      brochureUrl,
      isActive,
      sortOrder,
    } = req.body;

    const updatedPlan = await prisma.insurancePlan.update({
      where: { id },
      data: {
        type: type ? type.toUpperCase() : undefined,
        category: category ? category.toUpperCase() : undefined,
        categoryName: categoryName !== undefined ? categoryName : undefined,
        name: name ? name.trim() : undefined,
        slug: slug ? slug.trim() : undefined,
        tagline: tagline !== undefined ? tagline : undefined,
        coverageAmount: coverageAmount !== undefined ? coverageAmount : undefined,
        startingPrice: startingPrice !== undefined ? startingPrice : undefined,
        features: features !== undefined ? (typeof features === 'string' ? features : JSON.stringify(features)) : undefined,
        recommendedFor: recommendedFor !== undefined ? recommendedFor : undefined,
        description: description !== undefined ? description : undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        brochureUrl: brochureUrl !== undefined ? brochureUrl : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder, 10) : undefined,
      },
    });

    res.json({ message: 'อัปเดตแผนประกันสำเร็จ', plan: updatedPlan });
  } catch (error) {
    console.error('[Update Insurance Plan Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถอัปเดตแผนประกันได้' });
  }
});

/**
 * 5. DELETE /api/insurance-plans/:id
 * ลบแผนประกัน (สำหรับ Admin)
 */
insurancePlansRouter.delete('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.insurancePlan.delete({ where: { id } });
    res.json({ message: 'ลบแผนประกันเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('[Delete Insurance Plan Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถลบแผนประกันได้' });
  }
});
