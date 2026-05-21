import express from 'express';
import { protect, admin } from '../middleware/auth.middleware';
import { getAllPayouts, createPayout } from '../controllers/payout.controller';

const router = express.Router();

router.use(protect, admin);

router.route('/').get(getAllPayouts).post(createPayout);

export default router;
