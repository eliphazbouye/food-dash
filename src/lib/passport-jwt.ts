import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "./prisma";

const JWT_SECRET = String(process.env.JWT_SECRET);
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (payload: any, done: any) => {
    try {
      const customer = prisma.customer.findUnique({
        where: { id: payload.sub },
      });
      if (customer) return done(null, customer);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);
