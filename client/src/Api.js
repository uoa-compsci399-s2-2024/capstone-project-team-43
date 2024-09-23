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

export async function updateStatus(id,status) {
    try {
         const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ status })
          })
        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    }
};
/**
 * Fetches all teams for given semester
 * 
 * @async
 * @function fetchTeamsBySemester
 * @param {number} semesterID
 * @returns {Promise<Team[]>} 
 * 
 */
export async function fetchTeamsBySemester(semesterID) {
    try {
        const response = await fetch(`${BASE_URL}/api/teams/semester/${semesterID}`);
        console.log('Response:', response);  
        return await response.json();

    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;    }
};
/**
 * Fetches all users from the server 
 * 
 * @async
 * @function fetchUsersByRole
 * @param {'student | admin | client'} role
 * @returns {Promise<User[]>} 
 * 
 * @throws Will throw an error if the network request fails or the server returns an error.
 * 
 */
export async function fetchUsersByRole(role) {
    try {
        const response = await fetch(`${BASE_URL}/api/users/role/${role}`);
        console.log('Response:', response);  
        return await response.json();

    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;    }
};
export async function updatePublish(status) {
    try {
         const response = await fetch(`${BASE_URL}/api/projects/publish/${status}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ status })
          })
        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;}
};

export async function createProject(title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number) {
    console.log("we are here");
    try {
        console.log("we are inside try statement");
         const response = await fetch(`${BASE_URL}/api/projects/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number}),
          })

          const resJson = await response.json();

          console.log("status: ", response.status);
        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    }
};
export async function fetchSemesters() {
    try {
        let response; 
        
        response = await fetch(`${BASE_URL}/api/semesters`);
        // console.log(response);
        return await response.json();
    } catch (error) {
        console.error('Error fetching semesters:', error);
        throw error;    }
};
/**
 * Fetches a semester from the server 
 * 
 * @async
 * @function fetchSemester
 * @param {number} [semesterID] 
 * @returns {Promise<Semester>} A promise that resolves to a Team object.
 * 
 */
export async function fetchSemester(semesterID) {
    try {
        const response = await fetch(`${BASE_URL}/api/semesters/${semesterID}`);
        console.log('Fetched semester:', response);  
        return await response.json();

    } catch (error) {
        console.error('Error fetching semester:', error);
        throw error;  
    }
};
/**
 * Fetches all projects from the server by semester
 * 
 * @async
 * @function fetchProjectsBySemester
 * @param {number} [semesterId] 
 * @returns {Promise<Project[]>} A promise that resolves to an array of project objects.
 * 
 * @throws Will throw an error if the network request fails or the server returns an error.
 * 
 */
export async function fetchProjectsBySemester(semesterId) {
    try {
        const response = await fetch(`${BASE_URL}/api/projects/semester/${semesterId}`);
        console.log('project 1:',response[0])
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    }
};