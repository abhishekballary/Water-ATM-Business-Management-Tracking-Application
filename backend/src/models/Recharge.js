import mongoose from 'mongoose';

const rechargeSchema = new mongoose.Schema(
  {
    rechargeId: { type: String, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    cardNumber: { type: String, required: true },
    rechargeAmount: { type: Number, required: true },
    paymentMode: { type: String, enum: ['cash', 'qr', 'card'], required: true },
    date: { type: Date, default: Date.now },
    machineId: { type: String, default: 'MACHINE-001' }
  },
  { timestamps: true }
);

export default mongoose.model('Recharge', rechargeSchema);
