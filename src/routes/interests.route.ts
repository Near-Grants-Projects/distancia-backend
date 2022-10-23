import express from 'express';
import { container } from 'tsyringe';
import InterestController from '../controllers/interest.controller';

const interestController: any = container.resolve(InterestController);

const router = express.Router();
router.get('/', interestController.fetchInterests);
router.post('/', interestController.addInterests);

export default router;
