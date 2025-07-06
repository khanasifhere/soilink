import Crop from '../models/Crop.js';

export const createCrop = async (req, res) => {
  const crop = await Crop.create({ ...req.body, farmerId: req.user.id });
  res.status(201).json(crop);
};

export const getAllCrops = async (req, res) => {
  const crops = await Crop.find({ isAvailable: true });
  res.status(200).json({crops});
};

export const getFarmerCrops = async (req, res) => {
  const crops = await Crop.find({ farmerId: req.user.id });
  res.status(200).json({crops});
};

export const updateCropAvailability = async (req, res) => {
  const { cropId } = req.params;
  const { isAvailable } = req.body;
  const updated = await Crop.findByIdAndUpdate(cropId, { isAvailable }, { new: true });
  res.status(200).json(updated);
};