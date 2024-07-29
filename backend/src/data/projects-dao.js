import { getDatabase } from "./database.js";

/**
 * @typedef {object} Project
 * @property {number} id
 * @property {string} name
 * @property {string} description
 */

/**
 * Gets all projects
 *
 * @returns an array of all projects
 */
export async function retrieveProjects() {
  const db = await getDatabase();

  /** @type {Project[]} */
  const projects = await db.all("SELECT * FROM Projects");
  return projects.map((p) => p);
}


/**
 * Creates a new project 
 * @param {string} name the new name
 * @param {string} description the new description
 *
 * @return the newly created project
 */
export async function createProject(name, description) {
  const db = await getDatabase();

  const response = await db.run(
    "INSERT INTO Projects(name, description) VALUES(?, ?)",
    name, 
    description
  );

  /** @type {Project} */
  const project = await db.get("SELECT * FROM Projects WHERE id = ?", response.lastID); // lastID is the auto-generated PK value.
  return project;
}

/**
 * Deletes the project with the given id
 *
 * @param {number} id the id of the project to delete
 */
export async function deleteProject(id) {
  const db = await getDatabase();
  await db.run("DELETE FROM Projects WHERE id = ?", id);
}
