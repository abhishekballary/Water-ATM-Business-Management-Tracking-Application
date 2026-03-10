import DailyReport from '../models/DailyReport.js';
import Customer from '../models/Customer.js';

export const createReport = async (req, res) => {
  const report = await DailyReport.create(req.body);
  res.status(201).json(report);
};

export const getReports = async (req, res) => {
  const { startDate, endDate } = req.query;
  const filter = {};
  if (startDate || endDate) {
    filter.reportDate = {};
    if (startDate) filter.reportDate.$gte = new Date(startDate);
    if (endDate) filter.reportDate.$lte = new Date(endDate);
  }
  const reports = await DailyReport.find(filter).sort({ reportDate: -1 });
  res.json(reports);
};

export const updateReport = async (req, res) => {
  const report = await DailyReport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!report) return res.status(404).json({ message: 'Report not found' });
  res.json(report);
};

export const deleteReport = async (req, res) => {
  const report = await DailyReport.findByIdAndDelete(req.params.id);
  if (!report) return res.status(404).json({ message: 'Report not found' });
  res.json({ message: 'Report deleted' });
};

export const getMonthlyReport = async (req, res) => {
  const { year, month } = req.query;
  const start = new Date(Number(year), Number(month) - 1, 1);
  const end = new Date(Number(year), Number(month), 0, 23, 59, 59);

  const [data, totalCustomers] = await Promise.all([
    DailyReport.aggregate([
      { $match: { reportDate: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalWaterValue' },
          totalRechargeAmount: { $sum: '$totalRechargeAmount' },
          totalCoinCollection: { $sum: '$totalCoinAmount' },
          totalQrPayments: { $sum: '$totalQrAmount' },
          totalNewCards: { $sum: '$newCardCount' },
          total20LJarUsage: { $sum: '$total20LJarUsage' }
        }
      }
    ]),
    Customer.countDocuments()
  ]);

  res.json({ ...(data[0] || {}), totalCustomers });
};
