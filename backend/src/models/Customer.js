import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    customerId: { type: String, unique: true },
    customerName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    cardNumber: { type: String, required: true, unique: true },
    cardCost: { type: Number, default: 0 },
    paymentMode: { type: String, enum: ['cash', 'qr'], default: 'cash' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model('Customer', customerSchema);
