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
  await Promise.all([
    Admin.deleteMany(),
    Customer.deleteMany(),
    Recharge.deleteMany(),
    DailyReport.deleteMany()
  ]);

  const password = await bcrypt.hash('admin123', 10);
  await Admin.create({ username: 'admin', password });

  await Customer.insertMany([
    {
      customerId: 'CUST-001',
      customerName: 'Ravi Kumar',
      mobileNumber: '9999999901',
      cardNumber: 'CARD1001',
      cardCost: 100,
      paymentMode: 'cash',
      customerSegment: 'regular',
      rechargeCount: 5
    },
    {
      customerId: 'CUST-002',
      customerName: 'Sita Devi',
      mobileNumber: '9999999902',
      cardNumber: 'CARD1002',
      cardCost: 100,
      paymentMode: 'qr',
      customerSegment: 'new',
      rechargeCount: 1
    }
  ]);

  await Recharge.insertMany([
    {
      rechargeId: 'REC-001',
      customerId: 'CUST-001',
      cardNumber: 'CARD1001',
      rechargeAmount: 200,
      paymentMode: 'qr'
    },
    {
      rechargeId: 'REC-002',
      customerId: 'CUST-002',
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
    revenueFromJarSales: 360,
    newCardCount: 2,
    maintenanceNotes: 'All good'
  });

  console.log('Seeded data. Admin login: admin/admin123');
  process.exit(0);
};

seed();
