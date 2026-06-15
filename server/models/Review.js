import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    poem: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Poem' },
    reviewer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // Multi-criteria ratings (1-5 scale)
    ratings: {
      emotion: { type: Number, min: 1, max: 5, required: true },
      creativity: { type: Number, min: 1, max: 5, required: true },
      rhythm: { type: Number, min: 1, max: 5, required: true },
      imagery: { type: Number, min: 1, max: 5, required: true },
      symbolism: { type: Number, min: 1, max: 5, required: true },
    },
    
    // Overall rating (calculated)
    overallRating: { type: Number, min: 1, max: 5, default: 0 },
    
    // Text feedback
    feedback: { type: String, default: '', maxLength: 2000 },
    
    // Visibility
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index to prevent duplicate reviews
reviewSchema.index({ poem: 1, reviewer: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
