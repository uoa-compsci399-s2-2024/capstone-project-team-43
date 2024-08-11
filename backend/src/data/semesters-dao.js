import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

//Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * @typedef {object} Semester //defines the semester object
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {string} semester_name
 */

/**
 * Creates a new semester 
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {string} semester_name //String visualization of semester, ie. "2024 Sem 2"
 *
 * @return the newly created project
 */
export async function createSemester(start_date, end_date, semester_name) {
    let connection;
    try {
  
      //Get connection from pool
      connection = await pool.getConnection();
  
      await connection.query(`USE ${DB_NAME};`);
  
      //Insert semester into db
      const response = await connection.query(
        "INSERT INTO SEMESTER_DATES (start_date, end_date, semester_name) VALUES (?, ?, ?)", [start_date, end_date, semester_name]);
  
      /** @type {Semester} */
      const semester = await connection.query("SELECT * FROM SEMESTER_DATES WHERE id = ?", [response.insertId]); // insertId is the auto-generated Primary Key value
  
      //If there is a connection, release it
      if (connection) connection.release();
  
      return semester;
  
    } catch (err) {
      console.error('Error executing query/s:', err);
    }
  }

// TODO: Implement Delete Semester

// TODO: Implement Update Semester

// TODO: Implement Get Semester