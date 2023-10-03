import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { User } from '../entities/user.entity';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export const passportJwt = (passportInstance: PassportStatic) =>
  passportInstance.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findOneBy({ id: payload.id });

        if (user) {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }

      return done(null, false);
    })
  );
