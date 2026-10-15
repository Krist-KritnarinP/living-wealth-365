import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticateUser, requireAdmin, optionalUser } from '../middleware/auth.js';

export const postsRouter = Router();

/**
 * 1. GET /api/posts
 * ดึงรายการบทความ (Public เห็นเฉพาะที่ published: true, Admin เห็นทั้งหมด)
 */
postsRouter.get('/', optionalUser, async (req, res) => {
  try {
    const isAdmin = req.user?.role === 'ADMIN';
    const { pillar, postType, category } = req.query;

    const where = {
      ...(isAdmin ? {} : { published: true }),
      ...(pillar ? { pillar } : {}),
      ...(postType ? { postType } : {}),
      ...(category && category !== 'ทั้งหมด' ? { category } : {}),
    };

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true, username: true },
        },
      },
    });
    res.json({ posts });
  } catch (error) {
    console.error('[Get Posts Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลบทความได้' });
  }
});

/**
 * 2. GET /api/posts/:slug
 * ดึงรายละเอียดบทความเดี่ยวตาม Slug
 */
postsRouter.get('/:slug', optionalUser, async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, username: true } },
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'ไม่พบบทความที่ต้องการ' });
    }

    if (!post.published && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'บทความนี้ยังไม่เปิดเผยต่อสาธารณะ' });
    }

    res.json({ post });
  } catch (error) {
    console.error('[Get Post Slug Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลบทความได้' });
  }
});

/**
 * 3. POST /api/posts
 * สร้างบทความใหม่ (สำหรับ Admin)
 */
postsRouter.post('/', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      category,
      pillar,
      postType,
      authorName,
      readTime,
      tags,
      published,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'กรุณาระบุหัวข้อและเนื้อหาบทความ' });
    }

    const postSlug = slug || title.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-');

    const newPost = await prisma.post.create({
      data: {
        title: title.trim(),
        slug: postSlug,
        content: content.trim(),
        excerpt: excerpt ? excerpt.trim() : null,
        imageUrl: imageUrl ? imageUrl.trim() : null,
        category: category || 'การวางแผนการเงิน',
        pillar: pillar || 'JOURNAL',
        postType: postType || 'ARTICLE',
        authorName: authorName ? authorName.trim() : 'Top & Joy',
        readTime: readTime ? readTime.trim() : '5 นาที',
        tags: tags ? tags.trim() : null,
        published: published ?? true,
        authorId: req.user.id,
      },
    });

    res.status(201).json({ message: 'สร้างบทความสำเร็จ', post: newPost });
  } catch (error) {
    console.error('[Create Post Error]:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างบทความ' });
  }
});

/**
 * 4. PATCH /api/posts/:id
 * อัปเดตบทความ (สำหรับ Admin)
 */
postsRouter.patch('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      category,
      pillar,
      postType,
      authorName,
      readTime,
      tags,
      published,
    } = req.body;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: title ? title.trim() : undefined,
        slug: slug ? slug.trim() : undefined,
        content: content ? content.trim() : undefined,
        excerpt: excerpt !== undefined ? excerpt : undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        category: category !== undefined ? category : undefined,
        pillar: pillar !== undefined ? pillar : undefined,
        postType: postType !== undefined ? postType : undefined,
        authorName: authorName !== undefined ? authorName : undefined,
        readTime: readTime !== undefined ? readTime : undefined,
        tags: tags !== undefined ? tags : undefined,
        published: published !== undefined ? published : undefined,
      },
    });

    res.json({ message: 'อัปเดตบทความสำเร็จ', post: updatedPost });
  } catch (error) {
    console.error('[Update Post Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถอัปเดตบทความได้' });
  }
});

/**
 * 5. DELETE /api/posts/:id
 * ลบบทความ (สำหรับ Admin)
 */
postsRouter.delete('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id } });
    res.json({ message: 'ลบบทความเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('[Delete Post Error]:', error);
    res.status(500).json({ error: 'ไม่สามารถลบบทความได้' });
  }
});
