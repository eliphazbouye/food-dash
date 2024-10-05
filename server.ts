import express, { Application } from 'express';
import Server from './src/index';

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.get("", (_req, res) => {
	res.send("Hello world!");
});

app.listen(PORT, () => {
	console.log(`Server listen on http://localhost:${PORT}`)
}).on("error", (err: any) => {
	if (err.code === "EADDRINUSE") {
		console.error("Error: address address aleardy in use");
	} else {
		console.log(err);		
	}
});
