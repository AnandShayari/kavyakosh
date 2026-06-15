import mongoose from 'mongoose';

const submissionSchema = mongoose.Schema(
  {
    competition: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Competition' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    poem: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Poem' },
    
    // Content
    title: { type: String, required: true },
    content: { type: String, required: true },
    
    // Submission status
    status: { type: String, enum: ['submitted', 'withdrawn', 'qualified', 'disqualified'], default: 'submitted' },
    submittedAt: { type: Date, default: Date.now },
    
    // Voting/Ranking
    votes: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    
    // Moderation
    isApproved: { type: Boolean, default: true },
    moderationNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

submissionSchema.index({ competition: 1, user: 1 }, { unique: true });
submissionSchema.index({ competition: 1, status: 1 });

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
