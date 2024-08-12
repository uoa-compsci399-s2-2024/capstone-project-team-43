import { Router } from "express";
import { retrieveProjects, createProject, deleteProject, updateProjectStatus, retrieveStatusProject } from "../../data/projects-dao.js";

const router = Router();

// retrieves all projects
router.get("/", async (req, res) => {
    return res.json(await retrieveProjects())
});

// retrieves all given status projects
router.get("/status/:status_name", async (req, res) => {
    const status = req.params.status_name;
    return res.json(await retrieveStatusProject(status))
});

// updates status of project with given status
router.post("/:id", async(req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const success = updateProjectStatus(id, status);
    res.sendStatus(success ? 204 : 404);
});

// creates a new project with given name and desc.
router.post("/", async(req, res) => {
    const { title, description, owner, preferred_skills, project_deliverable, created, expiry, status, max_num_of_groups, project_num} = req.body;
    if (!title || !description || !owner || !preferred_skills || !project_deliverable || !created || !expiry || !status || !max_num_of_groups || !project_num) {
        return res.status(422);
    }
    
    //details are valid and now passed to createProject function to query into database
    const project = await createProject(title, description, owner, preferred_skills, project_deliverable, created, expiry, status, max_num_of_groups, project_num);
    return res.location(`/api/projects/${project.id}`).status(201).json(project);
});

// deletes the project with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteProject(id);
    res.sendStatus(success ? 204 : 404);
});

export default router;

