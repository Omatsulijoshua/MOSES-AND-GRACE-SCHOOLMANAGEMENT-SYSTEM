import express from 'express';
import { protect, admin } from '../middleware/auth.middleware';
import { getAllTransactions, getTransactionById } from '../controllers/transaction.controller';

const router = express.Router();

router.use(protect, admin);

router.route('/').get(getAllTransactions);
router.route('/:id').get(getTransactionById);

export default router;
