import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { getDatabase } from './data/database.js';
import routes from "./routes/routes.js";

dotenv.config();

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

// Configure middleware (CORS support, JSON parsing support, static files support)
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Import and use our application routes.
app.use("/", routes);

await getDatabase();

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
