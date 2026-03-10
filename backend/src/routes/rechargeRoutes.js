import { Router } from 'express';
import {
  createRecharge,
  deleteRecharge,
  getRecharges,
  getRechargesByCardNumber
} from '../controllers/rechargeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.post('/', createRecharge);
router.get('/', getRecharges);
router.get('/customer/:cardNumber', getRechargesByCardNumber);
router.delete('/:id', deleteRecharge);

export default router;
