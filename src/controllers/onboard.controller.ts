import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/http.interface';
import { OnboardService } from '../services/onboarding.service';

@injectable()
export default class OnboardController {
  constructor(private onboardService: OnboardService) {}

  saveUserAddress = async (req: IRequest, res: IResponse) => {
    await this.onboardService.saveUserAddress(req, res);
  };
}