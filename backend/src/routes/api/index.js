import { Router } from "express";


const router = Router();

import projectsRoute from "./api-projects.js";
import semestersRoute from "./api-semesters.js";
import usersRoute from "./api-users.js";
import teamsRoute from "./api-teams.js";


router.use("/projects", projectsRoute);

router.use("/semesters", semestersRoute);

router.use("/users", usersRoute);

router.use("/teams", teamsRoute);


// TODO Add API routes here

export default router;
