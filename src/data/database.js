import fs from "fs";
import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

// Creates a pool of connections to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  multipleStatements: true
});

// Gets the database name and script path from .env file
const DB_NAME = process.env.DB_NAME;
const DB_INIT_SCRIPT = process.env.DB_INIT_SCRIPT;

// Initializes the database, if no such database exists, it calls the create database function
async function initializeDatabase() {
  let connection;
  try {

    // Get a connection from pool to check database
    connection = await pool.getConnection();

    // Check if the database exists
    const [rows] = await connection.query(`SHOW DATABASES LIKE '${DB_NAME}';`);
    if (rows.length === 0) {
      console.log(`Database ${DB_NAME} does not exist.`);

      // Database doesn't exist so it calls a function to create one
      await createDatabase();

    } else {
      console.log(`Database ${DB_NAME} already exists.`);
    }
  } catch (err) {
    console.error('Error when checking for database: ', err.message);
  } finally {

    // If there is a connection, release it
    if (connection) connection.release();
  }
}

async function createDatabase() {
  let connection;
  try {

    // Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`CREATE DATABASE ${DB_NAME};`);

    console.log(`Database ${DB_NAME} created successfully.`);

    // Selects the newly created database
    await connection.query(`USE ${DB_NAME};`);

    // Creates tables and placeholder data
    const createTablesQuery = fs.readFileSync(DB_INIT_SCRIPT, "utf8", (err, data) => {
      if (err) throw err;
      console.log(data);
    });

    // Runs query, if query fails, returns error
    try {
      await connection.query(createTablesQuery);
      console.log('Tables/Data inserted successfully');
    } catch (err) {
      console.error('Error initializing database: ', err.message);
    }

  } catch (err) {
    console.error('Error creating database: ', err.message);
  } finally {
    // If there is a connection, release it
    if (connection) connection.release();
  }
}

initializeDatabase();


export { pool };