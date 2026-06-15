import mongoose from 'mongoose';

const followSchema = mongoose.Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    following: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // Status
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    
    // Notification preference
    notifyNewPoem: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent duplicate follows
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ follower: 1 });
followSchema.index({ following: 1 });

const Follow = mongoose.model('Follow', followSchema);
export default Follow;
