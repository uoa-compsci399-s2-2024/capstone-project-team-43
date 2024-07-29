import { Router } from "express";
import { retrieveProjects, createProject, deleteProject } from "../../data/projects-dao.js";

const router = Router();

// retrieves all projects
router.get("/", async (req, res) => {
    return res.json(await retrieveProjects())
});

// creates a new project with given name and desc.
router.post("/", async(req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(422);
    }
    const project = await createProject(name, description);
    return res.location(`/api/projects/${project.id}`).status(201).json(project);
});

// deletes the project with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteProject(id);
    res.sendStatus(success ? 204 : 404);
});

export default router;

