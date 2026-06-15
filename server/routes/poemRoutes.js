import express from 'express';
import {
  createPoem,
  getAllPoems,
  getPoem,
  getUserPoems,
  updatePoem,
  publishPoem,
  deletePoem,
  likePoem,
  unlikePoem,
  savePoem,
  unsavePoem,
  getTrendingPoems,
  searchPoems,
} from '../controllers/poemController.js';
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
  likeComment,
  replyToComment,
} from '../controllers/commentController.js';
import {
  addReview,
  getReviews,
  getReviewStats,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Poem routes
router.get('/trending', getTrendingPoems);
router.get('/search', searchPoems);
router.get('/', getAllPoems);
router.post('/', protect, createPoem);

router.get('/user/:userId', getUserPoems);
router.get('/:id', optionalAuth, getPoem);
router.put('/:id', protect, updatePoem);
router.post('/:id/publish', protect, publishPoem);
router.delete('/:id', protect, deletePoem);

// Like/Unlike
router.post('/:id/like', protect, likePoem);
router.post('/:id/unlike', protect, unlikePoem);

// Save/Unsave
router.post('/:id/save', protect, savePoem);
router.post('/:id/unsave', protect, unsavePoem);

// Comments
router.post('/:poemId/comments', protect, addComment);
router.get('/:poemId/comments', getComments);
router.put('/comments/:commentId', protect, updateComment);
router.delete('/comments/:commentId', protect, deleteComment);
router.post('/comments/:commentId/like', protect, likeComment);
router.post('/comments/:commentId/reply', protect, replyToComment);

// Reviews
router.post('/:poemId/reviews', protect, addReview);
router.get('/:poemId/reviews', getReviews);
router.get('/:poemId/reviews/stats', getReviewStats);
router.put('/reviews/:reviewId', protect, updateReview);
router.delete('/reviews/:reviewId', protect, deleteReview);

export default router;
