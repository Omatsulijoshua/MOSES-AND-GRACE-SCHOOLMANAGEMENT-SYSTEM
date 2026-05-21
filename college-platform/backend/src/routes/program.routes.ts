import express from 'express';
import { getPrograms, getProgramById } from '../controllers/program.controller';

const router = express.Router();

router.route('/').get(getPrograms);
router.route('/:id').get(getProgramById);

export default router;
