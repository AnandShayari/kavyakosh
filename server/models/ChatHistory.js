import mongoose from 'mongoose';

const chatHistorySchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // Session Info
    sessionId: { type: String, default: '' },
    sessionTitle: { type: String, default: 'New Session' },
    
    // Conversation
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    
    // Parameters used
    generationParams: {
      type: {
        language: String,
        tone: String,
        emotion: String,
        theme: String,
        length: String,
      },
      default: {},
    },
    
    // Generated Content
    generatedContent: [
      {
        content: String,
        timestamp: { type: Date, default: Date.now },
        savedToPoemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poem' },
      },
    ],
    
    // Statistics
    messageCount: { type: Number, default: 0 },
    contentGeneratedCount: { type: Number, default: 0 },
    
    // Status
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

chatHistorySchema.index({ user: 1, createdAt: -1 });
chatHistorySchema.index({ user: 1, isActive: 1 });

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
export default ChatHistory;
