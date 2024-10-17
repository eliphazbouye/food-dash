import express from "express";
import { env } from "node:process";
import "./lib/passport-jwt";
import { authCustomerRoutes } from "./routes/customer/auth";
import { profileCustomer } from "./routes/customer/profile";

const app = express();

app.use(express.json());
app.use("/api/v1", authCustomerRoutes);
app.use("/api/v1", profileCustomer);

export { app as server };
