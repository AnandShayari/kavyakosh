import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // Pricing & Inventory
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, default: 1 },
    available: { type: Boolean, default: true },
    
    // Details
    category: { type: String, default: 'Collection' },
    subcategory: { type: String, default: '' },
    tags: [{ type: String }],
    
    // Media
    images: [{ type: String }],
    coverImage: { type: String, default: '' },
    
    // Ratings & Reviews
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    
    // Engagement
    wishlistCount: { type: Number, default: 0 },
    purchaseCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    
    // Shipping
    shippingFee: { type: Number, default: 0 },
    deliveryDays: { type: Number, default: 7 },
    
    // Status
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
