import express from 'express';
import { container } from 'tsyringe';
import InterestController from '../controllers/interest.controller';

const interestController: any = container.resolve(InterestController);

const router = express.Router();
router.get('/interests', interestController.fetchInterests);

export default router;
