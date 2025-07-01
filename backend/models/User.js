import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['farmer', 'user'], required: true },
  isVerified: { type: Boolean, default: false },
  resetToken: String,
  resetTokenExpire: Date,
  otp: String,
otpExpire: Date,

}, { timestamps: true });

export default mongoose.model('User', userSchema);