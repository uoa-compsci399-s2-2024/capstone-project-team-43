import { Router } from "express";
import { createSemester } from "../../data/semesters-dao.js";

const router = Router();

// creates a new semester with start and end dates
router.post("/", async(req, res) => {
    const { start_date, end_date, semester_one } = req.body;
    if (!start_date || !end_date || !semester_one) {
        return res.status(422);
    }
    
    //Details are valid and now passed to createSemester function to query into database
    const semester = await createSemester(start_date, end_date, semester_one);
    return res.status(201).json(semester);
});

export default router;