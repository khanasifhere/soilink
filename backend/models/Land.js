import mongoose from 'mongoose';

const landSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: String,
  coordinates: {
    lat: { type: Number, required: true },  // ✅ added
    lng: { type: Number, required: true }   // ✅ added
  },
  size: String,
  pricePerMonth: Number,
  availableFrom: Date,
  availableTo: Date,
  imageUrl: String,
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model('Land', landSchema);