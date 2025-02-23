import express from 'express';
import { triggerIngestion } from '../controllers/ingestController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, triggerIngestion);

export default router;