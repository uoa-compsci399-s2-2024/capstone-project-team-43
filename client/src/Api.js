import axios from 'axios'; 
import { saveAs } from 'file-saver';

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
        throw error;
        return []; 
    }
};

export async function updateStatus(id,status) {
    try {
         const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ status }),
          })
        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    
    }
};

export async function downloadCSV() {
    try {
         const response = await fetch(`${BASE_URL}/api/users/download`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }, 
          })
        if(response.ok) {
        const csvData = await response.text();
        const url = window.URL.createObjectURL(new Blob([csvData]));
        console.log(response);
        var blob = new Blob([csvData], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `Students.csv`);
    }

        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    
    }
};

export async function downloadCSVTeams(semesterID) {
    try {
         const response = await fetch(`${BASE_URL}/api/teams/download`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ semesterID }),
          }) 
        if(response.ok) {
        const csvData = await response.text();
        const url = window.URL.createObjectURL(new Blob([csvData]));
        console.log(response);
        var blob = new Blob([csvData], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `Teams.csv`);
    }

        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    
    }
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
export async function updatePublish(status, approved_projects = []) {

    console.log("ITEMS: ", approved_projects);
    try {
         const response = await fetch(`${BASE_URL}/api/projects/publish/${status}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ status, approved_projects }),
          })
        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;}
};



export async function createProject(title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client_details) {
    try {
         const response = await fetch(`${BASE_URL}/api/projects/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client_details}),
          })

        return await response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;    }
};


export async function editProject(id, title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details) {
    try {
        const response = await fetch(`${BASE_URL}/api/projects/update/${id}`, {
           method: "POST",
           headers: {
               "Content-Type" : "application/json"
           },
           body: JSON.stringify({title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details}),
         })

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
        console.log('fetching semester '+semesterID);
        const response = await fetch(`${BASE_URL}/api/semesters/${semesterID}`);
        console.log('Fetched semester:', response);  
        return await response.json();

    } catch (error) {
        console.error('Error fetching semester:', error);
        throw error; 
        return [];
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
/**
 * Fetches a user from the server using user ID
 * 
 * @async
 * @function fetchUser
 * @param {number} [userId] 
 * @returns {Promise<User>} A promise that resolves to a User object.
 * 
 * @throws Will throw an error if the network request fails or the server returns an error.
 * 
 */
export async function fetchUser(userId) {
    try {
        console.log('fetching data for user:'+userId);
        const response = await fetch(`${BASE_URL}/api/users/id/${userId}`);
        console.log('Response:', response);  
        return await response.json();

    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;    
        return [];
    }
};
/**
 * Fetches a user's team from the server 
 * 
 * @async
 * @function fetchTeam
 * @param {number} [userId] 
 * @returns {Promise<Team>} A promise that resolves to a Team object.
 * 
 * @throws Will throw an error if the network request fails or the server returns an error.
 * 
 */
export async function fetchTeam(userId) {
    try {
        const response = await fetch(`${BASE_URL}/api/teams/user/id/${userId}`);
        console.log('Response:', response);  
        return await response.json();

    } catch (error) {
        console.error('Error fetching team:', error);
        throw error;    }
};
/**
 * Updates given attribute for User with given id
 * 
 * @async
 * @function updateUserDetails
 * @param {number} [userId] 
 * @param {string} [attribute]
 * @param {string} [newValue]
 * @returns {Promise<User>} A promise that resolves to a User object.
 *  
 */
export async function updateUserDetails(userId, attribute, newValue) {
    try {

        let res = await fetch(`http://localhost:3001/api/users/edit/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "attribute": attribute,
                "newValue": newValue
            })
        });
        const resJson = await res.json();

        console.log("NEW TOKEN: ", resJson.token);

        // Stores the resulting Auth Token
        localStorage.setItem("authToken", resJson.token);


        return
    } catch (error) {
        console.error('Error updating user details:', error);
    }
};
/**
 * Deletes User's Account by deleting their projects and user record
 * 
 * @async
 * @function deleteUser
 * @param {number} [userID] 
 * @returns {Promise<response>} 
 *  
 */
export async function deleteUser(userID) {
    try {
        const response = await axios.delete(`http://localhost:3001/api/users/id/${userID}`);
        return response.status; 
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; 
    }
};
/**
 * Updates given attribute for User with given id
 * 
 * @async
 * @function updateSemesterDetails
 * @param {number} [semesterID] 
 * @param {string} [attribute]
 * @param {string} [newValue]
 * @returns {Promise<Semester>} 
 *  
 */
export async function updateSemesterDetails(semesterID, attribute, newValue) {
    try {
        const response = await axios.put(`http://localhost:3001/api/semesters/edit/${semesterID}`, {
            attribute, newValue
        });
        return response.data; // return the updated data
    } catch (error) {
        console.error('Error updating details:', error);
        return null;
    }
};


export async function updatePreferences(team_id, project_id, preference) {

    try {
         const response = await fetch(`${BASE_URL}/api/preferences`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ team_id, project_id, preference }),
          })
        return await response;
    } catch (error) {
        console.error('Error updating project preferences:', error);
        throw error;}
};

export async function fetchPreferences() {
    console.log('Fetch student preferences');
    try {
        let response; 
        response = await fetch(`${BASE_URL}/api/preferences/`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching preferences:', error);
        throw error;
        return []; 
    }
};

export async function deletePreferences(id) {
    console.log('Fetch student preferences');
    try {
        let response; 
        response = await axios.delete(`${BASE_URL}/api/preferences/${id}`);
        return response.status; 
    } catch (error) {
        console.error('Error deleting preference:', error);
        throw error;
    }
};