import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Define storage for files
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Filter for image files only
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
  }
};

// Setup multer with storage, file size limits, and file filter
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size
  },
  fileFilter,
});

export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 10); // Allow up to 10 images

export default upload;
