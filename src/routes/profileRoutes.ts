import { Router } from 'express';
import { getPublicProfile, getPrivateProfile, updateProfile } from '../controllers/ProfileController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile-public/:id', getPublicProfile);
router.get('/profile-private', protect, getPrivateProfile);
router.put('/profile-update', protect, updateProfile);

export default router;
