import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL || 'admin@kavyakosh.local';
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
const adminName = process.env.ADMIN_NAME || 'KavyaKosh Admin';

const run = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to seed the admin account');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const user = await User.findOneAndUpdate(
    { email: adminEmail.toLowerCase() },
    {
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
      emailVerified: true,
      premium: true,
      usageLimit: 1000,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const subscription = await Subscription.findOneAndUpdate(
    { user: user._id },
    {
      user: user._id,
      plan: 'enterprise',
      monthlyPrice: 0,
      generationLimit: 1000,
      storageLimit: 100000,
      marketplaceLimit: 1000,
      features: ['Admin access', 'Unlimited moderation tools', 'AI usage dashboard'],
      status: 'active',
      isActive: true,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  user.subscription = subscription._id;
  await user.save();

  console.log('Admin account ready');
  console.log(`Email: ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
};

run()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
