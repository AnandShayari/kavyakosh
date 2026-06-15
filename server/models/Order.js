import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    // User & Cart Reference
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // Order Items
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    
    // Pricing
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    discountApplied: { type: Number, default: 0 },
    total: { type: Number, required: true },
    
    // Coupon
    couponCode: { type: String, default: '' },
    couponDiscount: { type: Number, default: 0 },
    
    // Shipping Address
    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    
    // Billing Address
    billingAddress: {
      fullName: String,
      email: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    
    // Payment
    paymentMethod: { type: String, required: true },
    transactionId: String,
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    
    // Order Status
    orderStatus: { type: String, enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'], default: 'placed' },
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
    
    // Tracking
    trackingNumber: String,
    trackingUrl: String,
    
    // Notes
    orderNotes: { type: String, default: '' },
    adminNotes: { type: String, default: '' },
    
    // Order ID
    orderNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ orderNumber: 1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;
