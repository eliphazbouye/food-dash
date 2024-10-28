import express, { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { signIn } from "../services/auth.service";
import bcrypt from 'bcrypt'
import { ICustomer } from "../interfaces";

const auth = express.Router();

auth.post(
    "/auth/signin",
    async (req: Request, res: Response, next: any): Promise<any> => {
        try{
            const { email, password } = req.body;
            const access_token = await signIn(email, password);
            return res.status(200).json(access_token);
        } catch (err: any) {
            next(err);
        }
    }
);

auth.post(
    "/auth/signup",
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const customerAlreadyExist = await prisma.customer.findUnique({
                where: { email: req.body.email },
            });

            if (customerAlreadyExist) {
                return res.status(400).json({
                    message: `This email has already connected to a account please Sign In!`,
                });
            }

            const passwordHashed = await bcrypt.hash(req.body.password, 10);

            const customer: ICustomer = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordHashed,
            };

            await prisma.customer.create({ data: customer });

            return res
                .status(200)
                .json({ message: `Account successfully created!` });
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }
);

export { auth };
