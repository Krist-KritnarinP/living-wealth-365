import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';
import { uploadToR2, isR2Configured, R2_BUCKET_NAME, R2_PUBLIC_DOMAIN } from '../lib/r2.js';

const uploadRouter = express.Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ตรวจสอบประเภทไฟล์ที่รองรับ (รูปภาพและ PDF)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'application/pdf',
  ];

  if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'ประเภทไฟล์ไม่ถูกต้อง! รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG, WebP, GIF, SVG) หรือไฟล์เอกสาร PDF เท่านั้น'
      ),
      false
    );
  }
};

// ใช้ Memory Storage หากเปิดใช้ Cloudflare R2 เพื่อส่ง Buffer ตรงไป Cloudflare ทันที
// ใช้ Disk Storage หากยังไม่ได้ตั้งค่า R2 เพื่อเป็นตัวสำรองสำหรับ Local Development
const storage = isR2Configured
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const baseName = path
          .basename(file.originalname, ext)
          .replace(/[^a-zA-Z0-9_\u0E00-\u0E7F-]/g, '_')
          .slice(0, 40);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
      },
    });

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // จำกัดขนาดสูงสุด 25MB
  },
});

/**
 * GET /api/upload/status
 * ตรวจสอบสถานะการเชื่อมต่อ Cloudflare R2
 */
uploadRouter.get('/status', (req, res) => {
  res.json({
    storage: isR2Configured ? 'CLOUDFLARE_R2' : 'LOCAL',
    isR2: isR2Configured,
    bucket: R2_BUCKET_NAME || null,
    publicDomain: R2_PUBLIC_DOMAIN,
    maxFileSizeMB: 25,
  });
});

/**
 * POST /api/upload
 * อัปโหลดรูปภาพ หรือไฟล์ PDF เข้าสู่ Cloudflare R2 หรือ Local Storage
 */
uploadRouter.post(
  '/',
  authenticateUser,
  requireAdmin,
  (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'ขนาดไฟล์เกินกำหนด (สูงสุดไม่เกิน 25MB)' });
        }
        return res.status(400).json({ error: `Multer error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'ไม่พบไฟล์ที่ต้องการอัปโหลด' });
      }

      const ext = path.extname(req.file.originalname).toLowerCase();
      const baseName = path
        .basename(req.file.originalname, ext)
        .replace(/[^a-zA-Z0-9_\u0E00-\u0E7F-]/g, '_')
        .slice(0, 40);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const filename = `${baseName}-${uniqueSuffix}${ext}`;

      // ☁️ หากเปิดใช้ Cloudflare R2 ให้ส่ง Buffer ขึ้น R2 โดยตรง
      if (isR2Configured) {
        const r2Result = await uploadToR2({
          buffer: req.file.buffer,
          filename,
          mimetype: req.file.mimetype,
        });

        return res.status(201).json({
          message: 'อัปโหลดไฟล์ขึ้น Cloudflare R2 สำเร็จเรียบร้อย',
          url: r2Result.url,
          relativeUrl: r2Result.url,
          filename,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          storage: 'CLOUDFLARE_R2',
          isR2: true,
        });
      }

      // 💻 หากยังไม่ได้ต่อ R2 ให้บันทึกลง Local Disk ชั่วคราว (Fallback)
      const protocol = req.protocol;
      const host = req.get('host');
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      const relativeUrl = `/uploads/${req.file.filename}`;

      return res.status(201).json({
        message: 'อัปโหลดไฟล์สำเร็จเรียบร้อย (Local Storage)',
        url: fileUrl,
        relativeUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        storage: 'LOCAL',
        isR2: false,
      });
    } catch (error) {
      console.error('[Upload File Error]:', error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์ขึ้น Cloudflare R2' });
    }
  }
);

export { uploadRouter };
