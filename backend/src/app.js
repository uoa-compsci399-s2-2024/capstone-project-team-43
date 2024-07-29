import express from 'express';

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});