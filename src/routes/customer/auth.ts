import express, { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ICustomer } from "../../interfaces/customerInterface";

const authCustomerRoutes = express.Router();

authCustomerRoutes.post(
  "/customer/auth/signin",
  async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const customer = await prisma.customer.findUniqueOrThrow({
        where: { email: req.body.email },
      });
      if (!customer) {
        return res
          .status(400)
          .json({ message: `User not found with email: ${req.body.email}` });
      }

      const { password, ...customerInfo } = customer;
      const isMatch = await bcrypt.compare(req.body.password, password);

      if (!isMatch) {
        return res.status(400).json({
          message: `Password is incorrect!`,
        });
      }

      const payload = {
        sub: customerInfo.id,
        email: customerInfo.email,
      };

      const accessToken = jwt.sign(payload, String(process.env.JWT_SECRET), {
        expiresIn: "1h",
      });

      await prisma.customer.update({
        where: { id: payload.sub },
        data: { lastLogin: new Date().toISOString() },
      });

      return res.status(200).json({ access_token: accessToken });
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  }
);

authCustomerRoutes.post(
  "/customer/auth/signup",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const customerAlreadyExist = await prisma.customer.findUnique({
        where: { email: req.body.email },
      });

      if (customerAlreadyExist) {
        return res.status(400).json({
          messsage: `This email has already connected to a account please Sign In!`,
        });
      }

      const passwordHashed = await bcrypt.hash(req.body.password, 10);

      const customer: ICustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHashed,
      };
      res.setHeader("Content-Type", "application/json");

      await prisma.customer.create({ data: customer });

      return res
        .status(200)
        .json({ messsage: `Account successfully created!` });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
);

export { authCustomerRoutes };
