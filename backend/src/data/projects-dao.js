import { pool } from "./database.js";
import dotenv from "dotenv";
import { getUser } from "./users-dao.js";
import { getSemesters } from "./semesters-dao.js";

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
    const [rows, fields] = await connection.query('SELECT * FROM PROJECT ORDER BY project_number');

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
    const [rows, fields] = await connection.query('SELECT * FROM PROJECT WHERE status = ? ORDER BY project_number', [status]);
    console.log('Rows:', rows);

    // If there is a connection, release it
    if (connection) connection.release();

    return rows;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}

/**
 * Get project by id
 * 
 * @param {number} id
 * @return {Promise<Project>}
 */
export async function getProjectById(id) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME}`);
    const [rows, fields] = await connection.query('SELECT * FROM PROJECT WHERE id = ?', id);

    return rows[0];

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally {
    if (connection) connection.release();
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
 * @param {Date} expiry
 * @param {string} other_client_details
 *
 * @return the newly created project
 */
export async function createProject(title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client_details) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    /** @type {User} */
    const user = await getUser(owner_id);

    const client_name = user.first_name + " " + user.last_name;
    const client_email = user.email;

    const semesters = await getSemesters();

    const current_semester = semesters.find(semester => semester.status === "current");


    // Insert project into db
    const response = await connection.query(
      "INSERT INTO PROJECT (title, description, owner_id, special_requirements, available_resources, preferred_skills, deliverable, created, semester_id, status, max_teams, project_number, expiry, other_client_details, client_name, client_email, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, \'false\')",
      [title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, current_semester.id, status, max_teams, project_number, expiry, other_client_details, client_name, client_email]
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
 * Creates a new project 
 * @param {number} id
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
 * @param {Date} expiry
 * @param {string} other_client_details
 *
 * @return the newly created project
 */
export async function editProject(id, title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Insert project into db
    const response = await connection.query(

      "UPDATE project SET title = ?, description = ?, special_requirements = ?, available_resources = ?, preferred_skills = ?, deliverable = ?, max_teams = ?, expiry = ?, other_client_details = ? WHERE id = ?",
      [title, description, special_requirements, available_resources, preferred_skills, project_deliverable, max_teams, expiry, other_client_details, id]);

    /** @type {Project} */
    const project = await connection.query("SELECT * FROM PROJECT WHERE id = ?", [response.insertId]); // insertId is the auto-generated PK value.

    // If there is a connection, release it
    if (connection) connection.release();

    return project;

  } catch (err) {
    console.error('Error executing query/s:', err);
  } finally {
    if (connection) connection.release();

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

    if(status == "pending" || status == "rejected") {


      await connection.query(`USE ${DB_NAME};`);
  
      await connection.query("UPDATE `project` SET published = 'false' WHERE id = ?", [id]);
    }

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE `project` SET status = ? WHERE id = ?", [status, id]);

    console.log("PROJECT STATUS CHANGED");

    // If there is a connection, release it
    if (connection) connection.release();

  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    if (connection) connection.release();
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
  } finally {
    if (connection) connection.release();
  }
}


/**
 * Sets all projects to published/unpublished
 *
 * @param {'true'|'false'} status // status is either true/false to publish/unpublish all projects
 */
export async function publishProjects(status) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);

    if (status == "false") {
      await connection.query("UPDATE `project` SET published = ?", [status]);
    } else {
      await connection.query("UPDATE `project` SET published = ? WHERE status = \"accepted\"", [status]);
    }

  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();

  }
}
/**
 * Gets all projects by semester
 * @param {number} semester_id
 * @returns {Promise<Project[]>}
 */
export async function getProjectsBySemester(semester_id) {
  let connection;
  try {
    console.log('semester', semester_id);
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [rows] = await connection.query('SELECT * FROM PROJECT WHERE semester_id = ?', [semester_id]);

    return rows;

  } catch (err) {
    if (connection) connection.release();
    console.error('Error executing query/s:', err.message);
  }
}

/**
 * Allocates project numbers that were approved
 */
export async function allocateNumbers(approved_projects) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    let string_projects = JSON.stringify(approved_projects, null, 2);

    let projectIDS = string_projects.split("\"id\": ");
    let numberIDS = [];

    for (let i = 1; i < approved_projects.length + 1; i++) {
    
    /** @type {Project} */
    console.log("UPDATING PROJECT WITH ID: ", projectIDS[2 * i].split(",")[0]);

    numberIDS.push(parseInt(projectIDS[2 * i].split(",")[0]));

    await connection.query('UPDATE project SET project_number = ? WHERE id = ? ', [i, projectIDS[2 * i].split(",")[0]]);
    }

    console.log(numberIDS);

   await connection.query('UPDATE project SET project_number = 0 WHERE id NOT IN (?)', [numberIDS]);

  } catch (err) {
    if (connection) connection.release();
    console.error('Error executing query/s:', err.message);
  }
}