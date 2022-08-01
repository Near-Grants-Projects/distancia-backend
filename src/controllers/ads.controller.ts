import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/http.interface';
import { AdsService } from '../services/ads.service';

@injectable()
export default class AdsController {
  constructor(private adsService: AdsService) {}

  fetchAds = async (req: IRequest, res: IResponse) => {
    await this.adsService.fetchAds(req, res);
  };

  createAd = async (req: IRequest, res: IResponse) => {
    await this.adsService.createAd(req, res);
  };
}