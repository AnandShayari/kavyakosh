import express from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updatePassword,
  checkEmailExists,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.get('/check-email', checkEmailExists);

// Protected routes
router.post('/logout', protect, logoutUser);
router.get('/current-user', protect, getCurrentUser);
router.put('/update-password', protect, updatePassword);

export default router;
