import express from 'express';
import {
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getSuggestedUsers,
  getDashboardStats,
  searchUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/search', searchUsers);
router.get('/:userId/profile', getUserProfile);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

// Protected routes
router.put('/profile', protect, updateProfile);
router.post('/:userId/follow', protect, followUser);
router.post('/:userId/unfollow', protect, unfollowUser);
router.get('/suggested', protect, getSuggestedUsers);
router.get('/dashboard/stats', protect, getDashboardStats);

export default router;
