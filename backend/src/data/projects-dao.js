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
const DBName = process.env.DBName;

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

    await connection.query(`USE ${DBName};`);
    const [rows] = await connection.query('SELECT * FROM PROJECT');
    console.log('Rows:', rows);
    return rows; // Return the result directly, no need for .map() unless transforming data
  } catch (err) {
    console.error('Error executing query/s:', err.message);
    throw err; // Ensure the error is propagated
  }
}
/**
 * Creates a new project 
 * @param {string} name the new name
 * @param {string} description the new description
 *
 * @return the newly created project
 */
export async function createProject(name, description) {

 try {
  const response = await pool.query(
    "INSERT INTO Projects(name, description) VALUES(?, ?)",
    name, 
    description
  );

  /** @type {Project} */
  const project = await pool.query("SELECT * FROM Projects WHERE id = ?", response.lastID); // lastID is the auto-generated PK value.
  return project;

} catch (err) {
  console.error('Error executing query/s:', err);
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
    console.error('Error executing query/s:', err);
  }
}
