import passportJwt from 'passport-jwt';
import config from '../config';
import user from '../models/user-model.model';

/**
 * passport-jwt - A Passport strategy for authenticating with a JSON Web Token.
 * This module lets you authenticate endpoints using a JSON web token.
 * It is intended to be used to secure RESTful endpoints without sessions.
 */

const JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader(config.HEADER_NAME),
  secretOrKey: config.JWT_SECRET,
};

export default (passport: any) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      await user.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false, { message: 'Internal Server Error' });
        });
    })
  );
};
