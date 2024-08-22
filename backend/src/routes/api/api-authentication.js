import { Router } from "express";
import jwt from 'jsonwebtoken';
import { generateToken, registerStudent } from "../../data/authentication-dao.js";
import { createUser } from "../../data/users-dao.js";

const router = Router();

// Validates that the token given in the header is a valid token
router.get("/validateToken", async (req, res) => {
    // Tokens are passed in header of request for security

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }

});

 // Gets user details and attempts to log user in, if a user is valid it returns a signed JWT token
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // User must be registered to login so checkIfRegistered boolean is set to true
    const token = await generateToken(email, password, true);

    if (token == null) {
        //Access denied, not valid user
        res.status(401);
    }

    console.log("Token generated: " + token);

    res.status(202).send(token);
});

// Gets user details and attempts to register student, if a user is valid it returns a signed JWT token
router.post("/register", async (req, res) => {
    const { role, email, password, first_name, last_name, company } = req.body;
    let token = null;

    // If a student is attempting to register, they must be already in the database, if not, they cannot register, a client can register with any email
    if (role == "student") {
        token = await generateToken(email, null, false);

        if (token == null) {
            //Access denied, not valid user
            return res.status(401).send("Access denied");
        }

        await registerStudent(email, password);

    } else {

        // A client is trying to register
        await createUser("client", email, password, first_name, last_name, company, null);
    }

    console.log("Token generated and User Registered: " + token);

    res.status(202).send(token);
});

export default router;