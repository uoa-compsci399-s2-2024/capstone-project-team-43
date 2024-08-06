import fs from "fs";
import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

//Creates a pool of connections to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
});

//Gets the database name from .env file
const DBName = process.env.DBName;

// Initializes the database, if no such database exists, it calls the create database function
async function initializeDatabase() {
  let connection;
  try {

    //get a connection from pool to check database
    connection = await pool.getConnection();

    // Check if the database exists
    const [rows] = await connection.query(`SHOW DATABASES LIKE '${DBName}';`);
    if (rows.length === 0) {
      console.log(`Database ${DBName} does not exist.`);

      //Database doesn't exist so it calls a function to create one
      await createDatabase();

    } else {
      console.log(`Database ${DBName} already exists.`);
    }
  } catch (err) {
    console.error('Error when checking for database: ', err.message);
  } finally {

    //if there is a connection, release it
    if (connection) connection.release();
  }
}

async function createDatabase() {
  let connection;
  try {

    //Get connection from pool
    connection = await pool.getConnection();

    await connection.query(`CREATE DATABASE ${DBName};`);

    console.log(`Database ${DBName} created successfully.`);
    // Optionally, you might want to switch to the new database and create tables
    await connection.query(`USE ${DBName};`);

                // Creates tables and placeholder data
                const createTablesQuery = `
                CREATE TABLE PROJECT (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  title VARCHAR(255) NOT NULL,
                  description VARCHAR(255) NOT NULL,
                  owner INTEGER NOT NULL,
                  preferred_skills VARCHAR(255),
                  project_deliverable VARCHAR(255),
                  created DATETIME NOT NULL,
                  expiry VARCHAR(255) NOT NULL,
                  status ENUM('rejected', 'accepted', 'pending') NOT NULL,
                  max_num_of_groups INTEGER NOT NULL,
                  project_num INTEGER NOT NULL
                );
                
                CREATE TABLE USER (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  type ENUM('admin', 'student', 'client') NOT NULL,
                  email VARCHAR(255) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  name VARCHAR(255) NOT NULL,
                  company_name VARCHAR(255),
                  created DATETIME NOT NULL
                );
                
                CREATE TABLE USER_GROUP (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  user_id INTEGER NOT NULL,
                  group_id INTEGER NOT NULL
                );
                
                CREATE TABLE PROJECT_GROUP (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  project_id INTEGER NOT NULL,
                  group_id INTEGER NOT NULL,
                  created DATETIME NOT NULL
                );
                
                INSERT INTO project (title, description, owner, preferred_skills, project_deliverable, created, expiry, status, max_num_of_groups, project_num) 
                VALUES ('cornerstone','An amazing web solution!','0', NULL, NULL, '2024-08-01 13:35:00','2025 Sem 1','accepted','3','43');`;

                try {
                await connection.query(createTablesQuery);
                console.log('Tables/Data inserted successfully');
                } catch (err) {
                  console.err('Error initializing database: ', err.message);
                }

  } catch (err) {
    console.error('Error creating database: ', err.message);
  } finally {
    
    //if there is a connection, release it
    if (connection) connection.release();
  }
}

initializeDatabase();


export { pool };