import { Router } from 'express';
import {
  createPost,
  deletePostById,
  duplicatePostById,
  getBlogSettings,
  getPostBySlug,
  getPostsSitemap,
  listAdminPosts,
  listPosts,
  trackPostView,
  updateBlogSettings,
  updatePostById
} from '../controllers/postController.js';
import requireAuth from '../middleware/auth.js';

const router = Router();

// Public route
router.get('/', listPosts);
router.get('/sitemap.xml', getPostsSitemap);
router.get('/settings', getBlogSettings);
router.get('/slug/:slug', getPostBySlug);

// Protected routes (Admin only)
router.get('/admin', requireAuth, listAdminPosts);
router.put('/settings', requireAuth, updateBlogSettings);
router.post('/', requireAuth, createPost);
router.post('/:id/duplicate', requireAuth, duplicatePostById);
router.post('/:id/view', trackPostView);
router.put('/:id', requireAuth, updatePostById);
router.delete('/:id', requireAuth, deletePostById);

export default router;
