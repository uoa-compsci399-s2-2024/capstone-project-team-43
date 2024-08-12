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
 * @property {string} company
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
    const [rows] = await connection.query('SELECT * FROM USER');
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
 * @param {string} password
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} company
 * @return the newly created User
 */
export async function createUser(type, email, password, first_name, last_name, company) {
  let connection;
  try {

    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    //Insert User into db
    const response = await connection.query(
      "INSERT INTO USER (type, email, password, first_name, last_name, company) VALUES (?, ?, ?, ?, ?, ?)",
      [type, email, password, first_name, last_name, company]
    );

    /** @type {User} */
    const User = await connection.query("SELECT * FROM USER WHERE id = ?", [response.insertId]); // insertId is the auto-generated PK value.

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
    await pool.query("DELETE FROM USER WHERE id = ?", id);
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
      await pool.query("UPDATE USER SET email = ? WHERE id = ?", [email, id]);

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
      await pool.query("UPDATE USER SET first_name = ?, last_name = ? WHERE id = ?", [first_name, last_name, id]);

    } catch (err) {
      console.error('Error executing query/s:', err);
    }
  }