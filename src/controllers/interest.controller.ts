import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/http.interface';
import { InterestService } from '../services/interest.service';

@injectable()
export default class InterestController {
  constructor(private interestService: InterestService) {}

  fetchInterests = async (req: IRequest, res: IResponse) => {
    await this.interestService.fetchInterests(req, res);
  };
}