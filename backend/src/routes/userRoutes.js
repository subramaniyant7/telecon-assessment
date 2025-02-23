import express from 'express';
import { getUsers, updateUserRole } from '../controllers/userController';
import { authenticate, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.get('/', authenticate, isAdmin, getUsers);
router.put('/:userId/role', authenticate, isAdmin, updateUserRole);

export default router;