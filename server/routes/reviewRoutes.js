
import { Router } from 'express';
import { getGoogleReviews } from '../controllers/reviewController.js';

const router = Router();

router.get('/', getGoogleReviews);

export default router;
