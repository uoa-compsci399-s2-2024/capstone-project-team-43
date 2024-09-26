import { Router } from "express";


const router = Router();

import projectsRoute from "./api-projects.js";
import semestersRoute from "./api-semesters.js";
import usersRoute from "./api-users.js";
import authenticationRoute from "./api-authentication.js";
import teamsRoute from "./api-teams.js";
import preferencesRoute from "./api-preferences.js";
import projectAllocationRoute from "./api-project-allocation.js";


router.use("/projects", projectsRoute);

router.use("/semesters", semestersRoute);

router.use("/users", usersRoute);

router.use("/authentication", authenticationRoute);

router.use("/teams", teamsRoute);

router.use("/preferences", preferencesRoute);

router.use("/project-allocation", projectAllocationRoute);

// TODO Add API routes here

export default router;
