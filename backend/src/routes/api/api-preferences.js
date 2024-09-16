import { Router } from "express";
import { getPreferences, getPreference, createPreference, deletePreference } from "../../data/preferences-dao.js";

const router = Router();

// Get all preferences
router.get("/", async (req, res) => {
    let preferences = await getPreferences();
    return res.json(preferences);
});

// Get preference by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const p = await getPreference(id);
    if (!p) return res.sendStatus(404);
    return res.status(200).json(p);
})

// Create a new preference
router.post("/", async (req, res) => {
    const { project_id, team_id, preference } = req.body;
    if (!project_id || !team_id || !preference) {
        return res.sendStatus(422);
    }

    const p = await createPreference(project_id, team_id, preference);
    return res.location(`/api/preferences/${p.id}`).status(201).json(p);
});

// Delete the preference with given id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const success = await deletePreference(id);
    res.sendStatus(success ? 204 : 404);
});


export default router;