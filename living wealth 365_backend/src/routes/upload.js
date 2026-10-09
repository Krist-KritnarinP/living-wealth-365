import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const uploadRouter = express.Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ตั้งค่า storage ปลายทางและชื่อไฟล์
const storage = multer.diskStorage({
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

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // จำกัดขนาดสูงสุด 25MB
  },
});

/**
 * POST /api/upload
 * อัปโหลดรูปภาพ หรือไฟล์ PDF
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
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'ไม่พบไฟล์ที่ต้องการอัปโหลด' });
      }

      const protocol = req.protocol;
      const host = req.get('host');
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      const relativeUrl = `/uploads/${req.file.filename}`;

      res.status(201).json({
        message: 'อัปโหลดไฟล์สำเร็จเรียบร้อย',
        url: fileUrl,
        relativeUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });
    } catch (error) {
      console.error('[Upload File Error]:', error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
    }
  }
);

export { uploadRouter };
