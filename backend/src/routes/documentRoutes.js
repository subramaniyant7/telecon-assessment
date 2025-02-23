import express from 'express';
import { uploadDocument, getDocuments } from '../controllers/documentController';
import { authenticate } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', authenticate, upload.single('file'), uploadDocument);
router.get('/', authenticate, getDocuments);

export default router;