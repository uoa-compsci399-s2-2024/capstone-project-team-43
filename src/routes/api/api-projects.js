import { Router } from "express";
import { getProjects, createProject, deleteProject, getPublishedProjects, updateProjectStatus, getStatusProject, publishProjects, editProject, getProjectsBySemester, allocateNumbers, getProjectsByUser, getProjectById } from "../../data/projects-dao.js";
import { validateToken } from "../../data/authentication-dao.js";

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

// Retrieves all projects in given semester
router.get("/published", async (req, res) => {
    return res.json(await getPublishedProjects())
});


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    return res.json(await getProjectById(id))
});

// Retrieves all projects where owner has user_id
router.get("/user/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    return res.json(await getProjectsByUser(user_id))
});

// Retrieves all projects
router.get("/", async (req, res) => {
    return res.json(await getProjects())
});

// Creates a updates a project with given name and desc.
router.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details } = req.body;

    if (!id || !title || !description || !expiry || !max_teams || !project_deliverable) {
        console.log("Not Valid Project Details");
        return res.status(401);
    }

    // Details are valid and now passed to editProject function to query into database
    const project = await editProject(id, title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details);
    return res.location(`/api/projects/${project.id}`).status(201).json(project);
});

// Sets all approved projects to published and if false then unpublish all projects
router.post("/publish/:status", async (req, res) => {
 try {
      // Tokens are passed in header of request for security
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const id = req.params.id;

    const token = req.header(tokenHeaderKey);

    const result = await validateToken(token, jwtSecretKey, "admin");

    if (!result) {
        console.log(result);
        throw new error("Invalid Token Credentials");
    }

    const status = req.params.status;
    
    if(status == "true") {
    const { approved_projects } = req.body;

    allocateNumbers(approved_projects);
    }
    return res.json(await publishProjects(status))
} catch (err) {
    console.log("User is not authorized to access this data");
    res.sendStatus(403);
}
});


// Updates status of project with given status
router.post("/:id", async (req, res) => {
    try {
     // Tokens are passed in header of request for security
     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
     let jwtSecretKey = process.env.JWT_SECRET_KEY;
   
       const id = req.params.id;
       const { status } = req.body;
   
       const token = req.header(tokenHeaderKey);
   
       const result = await validateToken(token, jwtSecretKey, "admin");
   
       if (!result) {
           console.log(result);
           throw new error("Invalid Token Credentials");
       }
   
       const success = updateProjectStatus(id, status);
       res.sendStatus(success ? 204 : 404);
    } catch (err) {
       console.log("User is not authorized to access this data");
       res.sendStatus(403);
    }
   });   

// Creates a new project with given name and desc.
router.post("/", async (req, res) => {
    const { title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, available_from, expiry, status, max_teams, project_number, semester_id, other_client_details } = req.body;
    console.log(title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, available_from, expiry, status, max_teams, project_number, semester_id, other_client_details);
    if (!title || !owner_id || !description || !created || !expiry || !status || !max_teams) {
        console.log("Not Valid Project Details");
        return res.status(401);
    }

    // Details are valid and now passed to createProject function to query into database
    const project = await createProject(title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, available_from, expiry, status, max_teams, project_number, semester_id, other_client_details);
    return res.location(`/api/projects/${project.id}`).status(201).json(project);
});


// Deletes the project with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteProject(id);
    res.sendStatus(success ? 204 : 404);
});


export default router;

