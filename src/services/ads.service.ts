/** @format */

import { Exceptions } from 'error-handler';
import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import Ads from '../models/ads-model';
import User from '../models/user-model.model';

@injectable()
export class AdsService {
  public fetchAds = async (interestId: String) => {
    const interest: any = await Ads.find({ interestId });

    if (!interest) {
      throw new Exceptions.NotFoundError('Ads not found');
    }

    return interest;
  };

  public createAd = async (data: any) => {
    const {
      ownerId,
      mediaLink,
      mediaType,
      interestId,
      description,
      duration,
    } = data;
    //TODO validate owner_id against the owner table or user table but we need to add a column for userType

    const adsEntity = new Ads({
      ownerId,
      mediaLink,
      mediaType,
      interestId,
      description,
      duration,
    });

    const ads = await adsEntity.save();

    if (ads) {
      return ads;
    }
  };
}
