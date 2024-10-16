import express, { Request, Response } from "express";
import { env } from "node:process";
import { PrismaClient } from "@prisma/client";

const app = express();
const router = express.Router();

const PORT = env.PORT;
const prisma = new PrismaClient();

router.get("/customers", async (_req: Request, res: Response) => {
    const customers = await prisma.customer.findMany();

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'user': customers }));
});

app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log(`server is listen on port ${PORT}`);
});
