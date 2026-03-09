import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema(
  {
    machineId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    installDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model('Machine', machineSchema);
