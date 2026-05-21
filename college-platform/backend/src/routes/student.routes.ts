import express from 'express';
import { getProfile, updateProfile } from '../controllers/student.controller';
import { getOutstandingFees, getPaymentHistory, payFee } from '../controllers/payment.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);

router.route('/outstanding-fees').get(protect, getOutstandingFees);
router.route('/payment-history').get(protect, getPaymentHistory);
router.route('/pay').post(protect, payFee);

export default router;
