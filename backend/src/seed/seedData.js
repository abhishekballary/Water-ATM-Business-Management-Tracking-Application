import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  await Admin.deleteMany();

  const password = await bcrypt.hash('admin123', 10);
  await Admin.create({ username: 'admin', password });

  console.log('Seeded admin user only. Add customer/card data from the UI.');
  process.exit(0);
};

seed();
