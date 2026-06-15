import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema(
  {
    // User Reference
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    
    // Plan Details
    plan: {
      type: String,
      enum: ['basic', 'pro', 'premium', 'enterprise'],
      required: true,
    },
    
    // Pricing
    monthlyPrice: { type: Number, required: true },
    annualPrice: { type: Number, default: 0 },
    
    // Limits
    generationLimit: { type: Number, required: true },
    storageLimit: { type: Number, required: true },
    marketplaceLimit: { type: Number, required: true },
    
    // Billing
    billingCycle: { type: String, enum: ['monthly', 'annual'], default: 'monthly' },
    nextBillingDate: { type: Date },
    lastBilledDate: { type: Date },
    
    // Dates
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    autoRenew: { type: Boolean, default: true },
    
    // Status
    status: { type: String, enum: ['active', 'paused', 'cancelled', 'expired'], default: 'active' },
    isActive: { type: Boolean, default: true },
    
    // Features
    features: [{ type: String }],
    
    // Payment Info
    paymentMethod: { type: String, default: '' },
    transactionId: { type: String, default: '' },
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
