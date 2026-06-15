import mongoose from 'mongoose';

const draftSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, default: 'Untitled' },
    content: { type: String, default: '' },
    description: { type: String, default: '' },
    
    // Metadata
    mood: { type: String, default: 'Reflective' },
    language: { type: String, default: 'English' },
    theme: { type: String, default: '' },
    tags: [{ type: String }],
    category: { type: String, enum: ['Shayari', 'Ghazal', 'Poem', 'Haiku', 'Quote', 'Caption', 'Other'], default: 'Poem' },
    
    // Media
    coverImage: { type: String, default: '' },
    
    // Version Control
    versions: [
      {
        title: String,
        content: String,
        savedAt: { type: Date, default: Date.now },
      },
    ],
    
    // Status
    lastSavedAt: { type: Date, default: Date.now },
    autoSaveInterval: { type: Number, default: 60000 }, // milliseconds
    
    // Publishing Info
    scheduledPublishDate: Date,
    readyToPublish: { type: Boolean, default: false },
  },
  { timestamps: true }
);

draftSchema.index({ author: 1, createdAt: -1 });

const Draft = mongoose.model('Draft', draftSchema);
export default Draft;
