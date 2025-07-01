import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);