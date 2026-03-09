import { Router } from 'express';
import {
  createRecharge,
  getRecharges,
  getRechargesByCardNumber
} from '../controllers/rechargeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.post('/', createRecharge);
router.get('/', getRecharges);
router.get('/customer/:cardNumber', getRechargesByCardNumber);

export default router;
