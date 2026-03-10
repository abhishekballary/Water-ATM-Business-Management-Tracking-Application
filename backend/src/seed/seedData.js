import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';
import Customer from '../models/Customer.js';
import Recharge from '../models/Recharge.js';
import DailyReport from '../models/DailyReport.js';

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([Admin.deleteMany(), Customer.deleteMany(), Recharge.deleteMany(), DailyReport.deleteMany()]);

  const password = await bcrypt.hash('admin123', 10);
  await Admin.create({ username: 'admin', password });

  console.log('Seed reset complete. Admin user created and all demo records removed. Add customer/card data from the UI.');
  process.exit(0);
};

seed();
