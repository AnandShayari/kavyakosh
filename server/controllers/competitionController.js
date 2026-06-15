import Competition from '../models/Competition.js';
import Poem from '../models/Poem.js';
import mongoose from 'mongoose';

export const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find({ status: 'active', isActive: true })
      .sort({ endDate: 1 })
      .populate('createdBy', 'name');
    res.json({ success: true, data: competitions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id)
      .populate('submissions.user', 'name avatar')
      .populate('submissions.poem', 'title likeCount')
      .populate('winners.user', 'name avatar');
    if (!competition) return res.status(404).json({ success: false, message: 'Competition not found' });
    res.json({ success: true, data: competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id)
      .populate('submissions.user', 'name avatar')
      .populate('submissions.poem', 'title likeCount averageRating');

    if (!competition) return res.status(404).json({ success: false, message: 'Competition not found' });

    const leaderboard = competition.submissions
      .map((s) => ({
        user: s.user,
        poem: s.poem,
        submittedAt: s.submittedAt,
        score: ((s.poem?.likeCount || 0) + Math.round((s.poem?.averageRating || 0) * 10)),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { poemId } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(poemId)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }

    const competition = await Competition.findById(id);
    if (!competition) return res.status(404).json({ success: false, message: 'Competition not found' });
    if (!competition.isActive) return res.status(400).json({ success: false, message: 'Competition is not active' });
    if (new Date() > competition.endDate) return res.status(400).json({ success: false, message: 'Competition has ended' });

    const alreadySubmitted = competition.submissions.some(s => s.user.toString() === userId);
    if (alreadySubmitted) return res.status(400).json({ success: false, message: 'You have already submitted an entry' });

    const poem = await Poem.findById(poemId);
    if (!poem) return res.status(404).json({ success: false, message: 'Poem not found' });
    if (poem.author.toString() !== userId) return res.status(403).json({ success: false, message: 'You can only submit your own poems' });

    competition.submissions.push({ user: userId, poem: poemId });
    competition.submissionCount = competition.submissions.length;
    if (!competition.entrants.includes(userId)) {
      competition.entrants.push(userId);
      competition.entrantCount = competition.entrants.length;
    }
    await competition.save();

    res.status(201).json({ success: true, message: 'Entry submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCompetition = async (req, res) => {
  try {
    const { title, description, startDate, endDate, theme, category, totalPrizePool } = req.body;
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Title, description, startDate and endDate are required' });
    }
    const competition = await Competition.create({
      title, description, startDate, endDate,
      theme, category, totalPrizePool,
      status: 'active', isActive: true,
      createdBy: req.user.id,
    });
    res.status(201).json({ success: true, data: competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
