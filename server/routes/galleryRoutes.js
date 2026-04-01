import { Router } from 'express';
import multer from 'multer';
import {
  createGalleryItem,
  deleteGalleryItemById,
  listGallery
} from '../controllers/galleryController.js';
import requireAuth from '../middleware/auth.js';

const router = Router();

// Multer setup to handle image files in memory before uploading to ImgBB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// GET /api/gallery -> Publicly view images
router.get('/', listGallery);

// POST /api/gallery -> Protected: Requires login and file upload
router.post('/', requireAuth, upload.single('image'), createGalleryItem);

// DELETE /api/gallery/:id -> Protected: Requires login
router.delete('/:id', requireAuth, deleteGalleryItemById);

export default router;