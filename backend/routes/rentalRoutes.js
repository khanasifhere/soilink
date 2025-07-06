import express from 'express';
import {
  createRentalRequest,
  getUserRentals,
  getFarmerRentalRequests,
  updateRentalStatus,

} from '../controllers/rentalController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
// router.get('/', getAllRentals);
// User-only

router.post('/request', verifyToken(['user']), createRentalRequest);
router.get('/my-requests', verifyToken(['user']), getUserRentals);

// Farmer-only
router.get('/incoming', verifyToken(['farmer']), getFarmerRentalRequests);
router.put('/:rentalId/status', verifyToken(['farmer']), updateRentalStatus);

export default router;
