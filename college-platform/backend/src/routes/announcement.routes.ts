import express from 'express';
import { getAnnouncements, createAnnouncement } from '../controllers/announcement.controller';

const router = express.Router();

router.route('/').get(getAnnouncements);

export default router;
