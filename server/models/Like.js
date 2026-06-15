import mongoose from 'mongoose';

const likeSchema = mongoose.Schema(
  {
    poem: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Poem' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // Like type
    type: { type: String, enum: ['like', 'love', 'amazing', 'fire'], default: 'like' },
  },
  { timestamps: true }
);

// Prevent duplicate likes
likeSchema.index({ poem: 1, user: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);
export default Like;
