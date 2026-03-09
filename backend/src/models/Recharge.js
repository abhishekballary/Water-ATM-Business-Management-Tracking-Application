import mongoose from 'mongoose';

const rechargeSchema = new mongoose.Schema(
  {
    rechargeId: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    cardNumber: { type: String, required: true },
    rechargeAmount: { type: Number, required: true },
    paymentMode: { type: String, enum: ['cash', 'qr', 'upi'], required: true },
    rechargeType: { type: String, enum: ['normal', 'promotional'], default: 'normal' },
    date: { type: Date, default: Date.now },
    machineId: { type: String, default: 'MACHINE-001' }
  },
  { timestamps: true }
);

export default mongoose.model('Recharge', rechargeSchema);
