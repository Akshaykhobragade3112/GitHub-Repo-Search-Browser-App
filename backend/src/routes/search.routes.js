import { Router } from "express";
import { createSearch, getResults } from "../controllers/search.controller.js";

const router = Router();

router.post("/search", createSearch);
router.get("/results", getResults);

export default router;
