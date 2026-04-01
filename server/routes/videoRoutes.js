import { Router } from 'express';
import requireAuth from '../middleware/auth.js';
import {
  createVideo,
  deleteVideoById,
  listVideos,
  updateVideoById
} from '../controllers/videoController.js';

const router = Router();

router.get('/', listVideos);
router.post('/', requireAuth, createVideo);
router.put('/:id', requireAuth, updateVideoById);
router.delete('/:id', requireAuth, deleteVideoById);

export default router;
