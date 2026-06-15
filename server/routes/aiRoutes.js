import express from 'express';
import {
  generatePoem,
  getChatHistory,
  generateShayari,
  generateGhazal,
  generateQuote,
  generateCaption,
} from '../controllers/aiController.js';
import { optionalAuth, protect } from '../middleware/authMiddleware.js';
import { aiRateLimiter } from '../middleware/securityMiddleware.js';

const router = express.Router();

router.post('/generate', optionalAuth, aiRateLimiter, generatePoem);
router.post('/generate/shayari', optionalAuth, aiRateLimiter, generateShayari);
router.post('/generate/ghazal', optionalAuth, aiRateLimiter, generateGhazal);
router.post('/generate/quote', optionalAuth, aiRateLimiter, generateQuote);
router.post('/generate/caption', optionalAuth, aiRateLimiter, generateCaption);
router.get('/history', protect, getChatHistory);

export default router;
