import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

const profileCustomer = express.Router();

profileCustomer.get(
  "/customer/profile",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authUser = await req["user"];
    return await res.status(200).json({ user: authUser });
  }
);

export { profileCustomer };
