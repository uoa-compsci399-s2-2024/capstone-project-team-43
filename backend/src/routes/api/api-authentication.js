import { Router } from "express";
import jwt from 'jsonwebtoken';
import { generateToken, registerStudent, blacklistToken, checkTokenBlacklist, findUser } from "../../data/authentication-dao.js";
import { createUser } from "../../data/users-dao.js";
import { OAuth2Client } from 'google-auth-library';
import http from 'http'; // Built-in Node module
import url from 'url'; // Built-in Node module
import open from 'open'; // Third-party package
import destroyer from 'server-destroy'; // Third-party package
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
    // Tokens are passed in header of request for security

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        console.log("Token Received: " + token);

        const result = await checkTokenBlacklist(token);

        // Checks if the token received is on the token blacklist (if a user has logged out and is currently not logged in)
        if (result) {
            throw new Error('Token is invalid');
        }

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

    // checks if user has valid credentials
    const token = await generateToken(email, password, false);

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

    // A client is registering
    await createUser("client", email, password, first_name, last_name, company, null);

    console.log("Token generated and User Registered: " + token);

    res.status(202).send(token);
});

router.post("/logout", async (req, res) => {
    try {
    //Gets token from header
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);

    //Adds token to blacklist so that specific token is invalid
    await blacklistToken(token);

    res.status(202).send("Logged out successfully");

    } catch(error) {
        return res.status(401).send("Error logging out");
    }
});

// Create an oAuth client to authorize the API call
const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

router.get('/google', async (req, res) => {

    try {

    // Generates the URL for Google consent form
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    });

    // Redirect the user to Google’s consent screen
    res.redirect(authorizeUrl);
    } catch (error) {
        console.log("Error authenticating: " + error);
        res.status(500).send('Error during authentication').redirect('http://localhost:3000/');
    }
});

// Callback route for Google OAuth2
router.get('/google/callback', async (req, res) => {
    try {
        const Authcode = req.query.code;

        if (!Authcode) {
            return res.status(400).send('Authorization code invalid');
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

        if (user_role == null) {

            // User does not exist in the database must create a new client
            await createUser("client", email, null, userInfo.given_name, userInfo.family_name, null);
            token = await generateToken(email, null, true);

        } else {

            //User is registered and exist in the database, can be logged in
            token = await generateToken(email, null, true);
            
        }

        console.log("TOKEN GENERATED GOOGLE USER: " + token);

        // Respond with JWT token and redirect to homepage
        res.cookie('token', token).redirect('http://localhost:3000/');

    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        res.status(500).send('Error during authentication').redirect('http://localhost:3000/');
    }
});

export default router;