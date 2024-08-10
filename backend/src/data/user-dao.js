import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * @typedef {object} User
 * @property {number} id
 * @property {'admin'|'student'|'client'} type
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} company_name
 * @property {Date} created
 * @property {Date} last_login
 */

/**
 * Gets all Users
 *
 * @returns {Promise<User[]>}
 */
export async function retrieveUsers() {
  let connection;
  try {
    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [rows] = await connection.query('SELECT * FROM User');
    console.log('Rows:', rows);

    //if there is a connection, release it
    if (connection) connection.release();

    return rows;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}
/**
 * Creates a new User 
 * @param {'admin'|'student'|'client'} type
 * @param {string} email
 * @param {string} first_name
 * @param {string} last_name
 * @param {Date} created
 * @param {Date} last_login
 *
 * @return the newly created User
 */
export async function createUser(type, email, first_name, last_name, created, last_login) {
  let connection;
  try {

    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    //Insert User into db
    const response = await connection.query(
      "INSERT INTO User (type, email, first_name, last_name, created, last_login) VALUES (?, ?, ?, ?, ?, ?)",
      [type, email, first_name, last_name, created, last_login]
    );

    /** @type {User} */
    const User = await connection.query("SELECT * FROM User WHERE id = ?", [response.insertId]); // insertId is the auto-generated PK value.

    //If there is a connection, release it
    if (connection) connection.release();

    return User;

  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}

/**
 * Deletes the User with the given id
 *
 * @param {number} id the id of the User to delete
 */
export async function deleteUser(id) {
  try {
    await pool.query("DELETE FROM Users WHERE id = ?", id);
  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}


/**
 * Updates the User email 
 *
 * @param {number} id the id of the User to delete
 * @param {string} email the new email 
 */
export async function updateUserEmail(id, email) {
    try {
      await pool.query("UPDATE Users SET email = ? WHERE id = ?", [email, id]);

    } catch (err) {
      console.error('Error executing query/s:', err);
    }
  }

  /**
 * Updates the User name
 *
 * @param {number} id the id of the User to delete
 * @param {string} first_name the new first name
 * @param {string} last_name the new first name
 */
export async function updateUserName(id, first_name, last_name) {
    try {
      await pool.query("UPDATE Users SET first_name = ?, last_name = ? WHERE id = ?", [first_name, last_name, id]);

    } catch (err) {
      console.error('Error executing query/s:', err);
    }
  }