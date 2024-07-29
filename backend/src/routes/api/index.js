import { Router } from "express";


const router = Router();

import projectsRoute from "./api-projects.js";

router.use("/projects", projectsRoute);

// TODO Add API routes here

export default router;
