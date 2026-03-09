import Customer from '../models/Customer.js';
import Recharge from '../models/Recharge.js';

export const createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
};

export const getCustomers = async (req, res) => {
  const { search = '', status } = req.query;
  const filter = {
    customerName: { $regex: search, $options: 'i' }
  };
  if (status) filter.status = status;
  const customers = await Customer.find(filter).sort({ createdAt: -1 });
  res.json(customers);
};

export const getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  const recharges = await Recharge.find({ cardNumber: customer.cardNumber }).sort({ date: -1 });
  res.json({ customer, recharges });
};

export const updateCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json(customer);
};

export const deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json({ message: 'Customer deleted' });
};
