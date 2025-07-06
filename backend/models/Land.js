import mongoose from 'mongoose';
const landSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: String,
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  state: { type: String, required: true },
  district: { type: String, required: true },
  tehsil: { type: String, required: true },
  pincode: { type: String, required: true },
  size: String,
  pricePerMonth: Number,
  availableFrom: Date,
  availableTo: Date,
  imageUrl: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Land', landSchema);