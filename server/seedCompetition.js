import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Competition from './models/Competition.js';
import User from './models/User.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

const admin = await User.findOne({ role: 'admin' });

await Competition.deleteMany({});

await Competition.create({
  title: 'Moonlight Poetic Gala',
  description: 'Submit a short poem that captures the hush of midnight and the shimmer of city lights.',
  theme: 'Night & City',
  category: 'Poem',
  startDate: new Date(),
  endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  status: 'active',
  isActive: true,
  totalPrizePool: 5000,
  createdBy: admin?._id,
});

console.log('Competition created successfully!');
await mongoose.disconnect();
