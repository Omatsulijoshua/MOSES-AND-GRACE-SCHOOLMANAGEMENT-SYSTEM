import express from 'express';
import { protect, admin } from '../middleware/auth.middleware';
import { getAnalyticsOverview, getRevenueData } from '../controllers/analytics.controller';

const router = express.Router();

router.use(protect, admin);

router.route('/overview').get(getAnalyticsOverview);
router.route('/revenue').get(getRevenueData);

export default router;
