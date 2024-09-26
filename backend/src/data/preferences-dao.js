import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * @typedef {object} Preference
 * @property {number} id
 * @property {number} team_id
 * @property {number} project_id
 * @property {number} preference
 */

// Gets the database name from the .env file
const DB_NAME = process.env.DB_NAME;

/**
 * Gets all preferences
 * 
 * @returns {Promise<Preference[]>}
 */
export async function getPreferences() {
    let connection;
    try {
        // Get connection from pool
        connection = await pool.getConnection();

        await connection.query(`USE ${DB_NAME};`);
        const [rows, fields] = await connection.query('SELECT * FROM PREFERENCE');

        return rows;
    } catch (err) {
        console.error('Error executing query/s:', err.message);
    } finally {
        if (connection) connection.release();
    }
}

/**
 * Get preference by id
 * 
 * @param {number} team_id
 * @returns {Promise<Preference>}
 */
export async function getPreference(id) {
    let connection;
    try {
        // Get connection from pool
        connection = await pool.getConnection();

        await connection.query(`USE ${DB_NAME};`);
        const [rows, fields] = await connection.query('SELECT * FROM PREFERENCE WHERE id = ?', id);

        return rows[0];
    } catch (err) {
        console.error('Error executing query/s:', err.message);
    } finally {
        if (connection) connection.release();
    }
}

/**
 * Create a new preference
 * 
 * @param {number} team_id
 * @param {number} project_id
 * @param {number} preference
 */
export async function createPreference(team_id, project_id, preference) {
    let connection;
    try {
        // Get connection from pool
        connection = await pool.getConnection();
        await connection.query(`USE ${DB_NAME};`);

        // Insert preference into db
        const [result, fields] = await connection.query(
            "INSERT INTO PREFERENCE (team_id, project_id, preference) VALUES (?, ?, ?)",
            [team_id, project_id, preference]
        );

        /** @type {Preference} */
        const [response, schema] = await connection.query("SELECT * FROM PREFERENCE WHERE id = ?", [result.insertId])

        // Return the first row of the response
        return response[0];
    } catch (err) {
        console.error('Error executing query/s:', err.message);
    } finally {
        if (connection) connection.release();
    }
}

/**
 * Deletes the preference with the given id
 * 
 * @param {number} id
 */
export async function deletePreference(id) {
    let connection;

    try {
        // Get connection from pool
        connection = await pool.getConnection();
        await connection.query(`USE ${DB_NAME};`);
        await connection.query("DELETE FROM PREFERENCE WHERE id = ?", id);
        return true;
    } catch (err) {
        console.error('Error executing query:', err.message);
        return false;
    } finally {
        if (connection) connection.release();
    }
}