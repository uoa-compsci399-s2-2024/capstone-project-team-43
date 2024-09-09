import { Router } from "express";
import { getUsers, getUsersByTeam, createUser, deleteUser } from "../../data/users-dao.js";

const router = Router();

// Retrieves all users or users of a specific role ('client','admin', or'student')
router.get("/:role?", async (req, res) => {
    const { role } = req.params;
    let users; 

    if (role) {
        users = await getUsers(role);
    } else {
        users = await getUsers();
    }

    return res.json(users);
});

// Creates a new user with given role, email, first name, last name, and company
router.post("/", async (req, res) => {
    const { role, email, password, first_name, last_name, company } = req.body;
    if (!role, !email, !password, !first_name, !last_name) {
        return res.status(422);
    }

    // Sets company to null if not provided
    // company = company ? company : null;

    // Details are valid and now passed to createUser function to query into database
    const user = await createUser(role, email, password, first_name, last_name, company);
    return res.location(`/api/users/${user.id}`).status(201).json(user);
});

// Deletes the user with the given ID
router.delete("/:id", async (req, res) => {
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

export default router;

