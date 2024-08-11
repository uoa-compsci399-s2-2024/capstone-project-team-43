import { Router } from "express";


const router = Router();

import projectsRoute from "./api-projects.js";
import semestersRoute from "./api-semesters.js";

router.use("/projects", projectsRoute);

router.use("/semesters", semestersRoute);

// TODO Add API routes here

export default router;
