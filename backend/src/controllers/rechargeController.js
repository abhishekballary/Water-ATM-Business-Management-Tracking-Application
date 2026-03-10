import mongoose from 'mongoose';
import Recharge from '../models/Recharge.js';

const makeRechargeId = () => `RCG-${Date.now().toString().slice(-7)}`;

export const createRecharge = async (req, res) => {
  try {
    const { customerId, cardNumber, rechargeAmount, paymentMode, date } = req.body;

    if (!customerId || !mongoose.isValidObjectId(customerId)) {
      return res.status(400).json({ message: 'Valid customerId is required' });
    }
    if (!cardNumber?.trim()) {
      return res.status(400).json({ message: 'Card number is required' });
    }
    if (!rechargeAmount || Number(rechargeAmount) <= 0) {
      return res.status(400).json({ message: 'Recharge amount must be greater than 0' });
    }
    if (!['cash', 'qr', 'card'].includes(paymentMode)) {
      return res.status(400).json({ message: 'Valid payment mode is required' });
    }

    const recharge = await Recharge.create({
      rechargeId: req.body.rechargeId || makeRechargeId(),
      customerId,
      cardNumber: cardNumber.trim(),
      rechargeAmount: Number(rechargeAmount),
      paymentMode,
      date
    });

    res.status(201).json(recharge);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create recharge', error: error.message });
  }
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
