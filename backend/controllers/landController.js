import Land from '../models/Land.js';

export const createLand = async (req, res) => {
  try {
    const land = await Land.create({ ...req.body, farmerId: req.user.id });
    res.status(201).json(land);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to list land', error: err.message });
  }
};

export const getAllLands = async (req, res) => {
  const lands = await Land.find({ isAvailable: true });
  res.status(200).json({lands});
};

export const getFarmerLands = async (req, res) => {
  const lands = await Land.find({ farmerId: req.user.id });
  res.status(200).json({lands});
};

export const updateLandStatus = async (req, res) => {
  const { landId } = req.params;
  const { isAvailable } = req.body;
  const updated = await Land.findByIdAndUpdate(landId, { isAvailable }, { new: true });
  res.status(200).json(updated);
};

