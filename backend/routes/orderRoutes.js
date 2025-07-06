import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getFarmerOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';
import { getAllCrops } from '../controllers/cropController.js';

const router = express.Router();

// User-only
router.post('/place', verifyToken(['user']), placeOrder);
router.get('/my-orders', verifyToken(['user']), getUserOrders);

// Farmer-only
router.get('/incoming', verifyToken(['farmer']), getFarmerOrders);
router.put('/:orderId/status', verifyToken(['farmer']), updateOrderStatus);

export default router;
