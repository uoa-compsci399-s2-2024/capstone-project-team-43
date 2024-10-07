import path from 'path';
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { pool } from './data/database.js';
import routes from "./routes/routes.js";

dotenv.config();

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

const __dirname = path.resolve();
const BUILD_PATH = '../client/build';

// Configure middleware (CORS support, JSON parsing support, static files support)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable cookies
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, BUILD_PATH)));

// Import and use our application routes.
app.use("/", routes);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, BUILD_PATH, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
