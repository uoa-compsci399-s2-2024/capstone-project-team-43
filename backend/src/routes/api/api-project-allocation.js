import { Router } from "express";
import { getProjects, getProjectById } from "../../data/projects-dao.js";
import { getPreferences } from "../../data/preferences-dao.js";

const router = Router();

router.get("/", async (req, res) => {
    const preferences = await getPreferences();

    // Final allocation
    let allocation = {};

    // Keep track of each project's max_team capacity
    let project_capacity = {};

    // Keep track of which teams have had projects allocated
    let allocated_teams = [];

    // Dictionary of team:preferences pairs
    // Eg: team_id=1 where first preference is project 5, etc.
    // {
    //     1: [5, 2, 3, 4, 1]
    // }
    let team_preferences = {};

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

    console.log(team_preferences);
    console.log(submission_order);
    console.log(project_capacity);

    // Allocate projects to teams based on order of submission time
    submission_order.forEach(team_id => {
        team_preferences[team_id].forEach(project_id => {
            if (allocated_teams.includes(team_id)) return;
            if (!allocation[project_id]) allocation[project_id] = [];
            if (allocation[project_id].length < project_capacity[project_id]) {
                allocation[project_id].push(team_id);
                allocated_teams.push(team_id)
            } else {
                console.warn(`team_id:${team_id} - capacity exceeded for project_id:${project_id}`);
            }
        });
    });
    return res.json(allocation);
});

export default router;