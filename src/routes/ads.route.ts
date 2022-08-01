import express from 'express';
import { container } from 'tsyringe';
import AdsController from '../controllers/ads.controller';

const adsController: any = container.resolve(AdsController);

const router = express.Router();
router.get('/ads', adsController.fetchAds);
router.post('/ads', adsController.createAd);

export default router;
