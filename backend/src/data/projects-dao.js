import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * @typedef {object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} owner
 * @property {string} preferred_skills
 * @property {string} project_deliverable
 * @property {Date} created
 * @property {string} expiry
 * @property {'rejected'|'accepted'|'pending'} status
 * @property {number} max_num_of_groups
 * @property {number} project_num
 * 
 */

//Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * Gets all projects
 *
 * @returns {Promise<Project[]>}
 */
export async function retrieveProjects() {
  let connection;
  try {
    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [rows] = await connection.query('SELECT * FROM PROJECT');
    console.log('Rows:', rows);

    //if there is a connection, release it
    if (connection) connection.release();

    return rows;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}

  
/**
 * Gets all rejected projects
 *
 * @returns {Promise<Project[]>}
 */
export async function retrieveRejected() {
  let connection;
  try {
    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [rows] = await connection.query('SELECT * FROM PROJECT WHERE status = \'rejected\'');
    console.log('Rows:', rows);

    //if there is a connection, release it
    if (connection) connection.release();

    return rows;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}

/**
 * Creates a new project 
 * @param {string} title
 * @param {string} description
 * @param {number} owner
 * @param {string} preferred_skills
 * @param {string} project_deliverable
 * @param {Date} created
 * @param {string} expiry
 * @param {'rejected'|'accepted'|'pending'} status
 * @param {number} max_num_of_groups
 * @param {number} project_num
 *
 * @return the newly created project
 */
export async function createProject(title, description, owner, preferred_skills, project_deliverable, created, expiry, status, max_num_of_groups, project_num) {
  let connection;
  try {

    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    //Insert project into db
    const response = await connection.query(
      "INSERT INTO PROJECT (title, description, owner, preferred_skills, project_deliverable, created, expiry, status, max_num_of_groups, project_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, description, owner, preferred_skills, project_deliverable, created, expiry, status, max_num_of_groups, project_num]
    );

    /** @type {Project} */
    const project = await connection.query("SELECT * FROM PROJECT WHERE id = ?", [response.insertId]); // insertId is the auto-generated PK value.

    //If there is a connection, release it
    if (connection) connection.release();

    return project;

  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}

/**
 * Updates the project with the given id and status
 *
 * @param {number} id the id of the project to update
 * @param {number} status the new status of the project
 */
export async function updateProjectStatus(id, status) {
  let connection;
  try {

    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE `project` SET status = ? WHERE id = ?", [status, id]);

    //If there is a connection, release it
    if (connection) connection.release();

  } catch (err) {
    console.error('Error executing query:', err);
  }
}

/**
 * Deletes the project with the given id
 *
 * @param {number} id the id of the project to delete
 */
export async function deleteProject(id) {
  try {
    await pool.query("DELETE FROM Projects WHERE id = ?", id);
  } catch (err) {
    console.error('Error executing query:', err);
  }
}
