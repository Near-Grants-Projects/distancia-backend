/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import Onboarding from '../models/onboarding';

@injectable()
export class OnboardService {
  public saveUserAddress = async (req: IRequest, res: IResponse) => {
    try {
      const { address } = req.body;

      const onboardingEntity = new Onboarding({
        address,
      });

      const data = await onboardingEntity.save();

      const obj = {
        id: data._id,
        address: data.address,
      };
      if (data) {
        return res.ok(obj, 'Onboarding Created Succefully');
      }
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while creating Onboarding'
      );
    }
  };
}
