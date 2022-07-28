import { injectable } from 'tsyringe'
import { OnboardService } from '../services/service.controller';

@injectable()
export default class OnboardController {
    constructor(
        private onboardService: OnboardService
      ) {
    
      }

      doSomething = async (req, res) => {
        console.log("here")
      }
}