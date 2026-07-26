import { Router } from 'express';
import { getParts, createPart } from '../controllers/partController';
import { authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public route: Anyone can see parts (retail users)
router.get('/', getParts);

// Protected route: Only Admins can add new parts to inventory
router.post('/', authenticate, requireAdmin, createPart);

export default router;
