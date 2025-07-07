import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    const tempUser = { name, email, password: hash, role, otp, otpExpire };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      to: email,
      subject: 'Verify your account - OTP',
      html: `<p>Your OTP for verification is: <b>${otp}</b></p>`
    });

    res.status(200).json({ msg: 'OTP sent to email. Please verify to complete registration.', user: tempUser });

    res.status(201).json({ msg: 'OTP sent to email. Please verify to complete registration.' });
  } catch (err) {
    res.status(500).json({ msg: 'Registration failed', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not exist' });

    if (!user.isVerified) return res.status(403).json({ msg: 'User is not verified' });

    const isMatch =  bcrypt.compare(password, user.password); // ✅ FIXED
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ token }); // ✅ FIXED: return token for frontend
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch user' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    });

    res.status(200).json({ msg: 'Reset link sent to email' });
  } catch (err) {
    res.status(500).json({ msg: 'Error sending reset email', error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ msg: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Password reset failed', error: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Update failed', error: err.message });
  }
};



export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.status(200).json({ msg: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Logout failed', error: err.message });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name, password, role } = req.body;
    const existing = await User.findOne({ email });

    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const otpMatch = otp && otp.length === 6; // basic check
    if (!otpMatch) return res.status(400).json({ msg: 'Invalid OTP format' });

    const user = new User({ name, email, password, role, isVerified: true });
    await user.save();
    

    res.status(200).json({ msg: 'Registration complete. User is now verified.' });
  } catch (err) {
    res.status(500).json({ msg: 'OTP verification failed', error: err.message });
  }
};

