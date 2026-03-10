import { Router } from 'express';
import { createReport, deleteReport, getReports, updateReport, getMonthlyReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect);
router.post('/', createReport);
router.get('/', getReports);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);
router.get('/monthly', getMonthlyReport);

export default router;
