import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    cardNumber: { type: String, required: true, unique: true },
    cardCost: { type: Number, default: 0 },
    cardIssuedDate: { type: Date, default: Date.now },
    paymentMode: { type: String, enum: ['cash', 'qr'], default: 'cash' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    machineId: { type: String, default: 'MACHINE-001' },
    lastRechargeDate: { type: Date },
    rechargeCount: { type: Number, default: 0 },
    customerSegment: { type: String, enum: ['regular', 'inactive', 'new'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('Customer', customerSchema);
