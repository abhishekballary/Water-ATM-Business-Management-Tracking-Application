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

  const reportSummary = todayReports.reduce(
    (acc, report) => ({
      todaySales: acc.todaySales + report.totalWaterValue,
      todayRechargeAmount: acc.todayRechargeAmount + report.totalRechargeAmount,
      totalJarUsage: acc.totalJarUsage + report.total20LJarUsage
    }),
    { todaySales: 0, todayRechargeAmount: 0, totalJarUsage: 0 }
  );

  const rechargeSummary = todayRecharges.reduce(
    (acc, recharge) => {
      acc.rechargeAmount += recharge.rechargeAmount;
      if (recharge.paymentMode === 'cash') acc.coinRevenue += recharge.rechargeAmount;
      if (recharge.paymentMode === 'qr') acc.qrRevenue += recharge.rechargeAmount;
      return acc;
    },
    { rechargeAmount: 0, coinRevenue: 0, qrRevenue: 0 }
  );

  res.json({
    todaySales: reportSummary.todaySales,
    todayRechargeAmount: reportSummary.todayRechargeAmount || rechargeSummary.rechargeAmount,
    coinRevenue: rechargeSummary.coinRevenue,
    qrRevenue: rechargeSummary.qrRevenue,
    totalCustomers,
    totalJarUsage: reportSummary.totalJarUsage
  });
};

export const getDashboardAnalytics = async (_, res) => {
  const [dailySalesChart, monthlyRevenueChart, rechargeActivityChart] = await Promise.all([
    DailyReport.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$reportDate' } },
          sales: { $sum: '$totalWaterValue' }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    DailyReport.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$reportDate' } },
          revenue: { $sum: '$totalWaterValue' }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Recharge.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          amount: { $sum: '$rechargeAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  res.json({ dailySalesChart, monthlyRevenueChart, rechargeActivityChart });
};
