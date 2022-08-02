/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import Interest from '../models/Interest.model';

@injectable()
export class InterestService {
  public fetchInterests = async (req: IRequest, res: IResponse) => {
    try {
      const data = await Interest.find({});

      if (data) {
        return res.ok(data, 'Interests fetched Successfully');
      }
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while fetching interests'
      );
    }
  };
}
