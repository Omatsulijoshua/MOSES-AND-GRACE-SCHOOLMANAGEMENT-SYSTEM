import express from 'express';
import { protect, admin } from '../middleware/auth.middleware';
import { getAllWallets, creditWallet, debitWallet } from '../controllers/wallet.controller';

const router = express.Router();

router.use(protect, admin);

router.route('/').get(getAllWallets);
router.route('/credit').post(creditWallet);
router.route('/debit').post(debitWallet);

export default router;
