import { pool, DB_NAME } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

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
 * Retrieves all teams o
 *
 * @returns {Promise<Team[]>}
 */
export async function getTeams() {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    const [teams] = await connection.query('SELECT * FROM TEAM');
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
  try {
    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);

    await connection.query("DELETE FROM TEAM WHERE semester_id = ?", [semesterId]);

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();
  }
}
/**
 * Retrieves a team of a user given the user_id
 * @param {id} userId
 * @returns {Promise<Team>}
 */
export async function getTeamByUser(userId) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    const [team] = await connection.query(`
      SELECT t.* 
      FROM TEAM t
      WHERE t.id = (SELECT team_id FROM USER WHERE id = ?)
    `, [userId]);

    return team[0];

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  } finally {

    // If there is a connection, release it
    if (connection) connection.release();

  }
}

/**
* Returns a CSV structure style string based on users in database
*
* @param {Array<Object>} teams teams array
*/
export async function getCSV(teams) {
  try {
    let CSVData = "Team name,Team Number,Project ID\n";
    for (let i = 0; i < teams.length; i++) {

      CSVData += teams[i].team_name + "," + teams[i].team_number + "," + teams[i].project_id + "\n";
    }

    return CSVData;

  } catch (err) {
    console.error('Error executing query/s:', err);
    return [];
  }
}