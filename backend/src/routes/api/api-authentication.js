import { Router } from "express";
import jwt from 'jsonwebtoken';
import { generateToken, registerStudent, blacklistToken, checkTokenBlacklist, findUser, passwordEncrypt } from "../../data/authentication-dao.js";
import { createUser } from "../../data/users-dao.js";
import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv";
import { google } from 'googleapis';

const router = Router();

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Validates that the token given in the header is a valid token
router.get("/validateToken", async (req, res) => {

    // Gets the role that the page is requesting
    const { requested_role } = req.body;

    // Tokens are passed in header of request for security
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const result = await checkTokenBlacklist(token);

        // Checks if the token received is on the token blacklist (if a user has logged out and is currently not logged in)
        if (result) {
            throw new Error('Token is invalid');
        }

        const verifiedToken = jwt.verify(token, jwtSecretKey);

        // Extract user's data
        const user = {
            id: verifiedToken.userId,
            email: verifiedToken.email,
            role: verifiedToken.role,
        };

        //Checks if the user is in the database, if so it returns their role
        const user_role = await findUser(user.email);

        /** 
         * The following must occur for a user to be verified:
         * The token is valid and not in the blacklist token (checked above)
         * The role in the token is the same as the requested role
         * The user's role in the database is the same as the requested role
         * 
         * If the above conditions are all true, the user is verified
         */

        if (verifiedToken && user.role == requested_role && requested_role == user_role) {
            return res.status(201).send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send("Access Denied");
        }
    } catch (error) {
        console.log("Error validating token: ", error);
        // Access Denied
        return res.status(401).send(error);
    }

});

// Gets user details and attempts to log user in, if a user is valid it returns a signed JWT token
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // checks if user has valid credentials
    const token = await generateToken(email, password, false);

    if (token == null) {
        //Access denied, not valid user
        res.status(401);
    }

    console.log("Token generated: " + token);

    res.status(202).send(token);
});

// Gets user details and attempts to register client
router.post("/register", async (req, res) => {
    const { role, email, password, first_name, last_name, company } = req.body;
    let token = null;

    let hashPassword = await passwordEncrypt(password);

    // Checks if the client has an existing account

    if (await findUser(email) == null) {

        // A client is registering
        await createUser("client", email, hashPassword, first_name, last_name, company, null);
    }

    token = await generateToken(email, password, false);

    console.log("Token generated and User Registered: " + token);

    res.status(202).send(token);
});

// Gets user details and attempts to register admin
router.post("/register/admin", async (req, res) => {
    const { role, email, password, first_name, last_name, company } = req.body;

    // For security reasons, registering an admin is only possible is there is an admin logged in
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);

    const result = await checkTokenBlacklist(token);

    // Checks if the token received is on the token blacklist (if a user has logged out and is currently not logged in)
    if (result) {
        return res.status(401);
    }

    const verifiedToken = jwt.verify(token, jwtSecretKey);

    // Extract user's data
    const user = {
        id: verifiedToken.userId,
        email: verifiedToken.email,
        role: verifiedToken.role,
    };

    //Checks if the user is in the database, if so it returns their role, then checks if the user is an admin
    const user_role = await findUser(user.email);

    if (user_role != "admin") {
        return res.status(401);
    }

    let hashPassword = await passwordEncrypt(password);

    // Checks if the admin has an existing account
    if (await findUser(email) == null) {

        // A admin is registering
        await createUser("admin", email, hashPassword, first_name, last_name, company, null);
    }

    token = await generateToken(email, password, false);

    console.log("Token generated and User Registered: " + token);

    res.status(201).send(token);
});

router.post("/delete/admin", async (req, res) => {

    // For security reasons, deleting an admin is only possible is there is an admin logged in
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);

    const result = await checkTokenBlacklist(token);

    // Checks if the token received is on the token blacklist (if a user has logged out and is currently not logged in)
    if (result) {
        return res.status(401);
    }

    const verifiedToken = jwt.verify(token, jwtSecretKey);

    // Extract user's data
    const user = {
        id: verifiedToken.userId,
        email: verifiedToken.email,
        role: verifiedToken.role,
    };

    // Checks if the user is in the database, if so it returns their role, then checks if the user is an admin
    const user_role = await findUser(user.email);

    if (user_role != "admin") {
        return res.status(401);
    }

    let hashPassword = await passwordEncrypt(password);

    await deleteUser(user.id);

    res.status(200);
});

router.post("/logout", async (req, res) => {
    try {
        // Gets token from header
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        const token = req.header(tokenHeaderKey);

        // Adds token to blacklist so that specific token is invalid
        await blacklistToken(token);

        res.status(200).send("Logged out successfully");

    } catch (error) {
        return res.status(401).send("Error logging out");
    }
});

// Create an oAuth client to authorize the API call
const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

router.get('/google/role/:role', async (req, res) => {

    try {

        const { role } = req.params;

        // Checks that the role is either a client, student, or admin

        if (['student', 'client', 'admin'].indexOf(role) == -1) {
            return res.status(400).send('Not a valid role');
        }

        // Generates the URL for Google consent form with the role requested to register/login
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
            state: role,
        });

        // Redirect the user to Google’s consent screen
        res.redirect(authorizeUrl);
    } catch (error) {
        console.log("Error authenticating: " + error);
        res.status(500).redirect('http://localhost:3000/');
    }
});

// Callback route for Google OAuth2, it returns the role in the request aswell
router.get('/google/callback', async (req, res) => {
    try {
        const Authcode = req.query.code;
        const { state: role } = req.query;

        if (!Authcode) {
            return res.status(400).redirect('http://localhost:3000/');
        }

        // Exchange Google's authorization code to get tokens
        const { tokens } = await oAuth2Client.getToken(Authcode);
        oAuth2Client.setCredentials(tokens);

        // Get user information
        const oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: 'v2',
        });

        const { data: userInfo } = await oauth2.userinfo.get();
        const email = userInfo.email;
        const first_name = userInfo.given_name;
        const last_name = userInfo.family_name;

        console.log('User email:', email);
        console.log('User first name:', first_name);
        console.log('User last name:', last_name);

        // Checks if the user exists in the database, if so it returns the role, if not returns null
        const user_role = await findUser(email);
        let token = null

        if (user_role == null && role == "client") {

            // User does not exist in the database must create a new client
            await createUser("client", email, null, userInfo.given_name, userInfo.family_name, null);
            token = await generateToken(email, null, true);

            console.log("TOKEN GENERATED GOOGLE USER: " + token);

            // Respond with JWT token and redirect to homepage
            return res.cookie('token', token).redirect('http://localhost:3000/');

        } else if (user_role != null && role == user_role) {

            //User is registered and exist in the database, can be logged in
            token = await generateToken(email, null, true);

            console.log("TOKEN GENERATED GOOGLE USER: " + token);

            // Respond with JWT token and redirect to homepage
            return res.cookie('token', token).redirect('http://localhost:3000/');

        } else {

            console.log("User unauthorized to login");
            //User is not registered and not a client, they are unauthorized to login
            return res.status(400).redirect('http://localhost:3000/');
        }

    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        return res.status(500).redirect('http://localhost:3000/');
    }
});

export default router;