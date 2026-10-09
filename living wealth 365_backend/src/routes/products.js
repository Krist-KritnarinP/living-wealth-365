import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticateUser, requireAdmin, optionalUser } from '../middleware/auth.js';

export const productsRouter = Router();

/**
 * 1. GET /api/products
 * ดึงรายการสินค้าสายมู / หินมงคล
 */
productsRouter.get('/', optionalUser, async (req, res) => {
  try {
    const isAdmin = req.user?.role === 'ADMIN';
    const products = await prisma.product.findMany({
      where: isAdmin ? {} : { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ products });
  } catch (error) {
    console.error('[Get Products Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลสินค้าได้' });
  }
});

/**
 * 2. GET /api/products/:id
 * ดึงรายละเอียดสินค้าเดี่ยว
 */
productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ error: 'ไม่พบสินค้าที่ต้องการ' });
    }
    res.json({ product });
  } catch (error) {
    console.error('[Get Product Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลสินค้าได้' });
  }
});

/**
 * 3. POST /api/products
 * สร้างสินค้าใหม่ (สำหรับ Admin)
 */
productsRouter.post('/', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, stoneType, dayOfWeek, isActive } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'กรุณาระบุชื่อสินค้าและรายละเอียด' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        category: category || 'หินมงคล',
        price: price ? parseFloat(price) : null,
        description: description.trim(),
        imageUrl: imageUrl ? imageUrl.trim() : null,
        stoneType: stoneType || null,
        dayOfWeek: dayOfWeek || null,
        isActive: isActive ?? true,
      },
    });

    res.status(201).json({ message: 'สร้างสินค้าสำเร็จ', product: newProduct });
  } catch (error) {
    console.error('[Create Product Error]:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างสินค้า' });
  }
});

/**
 * 4. PATCH /api/products/:id
 * อัปเดตสินค้า (สำหรับ Admin)
 */
productsRouter.patch('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, imageUrl, stoneType, dayOfWeek, isActive } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name ? name.trim() : undefined,
        category: category !== undefined ? category : undefined,
        price: price !== undefined ? (price ? parseFloat(price) : null) : undefined,
        description: description ? description.trim() : undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        stoneType: stoneType !== undefined ? stoneType : undefined,
        dayOfWeek: dayOfWeek !== undefined ? dayOfWeek : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    res.json({ message: 'อัปเดตสินค้าสำเร็จ', product: updatedProduct });
  } catch (error) {
    console.error('[Update Product Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถอัปเดตสินค้าได้' });
  }
});

/**
 * 5. DELETE /api/products/:id
 * ลบสินค้า (สำหรับ Admin)
 */
productsRouter.delete('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'ลบสินค้าเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('[Delete Product Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถลบสินค้าได้' });
  }
});
