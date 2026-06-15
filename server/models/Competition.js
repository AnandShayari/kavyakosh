import mongoose from 'mongoose';

const competitionSchema = mongoose.Schema(
  {
    // Basic Info
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    rules: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    
    // Timeline
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    announceWinnersDate: { type: Date },
    
    // Participation
    entrants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    entrantCount: { type: Number, default: 0 },
    
    // Submissions
    submissions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        poem: { type: mongoose.Schema.Types.ObjectId, ref: 'Poem' },
        submittedAt: { type: Date, default: Date.now },
      },
    ],
    submissionCount: { type: Number, default: 0 },
    
    // Winners (rank: 1 = first, 2 = second, 3 = third)
    winners: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        poem: { type: mongoose.Schema.Types.ObjectId, ref: 'Poem' },
        rank: { type: Number, enum: [1, 2, 3] },
        prizeAmount: { type: Number, default: 0 },
      },
    ],
    
    // Metadata
    category: { type: String, default: '' },
    language: [{ type: String }],
    theme: { type: String, default: '' },
    maxParticipants: { type: Number, default: 0 },
    entryFee: { type: Number, default: 0 },
    totalPrizePool: { type: Number, default: 0 },
    
    // Status
    status: { type: String, enum: ['upcoming', 'active', 'ended'], default: 'upcoming' },
    isActive: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    
    // Admin
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

competitionSchema.index({ endDate: -1 });
competitionSchema.index({ status: 1, isActive: 1 });

const Competition = mongoose.model('Competition', competitionSchema);
export default Competition;
