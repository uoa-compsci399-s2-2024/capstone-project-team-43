import { Router } from "express";
import { getProjects, getProjectById } from "../../data/projects-dao.js";
import { getPreferences, storeAllocations, getAllocations } from "../../data/preferences-dao.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
    const preferences = await getPreferences();
    const { hours } = req.body;

    /**  
    * Final allocation
    * allocation contains which teams have been allocated to each project
    * team_preferences contains which preference each team has been allocated 
    * */

    let allocation = {
        'allocation': {},
        'team_preferences': {}
    };

    // Keep track of each project's max_team capacity
    let project_capacity = {};

    // Keep track of which teams have had projects allocated
    let allocated_teams = [];

    /**  
    * Dictionary of team:preferences pairs
    * Eg: team_id=1 where first preference is project 5, etc.
    * { 1: [5, 2, 3, 4, 1] } 
    */ 

    let team_preferences = {};

    // Maximum number of admin hours available
    const max_hours = hours;

    // Sort preferences by created datetime
    preferences.sort(function (a, b) {
        return a.created - b.created;
    });

    // Keep track of order of team submission times
    let submission_order = [];
    for (const preference of preferences) {
        const team_id = preference.team_id;
        const project_id = preference.project_id;
        const p = preference.preference;
        if (!submission_order.includes(team_id)) {
            submission_order.push(team_id);
        }
        if (!(team_id in team_preferences)) {
            team_preferences[team_id] = new Array(5).fill(0);
        }
        team_preferences[team_id][p - 1] = project_id;
        if (!(project_id in project_capacity)) {
            let project = await getProjectById(project_id);
            project_capacity[project_id] = project.max_teams;
        }
    }

    let message;
    // Allocate projects to teams based on order of submission time
    submission_order.forEach(team_id => {
        for (let i = 0; i < team_preferences[team_id].length; i++) {
            const project_id = team_preferences[team_id][i];

            // Break out of loop if team has already been allocated a project
            if (allocated_teams.includes(team_id)) break;

            // Initialise array if the project does not exist in allocation dict
            if (!allocation['allocation'][project_id]) {

                // Check if total number of admin hours will be exceeded
                if (Object.keys(allocation['allocation']).length < max_hours) {
                    allocation['allocation'][project_id] = [];
                } else {
                    console.warn(`Cannot allocate team_id:${team_id} to project:${project_id} due to max hours exceeded`);
                    continue;
                }
            }

            // Check if project max_teams capacity will be exeeded
            if (allocation['allocation'][project_id].length < project_capacity[project_id]) {
                allocation['allocation'][project_id].push(team_id);
                allocated_teams.push(team_id);
                allocation['team_preferences'][team_id] = i + 1;
                console.log(`team_id:${team_id} allocated ${i + 1} preference`);
            } else {
                console.warn(`team_id:${team_id} - capacity exceeded for project_id:${project_id}`);
            }
        }

        // Check if team has not been allocated any of their preferences
        if (!allocated_teams.includes(team_id)) {
            message = `Project allocation algorithmm error: team_id:${team_id} were not allocated any of their 5 preferences`;
            console.error(message);
            return;
        };
    });

    if (message) {
        return res.status(400).json(message);
    }
    await storeAllocations(allocation);
    return res.json(allocation);
} catch (err) {
    console.log("Error during allocation: ", err);
}
});

// Gets allocation results in db structured as a CSV
router.get("/download", async (req, res) => {
    try {
    const data = await getAllocations();

    res.header('Content-Type', 'text/csv');
    res.attachment('AllocationData.csv');
    return res.status(200).send(data);
    } catch (err){
        console.log("Error Downloading CSV ", err);
        return res.status(204).end();
    }
});
export default router;