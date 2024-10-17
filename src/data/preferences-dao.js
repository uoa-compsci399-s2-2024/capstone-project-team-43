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

export async function storeAllocations(allocations) {
    let connection;
    try {

        // Get connection from pool
        connection = await pool.getConnection();
        await connection.query(`USE ${DB_NAME};`);

    for (const key of Object.keys(allocations.allocation)) {
        let team_preferences = "";
        for (let i = 0; i < allocations.allocation[key].length; i++) {

            const team_id = parseInt(allocations.allocation[key][i]);
            const preference = allocations.team_preferences[parseInt(allocations.allocation[key][i])];

            team_preferences += allocations.team_preferences[parseInt(allocations.allocation[key][i])];
            await connection.query("UPDATE TEAM SET project_id = ?, preference = ? WHERE id = ?", [key, preference, team_id]);
        }
      }
    } catch (err) {
        console.error('Error executing query/s:', err);
      }  finally {
        if (connection) connection.release();
    }
}

// Need to fix this method as its not fetching data from the database
export async function getAllocations() {
    let connection;

    try {

        // Get connection from pool
        connection = await pool.getConnection();
        await connection.query(`USE ${DB_NAME};`);
        const [teams] = await connection.query("SELECT * FROM TEAM");
        let CSVData = "Project Number,Teams,Preference\n";

        let teamData = {};
        let preferenceData = {};
        // Loop through all the teams and get their data
        for (const team of teams) {

            // If array doesn't exist yet in dictionary, then create one
            if (!teamData[team.project_id]) {
                teamData[team.project_id] = [];
            }

            if (!preferenceData[team.id]) {
                preferenceData[team.id] = [];
            }
            
            // Push team id to dictionary
            teamData[team.project_id].push(team.id);
            preferenceData[team.id].push(team.preference);
        }

        Object.keys(teamData).forEach(key => {
            let team_preferences = "";
            for (let i = 0; i < teamData[key].length; i++) {
                team_preferences += preferenceData[parseInt(teamData[key][i])];
                if (i < teamData[key].length - 1) {
                    team_preferences += ",";
                }
            }

            console.log("Team Preferences: ", team_preferences);
            CSVData += key + ",\"" + teamData[key] + "\",\"" + team_preferences + "\"\n";
          });
    
            
    
          return CSVData;
    
      } catch (err) {
        console.error('Error executing query/s:', err);
        return[];
      }
}