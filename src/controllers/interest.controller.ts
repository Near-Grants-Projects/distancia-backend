import { HandleErrorResponse } from '../exceptions/ErrorHandlers';
import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import { InterestService } from '../services/interest.service';
import { StatusCodes } from '../constants';

@injectable()
export default class InterestController {
  constructor(private interestService: InterestService) {}

  addInterests = async (req: IRequest, res: IResponse) => {
    try {
      console.log('here');
      let response = await this.interestService.addInterest(req.body);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };

  fetchInterests = async (req: IRequest, res: IResponse) => {
    try {
      let response = await this.interestService.fetchInterests();
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };
}
