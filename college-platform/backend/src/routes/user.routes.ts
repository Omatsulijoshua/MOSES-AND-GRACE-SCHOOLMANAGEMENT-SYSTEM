import express from 'express';
import { protect, admin } from '../middleware/auth.middleware';
import { getAllUsers, updateUserAdmin, deleteUserAdmin } from '../controllers/admin.controller';

const router = express.Router();

router.use(protect, admin);

router.route('/').get(getAllUsers);
router.route('/:id').put(updateUserAdmin).delete(deleteUserAdmin);

export default router;
