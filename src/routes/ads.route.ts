import express from 'express';
import { container } from 'tsyringe';
import AdsController from '../controllers/ads.controller';

const adsController: any = container.resolve(AdsController);

const router = express.Router();
router.get('/', adsController.fetchAds);
router.post('/', adsController.createAd);

export default router;
