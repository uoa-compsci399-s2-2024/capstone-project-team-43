import { pool } from "./database.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Will use this for password hashing


dotenv.config();

// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

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
export async function generateToken(email, password, checkIfRegisterd) {

    // Validate user here
    const userid = await validateUser(email, password, checkIfRegisterd);

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
  
/** 
 * Funtion is given an email and password which then checks if such a user exists in the database, returns user id if a user is found and null otherwise.
 * The checkIfRegistered is a boolean which will check if a user has created their account before they can log in
 * If checkIfRegisterd is set to false, it will validate the user without checking if the user has been registered
 * 
 * @param {string} email
 * @param {string} password
 * @param {boolean} checkIfRegistered
 */ 
async function validateUser(email, password, checkIfRegistered) {
    let connection;
    try {
      // Get connection from pool
      connection = await pool.getConnection();
  
      await connection.query(`USE ${DB_NAME};`);

      let [rows] = []
      
      if(checkIfRegistered) {

        [rows] = await connection.query('SELECT * FROM USER WHERE email = ? AND password = ? AND created IS NOT NULL', [email, password]);

      } else {
      
      // If user is not registered, just need to check if email is in the system already
      [rows] = await connection.query('SELECT * FROM USER WHERE email = ?', [email]);

      }

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

    // Updates student details
    await connection.query(
      "UPDATE USER SET password = ?, created = ? WHERE email = ?",
      [password, created, email]
    );

    [rows] = await connection.query('SELECT * FROM USER WHERE email = ? AND password = ?', [email, password]);

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
  if(result == undefined) {
    return false;
  }
  return true;
}