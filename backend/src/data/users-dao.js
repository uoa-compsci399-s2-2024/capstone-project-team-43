import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * @typedef {object} User
 * @property {number} id
 * @property {'admin'|'student'|'client'} role
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} company
 * @property {Date} created
 * @property {Date} last_login
 */

/**
 * Gets Users based on role if provided, otherwise gets all users.
 * @param {'admin'|'student'|'client'} [role] - Optional role to filter users.
 *
 * @returns {Promise<User[]>}
 */
export async function getUsers(role) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    let query = 'SELECT * FROM USER';
    let queryParams = [];


    // If a role is provided, filter by role
    if (role) {
      query += ' WHERE role = ?';
      queryParams.push(role);
    }

    const [rows] = await connection.query(query, queryParams);

    return rows;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();
  }
}


/**
 * Gets Users based on team_id
 * @param {number} team_id
 *
 * @returns {Promise<User[]>}
 */
export async function getUsersByTeam(team_id) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [users] = await connection.query('SELECT * FROM USER WHERE team_id = ?', team_id);
    
    return users;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally { 
    // If there is a connection, release it
    if (connection) connection.release();
  }
}

/**
 * Gets User based on id
 * @param {number} id
 *
 * @returns {Promise<User[]>}
 */
export async function getUser(id) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [users] = await connection.query('SELECT * FROM USER WHERE id = ?', id);
    
    return users[0];

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally { 
    // If there is a connection, release it
    if (connection) connection.release();
  }
}

/**
 * Creates a new User 
 * @param {'admin'|'student'|'client'} role
 * @param {string} email
 * @param {string} password
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} company // if client
 * @param {number} team_id // if student 
 * @return the newly created User
 */
export async function createUser(role, email, password, first_name, last_name, company, team_id) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Insert User into db
    const response = await connection.query(
      "INSERT INTO USER (role, email, password, first_name, last_name, company, team_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [role, email, password, first_name, last_name, company, team_id]
    );

    /** @type {User} */
    const User = await connection.query("SELECT * FROM USER WHERE id = ?", [response.insertId]); // insertId is the auto-generated PK value.

    // If there is a connection, release it
    if (connection) connection.release();

    return User;

  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}

/**
 * Creates a new User with role = 'student'
 * @param {string} email
 * @param {string} first_name
 * @param {string} last_name
 * @return the newly created User
 */
export async function createStudent(email, first_name, last_name) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Insert User into db
    const response = await connection.query(
      "INSERT INTO USER (role, email, password, first_name, last_name, company, team_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['student', email, null, first_name, last_name, null, null]
    );

    /** @type {User} */
    const User = await connection.query("SELECT * FROM USER WHERE id = ?", [response.insertId]); // insertId is the auto-generated PK value.

    // If there is a connection, release it
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
 * Deletes Users based on role 
 * @param {'admin'|'student'|'client'} [role]
 *
 * @returns {Promise<User[]>} // returns remaining users
 */
export async function deleteUserByRole(role) {
  let connection;
  let result = 0;
  try {
    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);

    const [result] = await connection.query("DELETE FROM USER WHERE role = ?", [role]);

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();
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

/**
* Updates the team_id of the student whose email starts with the given unikey
*
* @param {string} unikey student's unikey
* @param {number} team_id student's team
*/
export async function updateTeam(unikey, team_id) {
  try {
    await pool.query("UPDATE USER SET team_id = ? WHERE email LIKE ?", [team_id, `${unikey}%`]);

  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}

/**
* Updates an attribute of a User with a given id
*
* @param {number} id the id of the User to update
* @param {string} attribute the attribute to update
* @param {string} newValue the new value
*/
export async function updateUser(id, attribute, newValue) {
  try {
    let connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);

    const response = await pool.query("UPDATE USER SET ?? = ? WHERE id = ?", [attribute, newValue, id]);

    /** @type {User} */
    const updatedUser = await connection.query("SELECT * FROM USER WHERE id = ?", [id]); 

    return updatedUser;

  } catch (err) {
    console.error('Error executing query/s:', err);
    return[];
  }
}; 