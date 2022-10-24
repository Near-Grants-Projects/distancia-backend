/** @format */

import { InterestStatus } from '../constants/status.const';
import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import Interest from '../models/interest';
import { BadRequest, ResourceNotFoundError } from '../exceptions/ErrorHandlers';

@injectable()
export class InterestService {
  public fetchInterests = async () => {
    const data = await Interest.find({});

    if (!data) {
      throw new ResourceNotFoundError('Interest already exists');
    }
    return data;
  };

  public addInterest = async (data: any) => {
    const findInterest = await Interest.findOne({ name: data.name });
    if (findInterest) {
      throw new BadRequest('Interest already exists');
    }
    let interest = new Interest({
      name: data.name,
      url: data.url,
      status: InterestStatus.ACTIVE,
    });

    interest = await interest.save();

    return interest;
  };
}
