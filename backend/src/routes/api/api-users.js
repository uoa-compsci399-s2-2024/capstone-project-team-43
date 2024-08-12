import { Router } from "express";
import { retrieveUsers, createUser, deleteUser } from "../../data/users-dao.js";

const router = Router();

// retrieves all users
router.get("/", async (req, res) => {
    return res.json(await retrieveUsers())
});

// creates a new user with given type, email, first name, last name, and company
router.post("/", async(req, res) => {
    const { type, email, password, first_name, last_name, company} = req.body;
    if (!type, !email, !password, !first_name, !last_name) {
        return res.status(422);
    }

    // // sets company to null if not provided
    // company = company ? company : null;

    //details are valid and now passed to createUser function to query into database
    const user = await createUser(type, email, password, first_name, last_name, company);
    return res.location(`/api/users/${user.id}`).status(201).json(user);
});
 
// deletes the user with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteUser(id);
    res.sendStatus(success ? 204 : 404);
});

export default router;

