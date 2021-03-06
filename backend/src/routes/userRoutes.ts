import { Router } from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
