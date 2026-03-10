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

  const [ravi, sita] = await Customer.insertMany([
    {
      customerId: 'CUST-001',
      customerName: 'Ravi Kumar',
      mobileNumber: '9999999901',
      cardNumber: 'CARD1001',
      cardCost: 100,
      paymentMode: 'cash'
    },
    {
      customerId: 'CUST-002',
      customerName: 'Sita Devi',
      mobileNumber: '9999999902',
      cardNumber: 'CARD1002',
      cardCost: 100,
      paymentMode: 'qr'
    }
  ]);

  await Recharge.insertMany([
    {
      rechargeId: 'REC-001',
      customerId: ravi._id,
      cardNumber: 'CARD1001',
      rechargeAmount: 200,
      paymentMode: 'qr'
    },
    {
      rechargeId: 'REC-002',
      customerId: sita._id,
      cardNumber: 'CARD1002',
      rechargeAmount: 150,
      paymentMode: 'cash'
    }
  ]);

  await DailyReport.create({
    reportDate: new Date(),
    totalWaterValue: 1200,
    totalRechargeAmount: 350,
    totalCoinAmount: 500,
    totalQrAmount: 700,
    totalCardUsers: 30,
    total20LJarUsage: 18,
    newCardCount: 2
  });

  console.log('Seeded data. Admin login: admin/admin123');
  process.exit(0);
};

seed();
