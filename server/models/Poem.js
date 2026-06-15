import mongoose from 'mongoose';

const poemSchema = mongoose.Schema(
  {
    // Content
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    description: { type: String, default: '' },
    
    // Metadata
    mood: { type: String, default: 'Reflective' },
    language: { type: String, default: 'English' },
    theme: { type: String, default: '' },
    tags: [{ type: String }],
    category: { type: String, enum: ['Shayari', 'Ghazal', 'Poem', 'Haiku', 'Quote', 'Caption', 'Other'], default: 'Poem' },
    
    // Media
    coverImage: { type: String, default: '' },
    
    // Interactions
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likeCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    commentCount: { type: Number, default: 0 },
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    saveCount: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    
    // Reviews & Ratings
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    
    // Status
    published: { type: Boolean, default: false },
    publishedDate: Date,
    isDraft: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    
    // AI Generated
    aiGenerated: { type: Boolean, default: false },
    aiModel: { type: String, default: '' },
    generationParams: { type: Object, default: {} },
  },
  { timestamps: true }
);

// Index for search and filtering
poemSchema.index({ title: 'text', content: 'text', tags: 'text' });
poemSchema.index({ author: 1, published: 1 });
poemSchema.index({ mood: 1, language: 1 });
poemSchema.index({ createdAt: -1 });

const Poem = mongoose.model('Poem', poemSchema);
export default Poem;
