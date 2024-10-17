import express from "express";
import { env } from "node:process";
import "./src/lib/passport-jwt";
import { authCustomerRoutes } from "./src/routes/customer/auth";
import { profileCustomer } from "./src/routes/customer/profile";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use("/api/v1", authCustomerRoutes);
app.use("/api/v1", profileCustomer);

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
