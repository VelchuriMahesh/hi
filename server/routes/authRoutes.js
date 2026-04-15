import { Router } from 'express';
import { loginAdmin } from '../controllers/authController.js';

const router = Router();

// This makes the endpoint: POST /api/auth/login
router.post('/login', loginAdmin);

export default router;