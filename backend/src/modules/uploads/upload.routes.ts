import { Router } from 'express';
import multer from 'multer';
import { requireAdmin } from '../../middlewares/auth';
import { postUpload } from './upload.controller';

// Keep the file in memory; the service decides where it ends up (disk/Cloudinary).
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) =>
    cb(null, ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)),
});

const router = Router();
router.post('/', requireAdmin, upload.single('file'), postUpload);
export default router;
