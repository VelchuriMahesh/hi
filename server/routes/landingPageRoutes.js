import { Router } from 'express';
import {
  createLandingPage,
  deleteLandingPageById,
  deleteLocation,
  duplicateLandingPageById,
  getLandingPageById,
  getLandingPageBySlug,
  listAdminLandingPages,
  listLandingPages,
  listLocations,
  saveLocation,
  trackLandingPageView,
  updateLandingPageById
} from '../controllers/landingPageController.js';
import requireAuth from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', listLandingPages);
router.get('/locations', listLocations);
router.get('/slug/:slug', getLandingPageBySlug);

// Protected routes (Admin only)
router.get('/admin', requireAuth, listAdminLandingPages);
router.post('/locations', requireAuth, saveLocation);
router.delete('/locations/:id', requireAuth, deleteLocation);
router.post('/', requireAuth, createLandingPage);
router.post('/:id/duplicate', requireAuth, duplicateLandingPageById);
router.post('/:id/view', trackLandingPageView);
router.get('/:id', getLandingPageById);
router.put('/:id', requireAuth, updateLandingPageById);
router.delete('/:id', requireAuth, deleteLandingPageById);

export default router;
