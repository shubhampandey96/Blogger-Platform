import express from 'express';
import { getProfile, getAllUsers } from '../controllers/userController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', requireAuth, getProfile);
router.get('/admin/users', requireAuth, requireAdmin, getAllUsers);

export default router;
