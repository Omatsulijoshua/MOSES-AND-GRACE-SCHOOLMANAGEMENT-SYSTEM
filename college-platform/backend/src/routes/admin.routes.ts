import express from 'express';
import { protect, admin } from '../middleware/auth.middleware';
import { getAllUsers, updateUserAdmin, deleteUserAdmin, deleteAnnouncement, getAllMessages } from '../controllers/admin.controller';
import { createAnnouncement } from '../controllers/announcement.controller';
import { getPaymentCategories, createPaymentCategory, updatePaymentCategory, deletePaymentCategory } from '../controllers/payment.controller';

const router = express.Router();

router.use(protect, admin); // All routes below this middleware require ADMIN role

router.route('/users').get(getAllUsers);
router.route('/users/:id').put(updateUserAdmin).delete(deleteUserAdmin);

router.route('/announcements').post(createAnnouncement);
router.route('/announcements/:id').delete(deleteAnnouncement);

router.route('/messages').get(getAllMessages);

router.route('/payment-categories').get(getPaymentCategories).post(createPaymentCategory);
router.route('/payment-categories/:id').put(updatePaymentCategory).delete(deletePaymentCategory);

export default router;
