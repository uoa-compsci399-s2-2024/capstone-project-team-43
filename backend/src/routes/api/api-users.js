import { Router } from "express";
import { retrieveUsers, createUser, deleteUser, retrieveRejected, updateUserStatus } from "../../data/users-dao.js";

const router = Router();

// retrieves all users
router.get("/", async (req, res) => {
    return res.json(await retrieveUsers())
});

// creates a new user with given type, email, first name, and last name
router.post("/", async(req, res) => {
    const { type, email, first_name, last_name } = req.body;
    if (!type, !email, !first_name, !last_name) {
        return res.status(422);
    }
    
    //details are valid and now passed to createUser function to query into database
    const user = await createUser(type, email, first_name, last_name);
    return res.location(`/api/users/${user.id}`).status(201).json(user);
});

// deletes the user with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteUser(id);
    res.sendStatus(success ? 204 : 404);
});

export default router;

