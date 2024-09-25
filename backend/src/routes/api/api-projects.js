import { Router } from "express";
import { getProjects, createProject, deleteProject, updateProjectStatus, getStatusProject, publishProjects, editProject, getProjectsBySemester } from "../../data/projects-dao.js";

const router = Router();

// Retrieves all given status projects
router.get("/status/:status_name", async (req, res) => {
    const status = req.params.status_name;
    return res.json(await getStatusProject(status))
});

// Retrieves all projects in given semester
router.get("/semester/:semester_id", async (req, res) => {
    const semester_id = req.params.semester_id;
    return res.json(await getProjectsBySemester(semester_id))
});

// Retrieves all projects
router.get("/", async (req, res) => {
    return res.json(await getProjects())
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
    const { title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client_details, client_name, client_email } = req.body;
    if (!title || !owner_id || !description || !created || !expiry || !status || !max_teams || !semester_id || !client_name || !client_email) {
        console.log("Not Valid Project Details");
        return res.status(422);
    }

    // Details are valid and now passed to createProject function to query into database
    const project = await createProject(title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client_details, client_name, client_email);
    return res.location(`/api/projects/${project.id}`).status(201).json(project);
});

// Creates a new project with given name and desc.
router.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, semester_id, other_client_details, client_name, client_email } = req.body;

    if (!id || !title || !description || !expiry|| !max_teams || !semester_id) {
        console.log("Not Valid Project Details");
        return res.status(422);
    }

    // Details are valid and now passed to editProject function to query into database
    const project = await editProject(id, title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, semester_id, other_client_details, client_name, client_email);
    return res.location(`/api/projects/${project.id}`).status(201).json(project);
});

// Deletes the project with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteProject(id);
    res.sendStatus(success ? 204 : 404);
});

// Sets all approved projects to published and if false then unpublish all projects
router.post("/publish/:status", async (req, res) => {

    const status = req.params.status;
    console.log(status);
    return res.json(await publishProjects(status))
});


export default router;

