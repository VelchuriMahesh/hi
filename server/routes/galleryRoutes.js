import { Router } from 'express';
import multer from 'multer';
import {
  createGalleryItem,
  deleteGalleryItemById,
  listGallery,
  updateGalleryItemById
} from '../controllers/galleryController.js';
import requireAuth from '../middleware/auth.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

router.get('/', listGallery);
router.post('/', requireAuth, upload.single('image'), createGalleryItem);
router.put('/:id', requireAuth, updateGalleryItemById);
router.delete('/:id', requireAuth, deleteGalleryItemById);

export default router;