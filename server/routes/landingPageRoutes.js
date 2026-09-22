import { Router } from 'express';
import {
  batchGenerateLandingPages,
  createLandingPage,
  deleteLandingPageById,
  deleteLocation,
  duplicateLandingPageById,
  generatePageFromMaster,
  getLandingPageById,
  getLandingPageBySlug,
  getMasterTemplateById,
  listAdminLandingPages,
  listLandingPages,
  listLocations,
  listMasterTemplates,
  saveLocation,
  saveMasterTemplate,
  syncLandingPageFromMaster,
  trackLandingPageView,
  updateLandingPageById
} from '../controllers/landingPageController.js';
import requireAuth from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', listLandingPages);
router.get('/locations', listLocations);
router.get('/master-templates', listMasterTemplates);
router.get('/master-templates/:id', getMasterTemplateById);
router.post('/master-templates/generate', generatePageFromMaster);
router.get('/slug/:slug', getLandingPageBySlug);

// Protected routes (Admin only)
router.get('/admin', requireAuth, listAdminLandingPages);
router.post('/locations', requireAuth, saveLocation);
router.delete('/locations/:id', requireAuth, deleteLocation);
router.post('/master-templates', requireAuth, saveMasterTemplate);
router.post('/master-templates/:id', requireAuth, saveMasterTemplate);
router.put('/master-templates/:id', requireAuth, saveMasterTemplate);
router.post('/master-templates/batch-generate', requireAuth, batchGenerateLandingPages);
router.post('/:id/sync-master', requireAuth, syncLandingPageFromMaster);
router.post('/', requireAuth, createLandingPage);
router.post('/:id/duplicate', requireAuth, duplicateLandingPageById);
router.post('/:id/view', trackLandingPageView);
router.get('/:id', getLandingPageById);
router.put('/:id', requireAuth, updateLandingPageById);
router.delete('/:id', requireAuth, deleteLandingPageById);

export default router;
