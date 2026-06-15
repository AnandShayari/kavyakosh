import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    
    // Profile
    bio: { type: String, default: '', maxLength: 500 },
    avatar: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    
    // Account
    role: { type: String, enum: ['user', 'premium', 'moderator', 'admin'], default: 'user' },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    
    // Premium
    premium: { type: Boolean, default: false },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    usageCount: { type: Number, default: 0 },
    usageLimit: { type: Number, default: 10 },
    
    // Relationships
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poem' }],
    
    // Stats
    totalPoems: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    totalFollowers: { type: Number, default: 0 },
    totalFollowing: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActivityDate: Date,
    
    // Security
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: Date,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
