import { Router } from "express";
import { createSemester, deleteSemester, getSemester, getSemesters, updateSemester } from "../../data/semesters-dao.js";


const router = Router();

// Retrieves all semesters
router.get("/", async (req, res) => {
    const id = req.params.id;
    return res.json(await getSemesters())
});

// Retrieves a semester with a given id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    return res.json(await getSemester(id))
});

// Retrieves all semesters
router.get("/", async (req, res) => {
    return res.json(await retrieveSemesters())
});

// Creates a new semester with start and end dates
router.post("/", async (req, res) => {
    const { start_date, end_date, is_semester_one } = req.body;
    if (!start_date || !end_date || !is_semester_one) {
        return res.status(422);
    }

    // Details are valid and now passed to createSemester function to query into database
    const semester = await createSemester(start_date, end_date, is_semester_one);
    return res.status(201).json(semester);
});

// Updates start date, end date of semester with given status
router.post("/:id", async (req, res) => {
    const id = req.params.id;
    const { start_date, end_date, is_semester_one } = req.body;
    const success = updateSemester(id, start_date, end_date, is_semester_one);
    res.sendStatus(success ? 204 : 404);
});

// Deletes the semester with the given ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = deleteSemester(id);
    res.sendStatus(success ? 204 : 404);
});

export default router;