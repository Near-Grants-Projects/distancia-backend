import express from 'express';
import { container } from 'tsyringe';
import AdsController from '../controllers/ads.controller';
import authMiddleware from '../middlewares/auth.middleware';

const adsController: any = container.resolve(AdsController);

const router = express.Router();
//router.get('/', authMiddleware, adsController.fetchAds);
router.get('/', adsController.fetchAds);
router.post('/', adsController.createAd);

export default router;
