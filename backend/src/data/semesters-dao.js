import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * @typedef {object} Semester //defines the semester object
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {string} semester_name
 */

/**
 * Gets a semester given an id
 *
 * @returns {Promise<Semester>}
 */
export async function retrieveSemester(id) {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    /** @type {Semester} */
    const semester = await connection.query('SELECT * FROM SEMESTER_DATES WHERE id = ?', [id]);

    console.log('Semester:', semester);

    // If there is a connection, release it
    if (connection) connection.release();

    return semester;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}

/**
 * Gets all semesters
 *
 * @returns {Promise<Semester[]>}
 */
export async function retrieveSemesters() {
  let connection;
  try {
    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);
    const [rows] = await connection.query('SELECT * FROM SEMESTER_DATES');
    console.log('Rows:', rows);

    // If there is a connection, release it
    if (connection) connection.release();

    return rows;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}

/**
 * Creates a new semester 
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {boolean} semester_name //String visualization of semester, ie. "2024 Sem 2"
 *
 * @return the newly created project
 */
export async function createSemester(start_date, end_date, semester_one) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Insert semester into db
    const response = await connection.query(
      "INSERT INTO SEMESTER_DATES (start_date, end_date, semester_one) VALUES (?, ?, ?)", [start_date, end_date, semester_one]);

    /** @type {Semester} */
    const semester = await connection.query("SELECT * FROM SEMESTER_DATES WHERE id = ?", [response.insertId]); // insertId is the auto-generated Primary Key value

    // If there is a connection, release it
    if (connection) connection.release();

    return semester;

  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}

/**
 * Updates the project with the given id and status
 *
 * @param {number} id // The id of the semester to update
 * @param {Date} start_date // The new start_date of semester
 * @param {Date} end_date // The new end_date of semester
 * @param {boolean} semester_one // Boolean if its semester one or not
 */
export async function updateSemester(id, start_date, end_date, semester_one) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE SEMESTER_DATES SET start_date = ?, end_date = ?, semester_one = ? WHERE id = ?", [start_date, end_date, semester_one, id]);

    // If there is a connection, release it
    if (connection) connection.release();

  } catch (err) {
    console.error('Error executing query:', err);
  }
}

/**
 * Deletes the semester with the given id
 *
 * @param {number} id the id of the semester to delete
 */
export async function deleteSemester(id) {
  let connection;

  // Get connection from pool
  connection = await pool.getConnection();

  await connection.query(`USE ${DB_NAME};`);

  try {
    await connection.query("DELETE FROM SEMESTER_DATES WHERE id = ?", id);
  } catch (err) {
    console.error('Error executing query:', err);
  }
}