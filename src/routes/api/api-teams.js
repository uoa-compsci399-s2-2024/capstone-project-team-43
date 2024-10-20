import { Router } from "express";
import { createTeam, getTeam, getTeams, getTeamByUser, getTeamsBySemester, deleteTeamBySemester, setTeamProject, getCSV } from "../../data/teams-dao.js";

const router = Router();


// Retrieves the team with a given id
router.get("/id/:id", async (req, res) => {
    const id = req.params.id;
    return res.json(await getTeam(id))
});

// Retrieves the team for a user with a given user id
router.get("/user/id/:userId", async (req, res) => {
    const userId = req.params.userId;
    return res.json(await getTeamByUser(userId))
});

// Retrieves all teams
router.get("/", async (req, res) => {
    const userId = req.params.userId;
    return res.json(await getTeams(userId))
});

// Retrieves the teams from a semester with a given semester_id
router.get("/semester/:semester_id", async (req, res) => {
    const semester_id = req.params.semester_id;
    return res.json(await getTeamsBySemester(semester_id))
});


// Creates a new team with given team_number, team_name, and semester_id
router.post("/", async (req, res) => {
    const { team_number, team_name, semester_id } = req.body;

    // check details are valid
    if (!team_number || !team_name || !semester_id) {
        return res.status(422);
    }

    // add new team to database
    const team = await createTeam(team_number, team_name, semester_id);

    return res.status(201).json(team);
});

// Sets team's project using given team & project ids
router.post("/project_id/:team_id/:project_id", async (req, res) => {
    const team_id = req.params.team_id;
    const project_id = req.params.project_id;
    const success = setTeamProject(team_id, project_id);
    res.sendStatus(success ? 204 : 404);
});

// Deletes all teams of a specific semester 
router.delete("/:semesterId", async (req, res) => {
    const { semesterId } = req.params;
    console.log(`Deleting teams from semester with id ${semesterId}`);
    const teams = await deleteTeamBySemester(semesterId);
    return res.json(teams);
});

// Gets teams in db structured as a CSV
router.post("/download", async (req, res) => {
    try {
    const { semesterID } = req.body;
    const teams = await getTeamsBySemester(semesterID);
    const CSVData = await getCSV(teams);

    res.header('Content-Type', 'text/csv');
    res.attachment('teamsData.csv');
    return res.status(200).send(CSVData);
    } catch (err){
        console.log("Error Downloading CSV ", err);
        return res.status(204);
    }
});

export default router;