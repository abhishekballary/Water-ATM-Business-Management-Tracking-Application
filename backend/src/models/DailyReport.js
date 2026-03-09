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
    revenueFromJarSales: { type: Number, default: 0 },
    newCardCount: { type: Number, default: 0 },
    maintenanceNotes: { type: String },
    machineId: { type: String, default: 'MACHINE-001' }
  },
  { timestamps: true }
);

dailyReportSchema.index({ reportDate: 1, machineId: 1 }, { unique: true });

export default mongoose.model('DailyReport', dailyReportSchema);
