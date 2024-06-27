import { Router } from 'express';
import { registerUser, loginUser, logoutUser, refreshToken } from '../controllers/AuthController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup-basic', registerUser);
router.post('/login-basic', loginUser);
router.delete('/logout-current', protect, logoutUser);
router.post('/token-refresh', refreshToken);

export default router;
