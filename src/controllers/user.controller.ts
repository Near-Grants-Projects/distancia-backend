import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import { UserService } from '../services/user.service';

@injectable()
class UserController {
  constructor(private authService: UserService) {}
  /**
   * @route POST api/v1/auth/login.
   * @desc Login user and return JWT token and user data.
   * @access Public.
   */
  loginUser = async (req: IRequest, res: IResponse) => {
    await this.authService.loginUser(req, res);
  };

  /**
   * @route POST api/v1/auth/register.
   * @desc Register user.
   * @access Public.
   */
  registerUser = async (req: IRequest, res: IResponse) => {
    await this.authService.registerUser(req, res);
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
