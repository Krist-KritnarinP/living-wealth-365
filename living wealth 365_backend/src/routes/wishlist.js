import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticateUser } from '../middleware/auth.js';

export const wishlistRouter = Router();

/**
 * 1. GET /api/wishlist
 * ดึงรายการสินค้าที่ผู้ใช้บันทึกไว้
 */
wishlistRouter.get('/', authenticateUser, async (req, res) => {
  try {
    const wishlists = await prisma.wishlist.findMany({
      where: { userId: req.user.id },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });

    const productIds = wishlists.map((w) => w.productId);
    const products = wishlists.map((w) => w.product);

    res.json({ productIds, products });
  } catch (error) {
    console.error('[Get Wishlist Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลรายการที่บันทึกไว้ได้' });
  }
});

/**
 * 2. POST /api/wishlist/:productId
 * เพิ่มสินค้าลง Wishlist (หรือสลับ Toggle)
 */
wishlistRouter.post('/:productId', authenticateUser, async (req, res) => {
  try {
    const { productId } = req.params;

    // ตรวจสอบว่าสินค้ามีอยู่จริง
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ error: 'ไม่พบสินค้าที่ต้องการบันทึก' });
    }

    // ตรวจสอบว่าเคยบันทึกไว้แล้วหรือไม่
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId,
        },
      },
    });

    if (existing) {
      // หากมีแล้ว ให้ลบออก (Toggle off)
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });
      return res.json({ message: 'นำสินค้าออกจากรายการที่บันทึกแล้ว', isSaved: false });
    }

    // หากยังไม่มี ให้เพิ่มเข้า Wishlist
    await prisma.wishlist.create({
      data: {
        userId: req.user.id,
        productId,
      },
    });

    res.status(201).json({ message: 'บันทึกสินค้าลงรายการที่สนใจแล้ว', isSaved: true });
  } catch (error) {
    console.error('[Toggle Wishlist Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถบันทึกรายการสินค้าได้' });
  }
});

/**
 * 3. DELETE /api/wishlist/:productId
 * นำสินค้าออกจาก Wishlist
 */
wishlistRouter.delete('/:productId', authenticateUser, async (req, res) => {
  try {
    const { productId } = req.params;

    await prisma.wishlist.deleteMany({
      where: {
        userId: req.user.id,
        productId,
      },
    });

    res.json({ message: 'ลบออกจากรายการที่บันทึกแล้ว' });
  } catch (error) {
    console.error('[Delete Wishlist Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถลบรายการได้' });
  }
});
