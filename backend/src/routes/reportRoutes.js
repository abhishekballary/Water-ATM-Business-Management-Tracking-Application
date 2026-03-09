import { Router } from 'express';
import { createReport, getReports, updateReport, getMonthlyReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.post('/', createReport);
router.get('/', getReports);
router.put('/:id', updateReport);
router.get('/monthly', getMonthlyReport);

export default router;
