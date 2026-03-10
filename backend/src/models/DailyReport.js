import mongoose from 'mongoose';

const dailyReportSchema = new mongoose.Schema(
  {
    reportDate: { type: Date, required: true },
    totalWaterValue: { type: Number, required: true },
    totalRechargeAmount: { type: Number, required: true },
    totalCoinAmount: { type: Number, required: true },
    totalQrAmount: { type: Number, required: true },
    totalCardUsers: { type: Number, required: true },
    total20LJarUsage: { type: Number, required: true },
    newCardCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('DailyReport', dailyReportSchema);
