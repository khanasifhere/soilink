import express from 'express';
import {
  registerUser,
  loginUser,
  verifyOtp,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  logoutUser} from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.get('/me', verifyToken, getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.put('/update-password', verifyToken, updatePassword);
router.post('/logout', logoutUser);

export default router;