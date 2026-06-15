import express from 'express';
import { getReviews, addReview, getReviewStats, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:poemId', getReviews);
router.get('/:poemId/stats', getReviewStats);
router.post('/:poemId', protect, addReview);
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);

export default router;
