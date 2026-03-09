import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ id: admin._id, username: admin.username });
  return res.json({ token, username: admin.username });
};
