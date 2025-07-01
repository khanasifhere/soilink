import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cropType: String,
  quantity: Number,
  pricePerKg: Number,
  harvestDate: Date,
  imageUrl: String,
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Crop', cropSchema);