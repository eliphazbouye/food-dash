import express from "express";
import "./lib/passport-jwt";
import { auth } from "./routes/auth";
import { customerProfile } from "./routes/customer/profile";
import { errorHandler } from "./lib";

const app = express();

app.use(express.json());
app.use("/api/v1", auth);
app.use("/api/v1", customerProfile);

// Error handling middleware
app.use(errorHandler);

export { app as server };
