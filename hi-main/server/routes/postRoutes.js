import { Router } from 'express';
import {
  createPost,
  deletePostById,
  listPosts,
  updatePostById
} from '../controllers/postController.js';
import requireAuth from '../middleware/auth.js';

const router = Router();

// Public route
router.get('/', listPosts);

// Protected routes (Admin only)
router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePostById);
router.delete('/:id', requireAuth, deletePostById);

export default router;