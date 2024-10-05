import express from 'express';

const app = express();
const PORT = 3000;

app.get("", (_req, res) => {
	res.send("Hello world!");
});

app.listen(PORT, () => {
	console.log(`Server listen on http://localhost:${PORT}`)
});
