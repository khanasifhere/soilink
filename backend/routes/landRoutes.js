import express from 'express';
import {
  createLand,
  getAllLands,
  getFarmerLands,
  updateLandStatus,
} from '../controllers/landController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Public
router.get('/', getAllLands);

// Farmer-only
router.post('/create', verifyToken(['farmer']), createLand);
router.get('/my-lands', verifyToken(['farmer']), getFarmerLands);
router.put('/:landId/status', verifyToken(['farmer']), updateLandStatus);

export default router;
