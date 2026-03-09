import DailyReport from '../models/DailyReport.js';
import Recharge from '../models/Recharge.js';
import Customer from '../models/Customer.js';

const startOfDay = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getDashboardSummary = async (_, res) => {
  const today = startOfDay();
  const [todayReports, todayRecharges, totalCustomers] = await Promise.all([
    DailyReport.find({ reportDate: { $gte: today } }),
    Recharge.find({ date: { $gte: today } }),
    Customer.countDocuments()
  ]);

  const summary = todayReports.reduce(
    (acc, report) => ({
      todaySales: acc.todaySales + report.totalWaterValue,
      todayRechargeAmount: acc.todayRechargeAmount + report.totalRechargeAmount,
      todayCoinCollection: acc.todayCoinCollection + report.totalCoinAmount,
      todayQrPayments: acc.todayQrPayments + report.totalQrAmount,
      totalCardUsersToday: acc.totalCardUsersToday + report.totalCardUsers,
      total20LJarUsage: acc.total20LJarUsage + report.total20LJarUsage
    }),
    {
      todaySales: 0,
      todayRechargeAmount: 0,
      todayCoinCollection: 0,
      todayQrPayments: 0,
      totalCardUsersToday: 0,
      total20LJarUsage: 0
    }
  );

  const todayQRRecharge = todayRecharges
    .filter((r) => ['qr', 'upi'].includes(r.paymentMode))
    .reduce((sum, r) => sum + r.rechargeAmount, 0);

  res.json({ ...summary, totalCustomers, todayQRRecharge });
};

export const getDashboardAnalytics = async (_, res) => {
  const salesTrend = await DailyReport.find().sort({ reportDate: 1 }).limit(30);
  const rechargeTrend = await Recharge.aggregate([
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, total: { $sum: '$rechargeAmount' } } },
    { $sort: { _id: 1 } }
  ]);
  const paymentDistribution = await Recharge.aggregate([
    { $group: { _id: '$paymentMode', value: { $sum: '$rechargeAmount' } } }
  ]);
  const customerGrowth = await Customer.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        customers: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json({ salesTrend, rechargeTrend, paymentDistribution, customerGrowth });
};
