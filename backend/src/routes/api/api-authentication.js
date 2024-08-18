import { Router } from "express";
import jwt from 'jsonwebtoken';
import { generateToken } from "../../data/authentication-dao.js";

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

    const token = await generateToken(email, password);

    if (token == null) {
        //Access denied, not valid user
        res.status(401).send(error);
    }

    console.log("Token generated: " + token);

    res.status(202).send(token);
});


export default router;