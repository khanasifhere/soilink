import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  landId: { type: mongoose.Schema.Types.ObjectId, ref: 'Land' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  status: { type: String, enum: ['requested', 'approved', 'rejected'], default: 'requested' },
}, { timestamps: true });

export default mongoose.model('Rental', rentalSchema);