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

    // If there is a connection, release it
    if (connection) connection.release();

    return semestersWithStatus;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
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

    // If there is a connection, release it
    if (connection) connection.release();

    return semester;

  } catch (err) {
    console.error('Error executing query/s:', err.message);
  }
}

/**
 * Creates a new semester 
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {boolean} is_semester_one //String visualization of semester, ie. "2024 Sem 2"
 *
 * @return the newly created project
 */
export async function createSemester(start_date, end_date, is_semester_one) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    // Insert semester into db
    const response = await connection.query(
      "INSERT INTO SEMESTER (start_date, end_date, is_semester_one) VALUES (?, ?, ?)", [start_date, end_date, is_semester_one]);

    /** @type {Semester} */
    const semester = await connection.query("SELECT * FROM SEMESTER WHERE id = ?", [response.insertId]); // insertId is the auto-generated Primary Key value

    // If there is a connection, release it
    if (connection) connection.release();

    return semester;

  } catch (err) {
    console.error('Error executing query/s:', err);
  }
}

/**
 * Updates the semester's start & end date
 *
 * @param {number} id // The id of the semester to update
 * @param {Date} start_date // The new start_date of semester
 * @param {Date} end_date // The new end_date of semester
 */
export async function updateSemesterDates(id, start_date, end_date) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE SEMESTER SET start_date = ?, end_date = ? WHERE id = ?", [start_date, end_date, id]);

    // If there is a connection, release it
    if (connection) connection.release();

  } catch (err) {
    console.error('Error executing query:', err);
  }
}

/**
 * Updates the is_semester_one attribute of semester with given ID
 *
 * @param {number} id // The id of the semester to update
 * @param {boolean} is_semester_one // the new value
 */
export async function updateIsSemesterOne(id, is_semester_one) {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`USE ${DB_NAME};`);

    await connection.query("UPDATE SEMESTER SET is_semester_one = ? WHERE id = ?", [is_semester_one, id]);

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
    await connection.query("DELETE FROM SEMESTER WHERE id = ?", id);
  } catch (err) {
    console.error('Error executing query:', err);
  }
}

