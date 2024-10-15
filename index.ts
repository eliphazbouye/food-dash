import express, { Request, Response } from "express";
import { env } from "node:process";

const app = express();
const PORT = env.PORT;

app.get("/", (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'message': "Ready. Set. Go!!!"});
});

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
