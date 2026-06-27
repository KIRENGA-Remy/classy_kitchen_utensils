import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { env } from '../../config/env';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function saveImage(file: Express.Multer.File): Promise<string> {
  // If Cloudinary is configured, upload there (recommended for production).
  if (env.CLOUDINARY_URL) {
    const { v2: cloudinary } = await import('cloudinary');
    cloudinary.config(); // reads CLOUDINARY_URL from the environment
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'classy-kitchen' },
        (err, res) => (err ? reject(err) : resolve(res)),
      );
      stream.end(file.buffer);
    });
    return result.secure_url as string;
  }

  // Fallback: write to local disk and serve via /uploads (fine for dev / disk hosts).
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.originalname) || '.jpg';
  const name = crypto.randomBytes(8).toString('hex') + ext;
  fs.writeFileSync(path.join(UPLOAD_DIR, name), file.buffer);
  return `${env.PUBLIC_BASE_URL}/uploads/${name}`;
}
