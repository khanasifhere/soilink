import express from 'express';
import {
  createCrop,
  getAllCrops,
  getFarmerCrops,
  updateCropAvailability,
} from '../controllers/cropController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Public
router.get('/', getAllCrops);

// Farmer-only
router.post('/create', verifyToken(['farmer']), createCrop);
router.get('/my-crops', verifyToken(['farmer']), getFarmerCrops);
router.put('/:cropId/status', verifyToken(['farmer']), updateCropAvailability);

export default  router;
