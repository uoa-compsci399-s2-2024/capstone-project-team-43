import { pool, DB_NAME } from "./database.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Will use this for password hashing

dotenv.config();

// Gets the database name from .env file
const DEV_EMAIL = process.env.DEV_EMAIL;
const DEV_USER_ROLE = process.env.DEV_USER_ROLE;
const TESTING = process.env.TESTING;

const saltRounds = 10; // Typically a value between 10 and 12

/**
 * @typedef {object} User // Defines user class
 * @property {number} id
 * @property {'admin'|'student'|'client'} type
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} company
 * @property {Date} created
 * @property {number} team_id
 */

/** Attempts to log the user in with given email & password, if such a user exists it returns a session token
 * @param {string} email // email of the user
 * @param {string} password // encrypted password of user
 * @param {boolean} googleAuth // toggle if google authentication was used
*/
export async function generateToken(email, password, googleAuth, role = null) {

  // Validate user here
  /** @type {User} */
  const user = await validateUser(email, password, googleAuth);

  console.log("USER: ", user);

  if (user == null) {
    return null;
  }

  const DEVAuthorizedUsers = [DEV_EMAIL]; // **MUST REMOVE BEFORE DEPLOYMENT ***
  if (user.email.includes(DEVAuthorizedUsers)) {
    console.log("DEV givin token with role: ", role);

    // User is valid, JWT token is signed with given user details, secret key, current date, and expires after 1 hour
    const token = jwt.sign(
      {
        time: Date.now(),
        userId: user.id,
        email: user.email,
        role: role,
      }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' }); // Token is valid for 1 day

    return token
  }

  // User is valid, JWT token is signed with given user details, secret key, current date, and expires after 1 hour
  const token = jwt.sign(
    {
      time: Date.now(),
      userId: user.id,
      email: user.email,
      role: user.role,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' }); // Token is valid for 1 day

  return token
}

/** 
 * Funtion is given an email and password which then checks if such a user exists in the database, returns user object if a user is found and null otherwise.
 * The googleAuth is a boolean which will check if a user is logging in via google's Authentication
 * 
 * @param {string} email // email of the user
 * @param {string} password // encrypted password of user
 * @param {boolean} googleAuth // toggle if google authentication was used
 */
async function validateUser(email, password, googleAuth) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Checking if email is in the database
    let [rows] = await connection.query('SELECT * FROM USER WHERE email = ?', [email]);

    // If there is a connection, release it
    if (connection) connection.release();

    // Checks no user was found,
    if (rows.length > 0) {
      if (googleAuth) {

        /** @type {User} */
        const user = rows[0];

        return user;

      } else {
        /** @type {User} */
        const user = rows[0];
        try {
          // Need to check hashed password
          let result = bcrypt.compare(password, user.password);

          if (result) {
            // Passwords match, authentication successful
            console.log('Passwords match! User authenticated.');

            return user;

          } else {
            // Passwords don't match, authentication failed
            console.log('Passwords do not match! Authentication failed.');
            return null;
          }

        } catch (err) {
          console.log("Error comparing passwords: ", err);
          return null;
        }

      }
    }

    return null;

  } catch (err) {
    console.error('Error executing query/s here:', err.message);
  }
}

export async function passwordEncrypt(password) {

  try {
    let hashPassword = bcrypt.hash(password, saltRounds);

    return hashPassword;

  } catch (err) {
    console.log("Error creating hash");
    return null;
  }
}

/**
 * Attempts to register the student with given details, a user can only be registered if their university email is already in the database
 * @param {string} email 
 * @param {string} password
 * @returns 
 */
export async function registerStudent(email, password) {

  let connection;
  let [rows] = [];
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Gets current date "YYYY-MM-DD" The .split('T') splits the date from the milliseconds time
    const created = new Date().toISOString().split('T')[0];

    const hash = await passwordEncrypt(password);

    // Updates client details
    await connection.query(
      "UPDATE USER SET password = ?, created = ? WHERE email = ?",
      [hash, created, email]
    );

    // If there is a connection, release it
    if (connection) connection.release();

  } catch (err) {
    console.error('Error executing query/s:', err);
  }

  console.log("User is registered");

}

// Initializes the token blacklist for logging out users
var tokenBlacklist = [];

export async function blacklistToken(token) {
  tokenBlacklist.push(token);
}

export async function checkTokenBlacklist(token) {

  // Checks if the token is in the blacklist, checks every single token, if no matching token if found, .find() returns undefined
  const result = tokenBlacklist.find(blacklistedToken => blacklistedToken === token);

  // If no token is found, return false
  if (result == undefined) {
    return false;
  }
  return true;
}

// Finds a user with given email and returns which role the user has
export async function findUser(email) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    let [rows] = await connection.query('SELECT * FROM USER WHERE email = ?', [email]);

    // If there is a connection, release it
    if (connection) connection.release();

    // Checks if a user has been found
    if (rows.length > 0) {

      /** @type {User} */
      const user = rows[0];

      return user.role;
    }

    return null;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}

// Validates that the token given in the header is a valid token
export async function validateToken(token, jwtSecretKey, requested_role) {

  try {

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
      return true;
    } else {
      // Access Denied
      return false;
    }
  } catch (error) {
    console.log("Error validating token: ", error);
    // Access Denied
    return false;
  }

}


