import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// JWT를 추출하는 방법 지정하고 JWT를 검증할 때 사용할 비밀키 설정
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// done : 인증 결과 처리
const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    console.log(jwt_payload);
    const user = await User.findById(jwt_payload.id);
    console.log(user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

export default jwtStrategy;
