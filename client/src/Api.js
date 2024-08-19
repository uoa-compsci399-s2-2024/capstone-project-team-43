const BASE_URL = "http://localhost:3001";

/**
 * Fetches projects from the server, optionally filtered by status.
 * 
 * @async
 * @function fetchProjects
 * @param {string} [status] - The status of projects to filter by ('accepted', 'pending', or 'rejected'). 
 *                            If not provided, all projects will be fetched.
 * @returns {Promise<Object[]>} A promise that resolves to an array of project objects.
 * 
 * @throws Will throw an error if the network request fails or the server returns an error.
 * 
 */
export async function fetchProjects(status) {
    try {
        let response; 

        if(status !==  undefined) {
            response = await fetch(`${BASE_URL}/api/projects/status/${status}`);
        }
        else {
            response = await fetch(`${BASE_URL}/api/projects`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    }
};


