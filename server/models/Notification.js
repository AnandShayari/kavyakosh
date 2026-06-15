import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
  {
    // Recipient
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // Notification Content
    type: {
      type: String,
      enum: ['like', 'comment', 'follow', 'review', 'competition', 'message', 'achievement', 'system'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    description: { type: String, default: '' },
    
    // References
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    poem: { type: mongoose.Schema.Types.ObjectId, ref: 'Poem' },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
    
    // Action Link
    link: { type: String, default: '' },
    actionUrl: { type: String, default: '' },
    
    // Status
    read: { type: Boolean, default: false },
    readAt: { type: Date },
    archived: { type: Boolean, default: false },
    
    // Priority
    priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
    
    // Icon/Image
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, type: 1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
