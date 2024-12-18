import { NextFunction, Request, Response } from "express";
import { authService } from "../../services/auth/auth.service";

const signIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const { email, password } = req.body;
        const access_token = await authService.signIn(email, password);
        return res.status(200).json(access_token);
    } catch (err: any) {
        next(err);
    }
}

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        await authService.signUp(req.body);
        return res
            .status(200)
            .json({ message: `Account successfully created!` });
    } catch (err: any) {
        next(err);
    }

}

export const authController = { signIn, signUp }
