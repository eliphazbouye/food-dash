import express from 'express';
import { env } from 'node:process';

const app = express();
const PORT = env.PORT;

app.get('/', (_req, res) => {
    res.send('Ready. Set. Go!!!');
})

app.listen(PORT, () => {
    console.log(`server is listen on port ${PORT}`)
})
