import express from 'express';
import { getCompetitions, getCompetition, getLeaderboard, submitEntry, createCompetition } from '../controllers/competitionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCompetitions);
router.post('/', protect, createCompetition);
router.get('/:id', getCompetition);
router.get('/:id/leaderboard', getLeaderboard);
router.post('/:id/submit', protect, submitEntry);

export default router;
