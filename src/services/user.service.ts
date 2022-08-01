import { injectable } from 'tsyringe';
import User from '../models/user.model';
import { IRequest, IResponse } from '../interfaces/http.interface';

@injectable()
export class UserService {
  public registerUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email, password } = req.body;

      let user = new User({
        email,
        password,
      });

      // Save user to database
      user = await user.save();

      if (user) {
        return res.ok(user, 'Registration Successful');
      }
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while creating account'
      );
    }
  };

  public loginUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      // Validate email addresss
      if (!user) return res.notFound();

      // Validate password
      if (!(await user.comparePassword(password))) return res.badRequest();

      await user.save();
      user.password = undefined;
      const data = {
        token: user.generateJWT(),
        user,
      };
      return res.ok(data, 'Registration Successful');
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while signing in'
      );
    }
  };
}
