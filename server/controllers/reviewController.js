import Review from '../models/Review.js';
import Poem from '../models/Poem.js';
import mongoose from 'mongoose';

// Add Review
export const addReview = async (req, res) => {
  try {
    const { poemId } = req.params;
    const { ratings, feedback } = req.body;
    const reviewerId = req.user.id;

    if (!ratings || !ratings.emotion || !ratings.creativity || !ratings.rhythm || !ratings.imagery || !ratings.symbolism) {
      return res.status(400).json({ success: false, message: 'All ratings are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(poemId)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(poemId);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    const existingReview = await Review.findOne({ poem: poemId, reviewer: reviewerId });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this poem' });
    }

    const overallRating = (ratings.emotion + ratings.creativity + ratings.rhythm + ratings.imagery + ratings.symbolism) / 5;

    const review = await Review.create({
      poem: poemId,
      reviewer: reviewerId,
      ratings,
      overallRating,
      feedback,
    });

    await review.populate('reviewer', 'name avatar');

    poem.reviews.push(review._id);
    poem.reviewCount = (poem.reviewCount || 0) + 1;
    
    const allReviews = await Review.find({ poem: poemId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.overallRating, 0) / allReviews.length;
    poem.averageRating = avgRating;
    await poem.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Reviews for Poem
export const getReviews = async (req, res) => {
  try {
    const { poemId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(poemId)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const reviews = await Review.find({ poem: poemId })
      .populate('reviewer', 'name avatar')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ poem: poemId });

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Review Stats
export const getReviewStats = async (req, res) => {
  try {
    const { poemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(poemId)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const reviews = await Review.find({ poem: poemId });

    if (reviews.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalReviews: 0,
          averageRating: 0,
          categoryAverages: {
            emotion: 0,
            creativity: 0,
            rhythm: 0,
            imagery: 0,
            symbolism: 0,
          },
        },
      });
    }

    const stats = {
      totalReviews: reviews.length,
      averageRating: reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length,
      categoryAverages: {
        emotion: reviews.reduce((sum, r) => sum + r.ratings.emotion, 0) / reviews.length,
        creativity: reviews.reduce((sum, r) => sum + r.ratings.creativity, 0) / reviews.length,
        rhythm: reviews.reduce((sum, r) => sum + r.ratings.rhythm, 0) / reviews.length,
        imagery: reviews.reduce((sum, r) => sum + r.ratings.imagery, 0) / reviews.length,
        symbolism: reviews.reduce((sum, r) => sum + r.ratings.symbolism, 0) / reviews.length,
      },
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { ratings, feedback } = req.body;
    const reviewerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ success: false, message: 'Invalid review ID' });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.reviewer.toString() !== reviewerId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (ratings) {
      review.ratings = ratings;
      review.overallRating = (ratings.emotion + ratings.creativity + ratings.rhythm + ratings.imagery + ratings.symbolism) / 5;
    }
    if (feedback) review.feedback = feedback;

    await review.save();
    await review.populate('reviewer', 'name avatar');

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const reviewerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ success: false, message: 'Invalid review ID' });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.reviewer.toString() !== reviewerId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const poemId = review.poem;
    await Review.findByIdAndDelete(reviewId);

    const remainingReviews = await Review.find({ poem: poemId });
    if (remainingReviews.length > 0) {
      const avgRating = remainingReviews.reduce((sum, r) => sum + r.overallRating, 0) / remainingReviews.length;
      await Poem.findByIdAndUpdate(poemId, {
        averageRating: avgRating,
        reviewCount: remainingReviews.length,
      });
    } else {
      await Poem.findByIdAndUpdate(poemId, {
        averageRating: 0,
        reviewCount: 0,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

