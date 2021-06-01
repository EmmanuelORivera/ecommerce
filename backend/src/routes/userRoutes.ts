import { Router } from 'express';
import { authUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
