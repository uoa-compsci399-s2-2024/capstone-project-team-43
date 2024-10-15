import { pool, DB_NAME } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * @typedef {object} Preference
 * @property {number} id
 * @property {number} team_id
 * @property {number} project_id
 * @property {number} preference
 */

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
let allocationResult;

export async function storeAllocations(allocation) {
    allocationResult = allocation;
}

export async function getAllocations() {
    console.log("FETCHING ALLOCATIONS: ", allocationResult);
    try {
        let CSVData = "Project Number,Teams,Preference\n";
        Object.keys(allocationResult.allocation).forEach(key => {
            let team_preferences = "";
            for (let i = 0; i < allocationResult.allocation[key].length; i++) {
                console.log(parseInt(allocationResult.allocation[key][i]));
                team_preferences += allocationResult.team_preferences[parseInt(allocationResult.allocation[key][i])];
                if (i < allocationResult.allocation[key].length - 1) {
                    team_preferences += ",";
                }
            }

            console.log("Team Preferences: ", team_preferences);
            CSVData += key + ",\"" + allocationResult.allocation[key] + "\",\"" + team_preferences + "\"\n";
          });
    
            
    
          return CSVData;
    
      } catch (err) {
        console.error('Error executing query/s:', err);
        return[];
      }
    return allocationResult;
}
