import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

const customerProfile = express.Router();

customerProfile.get(
    "/customer/profile",
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const authUser = await req["user"];
        return res.status(200).json({ user: authUser });
    }
);

export { customerProfile };
