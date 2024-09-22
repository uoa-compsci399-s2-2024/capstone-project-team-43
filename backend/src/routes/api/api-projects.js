import { Router } from "express";
import { getProjects, createProject, deleteProject, updateProjectStatus, getStatusProject, publishProjects } from "../../data/projects-dao.js";

const router = Router();

// Retrieves all projects
router.get("/", async (req, res) => {
    return res.json(await getProjects())
});

// Retrieves all given status projects
router.get("/status/:status_name", async (req, res) => {
    const status = req.params.status_name;
    return res.json(await getStatusProject(status))
});

// Updates status of project with given status
router.post("/:id", async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const success = updateProjectStatus(id, status);
    res.sendStatus(success ? 204 : 404);
});

// Creates a new project with given name and desc.
router.post("/", async (req, res) => {
    const { title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number } = req.body;

    if (!title || !description || !owner_id || !project_deliverable || !created || !expiry || !status || !max_teams || !project_number) {
        console.log("Not Valid Project Details");
        return res.status(422);
    }

    // Details are valid and now passed to createProject function to query into database
    const project = await createProject(title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number);
    return res.location(`/api/projects/${project.id}`).status(201).json(project);
});

// Deletes the project with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteProject(id);
    res.sendStatus(success ? 204 : 404);
});

// Sets all projects to published
router.post("/publish/:status", async (req, res) => {
    const status = req.params.status;
    return res.json(await publishProjects(status))
});


export default router;

