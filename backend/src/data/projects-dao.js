import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * @typedef {object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} owner_id
 * @property {string} preferred_skills
 * @property {string} project_deliverable
 * @property {Date} created
 * @property {string} expiry
 * @property {'rejected'|'accepted'|'pending'} status
 * @property {number} max_teams
 * @property {number} project_number
 */

// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;
/**
 * Gets all projects
 *
 * @returns {Promise<Project[]>}
 */
export async function getProjects() {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [rows] = await connection.query('SELECT * FROM PROJECT');
    console.log('Rows:', rows);

    // If there is a connection, release it
    if (connection) connection.release();

    return rows;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}
/**
 * Gets all status projects
 * @param {string} status
 * @returns {Promise<Project[]>}
 */
export async function getStatusProject(status) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [rows] = await connection.query('SELECT * FROM PROJECT WHERE status = ?', [status]);
    console.log('Rows:', rows);

    // If there is a connection, release it
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
 * @param {number} owner_id
 * @param {string} preferred_skills
 * @param {string} project_deliverable
 * @param {Date} created
 * @param {number} semester_id
 * @param {'rejected'|'accepted'|'pending'} status
 * @param {number} max_teams
 * @param {number} project_number
 *
 * @return the newly created project
 */
export async function createProject(title, description, owner_id, preferred_skills, project_deliverable, created, semester_id, status, max_teams, project_number) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Insert project into db
    const response = await connection.query(
      "INSERT INTO PROJECT (title, description, owner_id, preferred_skills, deliverable, created, semester_id, status, max_teams, project_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, description, owner_id, preferred_skills, project_deliverable, created, semester_id, status, max_teams, project_number]
    );

    /** @type {Project} */
    const project = await connection.query("SELECT * FROM PROJECT WHERE id = ?", [response.insertId]); // insertId is the auto-generated PK value.

    // If there is a connection, release it
    if (connection) connection.release();

    return project;

  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}

/**
 * Updates the project with the given id and status
 *
 * @param {id} id the id of the project to update
 * @param {status} status the new status of the project
 */
export async function updateProjectStatus(id, status) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE `project` SET status = ? WHERE id = ?", [status, id]);

    // If there is a connection, release it
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
  let connection;

  // Get connection from pool
  connection = await pool.getConnection();

  await connection.query(`USE ${DB_NAME};`);

  try {
    await connection.query("DELETE FROM PROJECT WHERE id = ?", id);
  } catch (err) {
    console.error('Error executing query:', err);
  }
}


/**
 * Sets all projects to published/unpublished
 *
 * @param {number} status // status is either true/false to publish/unpublish all projects
 */
export async function publishProjects(status) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE `project` SET published = ?", [status]);

    // If there is a connection, release it
    if (connection) connection.release();

  } catch (err) {
    console.error('Error executing query:', err);
  }
}
