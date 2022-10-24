import { injectable } from 'tsyringe';
import User from '../models/user-model.model';
import { IRequest, IResponse } from '../interfaces/http.interface';
import {
  BadRequest,
  ResourceNotFoundError,
  ServerError,
  UnauthorizedAccess,
} from '../exceptions/ErrorHandlers';

@injectable()
export class UserService {
  public registerUser = async (req: IRequest, res: IResponse) => {
    const { email, password, username } = req.body;
    const findUser = await User.findOne({ email });
    console.log('result', findUser);
    if (findUser) {
      throw new BadRequest('user already exists');
    }
    console.log('username', username);
    let user = new User({
      email,
      password,
      username,
    });

    // Save user to database
    user = await user.save();

    if (user) {
      console.log(user);
      delete user.password;
      return {
        email: user.email,
        id: user._id,
        username: user.username,
      };
    }
  };

  public loginUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      // Validate email addresss
      if (!user) throw new ResourceNotFoundError('user does not exists');

      // Validate password
      if (!(await user.comparePassword(password))) return res.badRequest();

      await user.save();
      user.password = undefined;
      return {
        email: user.email,
        username: user.username,
        id: user._id,
        token: user.generateJWT(),
      };
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while signing in'
      );
    }
  };
}
