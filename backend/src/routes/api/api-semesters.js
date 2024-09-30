import { Router } from "express";
import { createSemester, deleteSemester, getSemester, getSemesters, updateSemester } from "../../data/semesters-dao.js";
import { getUsers, updateTeam, getUsersByTeam, createUser, createStudent, deleteUser, deleteUserByRole } from "../../data/users-dao.js";
import { createTeam, deleteTeamBySemester } from "../../data/teams-dao.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse"; 
import cors from 'cors';

const router = Router();

// Used for handling CSV file uploads 
// Files are temporarily stored in memory while being parsed
const upload = multer({
    storage: multer.memoryStorage(), // store files in memory instead of on disk
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".csv") {
            return cb(new Error("Only CSV files are allowed"));
        }
        cb(null, true);
    }
});

// Retrieves a semester with a given id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    return res.json(await getSemester(id))
});

// Retrieves all semesters
router.get("/", async (req, res) => {
    return res.json(await getSemesters())
});

// Adds students or teams to database from CSV 
router.post("/:id/upload/:fileContent", upload.single("myFile"), async (req, res) => {        
    const semester_id = req.params.id;
    const fileContent= req.params.fileContent;
    const csvData = req.file.buffer.toString("utf-8");

    console.log(`Reading ${fileContent} data`);

    // parse CSV
    parse(csvData, { columns: true, trim: true }, async (err, rows) => {
        if (err) {
            return res.status(400).json({ error: "Error parsing CSV" });
        }

        try {
            // If CSV contains student data 
            if (fileContent === 'students') {

                // delete any preexisting students
                await deleteUserByRole('student'); 

                // create new students in database
                for (const row of rows) {
                    let fname = row['Student name'].split(' ')[0];
                    let lname = row['Student name'].split(' ')[1];
                    let email =  row['Email']

                    await createStudent(email, fname, lname);
                }

            // If CSV contains teams data 
            } else if (fileContent === 'teams') {

                // delete any preexisting teams
                await deleteTeamBySemester(semester_id);

                // create new teams in database
                for (const row of rows) {
                    console.log('creating teams');
                    let team_number = row['group_name'][5];
                    let team_name = row['group_name'].slice(9,); 
                    let unikey =  row['login_id']; 

                    const team = await createTeam(team_number, team_name, semester_id);

                    // update team_id of student
                    await updateTeam(unikey, team.id);
                }
            }
            // return success response after processing all rows
            return res.status(201).json({ message: "File uploaded and processed successfully" });
        } catch (err) {
            console.error("Error saving data to the database", err);
            return res.status(500).json({ error: "Failed to process CSV data" });
        }
    });
});


// Updates start date, end date, bidding date of semester with given id
router.post("/:id/dates", async (req, res) => {
    const id = req.params.id;
    const { start_date, end_date, start_bidding_date, end_bidding_date} = req.body;
    const success = updateSemesterDates(id, start_date, end_date, start_bidding_date, end_bidding_date);
    res.sendStatus(success ? 204 : 404);
});

// Creates a new semester with start and end dates
router.post("/", async (req, res) => {
    const { start_date, end_date, is_semester_one, start_bidding_date, end_bidding_date } = req.body;
    if (!start_date || !end_date || !is_semester_one || !start_bidding_date || !end_bidding_date) {
        return res.status(422);
    }
    // Details are valid and now passed to createSemester function to query into database
    const semester = await createSemester(start_date, end_date, is_semester_one);
    return res.status(201).json(semester);
});

// Deletes the semester with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteSemester(id);
    res.sendStatus(success ? 204 : 404);
});


// Updates an attribute of the semseter with the given id 
router.put("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { attribute, newValue } = req.body;

    try {
        // Update the attribute in the database
        const [updatedSemester] = await updateSemester(id, attribute, newValue);

        // Return success status
        res.status(204).json(updatedSemester[0]);

    } catch (error) {
        console.error('Error updating attribute:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;