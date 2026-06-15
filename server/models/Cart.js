import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    
    // Items in cart
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // Price at time of adding
        addedAt: { type: Date, default: Date.now },
      },
    ],
    
    // Calculations
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    discountApplied: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    
    // Coupon
    couponCode: { type: String, default: '' },
    couponDiscount: { type: Number, default: 0 },
    
    // Status
    isActive: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

cartSchema.index({ user: 1 });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
