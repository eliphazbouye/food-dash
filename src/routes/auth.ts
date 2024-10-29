import express from "express";
import { authController } from "../controllers/auth/auth.controller";

const auth = express.Router();

auth.post( "/auth/signin", authController.signIn);
auth.post("/auth/signup", authController.signUp);

export { auth };
