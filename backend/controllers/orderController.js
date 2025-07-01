import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, buyerId: req.user.id, status: 'pending' });
  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ buyerId: req.user.id });
  res.status(200).json(orders);
};

export const getFarmerOrders = async (req, res) => {
  const orders = await Order.find().populate({
    path: 'cropId',
    match: { farmerId: req.user.id }
  });
  res.status(200).json(orders.filter(o => o.cropId));
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  res.status(200).json(updated);
};