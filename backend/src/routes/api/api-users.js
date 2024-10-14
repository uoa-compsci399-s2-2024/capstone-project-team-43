import { Router } from "express";
import { getUsers, getUsersByTeam, createUser, deleteUser, updateUser, deleteUserByRole, getUser, getCSV, getCSVclients } from "../../data/users-dao.js";
import { generateToken } from "../../data/authentication-dao.js";
import { getProjectsBySemester } from "../../data/projects-dao.js";

const router = Router();

// Retrieves user with given ID
router.get("/id/:id", async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);
    return res.json(user);
});

// Retrieves all users of a specific role ('client','admin', or'student')
router.get("/role/:role", async (req, res) => {
    const { role } = req.params;
    const users = await getUsers(role);

    return res.json(users);
});

// Retrieves all users 
router.get("/", async (req, res) => {
    const { role } = req.params;
    const users = await getUsers();
    return res.json(users);
});

// Deletes all users of a specific role ('client','admin', or'student')
router.delete("/role/:role", async (req, res) => {
    const { role } = req.params;
    console.log(`Deleting users with role ${role}`);
    const users = await deleteUserByRole(role);
    return res.json(users);
});

// Creates a new user with given role, email, first name, last name, and company
router.post("/", async (req, res) => {
    const { role, email, password, first_name, last_name, company } = req.body;
    if (!role, !email, !first_name, !last_name) {
        return res.status(422);
    }

    // Details are valid and now passed to createUser function to query into database
    const user = await createUser(role, email, password, first_name, last_name, company);
    return res.location(`/api/users/${user.id}`).status(201).json(user);
});

// Deletes the user with the given ID
router.delete("/id/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteUser(id);
    res.sendStatus(success ? 204 : 404);
});

// Gets users in team with given id 
router.get("/team/:id", async (req, res) => {
    const id = req.params.id;
    const users = await getUsersByTeam(id);
    return res.json(users);
});

// Gets user with given id 
router.get("/id/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    return res.json(user);
});

// Updates an attribute of the user with the given id 
router.put("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { attribute, newValue } = req.body;

    try {
        // Update the attribute in the database
        const [updatedUser] = await updateUser(id, attribute, newValue);

        console.log(updatedUser[0].email);

            // checks if user has valid credentials
    const token = await generateToken(updatedUser[0].email, updatedUser[0].password, false);

    if (token == null) {
        //Access denied, not valid user
        res.status(401);
    }

    console.log("Token generated for new details: " + token);

        // Return success status
       return res.status(200).json({token: token});

    } catch (error) {
        console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Gets students in db structured as a CSV
router.get("/download", async (req, res) => {
    try {
    const students = await getUsers("student");
    const CSVData = await getCSV(students);

    res.header('Content-Type', 'text/csv');
    res.attachment('studentsData.csv');
    return res.status(200).send(CSVData);
    } catch (err){
        console.log("Error Downloading CSV ", err);
        return res.status(204);
    }
});

// Gets clients in db structured as a CSV
router.get("/download/clients/:semester_id", async (req, res) => {
    const semester_id = req.params.semester_id;
    try {
    const projects = await getProjectsBySemester(semester_id);
    const CSVData = await getCSVclients(projects, semester_id);

    res.header('Content-Type', 'text/csv');
    res.attachment('clientData.csv');
    return res.status(200).send(CSVData);
    } catch (err){
        console.log("Error Downloading CSV ", err);
        return res.status(204);
    }
});

export default router;

