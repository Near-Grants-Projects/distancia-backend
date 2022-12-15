import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import { UserService } from '../services/user.service';

import Constants, { StatusCodes } from '../constants';
import {
  HandleErrorResponse,
  ServerError,
  UnauthorizedAccess,
} from '../exceptions/ErrorHandlers';
import { ErrorCode } from '../exceptions/ErrorCodes';
import * as nearAPI from 'near-api-js';
import { NearService } from '../services/near.service';

@injectable()
class UserController {
  constructor(private userService: UserService, private nearService: NearService) {}
  /**
   * @route POST api/v1/auth/login.
   * @desc Login user and return JWT token and user data.
   * @access Public.
   */
  loginUser = async (req: IRequest, res: IResponse) => {
    try {
      let response = await this.userService.loginUser(req, res);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };

  /**
   * @route POST api/v1/auth/register.
   * @desc Register user.
   * @access Public.
   */
  registerUser = async (req: IRequest, res: IResponse) => {
    try {
      let response = await this.userService.registerUser(req, res);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };
  getUserBalance = async (req: IRequest, res: IResponse) => {
    try {
      let response = await this.nearService.getBalance(req.params.accountId);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };

  updateAccount = async (req: IRequest, res: IResponse) => {
    try {
      let response = await this.userService.updateAccount(
        req.params.userId,
        req.body.accountId
      );
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };

  //   /**
  //    * @route PUT api/v1/auth/forgot-password.
  //    * @desc Forgot Password.
  //    * @access Public.
  //    */
  //   forgotPassword = async (req, res) => {
  //     await this.authService.forgotPassword(req, res);
  //   };

  //   /**
  //    * @route PUT api/v1/auth/reset-password.
  //    * @desc Reset Password.
  //    * @access Public.
  //    */
  //   resetPassword = async (req, res) => {
  //     await this.authService.resetPassword(req, res);
  //   };

  //   /**
  //    * @route PUT api/v1/auth/change-password.
  //    * @desc Change Password.
  //    * @access Public.
  //    */
  //   changePassword = async (req, res) => {
  //     await this.authService.changePassword(req, res);
  //   };
}

export default UserController;
