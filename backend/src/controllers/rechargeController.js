import Recharge from '../models/Recharge.js';

const makeRechargeId = () => `RCG-${Date.now().toString().slice(-7)}`;

export const createRecharge = async (req, res) => {
  const recharge = await Recharge.create({ ...req.body, rechargeId: req.body.rechargeId || makeRechargeId() });
  res.status(201).json(recharge);
};

export const getRecharges = async (req, res) => {
  const { paymentMode, startDate, endDate, customerId } = req.query;
  const filter = {};
  if (paymentMode) filter.paymentMode = paymentMode;
  if (customerId) filter.customerId = customerId;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const recharges = await Recharge.find(filter).sort({ date: -1 }).populate('customerId', 'customerName cardNumber');
  res.json(recharges);
};

export const getRechargesByCardNumber = async (req, res) => {
  const recharges = await Recharge.find({ cardNumber: req.params.cardNumber }).sort({ date: -1 });
  res.json(recharges);
};

export const deleteRecharge = async (req, res) => {
  const recharge = await Recharge.findByIdAndDelete(req.params.id);
  if (!recharge) return res.status(404).json({ message: 'Recharge not found' });
  res.json({ message: 'Recharge deleted' });
};
