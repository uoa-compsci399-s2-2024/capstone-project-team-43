import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

// Gets the database team_name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * @typedef {object} Team // defines the team object
 * @property {number} id
 * @property {string} team_number
 * @property {string} team_name
 * @property {number} semester_id
 * @property {number} project_id
 */
/**
 * Retrieves a team given the team_id
 * @param {id} id
 * @returns {Promise<Teams[]>}
 */
export async function getTeam(id) {
    let connection;
    try {
      // Get connection from pool
      connection = await pool.getConnection();
  
      await connection.query(`USE ${DB_NAME};`);
  
      const [teams] = await connection.query('SELECT * FROM TEAM WHERE id = ?', [id]);
      return [teams];
  
    } catch (err) {
      console.error('Error executing query/s:', err.message);
    } finally {
  
      // If there is a connection, release it
      if (connection) connection.release();
  
    }
  }
/**
 * Retrieves all teams of a semester given the semester id 
 *
 * @returns {Promise<Teams[]>}
 */
export async function getTeamsBySemester(semester_id) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    const [teams] = await connection.query('SELECT * FROM TEAM WHERE semester_id = ?', [semester_id]);
    return teams;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally {

    // If there is a connection, release it
    if (connection) connection.release();

  }
}


/**
 * Creates a new Team
 * 
 * @param {number} team_number
 * @param {string} team_name
 * @param {number} semester_id 
 * @return the newly created team
 */
export async function createTeam(team_number, team_name, semester_id) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // return team if it already exists 
    const [existingTeam] = await connection.query(
      "SELECT * FROM TEAM WHERE (team_number = ? AND team_name = ? AND semester_id = ?)", [team_number, team_name, semester_id]
    );
    if (existingTeam.length > 0) {
      return existingTeam[0];
    }

    // Otherwise insert new team into database
    const [response] = await connection.query(
      "INSERT INTO TEAM (team_number, team_name, semester_id) VALUES (?, ?, ?)", [team_number, team_name, semester_id]);


    /** @type {Team} */
    const [team] = await connection.query("SELECT * FROM TEAM WHERE id = ?", [response.insertId]); // insertId is the auto-generated Primary Key value
    
    return team[0];

  } catch (err) {
    console.error('Error executing query/s:', err);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();
  }
}

/**
 * Updates the assigned project of a team with the given id 
 *
 * @param {number} id // The id of the team to update
 * @param {number} project_id // The new project_id of the assigned project
 */
export async function setTeamProject(id, project_id) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE TEAM SET project_id = ? WHERE id = ?", [project_id, id]);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();
  }
}

/**
 * Deletes Teams based on given semesterId
 * @param {number} [semesterId]
 *
 * @returns {Promise<Team[]>} // returns remaining users
 */
export async function deleteTeamBySemester(semesterId) {
  let connection;
  let result = 0;
  try {
    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);

    const [result] = await connection.query("DELETE FROM TEAM WHERE semester_id = ?", [semesterId]);

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();
  }
}