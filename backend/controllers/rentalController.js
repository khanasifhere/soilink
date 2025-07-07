import Rental from '../models/Rental.js';

export const createRentalRequest = async (req, res) => {
  const rental = await Rental.create({ ...req.body, userId: req.user.id, status: 'requested' });
  res.status(201).json(rental);
};

export const getUserRentals = async (req, res) => {
  const rentals = await Rental.find({ userId: req.user.id });
  res.status(200).json({rentals});
};
// export const getAllRentals = async (req, res) => {
//   const rentals = await Rental.find();
//   res.status(200).json({rentals});
// };

export const getFarmerRentalRequests = async (req, res) => {
  const rentals = await Rental.find().populate({
    path: 'landId',
    match: { farmerId: req.user.id }
  });
  const ren=rentals.filter(r => r.landId);
  res.status(200).json({ren});
};

export const updateRentalStatus = async (req, res) => {
  const { rentalId } = req.params;
  const { status } = req.body;
  const updated = await Rental.findByIdAndUpdate(rentalId, { status }, { new: true });
  res.status(200).json(updated);
};