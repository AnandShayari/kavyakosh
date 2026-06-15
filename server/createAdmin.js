import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const email = 'admin@kavyakosh.com';
const password = 'Admin@1234';

const existing = await User.findOne({ email });
if (existing) {
  await User.updateOne({ email }, { role: 'admin' });
  console.log('Existing user updated to admin role.');
} else {
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name: 'Admin', email, password: hashed, role: 'admin' });
  console.log('Admin user created successfully.');
}

console.log('Email   :', email);
console.log('Password:', password);
await mongoose.disconnect();
