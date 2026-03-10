import Customer from '../models/Customer.js';
import Recharge from '../models/Recharge.js';

const makeCustomerId = () => `CUST-${Date.now().toString().slice(-6)}`;

export const createCustomer = async (req, res) => {
  const customer = await Customer.create({ ...req.body, customerId: req.body.customerId || makeCustomerId() });
  res.status(201).json(customer);
};

export const getCustomers = async (req, res) => {
  const { search = '', status } = req.query;
  const filter = {
    $or: [
      { customerName: { $regex: search, $options: 'i' } },
      { mobileNumber: { $regex: search, $options: 'i' } },
      { cardNumber: { $regex: search, $options: 'i' } }
    ]
  };
  if (status) filter.status = status;
  const customers = await Customer.find(filter).sort({ createdAt: -1 });
  res.json(customers);
};

export const getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  const recharges = await Recharge.find({ customerId: customer._id }).sort({ date: -1 });
  res.json({ customer, recharges });
};

export const updateCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json(customer);
};

export const deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json({ message: 'Customer deleted' });
};
