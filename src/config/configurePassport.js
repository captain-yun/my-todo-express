import passport from 'passport';
import localStrategy from '../strategies/localStrategy.js';
import jwtStrategy from '../strategies/jwtStrategy.js';
import User from '../models/User.js';

const configurePassport = () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};

export default configurePassport;
