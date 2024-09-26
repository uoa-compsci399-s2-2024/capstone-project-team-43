import { pool } from "./database.js";
import dotenv from "dotenv";
import { deleteUserByRole } from "./users-dao.js";

dotenv.config();

// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * @typedef {object} Semester //defines the semester object
 * @property {number} id
 * @property {Date} start_date
 * @property {Date} end_date
 * @property {boolean} is_semester_one
 * @property {'retired'|'current'|'upcoming'} status
 */
/**
 * Gets all semesters
 *
 * @returns {Promise<Semester[]>}
 */
export async function getSemesters() {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);

    /** @type {Semester[]} */
    const [semesters] = await connection.query('SELECT * FROM SEMESTER');

    // Calculate the semesters' status using current date & start, end dates
    const currentDate = new Date();
    const semestersWithStatus = semesters.map(semester => {
      const { start_date, end_date } = semester;

      if (currentDate < new Date(start_date)) {
        semester.status = 'upcoming';
      } else if (currentDate >= new Date(start_date) && currentDate <= new Date(end_date)) {
        semester.status = 'current';
      } else {
        semester.status = 'retired';
      }
      return semester;
    });

    return semestersWithStatus;

  } catch (err) { 
    console.error('Error executing query/s:', err.message);
    return [];
  } finally {
    // release connection
    if (connection) connection.release();
  }
}

/**
 * Gets a semester given an id
 *
 * @returns {Promise<Semester>}
 */
export async function getSemester(id) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    /** @type {Semester[]} */
    const [semesters] = await connection.query('SELECT * FROM SEMESTER WHERE id = ?', [id]);
    const semester = semesters[0];

    // Calculate the semester's status using current date & start, end dates
    const currentDate = new Date();
    const { start_date, end_date } = semester;

    if (currentDate < new Date(start_date)) {
      semester.status = 'upcoming';
    } else if (currentDate >= new Date(start_date) && currentDate <= new Date(end_date)) {
      semester.status = 'current';
    } else {
      semester.status = 'retired';
    }

    return semester;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
    return [];
  } finally {
    // release connection
    if (connection) connection.release();
  }
}

/**
 * Creates a new semester 
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {Date} start_bidding_date
 * @param {Date} end_bidding_date
 * @param {boolean} is_semester_one 
 * 
 * @returns {Promise<Semester>}
 */
export async function createSemester(start_date, end_date, start_bidding_date, end_bidding_date, is_semester_one) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Insert semester into db
    const response = await connection.query(
      "INSERT INTO SEMESTER (start_date, end_date, start_bidding_date, end_bidding_date, is_semester_one) VALUES (?, ?, ?, ?, ?)", [start_date, end_date, start_bidding_date, end_bidding_date, is_semester_one]);

    /** @type {Semester} */
    const semester = await connection.query("SELECT * FROM SEMESTER WHERE id = ?", [response.insertId]); // insertId is the auto-generated Primary Key value
    return semester;

  } catch (err) {
    console.error('Error executing query/s:', err);
    return [];
  } finally {
    // release connection
    if (connection) connection.release();
  }
}

/**
 * Updates the semester's start & end date
 *
 * @param {number} id // The id of the semester to update
 * @param {Date} start_date // The new start_date of semester
 * @param {Date} end_date // The new end_date of semester
 * 
 * @returns {Promise<Semester>}
 */
export async function updateSemesterDates(id, start_date, end_date, start_bidding_date, end_bidding_date) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);
    await connection.query("UPDATE SEMESTER SET start_date = ?, end_date = ?, start_bidding_date = ?, end_bidding_date = ? WHERE id = ?", [start_date, end_date, start_bidding_date, end_bidding_date, id]);
    
    /** @type {Semester} */
    const semester = await connection.query("SELECT * FROM SEMESTER WHERE id = ?", [id]); 
    return semester;

  } catch (err) {
    console.error('Error executing query:', err);
    return []
  } finally {
    // release connection
    if (connection) connection.release();
  }
}

/**
 * Updates the is_semester_one attribute of semester with given ID
 *
 * @param {number} id // The id of the semester to update
 * @param {boolean} is_semester_one // the new value
 * 
 * @returns {Promise<Semester>}
 */
export async function updateIsSemesterOne(id, is_semester_one) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);
    await connection.query("UPDATE SEMESTER SET is_semester_one = ? WHERE id = ?", [is_semester_one, id]);

    /** @type {Semester} */
    const semester = await connection.query("SELECT * FROM SEMESTER WHERE id = ?", [id]); 
    return semester;

  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    if (connection) connection.release();
  }
}
/**
* Updates an attribute of a Semester with a given id
*
* @param {number} id the id of the semester to update
* @param {string} attribute the attribute to update
* @param {string} newValue the new value
*/
export async function updateSemester(id, attribute, newValue) {
  try {
    let connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);

    const response = await pool.query("UPDATE SEMESTER SET ?? = ? WHERE id = ?", [attribute, newValue, id]);

    /** @type {User} */
    const updatedSemester = await connection.query("SELECT * FROM SEMESTER WHERE id = ?", [id]); 

    return updatedSemester;

  } catch (err) {
    console.error('Error executing query/s:', err);
    return[];
  }
}; 

/**
 * Deletes the semester with the given id
 *
 * @param {number} id the id of the semester to delete
 * 
 * @returns {Promise<Semester[]>} Returns remaining semester
 */
export async function deleteSemester(id) {
  let connection;

  try {

    // Get connection from pool
    connection = await pool.getConnection();
    await connection.query(`USE ${DB_NAME};`);
    await connection.query("DELETE FROM SEMESTER WHERE id = ?", [id]);

    /** @type {Semester} */
    const [semesters] = await connection.query("SELECT * FROM SEMESTER"); 
    return semesters;

  } catch (err) {
    console.error('Error executing query:', err);
    return [];
  }finally{
    if (connection) connection.release();
  }
}

