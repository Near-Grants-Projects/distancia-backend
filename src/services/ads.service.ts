/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import Ads from '../models/Ads.model';
import User from '../models/user.model';

@injectable()
export class AdsService {
  public fetchAds = async (req: IRequest, res: IResponse) => {
    try {
      let data, query;
      if (req.user) {
        const user = await User.findById({ _id: req.user.id });
        const { interests } = user;
        for (let i = 0; i < interests.length; i++) {
          query = {
            $or: [{ name: interests[i].name }],
          };
        }

        data = await Ads.find(query);
      } else {
        data = await Ads.find({});
      }

      if (data) {
        return res.ok(data, 'Ads fetched Successfully');
      }
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while fetching ads'
      );
    }
  };

  public createAd = async (req: IRequest, res: IResponse) => {
    try {
      const { owner_id, media_link, media_type, interests } = req.body;

      const adsEntity = new Ads({
        owner_id,
        media_link,
        media_type,
        interests,
      });

      const data = await adsEntity.save();

      if (data) {
        return res.ok(data, 'Ads Created Successfully');
      }
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while creating Ads'
      );
    }
  };
}
