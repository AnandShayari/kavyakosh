import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    poem: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Poem' },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true, maxLength: 1000 },
    
    // Replies (nested comments)
    replies: [
      {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, maxLength: 1000 },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    
    // Interactions
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likeCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    
    // Status
    isDeleted: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
