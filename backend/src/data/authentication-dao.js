import { pool } from "./database.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Will use this for password hashing


dotenv.config();


// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * TODO: (Create login method) Implement a method that fetches a user from USER table, 
 * if a user doesn't exist, return "Invalid login details"
 */

/**
 * TODO: (Create register method for student) Implement a method that fetches a user from USER table, 
 * if a user doesn't exist OR date created attribute is NULL,
 * return "Invalid login details/you are not enrolled for capstone"
 */

/**
 * TODO: (Create register method for client) Implement a method that creates a new client user.
 */

/**
 * TODO: Create logout method
 */



/**
 * @typedef {object} User // Defines user class
 * @property {number} id
 * @property {'admin'|'student'|'client'} type
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} company
 * @property {Date} created
 * @property {Date} last_login
 */

// Attempts to log the user in with given email & password, if such a user exists it returns a session token
export async function generateToken(email, password) {

    // Validate user here
    const userid = await validateUser(email, password);

    if(userid == null) {
        return null;
    }

    console.log("Generating token with user ID: " + userid);

    // User is valid, now generates  and returns a token
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date.now(),
        userId: userid,
    }

    // JWT token is signed with given userID, secret key, current date, and expires after 1 hour
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: '1h' });
    return token
  }



async function validateUser(email, password) {
    let connection;
    try {
      // Get connection from pool
      connection = await pool.getConnection();
  
      await connection.query(`USE ${DB_NAME};`);
  
      const [rows] = await connection.query('SELECT * FROM USER WHERE email = ? AND password = ?', [email, password]);

        // If there is a connection, release it
        if (connection) connection.release();

       // Checks no user was found,
      if (rows.length > 0) {

        /** @type {User} */
        const user = rows[0];

        console.log("User:", user, " With ID: " + user.id);

        return user.id;
    }
  
      return null;
  
    } catch (err) {
      console.error('Error executing query/s:', err.message);
    }
  }