import { pool } from "./database.js";
import dotenv from "dotenv";


dotenv.config();


// Gets the database name from .env file
const DB_NAME = process.env.DB_NAME;

/**
 * TODO: (Create login method) Implement a method that fetches a user from USER table, 
 * if a user doesn't exist, return "Invalid login details"
 */

/**
 * TODO: (Create register method for student) Implement a method that fetches a user from USER table, 
 * if a user doesn't exist OR date created attribute is NULL,
 * return "Invalid login details/you are not enrolled for capstone"
 */

/**
 * TODO: (Create register method for client) Implement a method that creates a new client user.
 */

/**
 * TODO: Create logout method
 */
