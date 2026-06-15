import express from 'express';
import { getProducts, createProduct } from '../controllers/marketplaceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);

export default router;
